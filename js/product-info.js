//Defino 3 variables
//producto es para obtener la informacion del mismo
//comentarios es para recibir un array de comentarios 
//estrellas es para saber cuantas estrellas presiono la persona y almacenarla temporalmente
var producto;
var comentarios=[];
var estrellas;

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
//Aqui uso la variable Product info y traigo la informacion desde esa pagina
document.addEventListener("DOMContentLoaded", function(e){
    profilename();
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
             //Muestro la informacion
             producto=resultObj.data;
             //Llamo a este metodo para mostrar la informacion del producto
            showProductsInfoList()
        }
});

//Este pasa como variable la pagina de comentarios y trae la info
//la guardo en la variable comentarios
getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
    if (resultObj.status === "ok")
    {
         //Muestro la informacion
         comentarios=resultObj.data;
         //vacio las estrellas por las dudas
         estrellas="";
         //llamo al metodo para mostrar los comentarios
        showProductsCommentList()
        
    }
});
});


//En este metodo voy a mostrar la informacion del producto
//A su vez tengo el carousel de imagenes
//toda esta info la muestro en el elemento art-container del product-info.html
//la aprte del carousel la hice hardcodeada por que se la cantidad de imagenes, pero podria ahccerse con un for para saber cuantas son.
function showProductsInfoList(){

    let htmlContentToAppend = "";
            htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                 <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ producto.name +`</h4>
                        <medium class="text-muted">` + producto.soldCount + ` artículos vendidos</medium>
                    </div>
                    <div class="d-flex w-100 justify-content-between">
                          ${producto.description}
                          <p>
                         
                   </div>
                   <big class="text-muted"><b>Costo: ` + producto.cost + `  ` + producto.currency + `</b></big>
               </div>
            </div>
        </div>
        <p>
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100"src="` + producto.images[0] + `" alt="First slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="` + producto.images[1] + `"  alt="Second slide">
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src="` + producto.images[2] + `"  alt="Third slide">
    </div>
    <div class="carousel-item">
    <img class="d-block w-100" src="` + producto.images[3] + `"  alt="Third slide">
  </div>
  <div class="carousel-item">
  <img class="d-block w-100" src="` + producto.images[4] + `"  alt="Third slide">
</div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
        `      
    //usando la funcion document.getelmentbyid(nombre a buscar) y le asigno el contenido de la variable htmlContentToAppend
    document.getElementById("art-container").innerHTML = htmlContentToAppend;
}

//Aca muestro los comentarios, Recorro uno por uno y muestro la info
//En una parte invoco a la funcion obtenerEstrellas pasandole como parametro el score la cual devuelve un codigo html.
function showProductsCommentList(){
    let html="";
    for(comentario of comentarios){
        html +=  obtenerEstrellas(comentario.score);
        html += `
        <li>${comentario.description}</li>
        <li>${comentario.user}</li>
        <li>${comentario.dateTime}</li>
        <p></p>
        `
    }

    document.getElementById("lista").innerHTML = html;
}

//Esta funcion recibe como parametro el score o puntos se fija a cuanto equivale ese valor y en base a eso
//arma el codigo html necesario con las estrellas pintadas o no pintadas y lo devuelve
//ejemplo si es 1 pinto 1 estralla si es 2 pinto 2...
function obtenerEstrellas(puntos){
    var html ="";
    if(puntos==1){
        html=`
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>`
}else if(puntos==2){
    html=`
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>`
}else if(puntos==3){
    html=`
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>`
}else if(puntos==4){
    html=`
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>`
}else if(puntos==5){
    html=`
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>`
}else{
    html=`
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>`
}
return html;
}

//Esta funcion additem es invocada cuando el usuario apreta el boton agregar comentrio
//obtengo los comentarios antiguos para no tener q vovler a invocarlos ni que se borren
//vacio el lugar donde estaban
//creo una nueva variable nuevohtml vacia
//obtengo el comentario nuevo del textbox y lo guardo en la variable text
//obtengo el usuario logueado.. Agregue una validacion de que si no existe diga anonimo
//Obtengo la fecha y la guardo en tot
//Pra finalizar le asigno el comentario viejo a la variable nuevohtml, luego traigo las estrellas y el resto de la informacion 
//pasandole las variables previamente definidas
//hago un inner en el elemento lista del html nuevamente 
function addItem()
{
    viejohtml = document.getElementById("lista").outerHTML;
    document.getElementById("lista").innerHTML="";
    var nuevohtml=""
    var text=document.getElementById("textocomentario").value;
    var user =localStorage.getItem("usuario");
    if(user==null){
        user="anonimo";
    }   
    var dt = new Date();
    var tot= ""+dt.getFullYear().toString().padStart(4, '0')+"-"+(dt.getMonth()+1).toString().padStart(2, '0')+"-"+dt.getDate().toString().padStart(2, '0')+" "
+dt.getHours().toString().padStart(2, '0')+":"+dt.getMinutes().toString().padStart(2, '0')+":"+dt.getSeconds().toString().padStart(2, '0')+""
nuevohtml =viejohtml
nuevohtml+=obtenerEstrellas(estrellas);
nuevohtml += `
<li>${text}</li>
<li>${user}</li>
<li>${tot}</li>
<p></p>
`

document.getElementById("lista").innerHTML = nuevohtml;
};

//esta funcion se invoca cuando el usuario apreta una estrella
//chequea cual estrella es y en base a eso las marca o las desmarca
//En el caso de marcarlas asigna a la variable estrellas el valor correspondiente
//para desmarcar invoco vaciarEstrellas()
function select(estrella)
{
    if(estrella.id==="s1"){
        if(estrella.getAttribute("class")==="fa fa-star"){
            estrella.setAttribute("class","fa fa-star checked");
            estrellas++
        }else{
            vaciarEstrellas();
        }     

    }else if(estrella.id==="s2"){   
        var estrella1 =document.getElementById("s1");
        if(estrella.getAttribute("class")==="fa fa-star"){
            estrella1.setAttribute("class","fa fa-star checked");
            estrella.setAttribute("class","fa fa-star checked");
            estrellas=2;
        }else{
            vaciarEstrellas();
        }  
    }else if(estrella.id==="s3"){   
        var estrella1 =document.getElementById("s1");
        var estrella2 =document.getElementById("s2");
        if(estrella.getAttribute("class")==="fa fa-star"){
            estrella1.setAttribute("class","fa fa-star checked");
            estrella2.setAttribute("class","fa fa-star checked");
            estrella.setAttribute("class","fa fa-star checked");
            estrellas=3;
        }else{
            vaciarEstrellas();
        }  
    }else if(estrella.id==="s4"){  
        var estrella1 =document.getElementById("s1");
        var estrella2 =document.getElementById("s2");
        var estrella3 =document.getElementById("s3");
        if(estrella.getAttribute("class")==="fa fa-star"){
            estrella1.setAttribute("class","fa fa-star checked");
            estrella2.setAttribute("class","fa fa-star checked");
            estrella3.setAttribute("class","fa fa-star checked");
            estrella.setAttribute("class","fa fa-star checked");
            estrellas=4;
        }else{
            vaciarEstrellas();
           
        }  
    }else if(estrella.id==="s5"){  
        var estrella1 =document.getElementById("s1");
        var estrella2 =document.getElementById("s2");
        var estrella3 =document.getElementById("s3");
        var estrella4 =document.getElementById("s4");
        if(estrella.getAttribute("class")==="fa fa-star"){
            estrella1.setAttribute("class","fa fa-star checked");
            estrella2.setAttribute("class","fa fa-star checked");
            estrella3.setAttribute("class","fa fa-star checked");
            estrella4.setAttribute("class","fa fa-star checked");
            estrella.setAttribute("class","fa fa-star checked");
            estrellas=5;
        }else{
            vaciarEstrellas();
      }  
    }

    //esta funcion desmarca todas las estrellas y resetea la variable estrellas a 0
    function vaciarEstrellas(){
        var estrella1 =document.getElementById("s1");
        var estrella2 =document.getElementById("s2");
        var estrella3 =document.getElementById("s3");
        var estrella4 =document.getElementById("s4");
        var estrella5 =document.getElementById("s5");
        estrella1.setAttribute("class","fa fa-star");
        estrella2.setAttribute("class","fa fa-star");
        estrella3.setAttribute("class","fa fa-star");
        estrella4.setAttribute("class","fa fa-star");
        estrella5.setAttribute("class","fa fa-star");
        estrellas=0;
    }   
    
};