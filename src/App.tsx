import React, { useContext, useState } from 'react';
import { ThemeProvider } from 'styled-components'

import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import cookieParser from 'cookie';

import {
  BrowserRouter as Router,
} from "react-router-dom";

import AppContent from './AppContent'

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/graphql',
});

const authLink = setContext((_, { headers }) => {
  const cookie = document.cookie
  const token = cookieParser.parse(cookie).token
  console.log(cookie, token, 'ha')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

type ThemeType = {
  primary: string,
  lightGrey: string,
  darkGrey: string,
  fontPrimary: string,
  error: string,
}

const theme: ThemeType = {
  primary: '#5F4BB6',
  lightGrey: '#f6f6f6',
  darkGrey: '#404040',
  fontPrimary: '#202A25',
  error: '#FF3864'
}


function App() {
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
