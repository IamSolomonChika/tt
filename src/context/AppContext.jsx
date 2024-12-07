import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { filterBankList } from '../assets/js/bankList';
import { bankSearch, connectBank, emailConnect, cardConnect, completeTx } from '../utils/linkPath';
const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};

export const AppContextProvider = ({ children }) => {
  // Add your state variables here
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bankDetails, setBankDetails] = useState(null);

  // Navigation function
  const navigate = useNavigate();

  const navigateTo = (path) => {
    setLoading(true);
    navigate(path);
    setLoading(false);
  };

  // Add your functions here
  const handleError = (error) => {
    setError(error);
    setLoading(false);
  };

  const clearError = () => {
    setError(null);
  };

  function generateBase64String() {
    // Define base64 characters
    const base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    let result = '';
    
    // Generate 100 random characters
    for (let i = 0; i < 300; i++) {
        result += base64Chars.charAt(Math.floor(Math.random() * base64Chars.length));
    }
    
    return result;
  }
  

  // Create the value object that will be passed to consumers
  const value = {
    // State
    loading,
    setLoading,
    error,
    user,
    setUser,
    showModal,
    setShowModal,
    bankDetails,
    setBankDetails,
    bankSearch,
    connectBank,
    emailConnect,
    cardConnect,
    completeTx,

    // Functions
    handleError,
    clearError,
    navigateTo,
    filterBankList,
    generateBase64String
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
