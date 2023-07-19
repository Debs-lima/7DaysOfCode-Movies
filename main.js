import { apiKey } from "./environment/apiKey.js";
const catalogo = document.querySelector('.catalogo-filmes');
const pesquisaInput = document.querySelector('#pesquisa');
const lupa = document.querySelector('.searchIcon');
const checkbox = document.querySelector('#favoritos-apenas');

function limparCatalogo() {
  catalogo.innerHTML = '';
};

/* LISTA POPULARES*/
async function pegarFilmesPopulares() {
  const url = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`);
  const { results } = await url.json();
  limparCatalogo();
  return await results.forEach(filme => renderizarFilme(filme));
};

window.onload = async function () {
  pegarFilmesPopulares();
};

/* LISTA BUSCA*/

async function buscaFilme() {
  const input = pesquisaInput.value;
  const url = await fetch(`https://api.themoviedb.org/3/search/movie?query=${input}&api_key=${apiKey}`);
  const { results } = await url.json();
  limparCatalogo();
  return await results.forEach(filme => renderizarFilme(filme));
};

lupa.addEventListener('click', async () => {
  pesquisaInput.value != '' ? buscaFilme() : pegarFilmesPopulares();
});

pesquisaInput.addEventListener('keydown', async (key) => {
  if (key.keyCode === 13) {
    pesquisaInput.value != '' ? buscaFilme() : pegarFilmesPopulares();
  }
});

/* FAVORITAR */
function alteraFavorito(evento, filme) {
  if(ehFavorito(filme.id)) {
    desfavoritar(evento, filme);
  } else {
    favoritar(evento, filme);
  }
};

function desfavoritar(evento, filme) {
    evento.target.src = './icons/Heart.svg';
    removerDoLocalStorage(filme.id);
};

function favoritar(evento, filme) {
  evento.target.src = './icons/heart-fill.svg';
  salvarNoLocalStorage(filme);
};

/* LISTA DE FAVORITOS */
function pegarFilmesFavoritos() {
  return JSON.parse(localStorage.getItem('filmesFavoritos'));
};

function salvarNoLocalStorage(filme) {
  const filmes = pegarFilmesFavoritos() || [];
  filmes.push(filme);
  const filmesJSON = JSON.stringify(filmes);
  localStorage.setItem('filmesFavoritos', filmesJSON);
};

function ehFavorito(id) {
  const listaFilmes = pegarFilmesFavoritos() || [];
  return listaFilmes.find(filme => filme.id == id);
};

function removerDoLocalStorage(id) {
  const listaFilmes = pegarFilmesFavoritos() || [];
  const filmeAhRemover = listaFilmes.find(filme => filme.id == id);
  const novaListaFilmes = listaFilmes.filter(filme => filme.id != filmeAhRemover.id);
  localStorage.setItem('filmesFavoritos', JSON.stringify(novaListaFilmes));
};

/* MOSTRAR APENAS OS FAVORITOS */
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

checkbox.addEventListener('change', meusFavoritos);

/*RENDERIZAR LISTA DE FILMES*/
function renderizarFilme(filme) {
  const {
    id, poster_path, title, vote_average, release_date, overview
  } = filme;
  const favoritado = ehFavorito(id);
  const ano = release_date.substring(0, 4);

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
  favoritar.textContent = 'Favorite';
  favoritos.appendChild(favoritar);
  iconeCoracao.addEventListener('click', evento => alteraFavorito(evento, filme));

  const filmeDescricao = document.createElement('div');
  filmeDescricao.classList.add('descricao-filme');
  filmeDoCatalogo.appendChild(filmeDescricao);
  const descricaoDoFilme = document.createElement('p');
  descricaoDoFilme.textContent = overview;
  filmeDescricao.appendChild(descricaoDoFilme);
};
