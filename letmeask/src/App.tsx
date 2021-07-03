import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './pages/Home/index';
import { NewRoom } from './pages/Rooms/NewRoom';
import { Room } from './pages/Rooms/Room';
import { AdminRoom } from './pages/Rooms/AdminRoom';

import { AuthContextProvider } from './contexts/AuthContext'
import { ThemeContextProvider } from './contexts/ThemeContext';


// inicializamos o nosso contexto como um objeto
function App() {
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <AuthContextProvider>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" component={NewRoom} />
            <Route path="/rooms/:id" component={Room} />

            <Route path="/admin/rooms/:id" component={AdminRoom} />
          </Switch>
        </AuthContextProvider>
      </ThemeContextProvider>
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
