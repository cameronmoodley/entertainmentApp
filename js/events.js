fetch('https://www.skiddle.com/api/v1/events/search/?api_key=bb1a569ee05ec6b1cd5ca35f5b0411d8&latitude=53.4839&longitude=-2.2446&radius=5&eventcode=LIVE&order=distance&description=1')
.then((response) => {
    return response.json();
})
.then((result) => {
    createEventCards(result.results)
})


function createEventCards(eventArray){
    let cardDiv = document.getElementById('cards');

    if(eventArray){
        eventArray.map((value) => {
            return cardDiv.innerHTML += `
                <div class="[ col-sm-3 ]">
                    <div class="[ event-card__content ]">
                        <div class="[ event-card ] [ animate ]">
                            <div style="background-image: url('${value.largeimageurl}')" data-mh="cards" class="[ event-card__image ]"></div>
                            <h2>${value.eventname}</h2>
                            <p>${value.description}</p>
                            <button class="[ event-card__trigger ]"">View More</button>
                        </div>
                        <div class="[ event-card__extra-info hide ] [ animate ]">
                            xxxxxxxxxxxxxx
                        </div>
                    </div>
                </div>
            `
        })
    }
    var menu = document.querySelector(".event-card__trigger");

    for(var i = 0; i < menu.length; i++){
        menu[i].addEventListener("click", function(e){
            var el = e.target.parentElement;
            el.classList.add("hide")
        });
    }
}