function initMap() {

    var location = {lat: 55.911328751879964, lng: -3.321574542053874};
    
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: location
    });

    function addMarker(property) {
        const marker = new google.maps.Marker({
            position: property.location,
            map: map
        });

        if (property.content) {
            const detailWindow = new google.maps.InfoWindow({
                content: property.content
            });


            marker.addListener("mouseover", () => {
                detailWindow.open(map, marker);
            });
        
            marker.addListener("mouseout", () => {
                detailWindow.close(map, marker);
            });
        }
    }

    addMarker({location: location});
    
}