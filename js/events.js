// TODOS AT THE BOTTOM!-------------------------------------------------------------------******

// Variables Section ------------------------------
const eventList = document.getElementById('event-list');
let locationFilter = document.getElementById('event-locations');
let typeFilter = document.getElementById('event-types');
let currentCity = [];
let currentEventType = [];
let userPosition = null;
let activeFilterButton;

let cities = [
  {
    name: 'London',
    latitude: 51.509865,
    longitude: -0.118092
  },
  {
    name: 'Swindon',
    latitude: 51.568535,
    longitude: -1.772232
  },
  {
    name: 'Oxford',
    latitude: 51.752022,
    longitude: -1.257677
  },
  {
    name: 'Chester',
    latitude: 53.189999,
    longitude: -2.89
  }
];

let eventTypes = [
  {
    name: 'All',
    code: 'ALL'
  },
  {
    name: 'Festivals',
    code: 'FEST'
  },
  {
    name: 'Live music',
    code: 'LIVE'
  },
  {
    name: 'Clubbing/Dance music',
    code: 'CLUB'
  },
  {
    name: 'Dating',
    code: 'DATE'
  },
  {
    name: 'Theatre/Dance',
    code: 'THEATRE'
  },
  {
    name: 'Comedy',
    code: 'COMEDY'
  },
  {
    name: 'Exhibitions and Attractions',
    code: 'EXHIB'
  },
  {
    name: 'Kids/Family',
    code: 'KIDS'
  },
  {
    name: 'Bar/Pub',
    code: 'BARPUB'
  },
  {
    name: 'Gay/Lesbian',
    code: 'LGB'
  },
  {
    name: 'Sporting',
    code: 'SPORT'
  },
  {
    name: 'Art',
    code: 'ARTS'
  }
];

//Default Filters
currentEventType = eventTypes.filter(type => type.code === 'ALL');
currentCity = cities.filter(city => city.name === 'London');

//Functions section -------------------------------------------

//Creates the DOM elements for each event returned by the API
const createEvents = data => {
  eventList.innerHTML = '';

  const events = data.results;

  events.forEach(event => {
    const eventWrapper = document.createElement('div');
    const eventTitle = document.createElement('h3');

    eventTitle.innerHTML = event.eventname;

    eventList.appendChild(eventWrapper);
    eventWrapper.appendChild(eventTitle);
  });
};

// gets our GEO-location based on our location then pass those values into the filters
const getLocation = () => {
  if (navigator.geolocation) {
    userPosition = navigator.geolocation.getCurrentPosition(position => {
      let userPosition = {
        name: 'Your Area',
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };
      if (userPosition && cities[cities.length - 1].name !== 'Your Area') {
        currentCity = [];
        cities.push(userPosition);
        currentCity.push(userPosition);
        createLocationFilter();
        fetchAPI();
      }
    });
  } else {
    alert('geolocation is not supported by this browser');
  }
};

// Handles onClick events on Location filters
const filterByLocationHandler = e => {
  currentCity = cities.filter(city => city.name === event.target.innerHTML);
  const previousActiveItem = document.querySelector('.filter-item--active');
  if (previousActiveItem) {
    previousActiveItem.setAttribute('class', 'filter-item');
  }
  e.target.setAttribute('class', 'filter-item filter-item--active');
  createLocationFilter();
  fetchAPI();
};

// creates location filter buttons
const createLocationFilter = () => {
  locationFilter.innerHTML = '';
  if (currentCity[0].name !== 'Your Area') {
    cities = cities.filter(city => city.name !== 'Your Area');
  }
  cities.forEach(city => {
    const filterItem = document.createElement('li');
    const filterButton = document.createElement('button');
    filterButton.innerHTML = city.name;
    if (
      currentCity[0].name === filterButton.innerHTML ||
      currentCity[0].name === 'Your Area'
    ) {
      const previousActiveItem = document.querySelector('.filter-item--active');
      if (previousActiveItem) {
        previousActiveItem.setAttribute('class', 'filter-item');
      }

      filterButton.setAttribute('class', 'filter-item filter-item--active');
    } else {
      filterButton.setAttribute('class', 'filter-item');
    }
    filterButton.addEventListener('click', e => {
      filterByLocationHandler(e);
    });
    locationFilter.appendChild(filterItem);
    filterItem.appendChild(filterButton);
  });
};

//handles onClick events on eventType filter
const filterByTypeHandler = e => {
  currentEventType = eventTypes.filter(
    type => type.name === event.target.innerHTML
  );
  const previousActiveTypeItem = document.querySelector(
    '.filterType-item--active'
  );
  if (previousActiveTypeItem) {
    previousActiveTypeItem.setAttribute('class', 'filterType-item');
  }
  e.target.setAttribute('class', '[ filterType-item filterType-item--active ]');
  createTypeFilter();
  fetchAPI();
};

//creates eventType filter buttons
const createTypeFilter = () => {
  typeFilter.innerHTML = '';
  eventTypes.forEach(type => {
    const filterItem = document.createElement('li');
    const filterButton = document.createElement('button');
    filterButton.innerHTML = type.name;
    if (currentEventType[0].name === filterButton.innerHTML) {
      filterButton.setAttribute(
        'class',
        'filterType-item filterType-item--active'
      );
    } else {
      filterButton.setAttribute('class', 'filterType-item');
    }
    filterButton.addEventListener('click', e => {
      filterByTypeHandler(e);
    });
    typeFilter.appendChild(filterItem);
    filterItem.appendChild(filterButton);
  });
};
// Fetching the events from the API
const fetchAPI = () => {
  fetch(
    `https://www.skiddle.com/api/v1/events/search/?api_key=bb1a569ee05ec6b1cd5ca35f5b0411d8&order=date&latitude=${
      currentCity[0].latitude
    }&longitude=${currentCity[0].longitude}&radius=10${
      currentEventType[0].code === 'ALL'
        ? ''
        : '&eventcode=' + currentEventType[0].code
    }`
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      createEvents(data);
    })
    .catch(err => console.log(err));
};

// initial function calls --------------------------------

// calling functions initially.
fetchAPI();
createLocationFilter();
createTypeFilter();

// TODO: make possible to load in more than the inital 20 events. / Load more
// TODO: add more details for each event and display to the DOM. Image / Button / Description
// TODO: Style the elements CARDS
// TODO: Add unique url for each event to display more info. Venue ID
