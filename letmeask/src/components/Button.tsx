import { ButtonHTMLAttributes } from 'react';
import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

/* spread operator {...props} - distribui todas as propriedades recebidas
 por parâmetro. Para usá-lo é necessário definirmos os tipos. 
Como nos referimos a um elemento HTML o react resolve isso pra gente. */
export function Button (props: ButtonProps){
  return (
    <button className="button" {...props} />    
  )
}

/* 
imutabilidade - quando uma variável é criada dentro do estado de um
componente ela não sofre alterações, somente se cria uma nova 
informação baseada na que já existia.

useState - armazena um estado, recebe um array e uma função que vai
criar novos valores baseada nas informações anteriores.

  import { useState } from "react";  
  const [counter, setCounter] = useState(0);
  onClick no nosso button apontaria para função increment
  function increment (){ setCounter(counter + 1); console.log(counter); }

named export - export é declarado diretamente na função e não como um
default, quando se muda o nome da função o import da erro.

typescript - adicionamos tipagem (propriedades) para o nosso código
propriedades opcionais - 'text?: string;' o "?" define como opcional

children - todo conteúdo dentro de um componente React é children 
<Button> ->Children<- </Button>

let - let it change / const - constant
*/