function startGame() {
    const turnTime = document.getElementById("turnTime").value;
    const skipLimit = document.getElementById("skipLimit").value;
    const turnsNumber = document.getElementById("turnsNumber").value;
    const noLimits = document.getElementById("noLimits").checked;

    // Salva configurazioni in localStorage per accesso nella schermata di gioco
    localStorage.setItem("turnTime", turnTime);
    localStorage.setItem("skipLimit", skipLimit);
    localStorage.setItem("turnsNumber", turnsNumber);
    localStorage.setItem("noLimits", noLimits);

    window.location.href = "game.html"; // Avvia il gioco
}
