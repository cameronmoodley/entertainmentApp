let data = [];

function runSearch() {
    let searchInput = document.getElementById("search").value;
    if (searchInput !== "" ){
        fetch('http://www.omdbapi.com/?apikey=537e0a91&t=' + searchInput)

            .then(function (response) {
                //console.log(response)
                return response.json()
            })
            .then(function (result) {
                let data = result;
                //console.log(result)
                if(!data.Error){
                    let ratingsData = data.Ratings.map(function(rating, index){
                        if(rating.Source === "Rotten Tomatoes"){
                            return `<div>
                            <span>${rating.Source}</span>
                            <span>${rating.Value}</span>
                            </div>`
                        }
                    })
                    console.log(data)
    
                    document.getElementById('movies').innerHTML += `<div>
                <h1>${data.Title}<h1> 
                <img src="${data.Poster}">
                <p>${ratingsData}</p>
                <p> ${data.Genre}</p>
                </div>`
                }
                else{
                 console.log("The movie you are looking for can not be found.")
                }
                
            })
    }
    else {
        console.log("The movie you are looking for can not be found.")
    }
}




// navbar

const sidebar = document.getElementById("sidebar");
const sidebarTrigger = document.getElementById("sidebar__trigger"); 

sidebarTrigger.addEventListener('click', () => {
    if(sidebar.classList.contains('isClosed')) {
        sidebar.classList.remove('isClosed');
    } else {
        sidebar.classList.add('isClosed');
    }
})