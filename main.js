function onClick (event) {
    event.preventDefault();
    this.style.backgroundColor = "black";
    console.log("click...");
    console.log(event);
  
  
    const mensaje = {
      comercio: document.getElementById('comercio').value,
      titular: document.getElementById('titular').value,
      celular: document.getElementById('celular').value
    }
    console.log(mensaje);
  
  
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(mensaje),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => { 
          console.log(json);
          let notificacion = 'Gracias  '+json.titular+'  por registrate en la ExpoJuy 2022, tu numero de registro es: '+json.id;
          Swal.fire(
              'Enviado',
              notificacion,
              'success'
          );
          cleanForm();
          /* redirectUrl(); */
      })
      .catch((err) => console.log(err));
  
  }
  function cleanForm() {
    let formulario = document.getElementById('formulario');    
    formulario.reset();    
}
function redirectUrl(){
    window.location.href = "https://google.com";    
}

let boton = document.getElementById("enviar");
boton.addEventListener("click", onClick);

//Función del Clima
fetch('https://api.openweathermap.org/data/2.5/weather?lat=-24.183084917115796&lon=-65.33127644531041&appid=555083fd438613a78b0609408b019c59')
.then((response) => response.json())
.then((json) => { 
    console.log(json);
    //Actualizar valores del clima
    let temp = parseFloat(json.main.temp) - 273.15; 
    let temp_max = parseFloat(json.main.temp_max) - 273.15; 
    let temp_min = parseFloat(json.main.temp_min) - 273.15; 
    document.getElementById('ciudad').textContent = json.name; 
    document.getElementById('temp').textContent = temp.toFixed(2)+' °C'; 
    document.getElementById('temp_max').textContent = 'MAX: '+temp_max.toFixed(2)+' °C'; 
    document.getElementById('temp_min').textContent = 'MIN: '+temp_min.toFixed(2)+' °C'; 
    document.getElementById('humedad').textContent = 'HUMEDAD: '+json.main.humidity+ '%';
    document.getElementById('presion').textContent = 'PRESIÓN: '+json.main.pressure+' hPa';

})
.catch((err) => console.log(err));