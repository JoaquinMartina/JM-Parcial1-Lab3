window.onload = iniciar;

function iniciar(){
    let btnCalcular = document.getElementById("btnReservar");
    btnCalcular.addEventListener("click", clickReservar);   
}

function clickReservar(evento){
    evento.preventDefault();

    document.getElementById("errores").innerHTML="";

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

function reservarEstandar(huesped, adultos, dias, estandar){
    let tipoHabitacion = estandar;
    let tarifa = tarifaEstandar(adultos);
    let precioFinal = dias*tarifa;
    mostrarReserva(huesped, adultos, dias, precioFinal, tipoHabitacion);
}

function reservarPremium(huesped, adultos, dias, premium){
    let tipoHabitacion = premium;
    let tarifa = tarifaPremium(adultos);
    let precioFinal = dias*tarifa;
    mostrarReserva(huesped, adultos, dias, precioFinal, tipoHabitacion);
}

function mostrarReserva(huesped, adultos, dias, precioFinal, tipoHabitacion){
    const itemReserva = document.createElement("li");
    let reserva = document.createTextNode(`${huesped} - ${adultos} adultos - ${dias} dias - ${tipoHabitacion} - Total:$ ${precioFinal}`);
    
    itemReserva.appendChild(reserva);
    document.getElementById("infoReserva").appendChild(itemReserva);
}
