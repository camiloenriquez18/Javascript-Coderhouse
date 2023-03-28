let contenedor = document.querySelector(".contenedor");
console.log(contenedor)

contenedor.innerHTML+="<h1 class='tituloh1'> Bienvenido al simulador de seguros </h1>";

const botonContainer = document.getElementById("boton-container");
const botonCotizar = document.getElementById("botonCotizar")
const botonCalcular = document.createElement("button");
botonCalcular.setAttribute("id", "botonCalcular");
botonCalcular.textContent = "Calcular Seguro";
botonContainer.appendChild(botonCalcular);
botonCalcular.addEventListener("click",()=> {
    const divInputs = document.getElementById("divInputs");
        divInputs.style.display = "block";
        botonCalcular.style.display ="none"
        botonCotizar.style.display = "block"
    })
    botonCotizar.addEventListener("click", ()=>{
        calcularSeguroVehiculo()
    })

    const registrarVehiculo = document.createElement("button")
    registrarVehiculo.setAttribute("id", "registrarVehiculo")
    registrarVehiculo.textContent ="Registrar vehiculo"
    botonContainer.appendChild(registrarVehiculo);    
    registrarVehiculo.addEventListener("click", ()=>{
        registrarVehiculo.style.display="none";
        const crearpoliza = document.getElementById("crearpoliza");
        crearpoliza.style.display="block";
        const botonGuardarpoliza = document.createElement("button")
        botonGuardarpoliza.setAttribute("id", "botonGuardarpoliza");
        botonGuardarpoliza.textContent = "Guardar Poliza"
        crearpoliza.appendChild(botonGuardarpoliza);
        botonGuardarpoliza.addEventListener("click", () => {
            cargarPoliza(Arraypolizas)
            guardarEnStorage(Arraypolizas)
        })
    } )

    const divCards = document.getElementById("divCards");
    const verPoliza = document.createElement("button")
    verPoliza.setAttribute("id", "verPoliza");
    verPoliza.textContent = "Ver Poliza Registrada"
    botonContainer.appendChild(verPoliza);
    verPoliza.addEventListener("click", ()=> {
        crearTarjetas(Arraypolizas, divCards);
    } )

    const botonBorrarLocalStorage = document.createElement("button");
    botonBorrarLocalStorage.textContent = "Borrar Polizas";
    botonContainer.appendChild(botonBorrarLocalStorage)
    botonBorrarLocalStorage.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
    });

    let Arraypolizas;
    function cargarPoliza(Arraypolizas) {
        const inputnombre = document.getElementById("inputnombre").value;
        const inputpatente = document.getElementById("inputpatente").value;
        const inputanio = parseInt(document.getElementById("inputanio").value);
        const inputmarca = document.getElementById("inputmarca").value;
        const inputmodelo = document.getElementById("inputmodelo").value;
        const polizas = new Poliza(inputnombre, inputpatente, inputanio, inputmarca, inputmodelo);
        Arraypolizas.push(polizas);
        polizas.asignarId(Arraypolizas)
        console.log(Arraypolizas)
        if (inputnombre === '' || inputpatente === '' || inputanio === '' || isNaN(inputanio) || inputmarca === '' || inputmodelo === '') {
            alert('Debe completar correctamente todos los campos');
            return
        }
        }
    

    function crearTarjetas(Arraypolizas, contenedorHTML) {
        contenedorHTML.innerHTML = "";
        for (const elemento of Arraypolizas) {
            let Polizacard = document.createElement('div');
            Polizacard.className = "Cards"
            Polizacard.innerHTML = `<div id="${elemento.id}"> <h4> Poliza de seguros </h4> <p> Nombre: ${elemento.nombre} <br> Patente del vehiculo: ${elemento.patente} <br> Año del vehiculo: ${isNaN(elemento.anio) ? "No disponible" : elemento.anio.toString()} <br> Marca: ${elemento.marca} <br> Modelo: ${elemento.modelo}<br> </p> </div>`;
            contenedorHTML.append(Polizacard);
        }
    }

function guardarEnStorage(Arraypolizas) {
    localStorage.setItem("Poliza", JSON.stringify(Arraypolizas))
}

window.onload = () => {
Arraypolizas = JSON.parse(localStorage.getItem('Poliza'))
if (Arraypolizas != null) {
    crearTarjetas(Arraypolizas,divCards);
} else {
    Arraypolizas = [];
    }
    } 

class Poliza {
    constructor(nombre, patente, anio, marca, modelo, id) {
    this.nombre = nombre;
    this.patente = patente;
    this.anio = anio;
    this.marca = marca;
    this.modelo = modelo;
    this.id = id;
    }
    
    static ordenarPorId(polizas) {
    return polizas.sort((a, b) => a.id - b.id);
    }
    asignarId(polizas) {
    this.id = polizas.length;
    }
}


function calcularSeguroVehiculo() {

const edad = parseInt(document.querySelector("#edad").value);
console.log(edad);
const modelo = parseInt(document.querySelector("#modelo").value);
console.log(modelo);
const monto = parseInt(document.querySelector("#monto").value);
console.log(monto);
if (isNaN(edad) || isNaN(modelo) || isNaN(monto)) {
    alert("Ingresaste caracteres no validos en los campos, por favor volve a completar los campos con caracteres numericos.");
    return;
}
const divInputs = document.querySelector('#divInputs');
let nuevoparrafo = document.createElement("p");
divInputs.appendChild(nuevoparrafo);
nuevoparrafo.innerHTML += "<p>El monto mensual para su seguro de vehiculo es: <p>" + Math. round(( edad *2 +  modelo * 0.02 + monto/150 ));
}