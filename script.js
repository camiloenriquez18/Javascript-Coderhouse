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
        divInputs.style.display = "flex";
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
        crearpoliza.style.display="flex";
        const botonGuardarpoliza = document.createElement("button")
        botonGuardarpoliza.setAttribute("id", "botonGuardarpoliza");
        botonGuardarpoliza.textContent = "Guardar Poliza"
        crearpoliza.appendChild(botonGuardarpoliza);
        const Polizaguardada = document.getElementById("Polizaguardada");
        botonGuardarpoliza.addEventListener("click", () => {
            cargarPoliza(Arraypolizas)
            if (inputnombre != '' || inputpatente != '' || inputanio != '' || isNaN(inputanio) || inputmarca != '' || inputmodelo != '') {
            guardarEnStorage(Arraypolizas)} 
        })
    } )

    const divCards = document.getElementById("divCards");
    const verPoliza = document.createElement("button")
    verPoliza.setAttribute("id", "verPoliza");
    verPoliza.textContent = "Ver Poliza Registrada"
    botonContainer.appendChild(verPoliza);
    verPoliza.addEventListener("click", ()=> {
        crearTarjetas(Arraypolizas, divCards);
        Arraypolizas = JSON.parse(localStorage.getItem('Poliza'))
        Arraypolizas != null ? crearTarjetas(Arraypolizas,divCards):Arraypolizas = [];
    } )

    const botonBorrarLocalStorage = document.createElement("button");
    botonBorrarLocalStorage.textContent = "Borrar Polizas";
    botonContainer.appendChild(botonBorrarLocalStorage)
    botonBorrarLocalStorage.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
    });

    let Arraypolizas = [];

    function cargarPoliza(Arraypolizas) {
            const inputnombre = document.getElementById("inputnombre").value;
            const inputpatente = document.getElementById("inputpatente").value;
            const inputanio = parseInt(document.getElementById("inputanio").value);
            const inputmarca = document.getElementById("inputmarca").value;
            const inputmodelo = document.getElementById("inputmodelo").value;
            if (inputnombre === '' || inputpatente === '' || inputanio === '' || isNaN(inputanio) || inputmarca === '' || inputmodelo === '') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Debe completar correctamente todos los campos',
                    confirmButtonText: 'Ok'
                });
                return
            }else{
                Polizaguardada.style.display="block";
                const polizas = new Poliza(inputnombre, inputpatente, inputanio, inputmarca, inputmodelo);
                Arraypolizas.push(polizas);
                polizas.asignarId(Arraypolizas)
                console.log(Arraypolizas)
            }
    }

    function crearTarjetas(Arraypolizas, contenedorHTML) {
        contenedorHTML.innerHTML = "";
        for (const elemento of Arraypolizas) {
            let Polizacard = document.createElement('div');
            Polizacard.className = "Cards"
            Polizacard.innerHTML = `<div id="${elemento.id}"> <h4> Tu poliza de seguro </h4> <p> Nombre: ${elemento.nombre} <br> Patente del vehiculo: ${elemento.patente} <br> Año del vehiculo: ${isNaN(elemento.anio) ? "No disponible" : elemento.anio.toString()} <br> Marca: ${elemento.marca} <br> Modelo: ${elemento.modelo}<br> </p> </div>`;
            contenedorHTML.append(Polizacard);
        }
    }

function guardarEnStorage(Arraypolizas) {
    localStorage.setItem("Poliza", JSON.stringify(Arraypolizas))
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
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ingresaste caracteres no validos en los campos, por favor volve a completar los campos con caracteres numericos.',
        confirmButtonText: 'Ok'
    });
    return;
}
const divInputs = document.querySelector('#divInputs');
let nuevoparrafo = document.createElement("p");
divInputs.appendChild(nuevoparrafo);
nuevoparrafo.innerHTML += "<p>El monto mensual para su seguro de vehiculo es: $" + (Math.round((edad * 2 + modelo * 0.02 + monto / 500) * 100) / 100).toFixed(2) + "</p>";
}

const cotizarenUSD = document.createElement("button");
cotizarenUSD.setAttribute("id", "cotizarenUSD");
cotizarenUSD.textContent = "Cotizar en Dolares";
botonContainer.appendChild(cotizarenUSD);
cotizarenUSD.addEventListener('click', ()=>{
    const divcot_USD =document.getElementById("divcot_USD");
    divcot_USD.style.display="flex";
    cotizarenUSD.style.display="none"
})

resultado = document.getElementById("resultado")
const button_cotizarUSD = document.getElementById("cotizar");
button_cotizarUSD.addEventListener('click', () => {
    cotizarSeguro()
    resultado.style.display="flex";
});

function cotizarSeguro() {
const edad = document.getElementById("edad").value;
const antiguedad = document.getElementById("antiguedad").value;
const cobertura = document.getElementById("cobertura").value;
if (isNaN(edad) || isNaN(antiguedad) || isNaN(cobertura)) {
    const resultado = document.getElementById("resultado");
    resultado.textContent = 'Por favor, ingrese valores numéricos válidos.';
    return;
}

const myHeaders = new Headers();
myHeaders.append("apikey", "GgiFXSX9zFJuRRYEPoIMd37ZcgLHHRIH");

const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'};

fetch(`https://api.apilayer.com/exchangerates_data/convert?to=ars&from=usd&amount=${cobertura}`, requestOptions)
    .then(response => response.json())
    .then(data => {
        const preciodolar = data.result;
        console.log(preciodolar)
    resultado.textContent = 'El precio de su seguro mensual seria de $' + (Math.round((edad * 2 + antiguedad *0,7 + preciodolar / 300)))  +  "\n Los valores estan expresados en pesos argentinos porque se realizo la conversion" ;
    })
    
    .catch(error => console.log('error', error));
}

const preciodolar_actualizado = document.getElementById("preciodolar_actualizado")
const dolarenvivo = document.createElement("p");
dolarenvivo.setAttribute("id", "dolarenvivo");
botonContainer.appendChild(dolarenvivo);

    const myHeaders = new Headers();
    myHeaders.append("apikey", "GgiFXSX9zFJuRRYEPoIMd37ZcgLHHRIH");

    const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'};

    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=ars&from=usd&amount=1`, requestOptions)
    .then(response => response.json())
    .then(data => {
        const resultado = data.result;
        dolarenvivo.textContent = `Precio del dolar hoy 1USD = ${resultado.toFixed(2)} ARS`;
        console.log(resultado)
    })
