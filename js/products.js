const ORDER_ASC_BY_PRICE = "MAX";
const ORDER_DESC_BY_PRICE = "MIN";
const ORDER_BY_PROD_SOLDCOUNT = "PRICE.";
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var productosArray = [];
//Esta funcion carga el nombre del usuario logeado 
//el cual se encuentra almacenado en el localStorage
//una vez obtenido lo seteamos en el elemento User usando el innerHTML
function profilename(){
    if(localStorage.getItem("usuario")!=null)
    {
    document.getElementById("user").innerHTML = localStorage.getItem("usuario");
    } else {
    // Muestro el nombre del perfil sino hay nada en el localStorage
    document.getElementById("user").innerHTML = "Perfil";
    }
    }
    //primer metodo que se ejecuta, el cual llama al profilename
document.addEventListener("DOMContentLoaded", function(e){
  profilename();
});
//esta funcion recibe un tipo de ordenamiento y un array de productos
//chequea el tipo de ordenamiento y ordena en base al mismo 
//por ejemplo para los ordenamientos ascendentes y descendentes por precio
//hace una comparacion entre los elementos por el campo costo

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });

        //para el ordenamiento por cantidad de ventas
        //chequea los elementos usando el campo soldcount
    }else if (criteria === ORDER_BY_PROD_SOLDCOUNT){
        result = array.sort(function(a, b) {
            let asoldCount = parseInt(a.soldCount);
            let bsoldCount = parseInt(b.soldCount);

            if ( asoldCount > bsoldCount ){ return -1; }
            if ( asoldCount < bsoldCount ){ return 1; }
            return 0;
        });
    }

    return result;
}
//Esta funcion reibe el array
//Crea una variable htmlContenttoApend donde va a ir agregando la informacion
//Por cada objeto presente en el array creo un div con los valores solicitados: imagen,Nombre,Cant,etc
//Inserto ese codigo dentro de la variable htmlContenttoAppend de la manera que no sobreescriba lo anterior.
function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < productosArray.length; i++){
        let producto = productosArray[i];
//chequeo que las variables mincount y maxcount no tengan un valor 
//o en el caso de tenerlo comparo el costo del producto seleccionado con dichas variables 
//para ver si esta en el rango de ser asi lo muestro sino lo evito
        if (((minCount == undefined) || (minCount != undefined && parseInt(producto.cost) >= minCount)) &&
        ((maxCount == undefined) || (maxCount != undefined && parseInt(producto.cost) <= maxCount))){

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + producto.imgSrc + `" alt="Img${producto.name}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ producto.name +`</h4>
                        <small class="text-muted">` + producto.soldCount + ` artículos</small>
                    </div>
                    <div class="d-flex w-100 justify-content-between">
                          ${producto.description}
                         <small class="text-muted"><b>Costo: ` + producto.cost + `  ` + producto.currency + `</b></small>
                   </div>
               </div>
            </div>
        </div>
        `

    }  
    }

    //Luego de terminar el recorrido de los elementos y salir del for busco el elemento art-list..... en el Html 
    //usando la funcion document.getelmentbyid(nombre a buscar) y le asigno el contenido de la variable httmlCtoAp
    document.getElementById("art-list-container").innerHTML = htmlContentToAppend;
}
//recibe el criterio de ordenamiento y el array de productos 
//guarda el criterio de ordenamiento y el arrar de productos en las constantes
//ordena dicho arraylist en base al criterio de ordenamiento y llama al metodo showproductslist
function sortAndShowProducts(sortCriteria, prodArray){
    currentSortCriteria = sortCriteria;

    if(prodArray != undefined){
        productosArray = prodArray;
    }

    productosArray = sortProducts(currentSortCriteria, productosArray);

    //Muestro los productos ordenados
    showProductsList();
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
//Si el estado es OK cargo los valores del Json en la variable productosArray y luego llamo al metodo mostrarListadodeproductos pasandole
//el array como parametro
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
             //Muestro los productos ordenados
            sortAndShowProducts(ORDER_ASC_BY_PRICE, resultObj.data);
        }
    });
//este metodo se invoca cuando el usuario cliclea en el boton ordenar ascendente 
//y le pasa como parametro el valor de la constante ORDER_ASC_BY_PRICE al metodo sortAndShowProducts
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });
//este metodo se invoca cuando el usuario cliclea en el boton ordenar descendente 
//y le pasa como parametro el valor de la constante ORDER_DESC_BY_PRICE al metodo sortAndShowProducts
    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });
//este metodo se invoca cuando el usuario cliclea en el boton mas vendidos 
//y le pasa como parametro el valor de la constante ORDER_BY_PROD_SOLDCOUNT al metodo sortAndShowProducts
    document.getElementById("sortByVendidos").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_SOLDCOUNT);
    });
//se usa para vaciar el contenido de los texbox del rango por precio
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterPriceMin").value = "";
        document.getElementById("rangeFilterPriceMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

//toma los valores de los texbox de los rangos de precios y chequea que no sean nulos 
//si tienen valores los convierte a numericos y se los asigna a las variablees minCount y maxCount 
    document.getElementById("rangeFilterPrice").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por precio
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterPriceMin").value;
        maxCount = document.getElementById("rangeFilterPriceMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });
});