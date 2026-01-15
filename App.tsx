import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppFrame } from './AppFrame';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <AppFrame enableAnalytics />
      </Router>
    </HelmetProvider>
  );
};

export default App;