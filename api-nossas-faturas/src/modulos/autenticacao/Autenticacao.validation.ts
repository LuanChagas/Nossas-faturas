export function validarLogin(dados: Login): {
  error: boolean;
  mensagens: respostaValidacao[];
} {
  const resposta: respostaValidacao[] = [];
  let err = false;
  if (!dados.userName || typeof dados.userName !== 'string') {
    err = true;
    resposta.push({ campo: 'userName', mensagem: 'userName inválido' });
  }

  if (!dados.password || typeof dados.password !== 'string') {
    err = true;
    resposta.push({ campo: 'password', mensagem: 'password inválido' });
  }

  return { error: err, mensagens: resposta };
}
