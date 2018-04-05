//CONST
var POKEMON_ALL = "https://pokeapi.co/api/v2/pokemon/?limit=151";
var TIME_OUT = 15000;
// VARS
var pokemonCount = 0;


/* Класс, хранилище покемонов
 * Constructor
 * @param URL
 */
function PokemonStorage(url) {
    this.url = url;
    this.arrPokemons = [];
    this.lastOffset = 0;
}


/** Отрисовка дом элементов на основании полученных данных
 * 
 * 
 * @param {any} loadResults - результат AJAX запроса
 */
PokemonStorage.prototype.renderPokemons = function(loadResults) {
    //
    var container = document.getElementById('container');
    var row = document.createElement('div');
    //
    for (var i = 0; i < loadResults['results'].length; i++) {
        var pokemonName = loadResults['results'][i]['name'];
        var item = document.createElement('div');
        var title = document.createElement('div');
        var img = document.createElement('img');
        //
        item.classList.add('item');
        title.classList.add('item__title');
        img.classList.add('item__img');
        //
        title.innerText = pokemonName;
        img.src = 'img/' + (pokemonCount + 1) + '.png';
        //
        item.appendChild(title);
        item.appendChild(img);
        row.appendChild(item);
        //Запишем данные покемона в хранилище
        this.arrPokemons.push({
            id: pokemonCount,
            url: loadResults['results'][i].url,
            name: loadResults['results'][i].name
        });
        pokemonCount++;
    }
    row.classList.add('row');
    container.appendChild(row);
    pokemons = document.querySelectorAll(".item");
    doPokemonsClick(pokemons);
}

/**
 * 
 * 
 */
PokemonStorage.prototype.loadPokemons = function() {
    var pokemons;
    // сохраним контекст хранилища
    var context = this;
    //
    var xhr = new XMLHttpRequest();
    var url = this.url;
    xhr.open('GET', url, true);
    xhr.timeout = TIME_OUT;
    xhr.ontimeout = function() {
        console.log('Время вышло');
        var container = document.getElementById('container');
        container.innerHTML = '<h1 class="error"> Pokemons do not loaded, please press F5 for reload the page</>';
    }
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var loadResults = JSON.parse(xhr.responseText);
                //Передать результаты на отрисовку DOM элементов
                context.renderPokemons(loadResults);
            }
        }
    }
}