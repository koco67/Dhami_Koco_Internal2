const movies = document.getElementById('movies');
const searchBar = document.getElementById('searchBar');

// 1. Create the button
var button = document.createElement("button");
button.innerHTML = "Select movie";

// 2. Append somewhere
var body = document.getElementsByTagName("body")[0];
body.appendChild(button);


let starWarsFilms = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredFilms = starWarsFilms.filter((film) => {
        return (
            film.title.toLowerCase().includes(searchString)
        );
    });
    displayTitles(filteredFilms);
});

const loadTitle = async () => {
    try {
        const res = await fetch('https://swapi.dev/api/films/');
        starWarsFilms = (await res.json()).results;
        displayTitles(starWarsFilms);
    } catch (err) {
        console.error(err);
    }
};

const displayTitles = (results) => {
    const htmlString = results
        .map((film) => {
            return `
            <li class="title">
                <h2>${film.title}</h2>
            </li>
        `;
        })
        .join('');
    movies.innerHTML = htmlString;
};

loadTitle();

function loadSelected(){
    let request = "";
    if(movies.innerHTML.includes("A New Hope")){
        request = "https://swapi.dev/api/films/1/";
    } else if(movies.innerHTML.includes("The Empire Strikes Back")){
        request = "https://swapi.dev/api/films/2/";
    } else if(movies.innerHTML.includes("Return of the Jedi")){
        request = "https://swapi.dev/api/films/3/";
    } else if(movies.innerHTML.includes("The Phantom Menace")){
        request = "https://swapi.dev/api/films/4/";
    } else if(movies.innerHTML.includes("Attack of the Clones")){
        request = "https://swapi.dev/api/films/5/";
    } else if(movies.innerHTML.includes("Revenge of the Sith")){
        request = "https://swapi.dev/api/films/6/";
    }
    fetch(request).then((response) => {
        return response.json();
    }).then( (data) => {
        let p = document.getElementById("selectionLoad");
        console.log(data);
        p.innerHTML = JSON.stringify("Title: " + data.title + " ,Url: " + data.url + " ,Episode_id: " + data.episode_id + " ,Director: " + data.director );
    })
}

// 3. Add event handler
button.addEventListener ("click", function() {
    try{
        loadSelected();
    }catch (err) {
        console.error(err);
    }
});

/**
 * var url = 'https://swapi.dev/api/films/';
 * var data = {username: 'courseya'};
 *
 * fetch(url, {
 *     method: 'POST', //or 'PUT'
 *     body: JSON.stringify(data),
 *     headers: {
 *         'Content-Type': 'application/json'
 *     }
 * }).then(res => res.json())
 * .then(response => console.log('Success:', JSON.stringify(response)))
 * .catch(error => console.error('Error:', error));
 */
