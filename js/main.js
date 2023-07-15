const catalogo = document.querySelector('.catalogo-filmes');

const filmes = [
  {
    cartaz: './images/duelo-de-titas.jpg',
    titulo: 'Duelo de Titãs',
    nota: 9.5,
    ano: 2000,
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique nulla aliquet enim tortor at auctor urna nunc. Vitae semper quis lectus nulla at volutpat.',
    favoritado: true,
  },
  {
    cartaz: './images/viva-a-vida-e-uma-festa.jpg',
    titulo: 'Viva - A Vida é uma Festa',
    nota: 9.4,
    ano: 2017,
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique nulla aliquet enim tortor at auctor urna nunc. Vitae semper quis lectus nulla at volutpat.',
    favoritado: true,
  },
  {
    cartaz: './images/o-pior-vizinho-do-mundo.jpg',
    titulo: 'O Pior Vizinho do Mundo',
    nota: 9.5,
    ano: 2022,
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique nulla aliquet enim tortor at auctor urna nunc. Vitae semper quis lectus nulla at volutpat.',
    favoritado: true,
  },
  {
    cartaz: './images/dungeons-dragons-honra-entre-rebeldes.jpg',
    titulo: 'Dungeons & Dragons: Honra Entre Rebeldes',
    nota: 9.0,
    ano: 2023,
    descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tristique nulla aliquet enim tortor at auctor urna nunc. Vitae semper quis lectus nulla at volutpat.',
    favoritado: false,
  },
];

function renderizarFilme(filme) {
  const {
    cartaz, titulo, nota, ano, descricao, favoritado,
  } = filme;

  const filmeDoCatalogo = document.createElement('li');
  filmeDoCatalogo.classList.add('filme');
  catalogo.appendChild(filmeDoCatalogo);

  const filmeStatus = document.createElement('div');
  filmeStatus.classList.add('titulo-status');
  filmeDoCatalogo.appendChild(filmeStatus);

  const imagemCartaz = document.createElement('img');
  imagemCartaz.src = cartaz;
  imagemCartaz.alt = `Cartaz do filme ${titulo}`;
  imagemCartaz.classList.add('cartaz-filme');
  filmeStatus.appendChild(imagemCartaz);

  const status = document.createElement('div');
  status.classList.add('status');
  filmeStatus.appendChild(status);

  const tituloDoFilme = document.createElement('h2');
  tituloDoFilme.classList.add('titulo-filme');
  tituloDoFilme.textContent = `${titulo} (${ano})`;
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
  mediaAvaliacao.textContent = nota;
  avaliacaoFilme.appendChild(mediaAvaliacao);

  const favoritos = document.createElement('li');
  favoritos.classList.add('favoritar');
  listaStatus.appendChild(favoritos);
  const iconeCoracao = document.createElement('img');
  iconeCoracao.src = favoritado ? './icons/heart-fill.svg' : './icons/Heart.svg';
  iconeCoracao.alt = favoritado ? 'Ícone de coração preenchido' : 'Ícone de coração vazio';
  favoritos.appendChild(iconeCoracao);
  const favoritar = document.createElement('span');
  favoritar.textContent = favoritado ? 'Desfavoritar' : 'Favoritar';
  favoritos.appendChild(favoritar);

  const filmeDescricao = document.createElement('div');
  filmeDescricao.classList.add('descricao-filme');
  filmeDoCatalogo.appendChild(filmeDescricao);
  const descricaoDoFilme = document.createElement('p');
  descricaoDoFilme.textContent = descricao;
  filmeDescricao.appendChild(descricaoDoFilme);
}

window.onload = () => {
  filmes.forEach((filme) => renderizarFilme(filme));
};
