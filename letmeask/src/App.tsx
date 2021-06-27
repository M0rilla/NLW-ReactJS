import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';

import { AuthContextProvider } from './contexts/AuthContext'

// inicializamos o nosso contexto como um objeto
function App() {
  return (    
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
    // :id pro react-router-dom simboliza que tudo após a / é um parâmetro.
    /* O componente Switch garante que ao satisfazer a condição de chamada de uma rota (path),
     que as demais rotas parem de tentar validar. */
  );
} 
export default App;

/* exact garante que o nosso endereço seja exatamente o especificado
 caso contrario ele verificaria se contém o trecho definido.
 
 As primeiras chaves definem um código js a segunda a inserção de um objeto

 Toda função async devolve uma Promise no js.
 */
