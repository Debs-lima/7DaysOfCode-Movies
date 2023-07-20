const checkbox = document.querySelector('#favoritos-apenas');
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
  if(ehFavorito(filme.id)) {
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
//melhorar caixinha de alerta
function meusFavoritos() {
  if(checkbox.checked) {
    const listaFilmes = pegarFilmesFavoritos();
    if(listaFilmes.length == 0) {
      alert("You don't have any favorite movie yet!");
      pegarFilmesPopulares();
      checkbox.checked = false;
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