import { useEffect, useState } from "react";

import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<string, {
  author: {
  name: string;
  avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean;
  likes: Record<string, {
    authorId: string;
  }>
}>

/* para declararmos o tipo de um objeto no typescript precisamos usar o Record<>
que assume a posição de um objeto e dentro dele passamos o tipo da chave e seu valor
que neste caso era outro objeto; */

type QuestionType = {
  id: string;
  author: {
    name: string;
    avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighLighted: boolean;
    likeCount: number;
    likeId: string | undefined;
    // é possível que não exista nenhum like na pergunta.
}

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  /* nosso estado armazena um tipo genérico -> array de questions, é importante atribuirmos um tipo */
  const [title, setTitle] = useState('');

  useEffect(()=> {
    const roomRef = database.ref(`rooms/${roomId}`);
  
    // temos 4 tipos de eventos a partir de uma referencia no firebase: value, child_added, child_changed, child_removed

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
          likeCount: Object.values(value.likes ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
          /* ()?.[0], - Se o usuário não tiver dado like naquela questão ainda o nosso find() não irá retornar nada,
            "?" esse sinal significa que o javascript irá verificar o retorno do método, caso exista,
            iremos acessar a posição 0.

            .values quando só precisamos dos valores.
            .entries para acessar o id.
            .some() - percorre o array e retorna um booleano com base na condição passada a ela.
            .find() - percorre o array e retorna um Objeto com o valor. */
        }
      }) 
      /* Estratégia de Event Listener do javascript que está dentro da documentação do Firebase:
      .once - para executar só uma vez.
      .on - para ouvir o evento mais de uma vez. */

      // console.log(parsedQuestions); Lindo Lindo Array
      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions);
      /* 
      Object.entries() nos retorna uma matriz em que cada posição do array é composta por chave e valor 
       Exemplo - parâmetro obj sendo passado, que é um objeto com nome e idade:
       [["nome", "Gustavo"], ["idade","26"]] 
       
       usamos o ?? {} para tratar a possibilidade de recebermos um objeto vazio
       questions é um DataSnapshot, uum tipo padrão do firebase então é necessário
       criar um tipo para corrigir a mensagem de erro e entender quais são os dados que estão dentro desse objeto.
  
       .map(value => {return{}}) - percorremos cada valor dessa iteração, no caso nosso valor vai ser um conjunto,
       fizemos uma desestruturação já que sabemos que o conjunto é composto por [value[0]= key, value[1]= value]
       */
    })
    return () => {
      roomRef.off('value');
    }
    // removemos todos os eventListeners pra essa referência de sala com base na documentação do firebase
  }, [roomId, user?.id]);
  // passamos o user?.id como dependência pro useEffect visto que se trata de uma variável que vem de fora do hook.
  return { questions, title }  
}

/* criamos um hook com uma visão funcional comum entre usuário e admin da nossa sala 
para que então, só adicionemos as ações adicionais de um administrador*/