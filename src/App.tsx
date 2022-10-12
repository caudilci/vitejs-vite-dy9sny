import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import styled, { useTheme } from 'styled-components/native/dist';

function App() {
  const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: ${(theme) => theme.colors.primary};
`;

  const appTheme = {
    colors: {
      primary: 'blue',
    },
  };

  useTheme(appTheme);

  return (
    <div className="App">
      <Title>Title!</Title>
    </div>
  );
}

export default App;
