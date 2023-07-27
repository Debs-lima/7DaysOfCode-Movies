const checkbox = document.querySelector('#favoritos-apenas');
const header = document.querySelector('.filtros');


import { limparCatalogo, ehFavorito } from "../helpers/helper.js";
import { pegarFilmesPopulares } from "./api.js";
import renderizarFilme from "./render.js";

/* LISTA DE FAVORITOS */
function pegarFilmesFavoritos() {
  return JSON.parse(localStorage.getItem('filmesFavoritos'));
}

function salvarNoLocalStorage(filme) {
  const filmes = pegarFilmesFavoritos() || [];
  filmes.push(filme);
  const filmesJSON = JSON.stringify(filmes);
  localStorage.setItem('filmesFavoritos', filmesJSON);
}

function removerDoLocalStorage(id) {
  const listaFilmes = pegarFilmesFavoritos() || [];
  const filmeAhRemover = listaFilmes.find(filme => filme.id == id);
  const novaListaFilmes = listaFilmes.filter(filme => filme.id != filmeAhRemover.id);
  localStorage.setItem('filmesFavoritos', JSON.stringify(novaListaFilmes));
}

/* FAVORITAR */
function alteraFavorito(evento, filme) {
  if (ehFavorito(filme.id)) {
    return desfavoritar(evento, filme);
  }
  return favoritar(evento, filme);
}

function desfavoritar(evento, filme) {
  evento.target.src = '../assets/icons/Heart.svg';
  removerDoLocalStorage(filme.id);
}

function favoritar(evento, filme) {
  evento.target.src = '../assets/icons/heart-fill.svg';
  salvarNoLocalStorage(filme);
}

/* MOSTRAR APENAS OS FAVORITOS */
function criaAlerta() {
  const alertaContainer = document.createElement('div');
  alertaContainer.classList.add('alerta-container');
  header.appendChild(alertaContainer);
  const alerta = document.createElement('p');
  alerta.classList.add('alerta');
  alerta.textContent = "You don't have any favorite movie yet!";
  alertaContainer.appendChild(alerta);
  const botaoAlerta = document.createElement('button');
  botaoAlerta.classList.add('botao-alerta');
  botaoAlerta.textContent = 'OK';
  alertaContainer.appendChild(botaoAlerta);
}

function cienteAlerta() {
  const containerAlerta = document.querySelector('.alerta-container');
  containerAlerta.remove();
  pegarFilmesPopulares();
  checkbox.checked = false;
}


function meusFavoritos() {
  if (checkbox.checked) {
    const listaFilmes = pegarFilmesFavoritos();
    if (listaFilmes.length == 0) {
      criaAlerta();
      const alertaBotao = document.querySelector('.botao-alerta');
      alertaBotao.addEventListener('click', cienteAlerta);
    }
    limparCatalogo();
    listaFilmes.forEach(filme => renderizarFilme(filme));
    console.log(listaFilmes);
  } else {
    limparCatalogo();
    pegarFilmesPopulares();
  }
}

export { pegarFilmesFavoritos, alteraFavorito, meusFavoritos }