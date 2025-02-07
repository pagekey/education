import "./main.css";
import React from 'react';
import { createRoot } from 'react-dom/client';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';


const App = () => {
  let pageElem;
  pageElem = <HomePage />;

  return (
    <Layout>{pageElem}</Layout>
  );
};


const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
