const axios = require("axios");

const url = "https://servidor-exercicios-js-eficaz.vercel.app";

function enesimoPrimo(n) {
  let encontrados = 0;
  let candidato = 1;

  while (encontrados < n) {
    candidato++;

    let primo = true;

    for (let divisor = 2; divisor * divisor <= candidato; divisor++) {
      if (candidato % divisor === 0) {
        primo = false;
        break;
      }
    }

    if (primo) {
      encontrados++;
    }
  }

  return candidato;
}

const resolvedores = {
  soma: ({ a, b }) => a + b,

  "tamanho-string": ({ string }) => string.length,

  "nome-do-usuario": ({ email }) => email.split("@")[0],

  "jaca-wars": ({ v, theta }) => {
    const distancia =
      (v ** 2 * Math.sin((2 * theta * Math.PI) / 180)) / 9.8;

    if (distancia <= 98) return -1;
    if (distancia >= 102) return 1;
    return 0;
  },

  "ano-bissexto": ({ ano }) =>
    (ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0,

  "volume-da-pizza": ({ z, a }) => Math.round(Math.PI * z ** 2 * a),

  mru: ({ s0, v, t }) => s0 + v * t,

  "inverte-string": ({ string }) => string.split("").reverse().join(""),

  "soma-valores": ({ objeto }) =>
    Object.values(objeto).reduce((total, valor) => total + valor, 0),

  "n-esimo-primo": ({ n }) => enesimoPrimo(n),

  "maior-prefixo-comum": ({ strings }) => {
    let maior = "";

    for (let a = 0; a < strings.length; a++) {
      for (let b = a + 1; b < strings.length; b++) {
        let tamanho = 0;

        while (
          tamanho < strings[a].length &&
          tamanho < strings[b].length &&
          strings[a][tamanho] === strings[b][tamanho]
        ) {
          tamanho++;
        }

        if (tamanho > maior.length) {
          maior = strings[a].slice(0, tamanho);
        }
      }
    }

    return maior;
  },

  "soma-segundo-maior-e-menor-numeros": ({ numeros }) => {
    const ordenados = [...numeros].sort((a, b) => a - b);
    return ordenados[1] + ordenados[ordenados.length - 2];
  },

  "conta-palindromos": ({ palavras }) =>
    palavras.filter(
      (palavra) => palavra === palavra.split("").reverse().join("")
    ).length,

  "soma-de-strings-de-ints": ({ strings }) =>
    strings.map(Number).reduce((total, valor) => total + valor, 0),
};

axios
  .post(
    `${url}/token`,
    { username: "heitordf" },
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  )
  .then((resposta) => {
    const accessToken = resposta.data.accessToken;

    return axios.get(`${url}/exercicio`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
  })
  .then((respostaExercicios) => {
    const exercicios = respostaExercicios.data;

    for (const [slug, exercicio] of Object.entries(exercicios)) {
      if (resolvedores[slug]) {
        const resposta = resolvedores[slug](exercicio.entrada);
        console.log(`${slug}: ${resposta}`);
      } else {
        console.log(`${slug}: ainda requer requisições extras`);
      }
    }
  })
  .catch((erro) => console.error(erro.message));