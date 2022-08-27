function onClick(event) {
  event.preventDefault();
  // this.style.backgroundColor = "black";
  console.log("click...");
  console.log(event);

  const mensaje = {
    comercio: document.getElementById("comercio").value,
    titular: document.getElementById("titular").value,
    celular: document.getElementById("celular").value,
  };
  console.log(mensaje);

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(mensaje),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      let notificacion =
        "Gracias  " +
        json.titular +
        "  por registrate en la ExpoJuy 2022, tu numero de registro es: " +
        json.id;
      Swal.fire("Enviado", notificacion, "success");
      cleanForm();
      /* redirectUrl(); */
    })
    .catch((err) => console.log(err));
}
function cleanForm() {
  let formulario = document.getElementById("formulario");
  formulario.reset();
}

let boton = document.getElementById("enviar");
boton.addEventListener("click", onClick);

//Petición a la Api del Clima
async function clima() {
  let response = await fetch(
    "https://api.openweathermap.org/data/2.5/weather?lat=-24.183084917115796&lon=-65.33127644531041&appid=555083fd438613a78b0609408b019c59"
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      actualizarValoresClima(json);
    })
    .catch((err) => console.log(err));
}
clima();

// Funcion para convertir de grados kelvin a grados celsius
function convertirGradosCelsius(grados_Kelvin) {
  return parseFloat(grados_Kelvin) - 273.15;
}
//Actualizar valores del clima en la vista
function actualizarValoresClima(clima) {
  let nombre_ciudad = clima.name;
  let temp = convertirGradosCelsius(clima.main.temp);
  let temp_max = convertirGradosCelsius(clima.main.temp_max);
  let temp_min = convertirGradosCelsius(clima.main.temp_min);
  let humedad = clima.main.humidity;
  let presion = clima.main.pressure;
  let visibilidad = parseInt(clima.visibility) / 1000;
  document.getElementById("ciudad").textContent = nombre_ciudad;
  document.getElementById("temp").textContent = temp.toFixed(2) + " °C";
  document.getElementById("temp_max").textContent =
    "MAX: " + temp_max.toFixed(2) + " °C";
  document.getElementById("temp_min").textContent =
    "MIN: " + temp_min.toFixed(2) + " °C";
  document.getElementById("humedad").textContent = "HUMEDAD: " + humedad + "%";
  document.getElementById("presion").textContent =
    "PRESIÓN: " + presion + " hPa";
  document.getElementById("visibilidad").textContent =
    "VISIBILIDAD: " + visibilidad + " Km";
  //Agregar icono del clima
  let icon = clima.weather[0].icon;
  document.getElementById("clima-icon").src =
    "http://openweathermap.org/img/wn/" + icon + "@2x.png";
}
