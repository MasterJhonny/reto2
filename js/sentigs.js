let doc = document.querySelector("html");
let btnMode = document.getElementById("btnMode");
let hora = document.getElementById("salidaHora");
btnMode.onclick = () => {
    doc.classList.toggle('dark-mode');
    let image = document.querySelector("iframe");
    image.classList.toggle('dark-mode');
    btnMode.innerText = btnMode.innerText === "Modo Oscuro" ? "Modo Claro" : "Modo Oscuro";
    hora.classList.toggle('dark-mode');
    hora.classList.contains
    if(hora.classList.contains('dark-mode')){
        hora.style.color = "chartreuse";
    } else {
        hora.style.color = "#212121";
    }
} 
