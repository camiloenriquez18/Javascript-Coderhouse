
function menuInicio() {
let opcion = prompt(
    "Bienvenido al Simulador de Seguros\n\nPor favor seleccione una opción:\n1. Seguro de Auto\n2. Seguro de Hogar\n3. Salir"
    );

    switch (opcion) {
    case "1":
        calcularSeguroAuto();
        break;
    case "2":
        calcularSeguroHogar();
        break;
    case "3":
        alert("Gracias por usar el Simulador de Seguros.");
        break;
    default:
        alert("Opción inválida. Por favor seleccione una opción válida.");
        menuInicio();
        break;
    }
}


function calcularSeguroAuto() {
    let edad = prompt("Por favor ingrese su edad:");
    let modelo = prompt("Por favor ingrese el modelo de su auto:");
    let monto = prompt("Por favor ingrese el monto de cobertura deseado:");



    alert("El monto mensual para su seguro de auto es: " + Math. round(( edad *2 +  modelo * 0,02 + monto/90 )));
    volverMenu();
}


function calcularSeguroHogar() {
    let antiguedad = prompt("Por favor ingrese la antiguedad de su residencia expresado en años:");
    let valor = prompt("Por favor ingrese el valor de su hogar:");
    let monto = prompt("Por favor ingrese el monto de cobertura deseado:");



    alert("El monto mensual para su seguro de hogar es: " + Math. round((antiguedad * 230  + monto /620  )));
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
