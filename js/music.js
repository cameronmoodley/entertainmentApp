const searchBtn = document.querySelector('#searchButton');
let searchFieldValue;


searchBtn.addEventListener('click', (event) => {
    event.preventDefault();
    container.innerHTML = '<div class="loading"><img src="images/loading.gif"></div>';
    lookUp();
  });




function getSearchText() {
    let search = document.querySelector("#searchInput").value;
    if(search.value = null){
        document.querySelector('.h3').innerHTML = "We cound not find the artist you were searching for!";
    }else{
        document.querySelector('.h3').innerHTML = `Music by ${srtArtist}`;

    }

}


function searchResult(searchtext) {
    fetch(`https://theaudiodb.com/api/v1/json/195003/searchalbum.php?s=${searchtext}`)
        .then((response) => response.json())
        .then((json) => albumCard(json.track))
}
searchResult();


let card = document.querySelector('body');

function albumCard (array) {
    array.map( (object) => {

        card.innerHTML += `
        <div class="[ card ]">
        <img src="${object.strMusicVidScreen1}">
        <h3 class="[ albumTitel ]" id="${object.strAlbum}"></h3> 
        <p class="[ albumDate ]" id="${object.strGenre}"></p>
        </div>
        
        `

    })
    
    }