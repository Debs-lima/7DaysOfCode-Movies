import { pegarFilmesPopulares, buscaFilme } from "./services/api.js";
import { meusFavoritos } from "./services/favoritos.js";
const pesquisaInput = document.querySelector('#pesquisa');
const lupa = document.querySelector('.searchIcon');
const checkbox = document.querySelector('#favoritos-apenas');

window.onload = async function () {
  pegarFilmesPopulares();
};

lupa.addEventListener('click', async () => {
  pesquisaInput.value != '' ? buscaFilme() : pegarFilmesPopulares();
});

pesquisaInput.addEventListener('keydown', async (key) => {
  if (key.keyCode === 13) {
    pesquisaInput.value != '' ? buscaFilme() : pegarFilmesPopulares();
  }
});

checkbox.addEventListener('change', meusFavoritos);
