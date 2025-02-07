import "./main.css";
import React from 'react';
import { createRoot } from 'react-dom/client';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import { SlideClickProvider } from "./hooks/SlideClickContext";


const App = () => {
  let pageElem;
  pageElem = <HomePage />;

  return (
    <SlideClickProvider>
      <Layout>{pageElem}</Layout>
    </SlideClickProvider>
  );
};


const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
