
mapboxgl.accessToken =
    "pk.eyJ1IjoiY2hyaXNrOTEiLCJhIjoiY2t5bG9mb3luMHBtZjJvbjcxZHU3ZXFqayJ9.cDIMpq_fXFiA6SbitlzREQ";
const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/mapbox/outdoors-v11", // style URL
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 10, // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h5>${campground.title}</h5>
                <p>${campground.location}</p>`
            )
    )
    .addTo(map);