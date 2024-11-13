let scoreRed = 0;
let scoreBlue = 0;
let skips = localStorage.getItem("skipLimit");
let timer = localStorage.getItem("turnTime");
let turnsNumber = parseInt(localStorage.getItem("turnsNumber")) || Infinity;
let currentTurn = 1;
let currentTeam = "red"; // Il team iniziale è rosso
let countdownInterval;
let wordsList = [];
let currentIndex = 0;
let currentWordIndex = 0;

document.addEventListener("DOMContentLoaded", function() {
    // Questo assicura che lo sfondo venga aggiornato anche all'inizio
    updateBackground();
    shuffleWords();
    loadWords();
});

const wordsData = [
  { mainWord: "COMPUTER", forbiddenWords: ["TECNOLOGIA", "SCHERMO", "INTERNET", "SOFTWARE", "HARDWARE"] },
  { mainWord: "IGLOO", forbiddenWords: ["ALASKA", "ESCHIMESE", "GHIACCIO", "CASA", "FREDDO"] },
  { mainWord: "FRACASSO", forbiddenWords: ["RUMORE", "TRAFFICO", "FRASTUONO", "COLLISIONE", "BARUFFA"] },
  { mainWord: "ARBITRO", forbiddenWords: ["GARA", "SPORT", "TENNIS", "CALCIO", "PARTITA"] },
  { mainWord: "SALMONE", forbiddenWords: ["PESCE", "FIUME", "CAVIALE", "CIBO", "CORRENTE"] },
  { mainWord: "DALMATA", forbiddenWords: ["CANE", "CARTONE ANIMATO", "CARICA DEI 101", "QUADRUPEDE", "RAZZA"] },
  { mainWord: "COMPACT DISC", forbiddenWords: ["STEREO", "MUSICA", "REGISTRATORE", "LONG PLAYING", "45 GIRI"] },
  { mainWord: "GELO", forbiddenWords: ["GHIACCIO", "FREDDO", "BRINA", "NEVE", "INVERNO"] },
  { mainWord: "DETERSIVO", forbiddenWords: ["POLVERE", "LIQUIDO", "LAVARE", "PULIRE", "STOVIGLIE"] },
  { mainWord: "BROCCA", forbiddenWords: ["THE", "CAFFE", "RECIPIENTE", "BOTTIGLIA", "ACQUA"] },
  { mainWord: "BARCOLLARE", forbiddenWords: ["OSCILLARE", "UBRIACO", "ZIG-ZAGARE", "VACILLARE", "INSTABILE"] },
  { mainWord: "PORTAFOGLIO", forbiddenWords: ["CARTE DI CREDITO", "BORSELLINO", "MONETE", "SOLDI", "BANCONOTE"] },
  { mainWord: "PING PONG", forbiddenWords: ["RACCHETTA", "PALLINA", "TENNIS", "TAVOLO", "GIOCO"] },
  { mainWord: "BASTONCINI", forbiddenWords: ["CINESE", "MANGIARE", "FORCHETTA", "RISO ALLA CANTONESE", "PESCE"] },
  { mainWord: "OCCHIALI DA SOLE", forbiddenWords: ["RAYBAN", "OMBRA", "LENTI", "OCCHIO", "SCURO"] },
  { mainWord: "PISOLINO", forbiddenWords: ["SIESTA", "ASSOPIRSI", "DORMIRE", "STANCHEZZA", "PENNICHELLA"] },
  { mainWord: "RITMO", forbiddenWords: ["AIUTO", "MUSICA", "BALLO", "BIO", "VELOCE"] },
  { mainWord: "CHIAVE", forbiddenWords: ["PORTA", "APRIRE", "SERRATURA", "CASA", "AUTOMOBILE"] },
  { mainWord: "MINESTRA", forbiddenWords: ["FINESTRA", "BRODO", "ZUPPA", "MANGIARE", "CIBO"] },
  { mainWord: "FOTOGRAFIA", forbiddenWords: ["IMMAGINE", "CAMERA OSCURA", "FILM", "ALBUM", "FLASH"] },
  { mainWord: "BANDIERA", forbiddenWords: ["SVENTOLARE", "A SCACCHI", "TRICOLORE", "STELLA E STRISCE", "ROSSA"] },
  { mainWord: "SOMMERGIBILE", forbiddenWords: ["NAVE", "IMMERSIONE", "GUERRA", "SOTTOMARINO", "CAPITANO NEMO"] },
  { mainWord: "CAMICIA DI FORZA", forbiddenWords: ["HOUDINI", "INDUMENTO", "PSICOPATICO", "INSANO", "BRACCIA"] },
  { mainWord: "GIGLIO", forbiddenWords: ["FIORE", "BIANCO", "FIRENZE", "PUREZZA", "ISOLA"] },
  { mainWord: "GALLEGGIARE", forbiddenWords: ["MARE", "ACQUA", "BARCA", "NUOTARE", "SALVAGENTE"] },
  { mainWord: "CALCOLATRICE", forbiddenWords: ["COMPUTER", "NUMERI", "PORTATILE", "TOTALE", "AUTOMATICA"] },
  { mainWord: "TERMOSIFONE", forbiddenWords: ["CALORE", "CALDO", "CASA", "STUFA", "INVERNO"] },
  { mainWord: "ZAMPA", forbiddenWords: ["PIEDE", "ANIMALE", "GAMBA", "ORMA", "IMPRONTA"] },
  { mainWord: "COCCODRILLO", forbiddenWords: ["PELLE", "SCARPA", "BORSA", "DENTI", "ALLIGATORE"] },
  { mainWord: "AMMAZZARE", forbiddenWords: ["ASSASSINARE", "UCCIDERE", "ELIMINARE", "FATICA", "DELINQUENTE"] },
  { mainWord: "PATATINE", forbiddenWords: ["FRITTE", "HAMBURGER", "KETCHUP", "SALE", "CHIPS"] },
  { mainWord: "STIVALE", forbiddenWords: ["SCARPE", "CALZATURA", "ITALIA", "GATTO", "SETTE LEGHE"] },
  { mainWord: "CALARE", forbiddenWords: ["ALZARE", "ABBASSARE", "SERA", "DIMINUIRE", "PESO"] },
  { mainWord: "CAMBUSA", forbiddenWords: ["DEPOSITO", "NAVI", "VIVERI", "MANGIARE", "CIBO"] },
  { mainWord: "PREGIO", forbiddenWords: ["VIRTU", "DONO", "DIFETTO", "DOTE", "QUALITA"] },
  { mainWord: "GENTILE", forbiddenWords: ["AFFABILE", "CORTESE", "AMABILE", "PREMUROSO", "GARBATO"] },
  { mainWord: "DIAVOLO", forbiddenWords: ["SATANA", "LUCIFERO", "DEMONIO", "INFERNO", "ANGELO"] },
  { mainWord: "MERCENARIO", forbiddenWords: ["SOLDATO", "STIPENDIATO", "PREZZOLATO", "NENALE", "BATTAGLIA"] },
  { mainWord: "PORNOGRAFIA", forbiddenWords: ["NUDO", "FOTO", "RIVISTA", "FILM", "EROTISMO"] },
  { mainWord: "PERSONA", forbiddenWords: ["UOMO", "DONNA", "INDIVIDUO", "GENTE", "ESSERE"] },
  { mainWord: "GALLINA", forbiddenWords: ["POLLAIO", "COCCODE", "UOVA", "VOLPE", "UCCELLO"] },
  { mainWord: "CORAZZA", forbiddenWords: ["CAVALIERE", "METALLO", "PROTEZIONE", "ELMO", "INDOSSARE"] },
  { mainWord: "DETTO", forbiddenWords: ["ALIAS", "SOPRANNOME", "MOTTO", "DISCORSO", "PROVERBIO"] },
  { mainWord: "GIOSTRA", forbiddenWords: ["LUNA PARK", "CAVALLO", "GIROTONDO", "CAROSELLO", "DIVERTIMENTO"] },
  { mainWord: "VELOCE", forbiddenWords: ["RAPIDO", "CORRERE", "TEMPO", "LENTO", "IMMEDIATO"] },
  { mainWord: "PRURITO", forbiddenWords: ["PELLE", "GRATTARE", "MORSO", "VARICELLA", "BOLLA"] },
  { mainWord: "CALENDARIO", forbiddenWords: ["GIORNO", "MESE", "ANNO", "NUMERI", "APPUNTAMENTO"] },
  { mainWord: "GERME", forbiddenWords: ["INFLUENZA", "CONTAGIO", "BATTERI", "RAFFREDDORE", "VIRUS"] },
  { mainWord: "CONFUCIO", forbiddenWords: ["SAGGIO", "DETTI", "CINESE", "FILOSOFO", "PROVERBIO"] },
  { mainWord: "PALAZZO", forbiddenWords: ["CASA", "DIMORA", "ALLOGGIO", "VIVERE", "EDIFICIO"] },
  { mainWord: "TESSUTO", forbiddenWords: ["RETE", "STOFFA", "VESTITI", "MAGLIA", "MACCHINA DA CUCIRE"] },
  { mainWord: "MARTELLO", forbiddenWords: ["APPENDERE", "BATTERE", "CHIODO", "MURO", "COLPIRE"] },
  { mainWord: "ORFANO", forbiddenWords: ["GENITORI", "ADOTTARE", "MADRE", "PADRE", "SENZA FAMIGLIA"] },
  { mainWord: "ADOLESCENTE", forbiddenWords: ["RAGAZZO", "GIOVANE", "ADULTO", "PUBERTA", "TEEN-AGER"] },
  { mainWord: "STATUA", forbiddenWords: ["MONUMENTO", "MARMO", "BRONZO", "PIAZZA", "LIBERTA"] },
  { mainWord: "CANNUCCIA", forbiddenWords: ["BERE", "SUCCHIARE", "BIBITA", "TUBO", "BICCHIERE"] },
  { mainWord: "SALVADANAIO", forbiddenWords: ["BAMBINI", "SOLDI", "RISPARMIARE", "MONETE", "MAIALINO"] },
  { mainWord: "GIACCA", forbiddenWords: ["VESTITO", "FREDDO", "ABITO", "LANA", "CRAVATTA"] },
  { mainWord: "DENTE", forbiddenWords: ["INCISIVO", "CANINO", "MOLARE", "BOCCA", "LINGUA"] },
  { mainWord: "GETTONE", forbiddenWords: ["TELEFONICO", "DISTRIBUTORE", "MONETA", "FICHE", "CABINA"] },
  { mainWord: "TRUCCARE", forbiddenWords: ["MODIFICARE", "MAKE UP", "FALSIFICARE", "INGANNARE", "VISO"] },
  { mainWord: "SARTO", forbiddenWords: ["AGO", "FILO", "ABITO", "GIACCA", "ATELIER"] },
  { mainWord: "DIAMANTE", forbiddenWords: ["ANELLO", "CARATI", "GIOIELLO", "FIDANZAMENTO", "BRILLANTI"] },
  { mainWord: "HOSTESS", forbiddenWords: ["VOLO", "ASSISTENTE", "DONNA", "ACCOMPAGNATRICE", "CONGRESSO"] },
  { mainWord: "PEDINA", forbiddenWords: ["SCACCHI", "DAMA", "GIOCO", "SEGUIRE", "DETECTIVE"] },
  { mainWord: "OROLOGIO", forbiddenWords: ["ORA", "NUMERI", "SVEGLIA", "QUADRANTE", "POLSO"] },
  { mainWord: "GIOIELLI", forbiddenWords: ["ORO", "PREZIOSI", "DIAMANTI", "COLLANA", "BRACCIALETTO"] },
  { mainWord: "PINGUINO", forbiddenWords: ["FREDDO", "SMOKING", "UCCELLO", "PALMIPEDE", "GHIACCIO"] },
  { mainWord: "ARCOBALENO", forbiddenWords: ["COLORI", "IRIDE", "PIOGGIA", "SOLE", "CIELO"] },
  { mainWord: "ARTISTA", forbiddenWords: ["PITTORE", "SCULTORE", "MUSICISTA", "POETA", "SCRITTORE"] },
  { mainWord: "TERMOMETRO", forbiddenWords: ["INFLUENZA", "FEBBRE", "BOCCA", "TEMPERATURA", "ASCELLE"] },
  { mainWord: "SMOKING", forbiddenWords: ["PAPILLON", "FORMALE", "ELEGANTE", "FRAC", "CERIMONIA"] },
  { mainWord: "BRODO", forbiddenWords: ["VERDURA", "PASTINA", "VEGETALI", "CARNE", "POLLO"] },
  { mainWord: "TIRCHIO", forbiddenWords: ["AVARO", "TACCAGNO", "SPILORCIO", "SCOZZESE", "TIRATO"] },
  { mainWord: "KAMIKAZE", forbiddenWords: ["PILOTA", "AEREO", "GUERRA", "GIAPPONESE", "SUICIDA"] },
  { mainWord: "PIGIAMA", forbiddenWords: ["CAMICIA DA NOTTE", "LETTO", "DORMIRE", "GIACCA", "PANTALONI"] },
  { mainWord: "TRAVESTITO", forbiddenWords: ["OMOSESSUALE", "DUBBIO", "CAMBIARE", "CAMUFFARSI", "IRRICONOSCIBILE"] },
  { mainWord: "BOMBOLONE", forbiddenWords: ["KRAPFEN", "DOLCE", "ZUCCHERO", "CREMA", "PASTA"] },
  { mainWord: "CARRO FUNEBRE", forbiddenWords: ["CIMITERO", "MORTO", "VEICOLO", "CHIESA", "SALMA"] },
  { mainWord: "ORSO", forbiddenWords: ["POLARE", "MIELE", "GIOCHERELLONE", "ANIMALE", "POLO"] },
  { mainWord: "CANE DA SLITTA", forbiddenWords: ["HUSKY", "NEVE", "ALASKA", "GHIACCIO", "TRAINARE"] },
  { mainWord: "ZANNA", forbiddenWords: ["ELEFANTE", "DENTE", "AVORIO", "BIANCA", "MAMMUTH"] },
  { mainWord: "NASCOSTO", forbiddenWords: ["TESORO", "CELATO", "LATENTE", "CLANDESTINO", "OCCULTATO"] },
  { mainWord: "ELIZABETH TAYLOR", forbiddenWords: ["RICHARD BURTON", "ATTRICE", "DONNA", "CINEMA", "FILM"] },
  { mainWord: "PADRE", forbiddenWords: ["MADRE", "FIGLIO", "PAPA'", "BABBO", "GENITORE"] },
  { mainWord: "ESPLOSIONE", forbiddenWords: ["SALTARE", "DETONARE", "SCOPPIO", "DINAMITE", "BOMBA"] },
  { mainWord: "ARCHITETTO", forbiddenWords: ["PALAZZO", "PIANTA", "ARREDAMENTO", "DISEGNO", "LE CORBUSIER"] },
  { mainWord: "CONVENTO", forbiddenWords: ["SUORA", "MONACA", "MONASTERO", "RELIGIONE", "CLAUSURA"] },
  { mainWord: "TASSA", forbiddenWords: ["SALUTE", "MAGGIO", "PAGARE", "IVA", "IRPEF"] },
  { mainWord: "RICETTA", forbiddenWords: ["CUCINA", "INGREDIENTI", "CIBO", "DOLCE", "PIETANZA"] },
  { mainWord: "CHIAMARE", forbiddenWords: ["TELEFONO", "URLARE", "NOME", "ASCENSORE", "PARLARE"] },
  { mainWord: "FRUSTA", forbiddenWords: ["SCHIOCCARE", "CAVALLO", "DOMATORE", "SADICO", "ARMA"] },
  { mainWord: "PARACADUTE", forbiddenWords: ["AEREO", "LANCIO", "APERTO", "SPORT", "CIELO"] },
  { mainWord: "MANICURE", forbiddenWords: ["DONNA", "DITA", "UNGHIE", "MANO", "LIMETTA"] },
  { mainWord: "DINOSAURO", forbiddenWords: ["ANIMALE", "PREISTORICO", "MUSEO", "ESTINTO", "ENORME"] },
  { mainWord: "ADULTERIO", forbiddenWords: ["TRADIMENTO", "MATRIMONIO", "AMANTE", "CORNA", "MOGLIE"] },
  { mainWord: "LAMPIONE", forbiddenWords: ["LUCE", "NOTTE", "STRADA", "BUIO", "ELETTRICITA'"] },
  { mainWord: "PIOVRA", forbiddenWords: ["TENTACOLI", "MAFIA", "SEPPIA", "MOSTRO", "PESCE"] },
  { mainWord: "SINODO", forbiddenWords: ["CONCILIO", "VESCOVI", "SACERDOTI", "ADUNANZA", "CONVEGNO"] },
  { mainWord: "GHIRLANDA", forbiddenWords: ["FIORI", "CORONA", "VERDE", "DECORAZIONE", "ANELLO"] },
  { mainWord: "CASCATA", forbiddenWords: ["NIAGARA", "SCOGLIERA", "FIUME", "ACQUA", "RAPIDA"] },
  { mainWord: "CARTA CARBONE", forbiddenWords: ["COPIARE", "NERA", "ORIGINALE", "SCRIVERE", "RIPRODURRE"] },
  { mainWord: "TABACCO", forbiddenWords: ["FOGLIA", "SIGARETTA", "FUMARE", "DROGA", "PIPA"] },
  { mainWord: "CENERE", forbiddenWords: ["FUOCO", "CAMINO", "FUMO", "SIGARETTE", "FIAMMIFERI"] },
  { mainWord: "ESAME", forbiddenWords: ["UNIVERSITA'", "INTERROGAZIONE", "DOMANDA", "VOTO", "MATURITA'"] },
  { mainWord: "INCROCIO", forbiddenWords: ["STRADA", "QUATTRO", "SEMAFORO", "AUTOMOBILE", "PRECEDENZA"] },
  { mainWord: "PELLICOLA FOTOGRAFICA", forbiddenWords: ["SVILUPPO", "CAMERA OSCURA", "35 MM", "OBIETTIVO", "GRAND'ANGOLO"] },
  { mainWord: "IMITATORE", forbiddenWords: ["COPIARE", "MIMO", "SIMILE", "STESSO", "UGUALE"] },
  { mainWord: "PALLA", forbiddenWords: ["TONDA", "CALCIO", "SPORT", "ROTOLARE", "SFERA"] },
  { mainWord: "UNICORNO", forbiddenWords: ["CAVALLO", "MITICO", "LEGGENDA", "QUADRUPEDE", "FAVOLA"] },
  { mainWord: "CRAVATTA", forbiddenWords: ["GIACCA", "ELEGANTE", "FORMALE", "NODO", "PAPILLON"] },
  { mainWord: "CINTURINO", forbiddenWords: ["OROLOGIO", "PELLE", "METALLO", "POLSO", "GOMMA"] },
  { mainWord: "MATRIMONIO", forbiddenWords: ["MARITO", "MOGLIE", "SPOSI", "NOZZE", "FEDE"] },
  { mainWord: "FIRENZE", forbiddenWords: ["TOSCANA", "FIORENTINA", "ARNO", "CITTA'", "UFFIZI"] },
  { mainWord: "GETTONE", forbiddenWords: ["TELEFONICO", "DISTRIBUTORE", "MONETA", "FICHE", "CABINA"] },
  { mainWord: "PESTE", forbiddenWords: ["PROMESSI SPOSI", "VIRUS", "MALATTIA", "PIERINO", "BUBBONICA"] },
  { mainWord: "GRATIS", forbiddenWords: ["PAGARE", "INGRESSO", "RETRIBUITO", "REGALATO", "APPROFITTARE"] },
  { mainWord: "GOFFO", forbiddenWords: ["ROZZO", "SGRAZIATO", "SCOORDINATO", "IMBRANATO", "SEMPLICIOTTO"] },
  { mainWord: "CATALOGO", forbiddenWords: ["NEGOZIO", "ORDINE", "LISTA", "ACQUISTO", "ELENCO"] },
  { mainWord: "PERNO", forbiddenWords: ["CARDINE", "FULCRO", "EQUILIBRIO", "CENTRO", "SOSTEGNO"] },
  { mainWord: "ASTRONAUTA", forbiddenWords: ["SPAZIO", "SHUTTLE", "LUNA", "ARMSTRONG", "UOMO"] },
  { mainWord: "EREDITA'", forbiddenWords: ["MORTE", "SUCCESSIONE", "BENI", "DEFUNTO", "TRASMISSIONE"] },
  { mainWord: "SCIOPERO", forbiddenWords: ["SINDACATI", "GENERALE", "LAVORO", "COBAS", "PROTESTA"] },
  { mainWord: "OPPIO", forbiddenWords: ["FUMARE", "PAPAVERO", "DROGA", "STUPEFACENTE", "ALLUCINOGENO"] },
  { mainWord: "TRUCIDARE", forbiddenWords: ["UCCIDERE", "MASSACRARE", "CARNEFICINA", "CRUDELTA'", "TORTURA"] },
  { mainWord: "PEDAGGIO", forbiddenWords: ["PAGARE", "DOGANA", "CASELLO", "DENARO", "DAZIO"] },
  { mainWord: "QUARTETTO", forbiddenWords: ["ORCHESTRA", "MUSICA", "GRUPPO", "CETRA", "STRUMENTI"] },
  { mainWord: "BOTTIGLIA", forbiddenWords: ["RECIPIENTE", "VETRO", "BIRRA", "BERE", "ACQUA"] },
  { mainWord: "NOTAIO", forbiddenWords: ["LEGALE", "AUTENTICA", "CONTRATTO", "PROTOCOLLO", "ARCHIVIO"] },
  { mainWord: "ROSA", forbiddenWords: ["COLORE", "BAMBINA", "FIOCCO", "PANTERA", "ROSSO"] },
  { mainWord: "GELOSIA", forbiddenWords: ["AMARE", "SENTIMENTO", "TRADIMENTO", "POSSESSIONE", "CORNA"] },
  { mainWord: "PAUSA", forbiddenWords: ["INTERVALLO", "ATTESA", "BREAK", "SOSTA", "INTERRUZIONE"] },
  { mainWord: "MAESTRO", forbiddenWords: ["SCUOLA", "ALUNNO", "INSEGNARE", "STUDENTE", "PROFESSORE"] },
  { mainWord: "MOGLIE", forbiddenWords: ["MARITO", "DONNA", "MATRIMONIO", "AMANTE", "SPOSA"] },
  { mainWord: "CURIOSITA'", forbiddenWords: ["INTERESSE", "DOMANDA", "FEMMINA", "FICCANASO", "INTRATTENERSI"] },
  { mainWord: "ANATOMIA", forbiddenWords: ["CORPO", "SCHELETRO", "MUSCOLI", "TESCHIO", "MEDICINA"] },
  { mainWord: "SKATEBOARD", forbiddenWords: ["SURF", "TAVOLA", "RUOTE", "MARCIAPIEDE", "RAGAZZI"] },
  { mainWord: "MERIDIANA", forbiddenWords: ["SOLE", "OMBRA", "ORA", "PARALLELO", "POMERIGGIO"] },
  { mainWord: "BUDINO", forbiddenWords: ["DOLCE", "CIOCCOLATO", "LATTE", "FARINA", "DESSERT"] },
  { mainWord: "FUNIVIA", forbiddenWords: ["SCIARE", "MONTAGNA", "SKI-LIFT", "TRASPORTARE", "CABINA"] },
  { mainWord: "RAGNO", forbiddenWords: ["INSETTO", "VEDOVA NERA", "ZAMPE", "MORSO", "TESSERE"] },
  { mainWord: "PASQUA", forbiddenWords: ["VACANZA", "UOVO", "RESSURREZIONE", "AGNELLO", "DOMENICA"] },
  { mainWord: "FORTUNA", forbiddenWords: ["SORTE", "CASO", "TENTARE", "VENTURA", "COLPO"] },
  { mainWord: "LEGAME", forbiddenWords: ["VINCOLO", "SENTIMENTALE", "RELAZIONE", "AMORE", "STRINGERE"] },
  { mainWord: "TRATTORE", forbiddenWords: ["FATTORIA", "SEMINARE", "RACCOLTO", "CAMPAGNA", "VEICOLO"] },
  { mainWord: "MACCHIA", forbiddenWords: ["SPORCO", "DETERSIVO", "INCHIOSTRO", "ROSSETTO", "PULIRE"] },
  { mainWord: "AMBASCIATORE", forbiddenWords: ["ONU", "DIPLOMATICO", "NAZIONE", "ESTERO", "STATO"] },
  { mainWord: "PERIFERIA", forbiddenWords: ["CITTA'", "PAESE", "SOBBORGO", "ZONA", "QUARTIERE"] },
  { mainWord: "TELEFAX", forbiddenWords: ["DOCUMENTO", "TRASMISSIONE", "UFFICIO", "FOTOCOPIA", "INVIARE"] },
  { mainWord: "FOSSETTA", forbiddenWords: ["SORRIDERE", "MENTO", "PELLE", "VISO", "RUGA"] },
];

function startTurn() {
    document.getElementById("startTurnButton").style.display = "none"; // Nasconde il pulsante "Inizia Turno"
    skips = localStorage.getItem("skipLimit");
    timer = parseInt(localStorage.getItem("turnTime"));
    document.getElementById("skipButton").disabled = false;
    document.getElementById("correctButton").disabled = false;
    document.getElementById("decrementScoreButton").disabled = false;

    updateBackground();
    startTimer();
}

function updateBackground() {
    const gameBody = document.getElementById("gameBody");
    console.log(gameBody); // Controlla se viene trovato correttamente l'elemento

    if (currentTeam === "red") {
        gameBody.classList.remove("team-blue");
        gameBody.classList.add("team-red");
    } else {
        gameBody.classList.remove("team-red");
        gameBody.classList.add("team-blue");
    }
}

function switchTeam() {
    currentTeam = currentTeam === "red" ? "blue" : "red";
}


function startTimer() {
    const timerElement = document.getElementById("timer");

    // Ferma qualsiasi timer attivo prima di avviarne uno nuovo
    clearInterval(countdownInterval);

    // Aggiorna il display e imposta l'intervallo per far partire il timer
    timerElement.textContent = `${timer}s`;

    const countdown = setInterval(() => {
        if (timer <= 0) {
            clearInterval(countdown);
            document.getElementById("skipButton").disabled = true;
            document.getElementById("correctButton").disabled = true;
            document.getElementById("decrementScoreButton").disabled = true;
            endTurn();
        } else {
            timer--;
            timerElement.textContent = `${timer}s`;
        }
    }, 1000);
}

function endTurn() {
    clearInterval(countdownInterval); // Ferma il timer al termine del turno
    if (currentTurn >= turnsNumber) {
        if (scoreRed > scoreBlue) {
            showEndScreen('Rosso');
        } else if (scoreBlue > scoreRed) {
            showEndScreen('Blu');
        } else {
            showEndScreen('Nessuno (pareggio)');
        }
    } else {
        switchTeam();
        currentTurn++;
        document.getElementById("startTurnButton").style.display = "block"; // Mostra il pulsante per il prossimo turno
    }
}

function decrementScore() {
    if (currentTeam === "red"){
        scoreRed--;
    }
    else{
       scoreBlue--;
    }

    document.getElementById("score").textContent = `Team Rosso: ${scoreRed} - Team Blu: ${scoreBlue}`;
}

function correctAnswer() {
    if (currentTeam === "red"){
        scoreRed++;
    }
    else{
       scoreBlue++;
    }
    document.getElementById("score").textContent = `Team Rosso: ${scoreRed} - Team Blu: ${scoreBlue}`;
    nextWord();
}

function skipWord() {
    if (skips > 0) {
        skips--;
        nextWord();
    }
    if (skips === 0) {
        document.getElementById("skipButton").disabled = true;
    }
}

function shuffleWords() {
    // Mescola casualmente l'array di parole
    wordsList = [...wordsData];
    for (let i = wordsList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [wordsList[i], wordsList[j]] = [wordsList[j], wordsList[i]]; // Scambia gli elementi
    }
}

function loadWords() {
    try {
        if (currentWordIndex >= wordsList.length) {
            alert("Tutte le parole sono state mostrate!");
            return; // Puoi terminare il gioco o riavviare
        }

        // Carica la parola e le parole proibite dalla lista mescolata
        const wordData = wordsList[currentWordIndex];
        document.getElementById("mainWord").textContent = wordData.mainWord;

        // Aggiorna le parole proibite
        const forbiddenWordsContainer = document.getElementById("forbiddenWords");
        forbiddenWordsContainer.innerHTML = ""; // Pulisci le parole precedenti
        wordData.forbiddenWords.forEach(word => {
            const p = document.createElement("p");
            p.textContent = word;
            forbiddenWordsContainer.appendChild(p);
        });

    } catch (error) {
        console.error("Errore nel caricamento delle parole:", error);
    }
}

// 4. Funzione per saltare alla parola successiva
function nextWord() {
    // Avanza all'elemento successivo dell'array, ricominciando se necessario
    currentWordIndex = (currentWordIndex + 1) % wordsData.length;
    loadWords();
}

function showEndScreen(winner) {

    const victorySound = new Audio('victory.mp3'); // Assicurati che il percorso sia corretto
    victorySound.play();

    // Impostiamo il testo del vincitore
    const winnerElement = document.getElementById('winner');
    winnerElement.textContent = `Vincitore: Team ${winner}`;

    // Mostriamo il punteggio finale
    const scoreResult = document.getElementById('scoreResult');
    scoreResult.textContent = `Team Rosso: ${scoreRed} - Team Blu: ${scoreBlue}`;

    // Aggiungi il pulsante "Nuova Partita"
    const newGameButton = document.createElement("button");
    newGameButton.id = "newGameButton";
    newGameButton.textContent = "Nuova Partita";
    document.getElementById('endScreen').appendChild(newGameButton);

    // Mostriamo la schermata di fine gioco
    document.getElementById('endScreen').style.display = 'block';

    // Avviamo l'animazione dei coriandoli
    createConfetti();

    newGameButton.addEventListener("click", function() {
        window.location.href = "config.html"; // Sostituisci con il percorso esatto della tua pagina di configurazione
    });
}

// Funzione per creare i coriandoli
function createConfetti() {
    for (let i = 0; i < 100; i++) {
        let confetti = document.createElement('div');
        confetti.classList.add('confetti');
        document.body.appendChild(confetti);

        // Posizionamento e animazione casuale
        const startX = Math.random() * window.innerWidth;
        const endX = Math.random() * window.innerWidth;
        const animationDuration = Math.random() * 2 + 3; // Durata dell'animazione tra 3 e 5 secondi

        confetti.style.left = `${startX}px`;
        confetti.style.animationDuration = `${animationDuration}s`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        confetti.style.animationName = 'confetti';

        // Effetto di colore casuale
        confetti.style.backgroundColor = getRandomColor();
    }
}

// Funzione per ottenere un colore casuale per i coriandoli
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Funzione per riavviare il gioco
function restartGame() {
    // Nascondi la schermata di fine gioco
    document.getElementById('endScreen').style.display = 'none';

    // Reindirizza alla pagina di configurazione
    window.location.href = 'configurazione.html'; // Assicurati che il nome del file di configurazione sia corretto
}

// Al termine del gioco, mostra la schermata finale


// 5. Chiamata della funzione per caricare la prima parola quando la pagina è caricata
document.addEventListener("DOMContentLoaded", loadWords);

document.addEventListener("DOMContentLoaded", () => {
    startTimer();
});
