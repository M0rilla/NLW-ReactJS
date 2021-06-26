import { useHistory } from 'react-router-dom'; 

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

/* webpack (snowpack, vite, ...)
Webpack = Module Bundler -> pega a extensão do arquivo e tem algumas
configurações pré-determinadas pra cada tipo de arquivo ser entendido
nas importações javascript */

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.scss';


export function Home() {
const history = useHistory();
const { user, signInWithGoogle } = useAuth();
// toda função que começa com "use" é um hook que precisa estar dentro do componente.

  async function handleCreateRoom() {
    if(!user){
      await signInWithGoogle()
    }

    history.push('/rooms/new');
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Logo do Google"/>
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}
// O &Comercial no HTML é usado para criação de símbolos e sua 
// representação é &amp;