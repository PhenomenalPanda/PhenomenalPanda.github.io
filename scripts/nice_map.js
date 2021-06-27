// Initialize and add the map
function initMap() {
  // The location of Uluru
  const US = { lat: 39.8097343, lng: -98.5556199 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: US,
    optimized: true
  });
  // The marker, positioned at Uluru
  const markers = places.map(x=>(
  	{
    	lat: x['Latitude:'], 
      lng: x['Longitude:'],
      name: x["Name:"],
      address: x["Address:"] ? x["Address:"]:"", 
      city: x["City:"] ? x["City:"]:"",
      state: x["State:"] ? x["State:"]:"",
      zip: x["Postal Code:"] ? x["Postal Code:"]:'',
      public_private: x["Public/Private:"] == 'PUBLIC' ?  'green' : 'red',
      url: x['URL:'] ? x['URL:'] : null
      }
      ));
  function titleFromMarker(x){
  	const html = x.url ? `<a style='font-weight:bold' href=${x.url}>${x.name}</a><br>
      ${x.address}<br>
      ${x.city}, ${x.state} ${x.zip}` :`<b>${x.name}</b><br>
      ${x.address}<br>
      ${x.city}, ${x.state} ${x.zip}` ;
      return html
  }; 
  const colorAttribute = (x) =>  x.public_private == "PUBLIC" ? 'green' : (x.public_private == "PRIVATE" ? "red" : "yellow") ;
 	const svgFromColor = (col) => {
  	return {
    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: col,
    fillOpacity: 0.9,
    strokeWeight: 0.6,
    rotation: 0,
    scale: 2,
    anchor: new google.maps.Point(15, 30),
  	};
  };
  const infoWindow = new google.maps.InfoWindow();
	const many_marks = markers.map(cords => {
  	return new google.maps.Marker({
    	position: cords,
      map: map,
      icon: svgFromColor(cords.public_private),
      title: titleFromMarker(cords)
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