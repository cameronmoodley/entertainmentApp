function getQueryStringValue (key) {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}
// variable for the id
let id = getQueryStringValue("id");

fetch(`https://www.skiddle.com/api/v1/events/${id}/?api_key=bb1a569ee05ec6b1cd5ca35f5b0411d8&/`)
  .then((result) => result.json())
  .then((res) => {
      cardSpecific(res);
      
      console.log(res);

  })
      
    
   .catch(err => console.log(err))
    function cardSpecific(result){
        
        
        const event = result.results;
        const venue = result.results.venue;
        const time = result.results.openingtimes;
        const artist = result.results.artists;
        
        document.getElementById('card').innerHTML += `<div class="[ event ]">
        <h1 class="[ event__title ]">${event.eventname}</h1><div class="[ event__underline ]"></div>
        <p class="[ event__date ]">Date: ${event.date}</p>
        <p class="[ event__time ]">Doors open at: ${time.doorsopen}</p>
        <p class="[ event__time ]">Doors close at: ${time.doorsclose}</p>
        <p id="ticket" class="[ event__ticket ]"></p>
        <p class="[ event__price ]">Entry price: ${event.entryprice}</p>  
        <p class="[ event__description ]">${event.description}</p><div class="[ event__underline ]"></div>
        <img src="${event.largeimageurl}" class="[ event__image ]" alt="eventpic">

        
        <h3>Venu: ${venue.name}</h3>
        <h4>Address: ${venue.address}</h4>
        <h4>Phone: ${venue.phone}</h4><div class="[ event__underline ]"></div>
        </div>`
        tickets = () =>{
            const ticketText = document.getElementById('ticket');
            
            if(event.tickets === "true"){
                ticketText.innerHTML = "Tickets: Avaliable";
            }
            else {
                ticketText.innerHTML = "Tickets: Not avaliable"
            }
            
        }
        tickets();
       }


