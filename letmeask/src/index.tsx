import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './services/firebase';

import './styles/global.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// O modo estrito (StrictMode) só atua na fase de desenvolvimento e ajuda atualmente com:

// Identificação de métodos de ciclo de vida (life cycles) inseguros
// Avisos em relação ao uso da antiga string ref API
// Avisos em relação ao uso do depreciado findDOMNode
// Identificação de efeitos colaterais (side effects) inesperados
// Identificação de uso da antiga API de contexto (Context API)