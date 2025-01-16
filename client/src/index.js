// **client/src/index.js**
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

const logger = require('./logger');
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', // URL del frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

const root = ReactDOM.createRoot(document.getElementById('root'));


logger.info('Montando la aplicación React en el elemento #root');

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
