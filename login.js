document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Impedisce il comportamento predefinito del form

    // Ottieni i valori dei campi
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Dati di esempio per il login
    const correctUsername = "admin";
    const correctPassword = "1234";

    // Verifica se le credenziali sono corrette
    if (username === correctUsername && password === correctPassword) {
        window.location.href = "config.html"; // Redirigi a una pagina di benvenuto o home
    } else {
        document.getElementById("error-message").style.display = "block"; // Mostra un messaggio di errore
    }
});
