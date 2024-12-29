document.addEventListener("DOMContentLoaded", () => {
  const pages = document.querySelectorAll(".page");
  const homePage = document.getElementById("home-page");
  const heroesPage = document.getElementById("heroes-page");
  const heroDetailPage = document.getElementById("hero-detail");

  // Buttons
  const btnHeroes = document.getElementById("btn-heroes");
  const btnMission = document.getElementById("btn-mission");
  const backToHome = document.getElementById("back-to-home");
  const backToHeroes = document.getElementById("back-to-heroes");

  // Hero details
  const heroImage = document.getElementById("hero-image");
  const heroDescription = document.getElementById("hero-description");
  const heroTip = document.getElementById("hero-tip");

  const heroData = {
    "super-fruta": {
      img: "super-fruta.png",
      desc: "Eu sou o Super Fruta! As frutas são cheias de vitaminas e fibras que te dão energia e mantêm o corpo forte.",
      tip: "Dica: Come uma fruta diferente todos os dias!"
    },
    "capita-vegetal": {
      img: "capita-vegetal.png",
      desc: "Eu sou a Capitã Vegetal! Os vegetais são importantes para a tua saúde, fornecendo vitaminas e minerais essenciais.",
      tip: "Dica: Experimenta um vegetal novo todas as semanas!"
    },
    "doutor-grao": {
      img: "doutor-grao.png",
      desc: "Eu sou o Doutor Grão! Os grãos integrais dão-te energia duradoura e ajudam-te na digestão.",
      tip: "Dica: Escolhe grãos integrais para teres mais energia!"
    }
  };

  // Navigation
  btnHeroes.addEventListener("click", () => switchPage(heroesPage));
  backToHome.addEventListener("click", () => switchPage(homePage));
  backToHeroes.addEventListener("click", () => switchPage(heroesPage));

  document.querySelectorAll(".hero").forEach(hero => {
    hero.addEventListener("click", () => {
      const heroId = hero.id;
      const data = heroData[heroId];
      heroImage.src = data.img;
      heroDescription.textContent = data.desc;
      heroTip.textContent = data.tip;
      switchPage(heroDetailPage);
    });
  });

  function switchPage(page) {
    pages.forEach(p => p.classList.remove("active"));
    page.classList.add("active");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  let currentStage = "fruits";
  const items = document.querySelectorAll(".draggable");
  const dropzone = document.getElementById("plate-dropzone");
  const verifyBtn = document.getElementById("verify-btn");
  let itemsCount = 0;
  const maxItems = 5;
  const addedColors = new Set();

  if (document.title.includes("legumes")) {
    currentStage = "vegetables";
  }

  // Habilitar drag-and-drop para frutas
  items.forEach((item) => {
    item.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("color", item.dataset.color);
      e.dataTransfer.setData("src", item.src);
      e.dataTransfer.setData("alt", item.alt);
    });
  });

  dropzone.addEventListener("dragover", (e) => e.preventDefault());

  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();

    // Obter os dados da fruta arrastada
    const src = e.dataTransfer.getData("src");
    const alt = e.dataTransfer.getData("alt");
    const color = e.dataTransfer.getData("color");

    // Verificar se já atingiu o limite de frutas
    if (itemsCount >= maxItems) {
      showCenterMessage("Só podes adicionar no máximo 5 frutas!", "error");
      return;
    }

    // Clonar a fruta e adicionar ao dropzone
    const itemClone = document.createElement("img");
    itemClone.src = src;
    itemClone.alt = alt;
    itemClone.dataset.color = color;
    itemClone.className = "dropped-item";
    itemClone.draggable = true;

    // Adicionar evento para verificar se foi arrastada para fora
    itemClone.addEventListener("dragend", (e) => {
      const rect = dropzone.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        // Remover a fruta do prato
        dropzone.removeChild(itemClone);
        itemsCount--;
        updateColorsSet();
      }
    });

    dropzone.appendChild(itemClone);

    itemsCount++;
    addedColors.add(color);
  });

  // Função para atualizar o conjunto de cores únicas
  function updateColorsSet() {
    const currentColors = Array.from(dropzone.children).map(
      (child) => child.dataset.color
    );
    addedColors.clear();
    currentColors.forEach((color) => addedColors.add(color));
  }

  // Botão verificar
  verifyBtn.addEventListener("click", () => {
    if (itemsCount >= 3 && addedColors.size >= 3) {
      showCenterMessage("Desafio concluído com sucesso!", "success");
    } else if (itemsCount < 3) {
      showCenterMessage("Você precisa adicionar pelo menos 3 frutas ao prato!", "error");
    } else {
      showCenterMessage("Você precisa adicionar pelo menos 3 cores diferentes!", "error");
    }
  });

 // Função genérica para exibir mensagem dependendo do tipo
function showCenterMessage(message, type) {
  if (type === "error") {
    showCenterMessageError(message);
  } else if (type === "success") {
    showCenterMessageSuccess(message);
  }
}

// Função para exibir mensagem de erro no meio da página
function showCenterMessageError(message) {
  const centerMessage = document.getElementById("center-message");
  const centerMessageText = document.getElementById("center-message-text");

  centerMessageText.textContent = message;
  centerMessage.style.backgroundColor = "#dc3545"; // Vermelho para erro
  centerMessage.style.display = "block"; // Garante visibilidade

  // Remove o botão "Desafio 2" se existir
  const existingButton = centerMessage.querySelector(".next-challenge-btn");
  if (existingButton) {
    existingButton.remove();
  }

  // Reiniciar e Corrigir eventos
  document.getElementById("restart-btn").addEventListener("click", () => {
    resetGame();
    centerMessage.style.display = "none"; // Ocultar a mensagem
  });

  document.getElementById("correct-btn").addEventListener("click", () => {
    centerMessage.style.display = "none"; // Apenas fecha a mensagem
  });
}

// Função para exibir mensagem de sucesso no meio da página
function showCenterMessageSuccess(message) {
  const centerMessage = document.getElementById("center-message");
  const centerMessageText = document.getElementById("center-message-text");

  centerMessageText.textContent = message;
  centerMessage.style.backgroundColor = "#52734D"; // Verde para sucesso
  centerMessage.style.display = "block"; // Garante visibilidade

  const nextChallengeButton = document.getElementById("next-btn");
  nextChallengeButton.textContent = currentStage === "fruits" ? "Avançar" : "Desafio 2";

  nextChallengeButton.className = "btn next-challenge-btn";
  nextChallengeButton.style.backgroundColor = "white";
  nextChallengeButton.style.color = "#52734D";
  nextChallengeButton.style.border = "1px solid #52734D";
  nextChallengeButton.style.marginTop = "15px";
  nextChallengeButton.style.padding = "10px 20px";
  nextChallengeButton.style.borderRadius = "25px";
  nextChallengeButton.style.cursor = "pointer";

  // Adicionar hover ao botão
  nextChallengeButton.addEventListener("mouseover", () => {
    nextChallengeButton.style.backgroundColor = "#52734D"; // Cor do hover
    nextChallengeButton.style.color = "white"; // Texto branco no hover
    nextChallengeButton.style.border = "2px solid white"; // Borda original
  });

  nextChallengeButton.addEventListener("mouseout", () => {
    nextChallengeButton.style.backgroundColor = "white"; // Cor original
    nextChallengeButton.style.color = "#52734D"; // Texto com cor original
  });

  // Evento para redirecionar ao próximo desafio
  nextChallengeButton.addEventListener("click", () => {
    window.location.href = "desafio1-legumes.html";
  });

  // Remove o botão "Desafio 2" existente antes de criar um novo
  const existingButton = centerMessage.querySelector(".next-challenge-btn");
  if (existingButton) {
    existingButton.remove();
  }

  // Adiciona o botão "Desafio 2" na mensagem
  centerMessage.appendChild(nextChallengeButton);

  // Reiniciar e Corrigir eventos
  document.getElementById("restart-btn").addEventListener("click", () => {
    resetGame();
    centerMessage.style.display = "none"; // Ocultar a mensagem
  });

  document.getElementById("correct-btn").addEventListener("click", () => {
    centerMessage.style.display = "none"; // Apenas fecha a mensagem
  });
}

  function resetGame() {
    const dropzone = document.getElementById("plate-dropzone");
    dropzone.innerHTML = ""; // Remove todas as frutas do prato
    itemsCount = 0; // Reseta o contador de frutas
    addedColors.clear(); // Limpa as cores adicionadas
  }
});