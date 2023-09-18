let res = document.querySelector('#res');
let linkCategoria = document.querySelectorAll('.link-categoria');

Array.from(linkCategoria).forEach(function(link) {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const categoria = link.getAttribute('data-categoria');
        console.log(categoria);
        cargarPorCaategoria(categoria);
    });
});

res.addEventListener('afterprint', traerDatos());

function traerDatos() {
    
    const xhttp = new XMLHttpRequest();
    // ruta para github --> ' ../data/productos.json'
    xhttp.open('GET', '../data/productos.json', true);

    xhttp.send();

    xhttp.onreadystatechange = function (){

        if(this.readyState == 4 && this.status == 200){
            let datos = JSON.parse(this.responseText);
            res.innerHTML = '<h3 id="cortesespeciales">Cortes Especiales</h3>';
            let titulo = 'Cortes Especiales';
            let identificador;
            
            for(let item of datos){
                
                if(titulo != item.tipo){
                    titulo = item.tipo
                    identificador = titulo.toLowerCase().split(" ").join("");
                    res.innerHTML += `<h3 id="${identificador}">${titulo}</h3>`
                }
                res.innerHTML += construirProducto(item);
            }
            
        }
    }
}

function construirProducto(datos) {
      if(datos.nuevo) {
          var cuerpo = `<div class="carta-producto">
                            <p class="nuevo-cartel">NUEVO!</p>
                            <img class="prod-img" src="${datos.urlImagen}">
                                <div class="text">
                                    <p class="prod-nombre">${datos.nombre}</p>
                                    <p class = "prod-descripcion">${datos.descripcion}</p>
                                </div> 
                        </div>`
      } else if(!datos.nuevo){
          var cuerpo = `<div class="carta-producto">
                            <img class="prod-img" src="${datos.imagen}">
                            <div class="text">
                                <p class="prod-nombre">${datos.nombre}</p>
                                <p class = "prod-descripcion">${datos.descripcion}</p>
                            </div> 
                        </div>`
      }
    return cuerpo;    
}


function cargarPorCaategoria(categoria) {

    // Limpia el contenido actual de "res"
    res.innerHTML = '';

    //llamamos a los datos
    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', '../data/productos.json', true);

    xhttp.send();

    xhttp.onreadystatechange = function (){

        if(this.readyState == 4 && this.status == 200){
            let datos = JSON.parse(this.responseText);

            const elementosFiltrados = datos.filter(item => item.tipo === categoria);

            res.innerHTML = `<h3>${categoria}</h3>`;

            for(let item of elementosFiltrados){
                res.innerHTML += construirProducto(item);
            }
            
        }
    }
}