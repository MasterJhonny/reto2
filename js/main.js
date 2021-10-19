// importacion de un objeto
import Alarma from './Alarma.js'

(function(){
    // declaration de variable
    var dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo']
    var salidaHora = document.getElementById("salidaHora");
    var salidaDia = document.getElementById("salidaDia");
    let gif = document.getElementById("gif")
    
    // variables of button
    let boton2 = document.getElementById("boton2");
    let boton = document.getElementById("boton");
    let sonido = document.getElementById("sonido");
    let pantalla = document.getElementById("pantalla");
    let entrada, daysValues, dayWeek, dayActual, nombre;
    let alarmas = new Array();
    let alarmasMemory = JSON.parse(localStorage.getItem('menory'))

    // variables boleanas
    var bolean1 = true;
    var bolean2 = false;
    var horaActual, url;

    // function de actualizar la hora actual
    function actualizarHora(){
        // console.time('time')
        function ejecutar(){
            if(bolean1 === true){
                for(let i = 0; i < alarmas.length; i++){
                    if(horaActual === alarmas[i].hora){
                        for(let j = 0; j < alarmas[i].dias.length; j++) {
                            if(alarmas[i].dias[j] === dayActual){
                                console.log("Ya es hora Señores..................");
                                swal(`😊`, `Ya son las ${alarmas[i].hora} para ${alarmas[i].name}, nos dirigimos a ${alarmas[i].url}`, 'success')
                                abrirVinculo(alarmas[i].url);
                                gif.src = 'https://giphy.com/embed/qi29MoLjWNPUI'
                                setTimeout(() => {
                                    gif.src = 'https://giphy.com/embed/xT0xeP1oX0sSlD0D4s'
                                }, 7000) 
                                // sonido.play();
                            }
                        }
                    }
                }      
            }
        }
        let date = new Date();
        let diaSemana = date.getDate();
        let dia = date.getDay();
        let hora = date.getHours()<10 ? "0" + date.getHours() : date.getHours();
        let minuto = date.getMinutes()<10 ? "0" + date.getMinutes() : date.getMinutes();
        let segundo = date.getSeconds()<10 ? "0" + date.getSeconds() : date.getSeconds();
        horaActual = `${hora}:${minuto}:${segundo}`;
        ejecutar();
        segundo = demo(segundo);
        minuto = demo(minuto);
        hora = demo(hora);
        dayActual = deNumADia(dia)
        salidaHora.innerText = `${hora}:${minuto}:${segundo}`;
        if(dia == 0){
            salidaDia.innerText = `${dias[6]} ${diaSemana}`;
        } else {
            salidaDia.innerText = `${dias[dia-1]} ${diaSemana}`;
        }
        // console.timeEnd('time')
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
        // recuperando los vaolres del formulario
        daysValues = document.getElementsByClassName("dias");
        nombre = document.getElementById("name");
        entrada = document.getElementById("entrada");
        url = document.getElementById("url");

        // recorer el array de diaSemana
        let arrayValues = Object.values(daysValues)
        let valor = arrayValues.some(e => {
            return e.checked === true
        })

        // valudacion de los campos del formulario
        if(valor && entrada.value != "" && url.value != "" && nombre.value != ""){
            // function para filtra dias
            let daySelect = (arry) => {
                let nuevoArray = new Array()
                arry.forEach(e => {
                    nuevoArray.push(e.value)
                })
                return nuevoArray
            }
            // limpiar salida parrafo
            if(bolean2 === true){
                pantalla.innerText = '';
            }
            // filtrar dias seleccionados por el usuario
            let dayTrue = arrayValues.filter(input => {
                return input.checked === true
            })
            let dayWeekSelect = daySelect(dayTrue)

            // creacion de la alarma
            alarmas.push(new Alarma(nombre.value, entrada.value, url.value, dayWeekSelect));
            console.log(alarmas)
            printData(alarmas)
            localStorage.setItem('menory', JSON.stringify(alarmas))
            console.log(`La Alarma Sonara los dias ${dayWeekSelect} a las ${entrada.value}`);
            bolean1 = true;
            bolean2 = false;
            swal(`😊`, `La actividad se genero correctamente`, 'success')
            setTimeout(() => {
                location.reload()
            }, 1000)
        } else {
            // se mustra una vetana emergente para senalar que se debe ingresar todos los datos
            swal('Alarma Web', 'Lo lamentamos, debes ingresar todos los campos ☹️', 'error')
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
    // function de numero de dia a dia en texto
    function deNumADia (valor) {
        switch (valor) {
            case 0:
                return 'Domingo'
            case 1:
                return 'Lunes'
            case 2:
                return 'Martes'
            case 3:
                return 'Miercoles'
            case 4:
                return 'Jueves'
            case 5:
                return 'Viernes'
            case 6:
                return 'Sabado'
        }
    }
    // function de inprimir configuracoin de las alarmas.
    function printData (arrayAlar) {
        pantalla.innerText = ""
        for(let i = 0; i < arrayAlar.length; i++) {
            pantalla.innerHTML += `<p class="item"><b>${arrayAlar[i].name}</b> se establecio para los días ${arrayAlar[i].dias} a las <span style="font-size:1.7rem"><b>${arrayAlar[i].hora}</b></span> y se redirigira al siguiente <a href="${arrayAlar[i].url}" target="_blank" title="${arrayAlar[i].url}">link</a><span class="icon-delete" data-index="${i}"><span class="aria-label"><b>borrar</b></span></span></p>` 
        } 
    }
    
    // validacion del localstora
    if(alarmasMemory){
        alarmasMemory.forEach(e => {
            alarmas.push(new Alarma(e.name, e.hora, e.url, e.dias))
        })
        printData(alarmas)
        
    }
    console.log(alarmas);
    const btnsDelete = document.getElementsByClassName('icon-delete');
    Array.prototype.forEach.call(btnsDelete, item => {
        item.onclick = (e) => {
            let index = e.target.dataset.index
            let valorBorrado = alarmas.splice(index, 1)
            printData(alarmas)
            localStorage.setItem('menory', JSON.stringify(alarmas))
            location.reload()
            console.log(alarmas)
        }
    })
    
    // actulizar hours
    actualizarHora()
    
    setInterval(actualizarHora, 999.5);
    

    boton.addEventListener("click", crearAlarma);
    boton2.onclick = function() {
        localStorage.removeItem('menory')
        location.reload()
    }

}())