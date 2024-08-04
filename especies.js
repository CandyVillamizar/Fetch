informacion = {"id":1,"name":"Colombia","description":"Colombia, oficialmente República de Colombia, es un país de América del Sur con regiones insulares en América del Norte, cerca de la costa caribeña de Nicaragua, así como en el Océano Pacífico. El territorio continental de Colombia limita al norte con el Mar Caribe, al este y noreste con Venezuela, al sureste con Brasil, al sur y suroeste con Ecuador y Perú, al oeste con el Océano Pacífico y al noroeste con Panamá. Colombia está dividida en 32 departamentos y el Distrito Capital de Bogotá, la ciudad más grande del país. Cubre un área de 1.141.748 kilómetros cuadrados (440.831 millas cuadradas) y tiene una población de 52 millones. El patrimonio cultural de Colombia, que incluye lengua, religión, cocina y arte, refleja su historia como colonia española, fusionando elementos culturales traídos por la inmigración de Europa y Medio Oriente, con los traídos por africanos esclavizados, así como con los de los diversos Civilizaciones indígenas anteriores a la colonización. El español es el idioma oficial del estado, aunque el inglés y otros 64 idiomas son idiomas regionales reconocidos.","stateCapital":"Bogotá","surface":1141748,"population":52235050,"languages":["Spanish","English"],"timeZone":"UTC-5","currency":"Colombian Peso","currencyCode":"COP","currencySymbol":"$","isoCode":"CO","internetDomain":".co","phonePrefix":"+57","radioPrefix":"HK","aircraftPrefix":"HK","subRegion":"South America","region":"Americas","borders":["Brazil","Panamá","Ecuador","Venezuela","Perú"],"flags":["https://flagcdn.com/co.svg","https://flagcdn.com/w320/co.png"]}


  
  function pintarInformacion(informacion) {
    let contenedor = document.getElementById("contenedor1")
    let tarjeta = document.createElement('div')
    tarjeta.innerHTML = `
      <p class="card-text">${informacion.description}</p>
      `
    contenedor.appendChild(tarjeta)
  }
  pintarInformacion(informacion);

   

fetch('https://api-colombia.com/api/v1/Invasivespecie')
.then(response => response.json())
.then(species => {
    const tableBody = document.getElementById('species-table-body');
    species.forEach(specie => {
        const row = document.createElement('tr');
        row.style.backgroundColor = specie.riskLevel === 1 ? 'aqua' : (specie.riskLevel === 2 ? 'darkcyan' : 'white');
        row.innerHTML = `
            <td>${specie.name}</td>
            <td>${specie.scientificName}</td>
            <td>${specie.impact}</td>
            <td>${specie.management}</td>
            <td>${specie.riskLevel}</td>
            <td><img src="${specie.urlImage}" alt="${specie.name}" width="100"></td>
        `;
        tableBody.appendChild(row);
    });
    
});

// Función para filtrar la tabla
function filterTable() {
  const input = document.getElementById('filterInput');
  const filter = input.value.toLowerCase();
  const table = document.getElementById('species-table-body');
  const rows = table.getElementsByTagName('tr');

  // Iterar sobre todas las filas de la tabla
  for (let i = 1; i < rows.length; i++) { // Comenzar en 1 para omitir el encabezado
      const cells = rows[i].getElementsByTagName('td');
      if (cells.length > 0) {
          const firstColumnText = cells[0].textContent || cells[0].innerText; // Obtener el texto de la primera columna
          // Verificar si el texto coincide con el filtro
          if (firstColumnText.toLowerCase().indexOf(filter) > -1) {
              rows[i].style.display = ""; // Mostrar la fila
          } else {
              rows[i].style.display = "none"; // Ocultar la fila
          }
      }
  }
}

// Agregar evento de entrada al campo de filtro
document.getElementById('filterInput').addEventListener('keyup', filterTable);