// Criando a estrutura basica
const main = document.getElementById('main');
const timer = document.createElement('section');
timer.setAttribute ('class', 'timer');
const descricao = document.createElement('section');
descricao.setAttribute('class', 'descricao');
main.appendChild(timer);
main.appendChild(descricao);

// Declarando variaveis uteis
let agora = new Date();
let flag = false;
let ano = new Date().getFullYear();

// Acessando a API usando template literal para passar o ano atual
// A API é de acesso limitado então decidi usar minha cidade natal
fetch(`https://api.calendario.com.br/?json=true&ano=${ano}&estado=SP&cidade=MOGI_GUACU&token=am9hby5yZW9saUBnbWFpbC5jb20maGFzaD0yMzM2NTA2Mw`)
  .then((response) => {
    // Parseando a resposta
    return response.json();
    let data = JSON.parse(this.response);
  })
  .then((data) => {
    data.forEach((feriado) => {
      // Tratando a data obtida na API
      feriadoData = JSON.stringify(feriado.date);
      let pedacos = feriadoData.split('/');
      let dataPadronizada = `${pedacos[1]}/${pedacos[0]}/${pedacos[2]}`;
      let novaData = new Date(dataPadronizada);

      // Condicional para ver o próximo feriado
      if (novaData > agora && flag == false){
        const timerExibicao = document.createElement('p');
        let temporizador = setInterval(function() {
          agora = new Date().getTime();
          let tempoRestante = novaData.getTime() - agora;

          let dias = Math.floor(tempoRestante / (1000 * 60 * 60 * 24));
          let horas = Math.floor((tempoRestante%(1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          let minutos = Math.floor((tempoRestante % (1000 * 60 * 60)) / (1000 * 60));
          let segundos = Math.floor((tempoRestante % (1000 * 60)) / 1000);

          // Montando o elemento no dom
          timerExibicao.textContent = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
          timerExibicao.setAttribute('class', 'timer__exibicao');
          timer.appendChild(timerExibicao);
        },1000)

        // Sem a flag a tela o loop ia rodar para sempre
        flag = true;

        // Montando a página
        // Parte superior
        const timerTitulo = document.createElement('h1');
        timerTitulo.setAttribute('class', 'timer__titulo');
        timerTitulo.textContent = "PRÓXIMO FERIADO EM";
        timer.appendChild(timerTitulo);

        const datas = document.createElement('h2');
        datas.setAttribute('class', 'descricao__datas');
        datas.textContent = `${agora.getDate()}/${agora.getMonth() + 1}/${agora.getFullYear()} - ${feriado.date}`;
        descricao.appendChild(datas);

        // Parte inferior
        const descricaoParagrafo = document.createElement('p');
        descricaoParagrafo.setAttribute('class', 'descricao__paragrafo');
        descricaoParagrafo.textContent = `${feriado.name}

        ${feriado.description}`;
        descricao.appendChild(descricaoParagrafo)

        const creditos = document.createElement('a');
        creditos.setAttribute('class', 'descricao__link');
        creditos.setAttribute('href', 'https://github.com/Jojoreoli');
        creditos.textContent = "Jojoreoli";
        const creditosP = document.createElement('p');
        creditosP.setAttribute('class', 'descricao__creditos')
        creditosP.textContent = "Feito por ";
        creditosP.appendChild(creditos)
        descricao.appendChild(creditosP);
      }
    })
  })
  .catch((error) => {
    console.log("Erro: ",error);
  })
