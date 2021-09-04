//Esta funcion carga el nombre del usuario logeado 
//el cual se encuentra almacenado en el localStorage
//una vez obtenido lo seteamos en el elemento User usando el innerHTML
function profilename(){
if(localStorage.getItem("usuario")!=null)
{
document.getElementById("user").innerHTML = localStorage.getItem("usuario");
} else {
// Retrieve
document.getElementById("user").innerHTML = "Perfil";
}
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e){
    profilename();
});