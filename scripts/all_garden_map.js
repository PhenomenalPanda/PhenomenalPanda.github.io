// https://jsfiddle.net/0wx4215z/39/

// Initialize and add the map
function initMap() {
  // The location of center of US
  const US = { lat: 39.8097343, lng: -98.5556199 };
  // The map, centered at the geographic center of the United States: http://www.kansastravel.org/geographicalcenter.htm
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: US,
  });
  // The markers -- reformat for 
  const markers = places.map(x=>(
  	{
    	lat: x['Latitude:'], 
      lng: x['Longitude:'],
      name: x["Name:"],
      address: x["Address:"] ? x["Address:"]:"", 
      city: x["City:"] ? x["City:"]:"",
      state: x["State:"] ? x["State:"]:"",
      zip: x["Postal Code:"] ? x["Postal Code:"]:''
      }
      ));
  const infoWindow = new google.maps.InfoWindow();
	const many_marks = markers.map(cords => {
  	return new google.maps.Marker({
    	position: cords,
      map: map,
      title: `<b>${cords.name}</b><br>
      ${cords.address}<br>
      ${cords.city}, ${cords.state} ${cords.zip}`
    });
  }).map(marker => {
  	marker.addListener("click", () => {
      infoWindow.close();
      infoWindow.setContent(marker.getTitle());
      infoWindow.open(marker.getMap(), marker);
    });
  });
/*   new MarkerClusterer(map, many_marks, {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  }); */
}