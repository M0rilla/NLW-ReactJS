import { useEffect } from 'react';
import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg'

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/room.scss'

type FirebaseQuestions = Record<string, {
  author: {
  name: string;
  avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean;
}>

/* para declararmos a tipagem de um objeto no typescript precisamos usar o Record<>
que assume a posição de um objeto e dentro dele passamos o tipo da chave e seu valor
que neste caso era outro objeto; */

type Question = {
  id: string;
  author: {
    name: string;
    avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
}

type RoomParams = {
  id: string;
}

export function Room() {
const { user } = useAuth();
const params = useParams<RoomParams>();
const [newQuestion, setNewQuestion] = useState('');
const [questions, setQuestions] = useState<Question[]>([]);
/* nosso estado armazena um tipo genérico -> array de questions, é importante atribuirmos um tipo */
const [title, setTitle] = useState('');

const roomId = params.id;

useEffect(()=> {
  const roomRef = database.ref(`rooms/${roomId}`);

  roomRef.on('value', room =>{
    // console.log(room); DataSnapshot
    const databaseRoom = room.val();
    // console.log(databaseRoom); Object
    const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
    const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) =>{
      return {
        id: key,
        content: value.content,
        author: value.author,
        isHighLighted: value.isHighLighted,
        isAnswered: value.isAnswered,
      }
    }) 
    // console.log(parsedQuestions); Lindo Lindo Array
    setTitle(databaseRoom.title)
    setQuestions(parsedQuestions);
    /* 
    Object.entries() nos retorna uma matriz em que cada posição do array é composta por chave e valor 
     Exemplo - parâmetro obj sendo passado, que é um objeto com nome e idade:
     [["nome", "Gustavo"], ["idade","26"]] 
     
     usamos o ?? {} para tratar a possibilidade de recebermos um objeto vazio
     questions é um DataSnapshot, uma tipagem padrão do firebase então é necessário
     criar uma tipagem para corrigir a mensagem de erro e entender quais são os dados que estão dentro desse objeto.

     .map(value => {return{}}) - percorremos cada valor dessa iteração, no caso nosso valor vai ser um conjunto,
     fizemos uma desestruturação já que sabemos que o conjunto é composto por [value[0]= key, value[1]= value]
     */
  })
}, [roomId]);

/*  Estratégia de Event Listener do javascript que está dentro da 
documentação do Firebase:
.once - para executar só uma vez.
.on - para ouvir o evento mais de uma vez.
*/

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
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>
       {/* && = if, then.    (true)?():() = if, else. */}
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
        {JSON.stringify(questions)}
      </main>
    </div>
  );
}

// snippets div.form-footer - cria uma div com a className declarada.
//          div#page-room - cria uma div com o id declarado.