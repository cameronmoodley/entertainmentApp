 fetch ('https://omdbapi.com/?apikey=537e0a91&t=')
.then(function(response){
return response.json()
})
.then(function(result){
    console.log(result)
})

function getPosts();{
fetch ('http://omdbapi.com/?apikey=537e0a91&t=%22avengers%22')
.then((res) => res.json())
.then((data) => {
    let output = '<h3>Posts</h3>';
    post.forEach(function(post){
        output +=`
        <h1>${post.title}</h1>
        <p>${post.body}</p>


        
        
        `
    })
})
 let data = [];

function runSearch() {
    let searchInput = document.getElementById("search").value;
    if (searchInput !== "" ){
        fetch('http://www.omdbapi.com/?apikey=537e0a91&t=' + searchInput)

            .then(function (response) {
                console.log(response)
                return response.json()
            })
            .then(function (result) {
                let data = result;
                console.log(result)
                if(!data.Error){
                    let ratingsData = data.Ratings.map(function(rating, index){
                        if(rating.Source === "Internet Movie Database"){
                            return <div>
                            <span>${rating.Source}</span>
                            <span>${rating.Value}</span>
                            </div>
                        }
                    })
                    console.log(data)
            
                    document.getElementById('row').innerHTML += 
                `<div>
                <h1>${data.Title}<h1> 
                <img src="${data.Poster}">
                <p>${ratingsData}</p>
                </div>`;
                
                }
                else{
                 console.log("The movie you are looking for can not be found.")
                }

            }
    }
    else {
        console.log("The movie you are looking for can not be found.")
            }
