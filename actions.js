const stateSelect = document.getElementById('states');
const citySelect = document.getElementById('cities');

const statesUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/';
fetch(statesUrl)
.then(response => response.json())
.then(states => {

  states.sort(orderByName);

  states.map(state => {
    let option = document.createElement('option');
    let textOption = document.createTextNode(state.nome);

    option.setAttribute('value', state.id);
    option.appendChild(textOption);

    stateSelect.appendChild(option);
  });
});

stateSelect.addEventListener('change', async function(e) {
  stateId = this.value;

  const citiesUrl = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/distritos`;

  citySelect.options.length = 1;

  await fetch(citiesUrl)
  .then(response => response.json())
  .then(cities => {
    cities.sort(orderByName);

    cities.map(city => {
      let option = document.createElement('option');
      let optionText = document.createTextNode(city.nome);

      option.setAttribute('value', city.id);
      option.appendChild(optionText);

      citySelect.appendChild(option);
    });
  });
});

function orderByName(a, b) {
  return a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;
}

