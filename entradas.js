document.addEventListener("DOMContentLoaded", () => {
  // Inicializar pontuação no localStorage, se não estiver definida
  if (!localStorage.getItem("score")) {
    localStorage.setItem("score", "0");
  }

  const correctOption = document.getElementById("correct-option");
  const wrongOption = document.getElementById("wrong-option");
  const resultMessage = document.getElementById("feedback-message");
  const resultText = document.getElementById("feedback-text");
  const nextBtn = document.getElementById("game-btn");
  const backButton = document.querySelector(".back-button"); // Seleciona o botão voltar

  let optionsLocked = false; // Variável para bloquear cliques adicionais após a escolha
  let backDisabled = false; // Variável para bloquear o botão voltar após a escolha

  // Evento para a opção correta
  correctOption.addEventListener("click", () => {
    if (optionsLocked) return; // Bloqueia cliques adicionais
    optionsLocked = true;
    backDisabled = true; // Desativa o botão voltar
    updateScore(10); // Adiciona 10 pontos
    showMessage("Parabéns! Acertaste! Ganhaste 10 pontos!", true);
  });

  // Evento para a opção errada
  wrongOption.addEventListener("click", () => {
    if (optionsLocked) return; // Bloqueia cliques adicionais
    optionsLocked = true;
    backDisabled = true; // Desativa o botão voltar
    updateScore(-10); // Remove 10 pontos
    showMessage("Oh não! Escolheste a entrada menos saudável. Esforça-te mais no próximo prato. Perdeste 10 pontos!", false);
  });

  // Bloquear o botão voltar se necessário
  backButton.addEventListener("click", (e) => {
    if (backDisabled) {
      e.preventDefault(); // Impede a navegação ao clicar no botão voltar
      alert("Não podes voltar após escolher uma opção!"); // Mensagem opcional
    }
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
});