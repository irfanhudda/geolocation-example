$(function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(doneGeo, errorGeo)
    } else {
        // Not supported
        $('#map').text('Not supported');
    }
});

function doneGeo(postion) {
    var latitude = postion.coords.latitude;
    var longitude = postion.coords.longitude;
    $('#latitude').text('Latitude: ' + latitude);
    $('#longitude').text('Longitude: ' + longitude);
    var centerG = new google.maps.LatLng(latitude, longitude);
    var map = new google.maps.Map(document.getElementById('map'), {
        center: centerG,
        zoom: 15
    });

    var marker = new google.maps.Marker({
        position: centerG,
        map: map,
        title: 'You are here!'
    });

    // Get address

    $.ajax({
        url: 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true',
        success: function(data) {
            $( "#area" ).html(data.results[0].address_components[2].short_name);
            $( "#city" ).html(data.results[0].address_components[4].short_name);
            $( "#state" ).html(data.results[0].address_components[5].short_name);
            $( "#country" ).html(data.results[0].address_components[6].short_name);
        }
    });
}

function errorGeo() {
    // Something went wrong
    $('#map').text('Something went wrong');
}