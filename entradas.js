document.addEventListener("DOMContentLoaded", () => {
  // Inicializar pontuação no localStorage, se não estiver definida
  if (!localStorage.getItem("score")) {
    localStorage.setItem("score", "0");
  }

  const correctOptions = document.querySelectorAll(".correct-option");
  const wrongOptions = document.querySelectorAll(".wrong-option");
  const resultMessage = document.getElementById("feedback-message");
  const resultText = document.getElementById("feedback-text");
  const nextBtn = document.getElementById("game-btn");
  const backButton = document.querySelector(".back-button"); // Seleciona o botão voltar

  const successSound = document.getElementById("success-sound");
  const errorSound = document.getElementById("error-sound");

  let optionsLocked = false; // Variável para bloquear cliques adicionais após a escolha

  // Função para bloquear todas as opções
  function lockOptions() {
    optionsLocked = true;
    correctOptions.forEach((option) => (option.style.pointerEvents = "none"));
    wrongOptions.forEach((option) => (option.style.pointerEvents = "none"));
  }

  // Evento para a opção correta
  correctOptions.forEach((option) => {
    option.addEventListener("click", () => {
      if (optionsLocked) return; // Bloqueia cliques adicionais
      lockOptions();
      updateScore(10); // Adiciona 10 pontos
      successSound.play();
      showMessage("Parabéns! Acertaste! Ganhaste 10 pontos!", true);
    });
  });

  // Evento para a opção errada
  wrongOptions.forEach((option) => {
    option.addEventListener("click", () => {
      if (optionsLocked) return; // Bloqueia cliques adicionais
      lockOptions();
      updateScore(-10); // Remove 10 pontos
      errorSound.play();
      showMessage("Oh não! Escolheste a entrada menos saudável. Esforça-te mais no próximo prato. Perdeste 10 pontos!", false);
    });
  });

  // Atualizar pontuação no localStorage
  function updateScore(points) {
    let currentScore = parseInt(localStorage.getItem("score"), 10);
    currentScore += points;
    localStorage.setItem("score", currentScore.toString());
  }

  // Exibir mensagem de resultado
  function showMessage(message, isCorrect) {
    resultText.textContent = message;
    resultMessage.classList.remove("d-none");

    // Adicionar classe de estilo com base no tipo da mensagem
    if (isCorrect) {
        resultMessage.style.backgroundColor = "#52734D"; // Verde para sucesso
        nextBtn.classList.add("game-btn-success");
        nextBtn.classList.remove("game-btn-error");
    } else {
        resultMessage.style.backgroundColor = "#dc3545"; // Vermelho para erro
        nextBtn.classList.add("game-btn-error");
        nextBtn.classList.remove("game-btn-success");
    }

    resultText.style.color = "white";

    nextBtn.addEventListener("click", () => {
        window.location.href = "prato.html"; // Redirecionar para o próximo prato
    });
  }

  backButton.addEventListener("click", (e) => {
        if (optionClicked) {
            e.preventDefault();
            alert("Não podes voltar depois de escolheres uma opção.");
        }
    });
});