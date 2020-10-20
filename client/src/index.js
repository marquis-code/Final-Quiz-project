import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/@mdi/font/css/materialdesignicons.min.css';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import '../node_modules/materialize-css/dist/js/materialize.min.js';
import './styles/styles.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import AuthProvider from './Context/AuthContext';


ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);








