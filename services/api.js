import { apiKey } from "../environment/apiKey.js";
import { limparCatalogo } from "../helpers/helper.js";
import renderizarFilme from "./render.js";
const pesquisaInput = document.querySelector('#pesquisa');

/* LISTA POPULARES*/
async function pegarFilmesPopulares() {
  const url = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
  const { results } = await url.json();
  limparCatalogo();
  return await results.forEach(filme => renderizarFilme(filme));
}

/* LISTA BUSCA*/
//debounce(funcao, timeout){}
async function buscaFilme() {
  const input = pesquisaInput.value;
  const url = await fetch(`https://api.themoviedb.org/3/search/movie?query=${input}&api_key=${apiKey}`);
  const { results } = await url.json();
  limparCatalogo();
  return await results.forEach(filme => renderizarFilme(filme));
}

export { pegarFilmesPopulares, buscaFilme }