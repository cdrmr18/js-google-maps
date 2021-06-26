let map;

    function initMap() {
        const latlng = { lat: 34.063380, lng: -118.358080 };
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: 34.063380, lng: -118.358080 },
            zoom: 8,
            center: latlng,
        });
        getStores();
    }

const searchLocationsNear = (stores) => {
    let bounds = new google.maps.LatLngBounds();

    stores.forEach((store, index) => {
        let latlng = new google.maps.LatLng(
            store.location.coordinates[1],
            store.location.coordinates[0]
        );
        let name = store.storeName;
        let address = store.addressLines[0];
        bounds.extend(latlng);
        createMarker(latlng, name, address);
    });
    map.fitBounds(bounds);
}

const getStores = () => {
    const apiURL = 'http://localhost:3000/api/stores'

    fetch(apiURL)
    .then((response) => {
        if(response.status == 200) {
            return response.json();
        } else {
            throw new Error(response.status);
        }
    }).then((data) => {
        searchLocationsNear(data);
    })
}

const createMarker = (latlng, name, address) => {
    new google.maps.Marker({
            position: latlng,
            map,
        });
}