const my_api_key = 'at_JfNZwNswRleWwXLoHACjWP8uWwQ18';
const search_button = document.getElementById('search-box-button');
const search_input = document.getElementById('search-box');
const ip_address_area = document.getElementById('ip-address');
const location_area = document.getElementById('location');
const timezone_area = document.getElementById('timezone');
const isp_area = document.getElementById('isp');

let map;
//initialize the map
(function() {
  let url = 'https://geo.ipify.org/api/v2/country,city?apiKey=' + my_api_key + '&ipAddress=';
  let latlng;
  fetch(url)
  .then((response) => {
    if(!response.ok) return null;
  
    return response.json();
  }).then((data) => {
    latlng = new L.LatLng(data.location.lat, data.location.lng);
    ip_address_area.innerText = data.ip;
    location_area.innerText = data.location.city + ', ' + data.location.region + ', ' + data.location.country;
    timezone_area.innerText = data.location.timezone;
    isp_area.innerText = data.isp;
  }).catch (() => {
    console.log('Oops! Something went wrong.')
    latlng = new L.LatLng(51.505, -0.09); //London
  }).finally(()=> {
    map = L.map('map').setView(latlng, 13);
    console.log('in finally', map);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);  
    L.marker(latlng).addTo(map); 
  });
})();

search_button.addEventListener('click', () => {
    let url = 'https://geo.ipify.org/api/v2/country,city?apiKey=' + my_api_key + '&ipAddress=' + search_input.value;
    fetch(url)
    .then((response) => {
      if(!response.ok) return console.log('Oops! Something went wrong.');
    
      return response.json();
    }).then((data) => {
      console.log(data);
      updateDOM(data);
    });
});

const updateDOM = (data) => {
    ip_address_area.innerText = data.ip;
    location_area.innerText = data.location.city + ', ' + data.location.region + ', ' + data.location.country;
    timezone_area.innerText = data.location.timezone;
    isp_area.innerText = data.isp;
    let lat = data.location.lat;
    let lng = data.location.lng;
    let latlng = new L.LatLng(lat, lng);
    map.panTo(latlng);
    L.marker(latlng).addTo(map);
}

window.onresize = () => {
  map.invalidateSize();
}
