import { BrowserRouter, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

import { AuthContextProvider } from './contexts/AuthContext'

// inicializamos o nosso contexto como um objeto
function App() {
  return (    
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </AuthContextProvider>
    </BrowserRouter>
    
  );
} 
export default App;

/* exact garante que o nosso endereço seja exatamente o especificado
 caso contrario ele verificaria se contém o trecho definido.
 
 As primeiras chaves definem um código js a segunda a inserção de um objeto

 Toda função async devolve uma Promise no js.
 */
