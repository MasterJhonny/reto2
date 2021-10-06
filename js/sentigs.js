let doc = document.querySelector("html");
// btns is element
let btnMode = document.getElementById("btnMode");
let btnMenu = document.getElementById("btnMenu");
let hora = document.getElementById("salidaHora");

// event handlers od btn modde darks
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

// event handlers of btn menu
btnMenu.onclick = () => {
    let nav = document.querySelector(".nav");
    nav.classList.toggle("flex");
    if(nav.classList.contains("flex")){
        btnMenu.style.backgroundImage = "url(https://cdn-icons-png.flaticon.com/512/2919/2919543.png)";
    } else {
        btnMenu.style.backgroundImage = "url(https://cdn-icons-png.flaticon.com/512/2099/2099153.png)";
    }
}
