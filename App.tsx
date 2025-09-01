import React from 'react';
import AquabloomLanding from './components/AquabloomLanding';
import { ThemeProvider } from './components/context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <div className="font-sans">
        <AquabloomLanding />
      </div>
    </ThemeProvider>
  );
}

export default App;