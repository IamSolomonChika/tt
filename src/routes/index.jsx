import React from 'react'
import LoadingPage from '../pages/001LoadingPage'
import BankSearchPage from '../pages/002BankSearchPage'
import ConnectBankPage from '../pages/003ConnectBankPage'
import EmailConnectPage from '../pages/004EmailConnectPage'
import CardConnectPage from '../pages/005CardConnectPage'
import CompleteTXPage from '../pages/006CompleteTXPage'


export const routes = [
  {
    path: '/',
    element: LoadingPage,
    name: 'Loading'
  },
  {
    path: '/bank-search',
    element: BankSearchPage,
    name: 'Bank Search'
  },
  {
    path: '/connect-bank',
    element: ConnectBankPage,
    name: 'Connect Bank'
  },
  {
    path: '/email-connect',
    element: EmailConnectPage,
    name: 'Email Connect'
  },
  {
    path: '/card-connect',
    element: CardConnectPage,
    name: 'Card Connect'
  },
  {
    path: '/complete-transaction',
    element: CompleteTXPage,
    name: 'Complete Transaction'
  }
] 