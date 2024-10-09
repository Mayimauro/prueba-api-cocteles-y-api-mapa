// Inicializar el mapa con Leaflet
var map = L.map('map').setView([40.7128, -74.0060], 3); // Coordenadas iniciales (por ejemplo, Nueva York)

// Cargar el mapa desde OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Función para agregar cóctel al mapa
function agregarCoctel(nombre, lat, lon) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nombre}`)
    .then(response => response.json())
    .then(data => {
      if (data.drinks) {
        const drink = data.drinks[0]; // Suponemos que se encontró al menos un cóctel

        // Crear ícono personalizado con la imagen del cóctel
        var cocktailIcon = L.icon({
          iconUrl: drink.strDrinkThumb,  // URL de la imagen del cóctel
          iconSize: [50, 50],            // Tamaño del ícono
          iconAnchor: [25, 50],          // Punto donde se ancla el ícono
          popupAnchor: [0, -50]          // Posición del popup respecto al ícono
        });

        // Agregar marcador al mapa con la imagen del cóctel
        L.marker([lat, lon], { icon: cocktailIcon })
          .addTo(map)
          .bindPopup(`<b>${drink.strDrink}</b><br><img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" width="100">`);
      } else {
        console.error('Cóctel no encontrado:', nombre);
      }
    })
    .catch(error => console.error('Error al obtener los datos:', error));
}

//agregar un cóctel manualmente
agregarCoctel('Margarita', 40.730610, -73.935242);
agregarCoctel('Mojito', 34.052235, -118.243683);
agregarCoctel('Flaming Lamborghini', -34.9, -60.016666666667);
agregarCoctel('Smashed Watermelon Margarita', -37.995028, -57.622667);
