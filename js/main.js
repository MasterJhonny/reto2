(function(){
    var dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
    var salidaHora = document.getElementById("salidaHora");
    var salidaDia = document.getElementById("salidaDia");
    var boton = document.getElementById("boton");
    var sonido = document.getElementById("sonido");
    var pantalla = document.getElementById("pantalla");
    var entrada, daysValues, dayWeek;
    var alarmas = new Array();
    var alarmasMemory = JSON.parse(localStorage.getItem('menory'))
    if(alarmasMemory){
        alarmasMemory.forEach(e => {
            alarmas.push(new Alarma(e.hora, e.url))
        })
        alarmas.forEach(e => {
            pantalla.innerText = `La alarma sonara a las ${e.hora} y se dirigira a ${e.url}\n` 
        }) 
    }
    console.log(alarmas);
    var bolean1 = true;
    var bolean2 = false;
    var horaActual, url;
    // let data = JSON.parse(localStorage.getItem('menory')) 
    // console.log(data)
    function actualizarHora(){
        function ejecutar(){
            if(bolean1 === true){
                for(let i = 0; i < alarmas.length; i++){
                    if(horaActual === alarmas[i].hora){
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
        daysValues = document.getElementById("day");
        entrada = document.getElementById("entrada");
        url = document.getElementById("url");
        if(day.value != "" && entrada.value != "" && url.value != ""){
            if(bolean2 === true){
                pantalla.innerText = '';
            }
            day = sacarDia(day.value);
            diaWeek();
            alarmas.push(new Alarma(entrada.value, url.value));
            console.log(alarmas)
            localStorage.setItem('menory', JSON.stringify(alarmas))
            console.log(`La Alarma Sonara el dia ${dayWeek} ${day} a las ${entrada.value}`);
            bolean1 = true;
            bolean2 = false;
        } else {
            pantalla.innerText = `!Ingresa todos los campos¡`
            bolean2 = true;
        }
        
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