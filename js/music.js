const searchBtn = document.querySelector('#searchButton');
let albumContainer = document.querySelector('.album-container');
let searchtext = document.querySelector("#search").value;
let top10 = document.querySelector('.toplist__content');
//let loading = document.querySelector('#loading');
//searchBtn.addEventListener('submit', handelSearch);


function handelSubmit(e) {
    e.preventDefault();
    const searchtext = document.querySelector("#search").value;
    searchResult(searchtext);
}
const form = document.querySelector('#searchForm ')
form.addEventListener('submit', handelSubmit);
//searchBtn.addEventListener('click',() => {searchResult();});




  function searchResult(searchtext) {
      
      
      //loading.innerHTML +=`<img src="img/loading-sirkel.gif">`;
   albumContainer.innerHTML += `<img src="img/loading-sirkel.gif">`;
    fetch(`https://theaudiodb.com/api/v1/json/195003/searchalbum.php?s=${searchtext}`)
        .then((response) => response.json())
        .then((json) => {
            albumContainer.innerHTML = "";
            albumCard(json.album)
        })
        .catch( () => albumContainer.innerHTML +=`
        <h3> Sorry, we couldn't find what you were looking for, please try again!</h3>
        `);
    fetch(`https://theaudiodb.com/api/v1/json/195003/track-top10.php?s=simplyred&s=${searchtext}`)
        .then((response) => response.json())
        .then((json) => {
            top10.innerHTML = ""
            topTenList(json.track)
        });
       
}

    

function albumCard (array) {
    albumContainer.innerHTML = "";

    array.map( (object) => {
let albumCover = "";

if(object.strAlbumThumb){
            albumCover = object.strAlbumThumb;
        }else {
            albumCover = src="img/defult-album-notes.jpg"
        }
        albumContainer.innerHTML += `
        <div class="album-container" id="albumContainer">
                <div class="album">
                    <div class="album__image">
                        <img src="${albumCover}" alt="${object.strAlbum}">
                    </div>
                    <div class="album__title">
                    <h3>${object.strAlbum}</h3>
                    </div>
                    <div class="album__year">
                    <p>${object.strGenre}</p>
                    </div>
                </div>
        `
    })
    
    }


    function topTenList(array) {
        top10.innerHTML = "";
    array.map( (object) => {
        top10.innerHTML += `
                <ul>
                    <li>${object.strTrack}</li>
                </ul>
        `
    })
    }

   
/*
        if(search.value = null){
            document.querySelector('.album__title').innerHTML = "We cound not find the artist you were searching for!";
        }else{
            document.querySelector('.album__title').innerHTML = `Music by ${object.srtArtist}`;
    
        }*/

/* 

      <div class="[ card ]">
        <img src=">
        <h3 class="[ albumTitel ]" id=""></h3> 
        <p class="[ albumDate ]" id="${object.strGenre}"></p>
        </div>



*/



/*function searchResult(searchtext) {
    fetch(`https://theaudiodb.com/api/v1/json/195003/searchalbum.php?s=${searchtext}`)
        .then((response) => response.json())
        .then((json) => albumCard(json.track))
}*/



