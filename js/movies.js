// search movie function start

let data = [];
let storedSearches = [];


function runSearch() {
    let searchInput = document.getElementById("search").value;

    if (searchInput !== "") {

        fetch('http://www.omdbapi.com/?apikey=537e0a91&t=' + searchInput)

            .then(function (response) {
                //console.log(response)
                return response.json()
            })
            .then(function (result) {
                document.getElementsByClassName("container").innerHTML+="";
                document.getElementById('movies').innerHTML = "";

                let data = result;
                if (!data.Error) {
                    console.log(data)
                    document.getElementById('movies').innerHTML += `
                    <div>
                        <h1>${data.Title}</h1> 
                        <img src="${data.Poster}">                        
                        <div><span><p>${(data.Ratings.length > 1) ? data.Ratings[1].Source : 'No Rating Available'}</p></span><span><p>${(data.Ratings.length > 1) ? data.Ratings[1].Value : " "}</p></span></div>                        
                        <p> ${data.Genre}</p>
                        <p> ${data.Plot}</p>                        
                    </div>`
                } else {
                    console.log("The movie you are looking for can not be found.")
                }
            })
    } else {
        console.log("The movie you are looking for can not be found.");
    }
}


// loading GIF

function loading() {
    document.innerHTML="";
    let movies = document.getElementById('movies');
    movies.innerHTML = "";
    movies.innerHTML += `<div class="[ loading-animation ]"></div>`;
}


// Store previous searches

function storeSearch() {
    let searchInput = document.getElementById("search").value;
    if (searchInput !== "") {
        if (storedSearches.length <= 4) {
            storedSearches.push(searchInput);
            storedSearches.reverse();
            console.log(storedSearches);
        } else {
            storedSearches.pop();
            storedSearches.push(searchInput);
            storedSearches.reverse();
            console.log(storedSearches);
        }
    } else {
        return;
    }
}


//image slider 

$(document).ready(function () {
    $('.movie-poster').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
        arrows: true,
        dots: false,
        pauseOnHover: false,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 3
            }
        }]
    });
});