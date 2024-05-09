window.onload = iniciar;

let listadoReservas = [];
let reserva = {};

function iniciar(){
    let btnCalcular = document.getElementById("btnReservar");
    btnCalcular.addEventListener("click", clickReservar);   
}

function clickReservar(evento){
    evento.preventDefault();

    document.getElementById("errores").innerHTML="";
    document.getElementById("infoReserva").innerHTML="";

    const huesped = document.getElementById("txtHuesped").value;
    const adultos = parseInt(document.getElementById("txtAdultos").value);
    const dias = parseInt(document.getElementById("txtDias").value);
    const checkEstandar = document.getElementById("estandar").checked;
    const estandar = document.getElementById("estandar").value;
    const checkPremium = document.getElementById("premium").checked;
    const premium = document.getElementById("premium").value;

    const mensajeError = validarDatos(huesped, adultos, dias);
    
    if(mensajeError.length !== 0){
        mostrarError(mensajeError);
        mostrarReservaTabla();
        return;
    }

    if (checkEstandar){
        reservarEstandar(huesped, adultos, dias, estandar);
    }

    if(checkPremium){
        reservarPremium(huesped, adultos, dias, premium);
    }

    document.getElementById("txtHuesped").value = "";
    document.getElementById("txtAdultos").value = "";
    document.getElementById("txtDias").value = "";
}

function validarDatos(huesped, adultos, dias){

    const mensajeError = [];

    if(huesped.length == 0){
        mensajeError.push("Debe ingresar un huésped");
    }

    if(Number.isFinite(parseInt(huesped))){
        mensajeError.push("Debe ingresar un nombre");
    } 

    if(Number.isFinite(adultos) == false){
        mensajeError.push("Debe ingresar una cantidad de adultos");
    }

    if(Number.isFinite(dias) == false){
        mensajeError.push("Debe ingresar una cantidad de días");
    }

    if(dias<1){
        mensajeError.push("Debe reservar al menos 1 día");
    }

    if(adultos<=0){
        mensajeError.push("Debe reservar al menos para 1 adulto");
    }

    if(adultos>7){
        mensajeError.push("Como máximo puede reservar para 7 adultos");
    }

    return mensajeError;
}

function mostrarError(mensajeError){
    for(const mensaje of mensajeError){
        const listaErrores = document.createElement("li");
        var contenido = document.createTextNode(mensaje);
    
        listaErrores.appendChild(contenido);
        document.getElementById("errores").appendChild(listaErrores);
    }

}

function tarifaEstandar(adultos){

    if(adultos>=1 && adultos<=2){
       return 20000; 
    }

    if(adultos>=3 && adultos<=4){
        return 30000;
    }

    if(adultos>=5 && adultos<=7){
        return 35000;
    }
}

function tarifaPremium(adultos){

    if(adultos>=1 && adultos<=2){
       return 35000; 
    }

    if(adultos>=3 && adultos<=4){
        return 52000;
    }

    if(adultos>=5 && adultos<=7){
        return 61000;
    }
}

function reservarEstandar(huesped, adultos, dias, tipoHabitacion){
    let tarifa = tarifaEstandar(adultos);
    let precioFinal = dias*tarifa;
    registrarReserva(huesped, adultos, dias, tipoHabitacion, precioFinal);
    mostrarReservaTabla();
}

function reservarPremium(huesped, adultos, dias, tipoHabitacion){
    let tarifa = tarifaPremium(adultos);
    let precioFinal = dias*tarifa;
    registrarReserva(huesped, adultos, dias, tipoHabitacion, precioFinal);
    mostrarReservaTabla();
}

function registrarReserva(huesped, adultos, dias, tipoHabitacion, precioFinal){
    reserva = {
        "huesped": huesped,
        "adultos": adultos, 
        "dias": dias,
        "tipoHabitacion": tipoHabitacion,
        "precioFinal": precioFinal
    }

    listadoReservas.push(reserva);
}

function mostrarReservaTabla(){
    if (listadoReservas.length == 0){
        document.getElementById("infoReserva").innerHTML="";
        return;
    }
    const tabla = document.createElement("table");
    const filaCabecera = document.createElement("tr");
    const cabeceraHuesped = document.createElement("th");
    const cabeceraAdultos = document.createElement("th");
    const cabeceraDias = document.createElement("th");
    const cabeceraHabitacion = document.createElement("th");
    const cabeceraPrecioTotal = document.createElement("th");
    let cabHuesped = document.createTextNode("Nombre");
    let cabAdultos = document.createTextNode("Adultos");
    let cabDias = document.createTextNode("Días");
    let cabHabitacion = document.createTextNode("Tipo Habitación");
    let cabPrecioTotal = document.createTextNode("Precio Total");

    cabeceraHuesped.appendChild(cabHuesped);
    cabeceraAdultos.appendChild(cabAdultos);
    cabeceraDias.appendChild(cabDias);
    cabeceraHabitacion.appendChild(cabHabitacion);
    cabeceraPrecioTotal.appendChild(cabPrecioTotal);
    filaCabecera.appendChild(cabeceraHuesped);
    filaCabecera.appendChild(cabeceraAdultos);
    filaCabecera.appendChild(cabeceraDias);
    filaCabecera.appendChild(cabeceraHabitacion);
    filaCabecera.appendChild(cabeceraPrecioTotal);
    tabla.appendChild(filaCabecera);

    for(reserva of listadoReservas){
        const filaReserva = document.createElement("tr");
        const celdaHuesped = document.createElement("td");
        const celdaAdultos = document.createElement("td");
        const celdaDias = document.createElement("td");
        const celdaHabitacion = document.createElement("td");
        const celdaPrecioTotal = document.createElement("td");
        let celHuesped = document.createTextNode(reserva.huesped);
        let celAdultos = document.createTextNode(reserva.adultos);
        let celDias = document.createTextNode(reserva.dias);
        let celHabitacion = document.createTextNode(reserva.tipoHabitacion);
        let celPrecioTotal = document.createTextNode(`$${reserva.precioFinal}`);

        celdaHuesped.appendChild(celHuesped);
        celdaAdultos.appendChild(celAdultos);
        celdaDias.appendChild(celDias);
        celdaHabitacion.appendChild(celHabitacion);
        celdaPrecioTotal.appendChild(celPrecioTotal);
        filaReserva.appendChild(celdaHuesped);
        filaReserva.appendChild(celdaAdultos);
        filaReserva.appendChild(celdaDias);
        filaReserva.appendChild(celdaHabitacion);
        filaReserva.appendChild(celdaPrecioTotal);
        tabla.appendChild(filaReserva);
    }

    document.getElementById("infoReserva").appendChild(tabla);
}
