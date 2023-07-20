import { pegarFilmesFavoritos } from "../services/favoritos.js";
const catalogo = document.querySelector('.catalogo-filmes');

function limparCatalogo() {
  catalogo.innerHTML = '';
}

function ehFavorito(id) {
  const listaFilmes = pegarFilmesFavoritos() || [];
  return listaFilmes.find(filme => filme.id == id);
}

export { limparCatalogo, ehFavorito }