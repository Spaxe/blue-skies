/* jshint esnext:true */
mapboxgl.accessToken = 'pk.eyJ1Ijoic3RldmFnZSIsImEiOiJGcW03aExzIn0.QUkUmTGIO3gGt83HiRIjQw';

var map;
function changeDate(yearstr) {
    console.log(yearstr);
    map.setPaintProperty('planning','fill-color',  {
        property: 'date-start',
        stops: [[Number(yearstr + '0101')-10000, 'green'], [Number(yearstr + '0101'), 'red'], [ Number(yearstr + '0101') + 10000, 'yellow']]
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
            'fill-opacity': 0.3,
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
            'line-width': 10,
            'line-opacity': 0.5
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
    map.addLayer({
        id: 'events',
        type: 'symbol',
        source: 'sky',
        layout: {
            'icon-image': 'zoo-15',
            'icon-size': 2
        },
        filter: [ '==', 'layer', 'Events' ]
            
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

    function makePopup(layer, e) {
        var features = map.queryRenderedFeatures(e.point, { layers: [layer] });
        if (features.length) {
            var name = features[0].properties.name;
            var description = features[0].properties.description;
            var status = features[0].properties.status;
            var actions;
            if (layer === 'interestarea') {
                actions = (description ? `<div class="popup-actions">Notify me about:<br/>☑ Building activity<br/>☑Events</div>` : '');
            } else {
                actions = (description ? `<div class="popup-actions">☰ Comment<br/>★ Follow this <br/>✖ Not interested</div>` : '');
            }
            var popup = new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(`<h3>${name}</h3>` +
                         (description ? `<div class="popup-description">${description}</div>` : '') +
                         (status ? `<div class="popup-status">${status}</div>` : '') +
                         actions)
                .addTo(map);
            return true;
        }
    }


    map.on('click', function (e) {
        makePopup('planning', e) || makePopup('roadclosures', e) || makePopup('interestarea', e) || makePopup('events', e);
        /*var features = map.queryRenderedFeatures(e.point, { layers: ['planning'] });
        if (features.length) {
            return makePopup(e.lngLat, features[0].properties.name, features[0].properties.description, features[0].properties.status);
        }
        features = map.queryRenderedFeatures(e.point, { layers: ['roadclosures'] });
        if (features.length) {
            return makePopup(e.lngLat, features[0].properties.name, features[0].properties.description);
        }
        features = map.queryRenderedFeatures(e.point, { layers: ['interestarea'] });
        if (features.length) {
            return makePopup(e.lngLat, features[0].properties.name, '');
        }

        */

        // Populate the popup and set its coordinates
        // based on the feature found.
    });

}

map = new mapboxgl.Map({
    container: 'mapid',
    style: 'mapbox://styles/stevage/ciu69dbol00fa2in53n9qcpy4',
    center: [144.95, -37.8], 
    zoom: 13
});
map.on('load', addLayers );

document.getElementById('time-slider').addEventListener('input', function(e) {
    console.log(e);
    changeDate(e.target.value);
});

document.getElementById('address-box').addEventListener('change', function(e) {
    var request = new XMLHttpRequest();

    request.open('GET', 'http://nominatim.openstreetmap.org/search/' + encodeURIComponent(e.target.value)  +  ', VIC, Australia'+ '?format=json', true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          var data = JSON.parse(request.responseText);
          console.log(data);
          if (data.length > 0) {
            map.flyTo( { center: [data[0].lon,data[0].lat] });
          }
        } else {
          // We reached our target server, but it returned an error

        }
    };
    request.send();
  //  http://nominatim.openstreetmap.org/search/111%20miller%20st%20fitzroy%20north%20australia?format=json
});