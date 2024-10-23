// Función para buscar imágenes de la NASA
async function searchNASAImages(query) {
    const url = `https://images-api.nasa.gov/search?q=${query}&media_type=image`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        // Verificamos que hayan resultados
        if (data.collection && data.collection.items.length > 0) {
            const items = data.collection.items;

            // Limpiamos los resultados anteriores
            const resultsContainer = document.getElementById('contenedor');
            resultsContainer.innerHTML = '';

            // Mostramos los resultados
            items.forEach(item => {
                const img = item.links[0].href;
                const title = item.data[0].title;
                const description = item.data[0].description || 'Descripción no disponible';
                const date = item.data[0].date_created || 'Fecha no disponible';

                // Crear los elementos para mostrar en HTML
                const resultDiv = document.createElement('div');
                resultDiv.classList.add('result', 'card', 'mb-3', 'p-3');

                const imageElement = document.createElement('img');
                imageElement.src = img;
                imageElement.alt = title;
                imageElement.classList.add('card-img-top');

                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');

                const titleElement = document.createElement('h5');
                titleElement.textContent = title;
                titleElement.classList.add('card-title');

                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = description;
                descriptionElement.classList.add('card-text');

                const dateElement = document.createElement('p');
                dateElement.textContent = `Fecha: ${new Date(date).toLocaleDateString()}`;
                dateElement.classList.add('card-text');

                // Añadimos los elementos al contenedor
                cardBody.appendChild(titleElement);
                cardBody.appendChild(descriptionElement);
                cardBody.appendChild(dateElement);
                resultDiv.appendChild(imageElement);
                resultDiv.appendChild(cardBody);

                resultsContainer.appendChild(resultDiv);
            });
        } else {
            alert('No se encontraron imágenes.');
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }
}

// Evento al hacer clic en el botón de búsqueda
document.getElementById('btnBuscar').addEventListener('click', function() {
    const query = document.getElementById('inputBuscar').value.trim();
    if (query) {
        searchNASAImages(query);
    } else {
        alert('Por favor, ingresa un término de búsqueda.');
    }
});
