import React, { useEffect, useState } from 'react';
import { fetchGreeting } from './api';

function App() {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const getGreeting = async () => {
      const message = await fetchGreeting();
      setGreeting(message);
    };

    getGreeting();
  }, []);

  return (
      <div className="App">
        <header className="App-header">
          <h1>{greeting}</h1>
        </header>
      </div>
  );
}

export default App;
