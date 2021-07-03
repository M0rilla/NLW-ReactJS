import { ButtonHTMLAttributes } from 'react';
import './styles.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
};
// nosso componente receberá todas as propriedades do HTML & algo que eu definir, que no caso é opcional.

/* spread operator {...props} - distribui todas as propriedades recebidas
 por parâmetro. Para usá-lo é necessário definirmos os tipos. 
Como nos referimos a um elemento HTML o react resolve isso pra gente. */

/* Rest Operator é um conceito de desestruturação aplicado junto com {...props} para pegarmos uma propriedade
 específica e todo o resto ser atribuído ao spread operator. */

 
export function Button ({isOutlined = false, ...props}: ButtonProps){
  return (
    <button className={`button ${isOutlined ? 'outlined': ''}`}
     {...props} 
    />    
  )
  // definimos o valor default de isOutlined e criamos o condicional para aplicarmos classes diferentes.
}

/* 
useState - Hook que armazena um estado, recebe um array e uma função que vai
criar novos valores baseado nas informações anteriores.

imutabilidade - quando uma variável é criada dentro do estado de um
componente ela não sofre alterações, somente se cria uma nova 
informação baseada na que já existia.

  import { useState } from "react";  
  const [counter, setCounter] = useState(0);
  onClick no nosso button apontaria para função increment
  function increment (){ setCounter(counter + 1); console.log(counter); }
*/