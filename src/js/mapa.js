(function() {

    const lat = document.querySelector('#lat').value || -33.4379387;
    const lng = document.querySelector('#lng').value || -70.6504722;
    const mapa = L.map('mapa').setView([lat, lng ], 16);
    let marker

    // Utilizar Provider y Geocoder
    const geocodeService = L.esri.Geocoding.geocodeService();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    // Cambiar de color el pin
    let redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    // El pin
    marker = new L.marker([lat, lng], {
        draggable: true,
        autoPan: true,
        icon: redIcon
    }).
    addTo(mapa)

    // Detectar el movimiento del pin
    marker.on('moveend', function(e){
        marker = e.target;

        const posicion = marker.getLatLng();
        // console.log(posicion);        
        mapa.panTo(new L.latLng(posicion.lat, posicion.lng));

        // Obtener la información de las calles al soltar el pin
        geocodeService.reverse().latlng(posicion, 16).run(function(error, resultado){
            // console.log(resultado);
            
            marker.bindPopup(resultado.address.LongLabel);

            // LLenar los campos
            document.querySelector('.calle').textContent = resultado?.address.Address ?? '';
            document.querySelector('#calle').value = resultado?.address.Address ?? '';
            document.querySelector('#lat').value = resultado?.latlng.lat ?? '';
            document.querySelector('#lng').value = resultado?.latlng.lng ?? '';

        })
    })

})()