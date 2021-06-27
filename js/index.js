// displays map on page
let infowindow;
let map;

function initMap() {
    const latlng = { lat: 34.063380, lng: -118.358080 };
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 34.063380, lng: -118.358080 },
        zoom: 8,
        center: latlng,
    });
    infowindow = new google.maps.InfoWindow();
    getStores();
}

// search for all locations then create markers for each
const searchLocationsNear = (stores) => {
    let bounds = new google.maps.LatLngBounds();

    stores.forEach((store, index) => {
        let latlng = new google.maps.LatLng(
            store.location.coordinates[1],
            store.location.coordinates[0]
        );
        let name = store.storeName;
        let address = store.addressLines[0];
        let openStatusText = store.openStatusText;
        let phoneNumber = store.phoneNumber;

        bounds.extend(latlng);
        createMarker(latlng, name, address, index, openStatusText, phoneNumber);
    });
    map.fitBounds(bounds);
}

// retrieve all stores info
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

// create a marker on map
const createMarker = (latlng, name, address, storeNumber, openStatusText, phoneNumber) => {
    const marker = new google.maps.Marker({
            position: latlng,
            map,
            label: `${storeNumber + 1}`
        });

    // info window odisplays on click of a marker
    let contentString = `
        <div class="store-info-window">
            <div class="store-info-name">
                ${name}
            </div>
            <div class="store-info-open-status">
                ${openStatusText}
            </div>
            <div class="store-info-address">
                <div class="icon">
                    <i class="fas fa-map-marker-alt"></i>
                </div>
                <span>${address}</span>
            </div>
            <div class="store-info-phone">
                <div class="icon">
                    <i class="fas fa-phone-alt"></i>
                </div>
                <span><a href="tel:${phoneNumber}">${phoneNumber}</a></span>
            </div>
        </div>
    `

    marker.addListener("click", () => {
        infowindow.setContent(contentString);
        infowindow.open({
        anchor: marker,
        map,
        shouldFocus: false,
        });
    });
}