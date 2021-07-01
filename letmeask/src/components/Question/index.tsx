import { ReactNode } from 'react'
// ReactNode representa a existência de qualquer código JSX, outro componente, HTML etc. 

import './styles.scss'

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
}

export function Question({
  content, 
  author,
  children,
}: QuestionProps) {
  return (
    <div className="question">
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