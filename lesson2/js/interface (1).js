var storageP = new PokemonStorage(POKEMON_ALL);
storageP.loadPokemons();

//��� ���� �������� "�������" ������� ����� ������ � �������� �� ������� onClick
function doPokemonsClick(poks) {
    for (var i = 0; i < poks.length; i++) {
        var pok_block = poks[i];
        var pok_img = pok_block.childNodes[1];
        addEventListener('click', getPokemonInfo);
    }
}

//�� ����������� �������� ��������� ������� �������� �� 180 ����.
function getPokemonInfo(event) {
    var img = event.target;
    var hz = event.toElement;
    var parent = hz.parentNode;
    var title = parent.childNodes[0];
    var pokemonName = title.innerText;
    //������ � ��������� ������ �� ��������
    for (var i = 0; i < storageP.arrPokemons.length; i++) {
        var elem = storageP.arrPokemons[i];
        if (elem["name"] === pokemonName) {
            var id = elem["id"];
            var url = elem["url"];
            //
            rotatePokemon(url, img);
        }
    }
}

// ���������� ������ �� ��������� �������� ���� �����
function rotatePokemon(url, domElem) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.timeout = TIME_OUT;
    xhr.ontimeout = function() {
        console.log('����� �����');
        var container = document.getElementById('container');
        container.innerHTML = '<h1 class="error"> Pokemon do not answer, please press F5 for reload the page</>';
    }
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var loadResults = JSON.parse(xhr.responseText);
                // �������� �������� ���� �����, ����� ������ ��� �� �����
                var imgBack = loadResults.sprites.back_default;
                frontElemSrc = domElem.src;
                domElem.src = imgBack;
                setTimeout(function() {
                    domElem.src = frontElemSrc;
                }, 1000);
            }
        }
    }
}