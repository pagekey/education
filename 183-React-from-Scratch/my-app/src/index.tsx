import React from 'react';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Thing from './thing';

const App = () => {
    const [something, setSomething] = useState<string>("something");
    return <div>
      Hello, world! {something}
      <Thing />
    </div>;
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
