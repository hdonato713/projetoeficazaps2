const axios = require("axios");

const url = "https://servidor-exercicios-js-eficaz.vercel.app";
axios


 //Faz uma requisição do tipo post
  .post(
    `${url}/token`,
    { username: "heitordf" },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    } // o headers explica que é em forma de json
  )

  // quando der certo, esta será a resposta do servidor
  .then((resposta) => {
    const accessToken = resposta.data.accessToken; //recebe o token e qguarda na variável

    return axios.get(`${url}/exercicio`, { //usa aurl e pega exercícios
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  })
  .then((respostaExercicios) => {
    console.log(JSON.stringify(respostaExercicios.data, null, 2)); // aquele que reflete no console
  })

  .catch((erro) => console.error(erro.message)); // o de possiveis erros