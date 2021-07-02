REACT - 
Quando desejamos reutilizar algo visual como um botão, tabela etc. em vários lugares da aplicação
devemos criar um novo componente.
Quando se trata de algo funcional que desejamos reaproveitar devemos criar um Hook!

Named Export - export é declarado diretamente na função e não como um
default, quando se muda o nome da função o import da erro.

Children - todo conteúdo dentro de um componente React é children.
<Button> ->Children<- </Button>

let - let it change / const - constant.


TYPESCRIPT - 
Adicionamos tipagem (propriedades) para o nosso código.

propriedades opcionais - 'text?: string;' o "?" define como opcional.

Quando instalamos pacotes e estamos utilizando typescript precisamos verificar
se ele foi feito com TS ou nao, caso contrário precisaremos instalar o @types do pacote.

DEPLOYMENT - 
Quando você tem uma aplicação PWA (progressive web app) isso torna possível transformar nossa aplicação (create-react-app) 
em um aplicativo, por padrão sempre existe um arquivo chamado service.worker.js que é uma API do browser e seguindo
a documentação precisa-se cancelar o cache dest arquivo. (Esse app não é PWA).

ENGENHARIA DE SOFTWARE - 
Ao criar um projeto precisamos levantar os seguintes pontos:
- RF: Regras funcionais (o usuário precisa fazer login). *pode ter mais de uma RN
- RNF: Regras não-funcionais (a autenticação usará Firebase).
- RN: Regras de negócio (O usuário só poderá se conectar usando uma conta Google). *sempre associada a uma RF

CHALLENGES - 
- Dark mode. 
- Styled Components. 
- Responsividade.
- Github.

