import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from './HomePage';

const App = () => {
    const [something, setSomething] = useState<string>("something");
    return <div><HomePage /> {something}</div>;
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
