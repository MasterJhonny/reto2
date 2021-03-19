(function(){
    var dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
    var salidaHora = document.getElementById("salidaHora");
    var salidaDia = document.getElementById("salidaDia");
    var boton = document.getElementById("boton");
    var sonido = document.getElementById("sonido");
    var pantalla = document.getElementById("pantalla");
    var entrada, day, dayWeek;
    var alarmas = [];
    var bolean = true;
    var horaActual, url;
    function actualizarHora(){
        function ejecutar(){
            if(bolean === true){
                for(let i = 0; i < alarmas.length; i++){
                    if(horaActual == alarmas[i].hora){
                        console.log("Ya es hora Señores..................");
                        abrirVinculo(alarmas[i].url);
                        sonido.play();
                    }
                }      
            }
        }
        var date = new Date();
        var diaSemana = date.getDate();
        var dia = date.getDay();
        var hora = date.getHours()<10 ? "0" + date.getHours() : date.getHours();;
        var minuto = date.getMinutes()<10 ? "0" + date.getMinutes() : date.getMinutes();
        var segundo = date.getSeconds()<10 ? "0" + date.getSeconds() : date.getSeconds();
        horaActual = `${hora}:${minuto}:${segundo}`;
        ejecutar();
        segundo = demo(segundo);
        minuto = demo(minuto);
        hora = demo(hora);
        salidaHora.innerText = `${hora}:${minuto}:${segundo}`;
        if(dia == 0){
            salidaDia.innerText = `${dias[6]} ${diaSemana}`;
        } else {
            salidaDia.innerText = `${dias[dia-1]} ${diaSemana}`;
        }
    }
    function demo(item){
        item = item.toString();
        var fana1 = item.substring(0,1);
        var fana2 = item.substring(1,2);
        if(fana1 === "1"){
            fana1 = " " + fana1;
        } 
        if(fana2 === "1"){
            fana2 = " " + fana2;
        }
        return fana1 + fana2;
    }
    function crearAlarma(){
        day = document.getElementById("day");
        day = sacarDia(day.value);
        diaWeek();
        entrada = document.getElementById("entrada");
        url = document.getElementById("url")
        alarmas.push(new Alarma(entrada.value, url.value));
        pantalla.innerText += `La Alarma Sonara a las ${entrada.value}\n`; 
        console.log(`La Alarma Sonara el dia ${dayWeek} ${day} a las ${entrada.value}`);
    }
    function abrirVinculo (URL){ 
        window.open(URL,"ventana1","menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes"); 
    }
    function sacarDia(fecha){
        fecha = fecha.substring(8);
        return fecha;
    }
    function diaWeek(){
        var dia = document.getElementById("day");
        let date = new Date(dia.value);
        dayWeek = dias[date.getDay()];
    }
    actualizarHora();
    var intervalo = setInterval(actualizarHora, 999);
    boton.addEventListener("click", crearAlarma);
    
    
}())