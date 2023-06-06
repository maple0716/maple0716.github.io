AFRAME.registerComponent('placetext', {
    schema: {
        latitude: { type: 'number' },
        longitude: { type: 'number' },
        text: { type: 'string' },
        scale: { type: 'number', default: 10 }
    },
    init: function () {
        const textScale = this.data.scale * 10;
        // Create text entity
        const textEntity = document.createElement('a-text');
        textEntity.setAttribute('value', this.data.text);
        textEntity.setAttribute('material', 'color: black;');
        textEntity.setAttribute('scale', {
            x: textScale,
            y: textScale,
            z: textScale
        });
        textEntity.setAttribute('align', 'center');
        textEntity.setAttribute('position', '0 0.5 0');

        // Create place entity
        const placeEntity = document.createElement('a-entity');
        placeEntity.setAttribute('look-at', '[gps-projected-camera]');
        placeEntity.setAttribute('gps-projected-entity-place', {
            latitude: this.data.latitude,
            longitude: this.data.longitude,
        });
        // Add updateDistance component to place entity
        placeEntity.setAttribute('updateDistance', '');


        // Add text entity to place entity
        placeEntity.appendChild(textEntity);

        // Append place entity to scene
        const scene = document.querySelector('#ENTITY');
        scene.appendChild(placeEntity);
        this.updateDistance(); // Call updateDistance method 
    },
    updateDistance: function () {
        const camera = document.querySelector('[gps-camera]');
        const placeEntity = this.el;
        const mobileThreshold = 5; // 5-meter range threshold for mobile devices
        placeEntity.addEventListener('gps-entity-place-loaded', function () {
            const distance = camera.getAttribute('gps-camera').position.distanceTo(placeEntity.object3D.position);
            const isMobile = AFRAME.utils.device.isMobile();
            const textEntity = placeEntity.querySelector('a-text');

            if ((isMobile && distance <= mobileThreshold)) {
                textEntity.setAttribute('visible', 'true');
            } else {
                textEntity.setAttribute('visible', 'false');
            }
        });
    },
    tick: function () {
        this.updateDistance();
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const locations = [
        { latitude: 31.0279391, longitude: 121.4469188, text: 'Hello, Location x!' },
        { latitude: 31.0282544, longitude: 121.4464867, text: 'Hello, Location y!' },
        { latitude: 31.0286181, longitude: 121.4461585, text: 'Hello, Location z!' },
    ];
    const entityContainer = document.querySelector('a-scene');
    for (let i = 0; i < locations.length; i++) {
        const entity = document.createElement('a-entity');
        entity.setAttribute('placetext', {
            latitude: locations[i].latitude,
            longitude: locations[i].longitude,
            text: locations[i].text
        });
        entityContainer.appendChild(entity);
        console.log(locations[i].latitude);
    }
});
