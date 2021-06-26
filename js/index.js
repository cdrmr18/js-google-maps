let map;

    function initMap() {
        const losAngeles = { lat: 34.063380, lng: -118.358080 };
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 34.063380, lng: -118.358080 },
            zoom: 8,
            center: losAngeles,
        });
        createMarker();
    }

const createMarker = () => {
    new google.maps.Marker({
            position: losAngeles,
            map,
        });
}