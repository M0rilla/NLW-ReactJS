import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg'

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/room.scss'

type RoomParams = {
  id: string;
}

export function Room() {
const { user } = useAuth();
const params = useParams<RoomParams>();
const [newQuestion, setNewQuestion] = useState('');

const roomId = params.id;

async function handleSendQuestion(event: FormEvent) {
  event.preventDefault();
  if(newQuestion.trim() === '') {
    return;
  }

  if(!user) {
    throw new Error('You must be logged in');
  }

  //declaração de objeto
  const question = {
    content: newQuestion,
    author: {
      name: user.name,
      avatar: user.avatar,
    },
    isHighLighted: false,
    isAnswered: false,
  };
  
  //envio para o firebase 
  await database.ref(`rooms/${roomId}/questions`).push(question);
  //substitui o valor do estado e reflete a alteração a partir do value do elemento HTML
  setNewQuestion(''); 
}

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={roomId} />
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="form-footer">
            { user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name}/>
                <span>{user.name}</span>
              </div>
            ) : (
            <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
            ) }
            {/* operador ternário, se existir user x,":" se não y. */}
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  );
}

// snippets div.form-footer - cria uma div com a className declarada.
//          div#page-room - cria uma div com o id declarado.