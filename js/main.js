import { apiKey } from "../environment/apiKey.js";
const catalogo = document.querySelector('.catalogo-filmes');

async function pegarFilmesPopulares() {
    const url = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
    const { results } = await url.json();
    return results;
}

console.log(pegarFilmesPopulares())

window.onload = async function() {
  const filmes = await pegarFilmesPopulares()
  filmes.forEach(filme => renderizarFilme(filme))
}

function renderizarFilme(filme) {
  const {
    poster_path, title, vote_average, release_date, overview, 
  } = filme;
  const favoritado = false;
  const ano = release_date.substring(0,4);

  const filmeDoCatalogo = document.createElement('li');
  filmeDoCatalogo.classList.add('filme');
  catalogo.appendChild(filmeDoCatalogo);

  const filmeStatus = document.createElement('div');
  filmeStatus.classList.add('titulo-status');
  filmeDoCatalogo.appendChild(filmeStatus);

  const imagemCartaz = document.createElement('img');
  imagemCartaz.src = `https://image.tmdb.org/t/p/w500/${poster_path}`;
  imagemCartaz.alt = `Cartaz do filme ${title}`;
  imagemCartaz.classList.add('cartaz-filme');
  filmeStatus.appendChild(imagemCartaz);

  const status = document.createElement('div');
  status.classList.add('status');
  filmeStatus.appendChild(status);

  const tituloDoFilme = document.createElement('h2');
  tituloDoFilme.classList.add('titulo-filme');
  tituloDoFilme.textContent = `${title} (${ano})`;
  status.appendChild(tituloDoFilme);

  const listaStatus = document.createElement('ul');
  listaStatus.classList.add('status-lista');
  status.appendChild(listaStatus);

  const avaliacaoFilme = document.createElement('li');
  avaliacaoFilme.classList.add('avaliacao');
  listaStatus.appendChild(avaliacaoFilme);
  const iconeEstrela = document.createElement('img');
  iconeEstrela.src = './icons/star-2768.svg';
  iconeEstrela.alt = 'Ícone de estrela';
  avaliacaoFilme.appendChild(iconeEstrela);
  const mediaAvaliacao = document.createElement('span');
  mediaAvaliacao.textContent = vote_average;
  avaliacaoFilme.appendChild(mediaAvaliacao);

  const favoritos = document.createElement('li');
  favoritos.classList.add('favoritar');
  listaStatus.appendChild(favoritos);
  const iconeCoracao = document.createElement('img');
  iconeCoracao.src = favoritado ? './icons/heart-fill.svg' : './icons/Heart.svg';
  iconeCoracao.alt = favoritado ? 'Ícone de coração preenchido' : 'Ícone de coração vazio';
  favoritos.appendChild(iconeCoracao);
  const favoritar = document.createElement('span');
  favoritar.textContent = favoritado ? 'Favorito' : 'Favoritar';
  favoritos.appendChild(favoritar);

  const filmeDescricao = document.createElement('div');
  filmeDescricao.classList.add('descricao-filme');
  filmeDoCatalogo.appendChild(filmeDescricao);
  const descricaoDoFilme = document.createElement('p');
  descricaoDoFilme.textContent = overview;
  filmeDescricao.appendChild(descricaoDoFilme);
}

