let intentos = 6;

const BUTTON = document.getElementById("guess-button");
BUTTON.addEventListener("click", intentar); 

fetch("https://random-word.ryanrk.com/api/en/word/random/?length=5")
    .then (  response => response.json())
     .then (  response => {
        console.log(response);
        palabra = response[0].toUpperCase();

    })
    .catch(err => {
        console.log("ups sucedio un error")
        let listapalabras = ["APPLE", "MOUSE", "HOUSE", "LUCIA"];
        let posicion =  Math.floor(Math.random() * listapalabras.length);
        palabra = listapalabras[posicion];
    })

function intentar() {
    console.log("click!")
    const intento = leerIntento();
    intentos = intentos - 1
    console.log("te quedan", intentos, "intentos");

    const GRID = document.getElementById("grid");
    const ROW = document.createElement("div");
    ROW.className = "row";
    console.log(ROW);

    for (let i in intento) {
        const SPAN = document.createElement("span");
        SPAN.className = "letter";
        SPAN.innerHTML = intento[i];
        if (palabra[i] === intento[i]) {
            SPAN.style.backgroundColor = "#79b851";
            console.log(intento[i], "verde");
        } else if (palabra.includes(intento[i])) {
            SPAN.style.backgroundColor = "#f3c237";
            console.log(intento[i], "amarillo");
        } else {
            SPAN.style.backgroundColor = "#a4aec4";
            console.log(intento[i], "gris");
        }
        console.log(SPAN);
        ROW.appendChild(SPAN);
    }
    GRID.appendChild(ROW);

    if (intento === palabra) {
        console.log("Ganaste");
        terminar("<h1>FELICIDADES GANASTE!😎</h1>")
        return
    }
    if (intentos === 0) {
        console.log("Perdiste");
        terminar("<h1>INTENTA NUEVAMENTE, PERDISTE!😪</h1>")
    }
}


function leerIntento() {
    const INTENTO = document.getElementById("guess-input").value.toUpperCase();
    return INTENTO;
}
function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    BUTTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}