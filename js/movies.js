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
                document.getElementById('movies').innerHTML = "";
                let data = result;
                if (!data.Error) {
                    console.log(data)
                    document.getElementById('movies').innerHTML += `<div>
                <h1>${data.Title}<h1> 
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
        console.log("The movie you are looking for can not be found.")
    }
}




// navbar

const sidebar = document.getElementById("sidebar");
const sidebarTrigger = document.getElementById("sidebar__trigger");

sidebarTrigger.addEventListener('click', () => {
    if (sidebar.classList.contains('isClosed')) {
        sidebar.classList.remove('isClosed');
    } else {
        sidebar.classList.add('isClosed');
    }
})


//modal js


// Get the modal
var modal = document.getElementById('loginModal');

// When the user clicks anywhere outside of the modal, close it

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
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