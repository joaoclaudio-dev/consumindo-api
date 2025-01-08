const containerVideos = document.querySelector(".videos__container");
const botaoCategoria = document.querySelectorAll(".superior__item");

async function buscarEMostrarVideos() {
  try {
    const busca = await fetch("http://localhost:3000/videos");
    const videos = await busca.json();

    videos.forEach((video) => {
      containerVideos.innerHTML += `
                <li class="videos__item">
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem}" alt="${video.titulo}">
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                        <p class="categoria" hidden>${video.categoria}</p>
                    </div>
                </li>
            `;
    });
  } catch (error) {
    containerVideos.innerHTML = `<p>Não foi possível buscar os vídeos: ${error}</p>`;
  }
}

buscarEMostrarVideos();

// Filtrar pesquisa
const barraDePesquisa = document.querySelector(".pesquisar__input");

barraDePesquisa.addEventListener("input", filtrarPesquisa);

function filtrarPesquisa() {
  const videos = document.querySelectorAll(".videos__item");

  if (barraDePesquisa.value != "") {
    for (let video of videos) {
      let titulo = video
        .querySelector(".titulo-video")
        .textContent.toLowerCase();
      let valorFiltro = barraDePesquisa.value.toLowerCase();

      if (!titulo.includes(valorFiltro)) {
        video.style.display = "none";
      } else {
        video.style.display = "block";
      }
    }
  } else {
    for (let video of videos) {
      video.style.display = "block";
    }
  }
}

botaoCategoria.forEach((botao) => {
  let nomeCategoria = botao.getAttribute("name");
  botao.addEventListener("click", (e) => {
    e.preventDefault();
    // Remove a classe active de todos os botões
    botaoCategoria.forEach((b) => b.classList.remove("active"));
    // Adiciona a classe active ao botão clicado
    botao.classList.add("active");
    filtrarPorCategoria(nomeCategoria);
  });
});

function filtrarPorCategoria(filtro) {
  const videos = document.querySelectorAll(".videos__item");
  for (let video of videos) {
    let categoria = video.querySelector(".categoria").textContent.toLowerCase();
    let valorFiltro = filtro.toLowerCase();

    if (!categoria.includes(valorFiltro) && valorFiltro != "tudo") {
      video.style.display = "none";
    } else {
      video.style.display = "block";
    }
  }
}

//botao Slider
const wrapper = document.querySelector('.superior__secao__container-wrapper');
const slider = document.querySelector('.superior__slider');

let scrollPosition = 0;
const scrollAmount = 200; // Quantidade de pixels para rolar

// Função para verificar se há mais conteúdo para rolar
function checkScroll() {
    const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
    
    if (scrollPosition >= maxScroll) {
        slider.classList.add('disabled');
    } else {
        slider.classList.remove('disabled');
    }
}

// Adiciona o evento de clique no botão
slider.addEventListener('click', () => {
    const maxScroll = wrapper.scrollWidth - wrapper.clientWidth;
    
    // Incrementa a posição do scroll
    scrollPosition = Math.min(scrollPosition + scrollAmount, maxScroll);
    
    // Se chegou ao final, volta ao início
    if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
    }
    
    // Aplica a rolagem suave
    wrapper.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
    });
    
    // Verifica o estado do botão
    checkScroll();
});

// Verifica o estado inicial do botão
checkScroll();

// Atualiza o estado do botão quando o usuário rolar manualmente
wrapper.addEventListener('scroll', () => {
    scrollPosition = wrapper.scrollLeft;
    checkScroll();
});