const axios = require("axios");
axios

 //Faz uma requisição do tipo post
  .post(
    "https://servidor-exercicios-js-eficaz.vercel.app/token",
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
    console.log("Temos um token");
  })
  .catch((erro) => console.error(erro.message)); //pra caso dê erro, mas acho que não será útil

  