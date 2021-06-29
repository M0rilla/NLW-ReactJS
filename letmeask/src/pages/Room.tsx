import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg'

import { Button } from '../components/Button';
<<<<<<< HEAD
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
=======
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
>>>>>>> 92d4e40 (Aula 03 em andamento NLW#6))
import { database } from '../services/firebase';

import '../styles/room.scss'

type RoomParams = {
  id: string;
}

export function Room() {
const { user } = useAuth();
const params = useParams<RoomParams>();
const [newQuestion, setNewQuestion] = useState('');
<<<<<<< HEAD
const roomId = params.id;

const { title, questions } = useRoom(roomId);
=======

const roomId = params.id;
>>>>>>> 92d4e40 (Aula 03 em andamento NLW#6))

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
<<<<<<< HEAD
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
       {/* && = if, then.    (true)?():() = if, else. */}
=======
          <h1>Sala React</h1>
          <span>4 perguntas</span>
        </div>

>>>>>>> 92d4e40 (Aula 03 em andamento NLW#6))
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
<<<<<<< HEAD
        {/* precisaremos percorrer um array e retornar cada item como um componente usando
        map() que funciona como o foreach() porém com adição de um "return"! */}
        <div className="question-list">
        {questions.map(question =>{
          return (
            <Question 
              key={question.id}
              content={question.content}
              author={question.author}
            />
            /* É necessário passarmos a key pro react conseguir identificar as perguntas unicamente
            evitando assim, que após alguma alteração recarregar todo o HTML da página. 
            Estude sobre Algoritmo de reconciliação */
          );
        })}
        </div>
=======
>>>>>>> 92d4e40 (Aula 03 em andamento NLW#6))
      </main>
    </div>
  );
}

// snippets div.form-footer - cria uma div com a className declarada.
//          div#page-room - cria uma div com o id declarado.