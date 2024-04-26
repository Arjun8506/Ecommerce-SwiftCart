function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showAddress, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  
  function showAddress(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    
    var geocoder = new google.maps.Geocoder();
    var latlng = {lat: latitude, lng: longitude};
    
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
            console.log(results);
          alert("Location Address: " + results[0].formatted_address);
        } else {
          alert('No address found for these coordinates.');
        }
      } else {
        alert('Geocoder failed due to: ' + status);
      }
    });
  }
  
  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  }

export default getLocation