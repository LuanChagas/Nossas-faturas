interface Login {
  userName: string;
  password: string;
}

interface respostaValidacao {
  campo: string;
  mensagem: string;
}

interface Usuario {
  user_name: string;
  password: string;
}

declare namespace Express {
  export interface Request {
    user?: any;
  }
}
