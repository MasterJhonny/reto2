(function(){
    var dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    var salidaHora = document.getElementById("salidaHora");
    var salidaDia = document.getElementById("salidaDia");
    var boton = document.getElementById("boton");
    var sonido = document.getElementById("sonido");
    var pantalla = document.getElementById("pantalla");
    var entrada;
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
        salidaDia.innerText = `${dias[dia]} ${diaSemana}`;
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
        entrada = document.getElementById("entrada");
        url = document.getElementById("url")
        alarmas.push(new Alarma(entrada.value, url.value));
        pantalla.innerText += `La Alarma Sonara a las ${entrada.value}\n`; 
        console.log(`La Alarma Sonara a las ${entrada.value}`);
    }
    function abrirVinculo (URL){ 
        window.open(URL,"ventana1","menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes"); 
    }
    actualizarHora();
    var intervalo = setInterval(actualizarHora, 999);
    boton.addEventListener("click", crearAlarma);
    
    
}())




