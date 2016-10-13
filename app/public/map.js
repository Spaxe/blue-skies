/* jshint esnext:true */
mapboxgl.accessToken = 'pk.eyJ1Ijoic3RldmFnZSIsImEiOiJGcW03aExzIn0.QUkUmTGIO3gGt83HiRIjQw';

var map;
function changeDate(yearstr) {
    console.log(yearstr);
    map.setPaintProperty('planning','fill-color',  {
        property: 'date-start',
        stops: [[Number(yearstr + '0101')-10000, 'green'], [Number(yearstr + '0101'), 'red'], [ Number(yearstr + '0101') + 10000, 'yellow']]
    });
    map.setPaintProperty('planning-outline','line-color',  {
        property: 'date-start',
        stops: [[Number(yearstr + '0101')-10000, 'green'], [Number(yearstr + '0101'), 'red'], [ Number(yearstr + '0101') + 10000, 'yellow']]
    });
}

function addLayers(data) {
    window.layers = data;//ha!
    map.addSource('sky', {
        type: 'geojson',
        data: window.layers
    });
    map.addLayer({
        id: 'planning-outline',// + feature.properties.name,
        type: 'line',
        source: 'sky',
        paint: {
            'line-color': 'black',
            'line-width': 2
        },
        filter: [ '==', 'layer', 'Planning' ]
            
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
            'fill-opacity': 0.4,
            'fill-outline-color': 'red'
        },
        filter: [ '==', 'layer', 'Planning' ]
            
    });
    map.addLayer({
        id: 'interestarea',
        type: 'fill',
        source: 'sky',
        paint: {
            'fill-color': 'purple',
            'fill-opacity': 0.1,
            'fill-outline-color': 'purple'
        },
        filter: [ '==', 'layer', 'InterestArea' ]
            
    });
    map.addLayer({
        id: 'interestarea-line',
        type: 'line',
        source: 'sky',
        paint: {
            'line-color': 'purple',
            'line-opacity': 0.7,
            'line-width': 2,
            'line-dasharray': [4,2]
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
            'icon-image': 'triangle-stroked-15',
            'icon-size': 1.5
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
        },
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

    changeDate('2016');
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
            var p = features[0].properties;
            var name = p.name;
            var description = p.description;
            var status = p.status;
            var actions;
            var cb = '<input type="checkbox">';
            if (layer === 'interestarea') {
                actions = `<div class="popup-actions">Notify me about:<br/>${cb}Building activity<br/>${cb}Events</div>`;
                description = '';
            } else if (description) {
                actions = `<div class="popup-actions">☰ Comment<br/>`;
                if (p.following === 'true') {
                    actions += `★ You're following this.<br/>`;
                } else {
                    actions += '★ Follow this <br/>';
                }
                actions += '✖ Not interested</div>';
            }
            
            var html = `<div class="popup-type-${layer}">` + 

                        '<h3>' + (layer === 'roadclosures' ? '🚧 ' : '') + `${name}</h3>` +
                        
                        (description ? `<div class="popup-description">${description}</div>` : '') +
                        (status ? `<div class="popup-status">${status}</div>` : '') +
                        actions + '</div>';
            /*if (layer === 'roadclosures') {
                html = '🚧' + html;
            }*/
            var popup = new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML(html)
                .addTo(map);
            return true;
        }
    }


    map.on('click', function (e) {
        makePopup('planning', e) || makePopup('roadclosures', e) || makePopup('interestarea', e) || makePopup('events', e);
    });

}

map = new mapboxgl.Map({
    container: 'mapid',
    style: 'mapbox://styles/stevage/ciu69dbol00fa2in53n9qcpy4',
    center: [144.95, -37.8], 
    zoom: 13
});

map.on('load', () => {
    getJSON('https://gist.githubusercontent.com/stevage/423816068ba7273adec25387a82a1f59/raw/map.geojson', 
        data => addLayers(data)
    );
} );


document.getElementById('time-slider').addEventListener('input', function(e) {
    console.log(e);
    changeDate(e.target.value);
});

function getJSON(url, callback) {
    var request = new XMLHttpRequest();

    request.open('GET', url, true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          // Success!
          var data = JSON.parse(request.responseText);
          console.log(data);
          callback(data);
        } else {
          // We reached our target server, but it returned an error

        }
    };
    request.send();
}

document.getElementById('address-box').addEventListener('change', function(e) {
    $('#map-wrapper').show();
    /*$('#mapid').show();
    $('#slider-wrapper').show();*/
    getJSON('https://nominatim.openstreetmap.org/search/' + encodeURIComponent(e.target.value)  +  ', VIC, Australia'+ '?format=json', function(data) {
        if (data.length > 0) {
            map.flyTo( { center: [data[0].lon,data[0].lat] });
        }
    });
  //  http://nominatim.openstreetmap.org/search/111%20miller%20st%20fitzroy%20north%20australia?format=json
});