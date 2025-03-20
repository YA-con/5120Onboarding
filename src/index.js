import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const setRem = () => {
  const htmlElement = document.documentElement; // get <html> dom
  const baseSize = 10; // base font size 10px
  let designWidth = 1920; // Layout width

 

  if (htmlElement.clientWidth > 1360) {
    designWidth = 1920
  } else if (htmlElement.clientWidth > 1200) {
    designWidth = 1360
  } else if (htmlElement.clientWidth > 960) {
    designWidth = 1080
  } else  {
    designWidth = 750
  }

   // complete rem
  const scale = htmlElement.clientWidth / designWidth;

  htmlElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'; // max scale
};

setRem();

// Listener Window change rem
window.addEventListener('resize', setRem);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
