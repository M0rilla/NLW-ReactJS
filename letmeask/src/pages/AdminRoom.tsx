import { useHistory, useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { database } from '../services/firebase';
// import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';

import '../styles/room.scss'

type RoomParams = {
  id: string;
}

export function AdminRoom() {
// const { user } = useAuth();
const history = useHistory()
const params = useParams<RoomParams>();
const roomId = params.id;

const { title, questions } = useRoom(roomId);

async function handleEndRoom() {
  await database.ref(`rooms/${roomId}`).update({ 
    endedAt: new Date(),
  })

  history.push('/');
}

async function handleDeleteQuestion(questionId: string) {
  if (window.confirm('Tem certeza que deseja excluir esta pergunta?')) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
  }
}

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
           <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
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
            >
              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id) }
              >
                <img src={deleteImg} alt="Remover pergunta" />
              </button>
            </Question>
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