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

    const successSound = document.getElementById("success-sound");
    const errorSound = document.getElementById("error-sound");

    // Evento para a opção correta
    correctOption.addEventListener("click", () => {
        updateScore(10); // Adiciona 10 pontos
        successSound.play();
        showMessage("Parabéns! Acertaste! Ganhaste 10 pontos!", true);
    });

    // Evento para a opção errada
    wrongOption.addEventListener("click", () => {
        updateScore(-10); // Remove 10 pontos
        errorSound.play();
        showMessage("Oh não! Escolheste a sobremesa menos saudável. Perdeste 10 pontos.", false);
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

        // Botão finalizar
        nextBtn.addEventListener("click", () => {
            window.location.href = "resultado.html"; // Redirecionar para a página de resultado
        });
    }
});