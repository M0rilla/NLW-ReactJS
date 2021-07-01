import { ReactNode } from 'react';
// ReactNode representa a existência de qualquer código JSX, outro componente, HTML etc. 
import cx from 'classnames';

import './styles.scss';

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighLighted?: boolean;
}

export function Question({
  content, 
  author,
  children,
  isAnswered = false, // default value false
  isHighLighted = false, // default value false
}: QuestionProps) {
  return (
    /* Na div abaixo temos muitas classes e operadores ternários, o pacote chamado classnames simplifica
      e substitui a declaração destes, pois podemos passar objetos contendo a classe desejada
      e uma variável booleana que controlará a inserção dependendo de seu valor. */      
      // antes: className={`question ${isAnswered ? 'answered' : ''} ${isHighLighted ? 'highlighted' : ''}`} depois:
    <div className={cx(
      'question',
      { 'answered': isAnswered },
      { 'highlighted': isHighLighted && !isAnswered},
    )}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name}/>
          <span>{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  )
}
/* É possível aplicar uma desestruturação no "props:" especificando
quais propriedades queremos extrair do objeto passado
Isso nos permite usar as propriedades diretamente pelo nome sem o "props." */