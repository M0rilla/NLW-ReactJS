import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg'

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import '../styles/room.scss'

type RoomParams = {
  id: string;
}

export function AdminRoom() {
const { user } = useAuth();
const params = useParams<RoomParams>();
const [newQuestion, setNewQuestion] = useState('');
const roomId = params.id;

const { title, questions } = useRoom(roomId);

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
          <div>
           <RoomCode code={roomId} />
            <Button isOutlined>Encerrar sala</Button>
            {/* propriedade booleana */}
          </div>          
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
       {/* && = if, then.    (true)?():() = if, else. */}
        
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
      </main>
    </div>
  );
}

// snippets div.form-footer - cria uma div com a className declarada.
//          div#page-room - cria uma div com o id declarado.