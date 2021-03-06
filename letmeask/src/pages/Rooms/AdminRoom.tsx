import { useHistory, useParams } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import deleteImg from '../../assets/images/delete.svg';
import checkImg from '../../assets/images/check.svg';
import answerImg from '../../assets/images/answer.svg';

import { Button } from '../../components/Button/index';
import { Question } from '../../components/Question/index';
import { RoomCode } from '../../components/RoomCode/index';
import { Theme } from '../../components/Theme';

import { database } from '../../services/firebase';

// import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';
import { useTheme } from '../../hooks/useTheme';

import './styles.scss'

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  // const { user } = useAuth();
  const history = useHistory()
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { theme } = useTheme()
  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/');
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    if (window.confirm('Marcar pergunta como respondida?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isAnswered: true,
      });
    }
  }

  async function handleHighlightQuestion(questionId: string, isHighLighted: boolean) {
    if(!isHighLighted){
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isHighLighted: true,
      });
    }
    else {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isHighLighted: false,
      });
    }
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  return (
    <div id="page-room" className={theme}>
      <header className={theme}>
        <div className="content">
          <img src={logoImg} alt="Letmeask" onClick={() => history.push('/')}/>
          <div>         
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
            {/* propriedade booleana */}            
          </div>  
          <Theme />        
        </div>        
      </header>
      <main>
        <div className="room-title">
          <h1 className={theme}>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
        {/* && = if, then.    (true)?():() = if, else. */}

        {/* precisaremos percorrer um array e retornar cada item como um componente usando
         map() que funciona como o foreach() por??m com adi????o de um "return"! */}

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighLighted={question.isHighLighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt="Marcar pergunta como respondida" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id, question.isHighLighted)}
                    >
                      <img src={answerImg} alt="Destacar pergunta" />
                    </button>
                  </>
                )}
                  {/* Fragment - o React nos for??a a ter um elemento pai quando desejamos exibir dois
                  elementos um ao lado do outro, uma div atrapalharia a estiliza????o ent??o podemos usar o fragment,
                  que n??o ?? exibido no HTML, somente dentro do nosso return */}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
              /* ?? necess??rio passarmos a key pro react conseguir identificar as perguntas unicamente
              evitando assim, que ap??s alguma altera????o recarregar todo o HTML da p??gina. 
              Estude sobre Algoritmo de reconcilia????o */
            );
          })}
        </div>
      </main>      
    </div>
  );
}

// snippets div.form-footer - cria uma div com a className declarada.
//          div#page-room - cria uma div com o id declarado.