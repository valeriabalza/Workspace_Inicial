
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

//Esta funcion es llamada desde el boton Sign in
//Cargo en la variable a el contenido del textbox InputEmail
//Cargo en la variable b el contenido del textbox InputPassowrd
//Verifico que ninguno de los dos sea null o vacio
//Uso el localStorage para setearle el usuario
//Si falla devuelvo mensaje sino reedirecciono a index.html
function login() {
    var a = document.getElementById("inputEmail").value;
    var b = document.getElementById("inputPassword").value;
    if (a == null || a == "", b == null || b == "") {  
        alert("Complete los campos");
        return false;
    }
    
    localStorage.setItem('usuario', a);

    document.location.href="index.html";
     
        return true;
}