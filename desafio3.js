document.addEventListener("DOMContentLoaded", () => {
    const draggables = document.querySelectorAll(".draggable");
    const glass = document.getElementById("glass");
    const waterLevel = document.getElementById("water-level");
    const feedbackMessage = document.getElementById("feedback-message");
    const feedbackText = document.getElementById("feedback-text");
    const restartBtn = document.getElementById("restart-btn");
    const nextBtn = document.getElementById("next");

    let totalWater = 0; // Quantidade de água no copo
    const maxWater = 100; // Limite máximo de água no copo

    draggables.forEach(draggable => {
        draggable.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("value", draggable.dataset.value);
        });
    });

    glass.addEventListener("dragover", (e) => e.preventDefault());

    glass.addEventListener("drop", (e) => {
        e.preventDefault();
        const value = parseInt(e.dataTransfer.getData("value"), 10);

        if (totalWater + value <= maxWater) {
            totalWater += value;
            waterLevel.style.height = `${(totalWater / maxWater) * 100}%`;

            if (totalWater === maxWater) {
                showFeedback("Parabéns! Conseguiste encher o copo de forma divertida!", true);
            }
        } else {
            showFeedback("Esta garrafa tem mais água do que o suficiente para encher o copo!", false);
        }
    });

    function showFeedback(message, success) {
        feedbackText.textContent = message;
        feedbackMessage.classList.remove("d-none");
        feedbackMessage.style.backgroundColor = success ? "#52734D" : "#dc3545";

        if (success) {
            nextBtn.classList.remove("d-none");
            restartBtn.classList.add("d-none");
        } else {
            restartBtn.classList.remove("d-none");
            nextBtn.classList.add("d-none");
        }
    }

    // Reiniciar o jogo
    restartBtn.addEventListener("click", () => {
        totalWater = 0;
        waterLevel.style.height = "0%";
        feedbackMessage.classList.add("d-none");
    });

    // Avançar para a próxima missão
    nextBtn.addEventListener("click", () => {
        window.location.href = "mission.html"; // Redireciona para a próxima página
    });
});