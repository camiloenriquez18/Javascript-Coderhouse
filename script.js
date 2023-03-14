class Poliza {
    constructor(nombredelasegurado, patente, anio, marca, modelo, id) {
    this.nombredelasegurado = nombredelasegurado;
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

const arraydepolizas = {
    elementos_polizas: [],
    agregarPoliza: function(elemento) {
    this.elementos_polizas.push(elemento);
    }
};


function menuInicio() {
let opcion = prompt(
    "Bienvenido al Simulador de Seguros\n\nPor favor seleccione una opción:\n1. Calcular seguro de vehiculo. \n2. Registrar vehiculo. \n3. Ver los vehiculos asegurados."
    );

    switch (opcion) {
    case "1":
        calcularSeguroVehiculo();
        break;
    case "2":
        registrarvehiculo();
        break;
    case "3":
        verlosvehiculosasegurados()
        break;
    default:
        alert("Opción inválida. Por favor seleccione una opción válida.");
        menuInicio();
        break;
    }
}

function calcularSeguroVehiculo() {
    let edad = prompt("Por favor ingrese su edad:");
    let modelo = prompt("Por favor ingrese el modelo de su vehiculo:");
    let monto = prompt("Por favor ingrese el monto de cobertura deseado:");



    alert("El monto mensual para su seguro de vehiculo es: " + Math. round(( edad *2 +  modelo * 0,02 + monto/90 )));
    volverMenu();
}


function volverMenu() {
    let opcion = prompt("¿Desea volver al menú de inicio?\n1. Sí\n2. No");

    switch (opcion) {
    case "1":
        menuInicio();
        break;
    case "2":
        alert("Gracias por usar el Simulador de Seguros.");
        break;
    default:
        alert("Opción inválida. Por favor seleccione una opción válida.");
        volverMenu();
        break;
    }
}


menuInicio();


function registrarvehiculo(){
let ingreso = prompt('Ingresa los datos separados por "\\" (nombre, patente, año, marca, modelo, id)');
let datos = ingreso.split('\\');
const poliza = new Poliza(datos[0], datos[1], parseInt(datos[2]), datos[3], datos[4], parseInt(datos[5]));
arraydepolizas.agregarPoliza(poliza);
console.log(arraydepolizas.elementos_polizas);
alert("registrado con exito")
menuInicio();
}


function verlosvehiculosasegurados() {
    if (arraydepolizas.elementos_polizas.length === 0) {
        alert("No hay vehículos asegurados.");
        menuInicio();
    } else {
        Poliza.ordenarPorId(arraydepolizas.elementos_polizas);
        let polizasRegistradas = "Lista de vehículos asegurados:\n\n";
        for (let i = 0; i < arraydepolizas.elementos_polizas.length; i++) {
            let polizaActual = arraydepolizas.elementos_polizas[i];
            polizasRegistradas += `Nombre del asegurado: ${polizaActual.nombredelasegurado}\nPatente: ${polizaActual.patente}\nAño: ${polizaActual.anio}\nMarca: ${polizaActual.marca}\nModelo: ${polizaActual.modelo}\nID: ${polizaActual.id}\n\n`;
        }
        alert(polizasRegistradas);
        menuInicio();
    }
}