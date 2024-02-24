export const mensagemCadastroCompra = [
  "Desconto é como abraço quente no bolso - eu nunca recuso!",
  "Dizem que dinheiro não traz felicidade, mas desconto sim! Felicidade com economia, filho!",
  "Pão duro? Eu prefiro a expressão 'mão fechada com estilo'.",
  "Acham que sou forreta, mas estou apenas ensinando à carteira como fazer flexões.",
  "Negociar é minha segunda língua. A primeira é 'economês', você conhece?",
  "Economizar é uma arte, e eu sou o Picasso da pechincha.",
  "Se o dinheiro falasse, o meu diria: 'Obrigado por me deixar ficar um pouco mais!'",
  "Me chamam de 'Rei dos Descontos'. Já pedi uma coroa, mas disseram que era caro demais.",
  "Não sou pão duro, sou um especialista em fazer cada centavo valer a pena.",
  "A vida é curta, mas as promoções são ainda mais curtas. Não perca tempo, aproveite!",
  "Economizar é uma arte, e eu sou o Picasso da pechincha.",
  "Uma corrente de ouro só serve para prender o portão de ouro da sua casa de ouro.",
  "Tire esse relógio da tomada, garoto. Você não consegue ver a hora enquanto dorme! São 2 centavos a hora!",
  "Aceita vale-refeição?",
  "São 49 centavos de leite derramado em toda a mesa. Alguém vai ter que beber esse leite!",
  "Se você não pode pagar, não compre!",
];

export const mensagemCadastroOutros = [
  "Mais um na lista! Seu nome está oficialmente na minha 'lista VIP' de gastos.",
  "Bem-vindo à família do orçamento! Agora sua loja/cartão tem residência fixa no meu sistema.",
  "Cadastrado com sucesso! Prepare-se para ser celebridade no mundo das despesas.",
  "Você agora faz parte do meu rolê financeiro. A diversão está apenas começando, meu caro.",
  "Loja, cartão ou pessoa, todos são bem-vindos no meu esquema de economia. Parabéns, você entrou para o clube!",
  "Parece que tenho um novo parceiro de gastos. Prepare-se para aventuras emocionantes... ou melhor, financeiramente emocionantes!",
  "Com você cadastrado, meu sistema está mais rico - ou pelo menos mais ocupado!",
  "Eis mais um membro da liga dos gastos! Seu cartão é a capa, e sua loja é a super-heroína das compras.",
  "Você agora é parte integrante do meu grande plano de conquista... financeira, é claro!",
  "Registrado e pronto para gastar! Sua presença no meu sistema é tão marcante quanto uma liquidação.",
  "Bem-vindo ao meu mundo de economia. Prepare-se para ser o centro das atenções... financeiras!",
  "Seu cadastro foi um sucesso! Agora você faz parte do meu time de gastos.",
];

export const mensagemDeletar = [
  "Mais um item removido do registro. Adeus! Sua ausência será notada.",
  "Menos um na lista! Foi removido com sucesso. O saldo está mais leve agora.",
  "Dizendo adeus. Foi bom enquanto durou, mas é hora de seguir em frente.",
  "Registro limpo! Foi deletado. Que venham novas adições!",
  "E assim se despede, deixando espaço para novas entradas.",
  "Removendo do sistema. Uma nova página se abre.",
  "Feito! Foi excluído com sucesso. Menos um para se preocupar.",
  "Um passo em direção à simplicidade. Foi removido.",
  "Atualização concluída! Foi deletado. Próximo!",
  "E com um clique, desaparece. O ciclo continua.",
];

export const mensagemErroDelete = [
  "Ops, parece que o dinheiro está se apegando a este item. Ele se recusa a ir embora!",
  "Parece que o item não quer sair daqui. Talvez ele esteja tentando economizar um pouco mais.",
  "Erro ao deletar! Parece que este item é tão valioso que não quer ser removido.",
  "Houve um erro ao tentar excluir o item. Parece que ele está fazendo greve financeira!",
  "Oops! Este item está resistindo à exclusão. Ele quer continuar fazendo parte da festa financeira.",
  "Erro ao deletar o item. Parece que ele está tentando escapar do buraco negro financeiro.",
  "Eita! Este item está lutando contra sua exclusão. Parece que ele tem uma ligação emocional com o orçamento.",
  "Parece que estamos encontrando resistência ao tentar deletar o item. Ele não quer ser excluído do balanço financeiro!",
  "Erro ao excluir o item. Talvez ele tenha recebido uma oferta melhor em outra parte do orçamento!",
  "Ops, parece que o item está dando uma de ninja financeiro. Ele desapareceu antes de podermos excluí-lo!",
];
export const mensagemErro = [
  "Oops! Parece que o dinheiro escapou dessa vez. Sorte sua que não ficou registrado!",
  "Erro 404: Gasto não encontrado. Parece que você escapou da maldição do orçamento desta vez!",
  "Uma falha épica ocorreu, mas veja pelo lado bom: seu orçamento está mais seguro sem essa despesa!",
  "Parece que o universo conspirou a seu favor desta vez. Gasto não cadastrado, economia garantida!",
  "Alerta de economia! Seu gasto não foi registrado. Celebre essa vitória financeira acidental!",
  "Ops! Alguém fez uma manobra ninja e escapou do registro. Você, meu amigo, é um mestre da economia sem querer!",
  "Erro financeiro: parece que sua carteira deu um soco na despesa e a impediu de entrar no sistema!",
  "Quase lá, mas o sistema detectou uma economia de última hora. Gasto evitado com sucesso!",
  "Desculpe, parece que seu dinheiro está de folga hoje. Aproveite o alívio de não ter gastado!",
  "Erro financeiro ou sorte extrema? Seja lá o que for, parabéns por escapar ileso dessa vez!",
  "Alerta de economia! Seu gasto não foi registrado. Celebre essa vitória financeira acidental!",
  "Erro financeiro: parece que sua carteira deu um soco na despesa e a impediu de entrar no sistema!",
];

export const randomMensagemCadastroCompra = () => {
  return mensagemCadastroCompra[
    Math.floor(Math.random() * mensagemCadastroCompra.length)
  ];
};

export const randomMensagemCadastroOutros = () => {
  return mensagemCadastroOutros[
    Math.floor(Math.random() * mensagemCadastroOutros.length)
  ];
};

export const randomMensagemDeletar = () => {
  return mensagemDeletar[Math.floor(Math.random() * mensagemDeletar.length)];
};

export const randomMensagemErroDelete = () => {
  return mensagemErroDelete[
    Math.floor(Math.random() * mensagemErroDelete.length)
  ];
};

export const randomMensagemErro = () => {
  return mensagemErro[Math.floor(Math.random() * mensagemErro.length)];
};

export const randomImagens = () => {
  const arrayImagens = ["julius.png"];
  return arrayImagens[Math.floor(Math.random() * arrayImagens.length)];
};
