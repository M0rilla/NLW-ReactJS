import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';

import { Button } from '../../components/Button/index';
import { Theme } from '../../components/Theme';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { database } from '../../services/firebase';

import './styles.scss';

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');
  const { theme } = useTheme()

  async function handleCreateRoom (event: FormEvent) {
    event.preventDefault();

    if(newRoom.trim() === ''){
      return;
      // impedimos a criação de uma sala sem nome
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })
    /* jogamos uma nova informação para dentro da nossa referência
      que foi classificada, categorizada, como rooms.
      push() para Listas de informações e set() para dados Únicos */

      history.push(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth" className={theme}>
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />   
          <h2>Criar uma nova sala</h2> 
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>            
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
      <Theme />
    </div>
  )
}
/* 
  "?" estabelece que o parâmetro pode não existir.

  Toda função que a gente passa pra algum evento nativo do HTML ela geralmente
recebe como parâmetro o próprio evento para que seja possível manipularmos.

  Um submit por padrão redireciona o usuário pra algum lugar, pro isso temos
action e method.

  Sempre se inicializa um estado com um valor do mesmo tipo da variável.

  Sempre que o evento está fora da definição, separada, precisamos atribuir type.

  A função trim() remove os espaços antes e depois da string.
*/