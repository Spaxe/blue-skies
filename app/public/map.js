/* jshint esnext:true */
mapboxgl.accessToken = 'pk.eyJ1Ijoic3RldmFnZSIsImEiOiJGcW03aExzIn0.QUkUmTGIO3gGt83HiRIjQw';

var map;
function changeDate() {
    map.setPaintProperty('planning','fill-color',  {
        property: 'date-start',
        stops: [[20171101, 'yellow'], [ 20181201, 'red']]
    });
}

function addLayers() {
    map.addSource('sky', {
        type: 'geojson',
        data: window.layers
    });
    map.addLayer({
        id: 'planning',// + feature.properties.name,
        type: 'fill',
        source: 'sky',
        paint: {
            'fill-color': {
                property: 'date-start',
                stops: [[20161101, 'yellow'], [ 20161201, 'red']]
            },
            'fill-opacity': 0.7,
            'fill-outline-color': 'orange'
        },
        filter: [ '==', 'layer', 'Planning' ]
            
    });
    map.addLayer({
        id: 'interestarea',
        type: 'fill',
        source: 'sky',
        paint: {
            'fill-color': 'purple',
            'fill-opacity': 0.7,
            'fill-outline-color': 'purple'
        },
        filter: [ '==', 'layer', 'InterestArea' ]
            
    });
    map.addLayer({
        id: 'interestroute',// + feature.properties.name,
        type: 'line',
        source: 'sky',
        paint: {
            'line-color': 'purple',
            'line-width': 10
        },
        filter: [ '==', 'layer', 'InterestRoute' ]
            
    });
    map.addLayer({
        id: 'roadclosures',// + feature.properties.name,
        type: 'symbol',
        source: 'sky',
        layout: {
            'icon-image': 'circle-15',
            'icon-size': 2
        },
        paint: {
            'icon-color': 'red' // ignored

            //'text-field': 'Road closure'
        },
        /*paint: {
            'line-color': 'purple',
            'line-width': 10
        },*/
        filter: [ '==', 'layer', 'Closures' ]
            
    });
    map.addLayer({
        id: 'permits',// + feature.properties.name,
        type: 'symbol',
        source: 'sky',
        layout: {
            'icon-image': 'embassy-15',
            'icon-size': 2
        },
        paint: {
            'icon-color': 'red' // ignored

            //'text-field': 'Road closure'
        },
        /*paint: {
            'line-color': 'purple',
            'line-width': 10
        },*/
        filter: [ '==', 'layer', 'Permits' ]
            
    });
/*

    window.layers.features.forEach(feature => {
        map.addSource('source-' + feature.properties.name, {
            type: 'geojson',
            data: feature
        });
        map.addLayer({
            id: 'layer-' + feature.properties.name,
            type: 'fill',
            source: 'source-' + feature.properties.name,
            paint: {
                'fill-color': 'blue'
            },
            
        });
    });*/

    map.on('click', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: ['planning'] });

        if (!features.length) {
            return;
        }

        var feature = features[0];

        // Populate the popup and set its coordinates
        // based on the feature found.
        var popup = new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<h3>${feature.properties.name}</h3><div class="popup-actions">☰ Comment<br/>★ Follow this <br/>✖ Not interested</div>`)
            .addTo(map);
    });

}

map = new mapboxgl.Map({
    container: 'mapid',
    style: 'mapbox://styles/stevage/ciu69dbol00fa2in53n9qcpy4',
    center: [144.95, -37.8], 
    zoom: 13
});
map.on('load', addLayers );