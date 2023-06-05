

AFRAME.registerComponent('placetext', {
    schema: {
        latitude: { type: 'number' },
        longitude: { type: 'number' },
        text: { type: 'string' },
        scale: { type: 'number', default: 10 }
    },
    init: function () {
        const textScale = this.data.scale * 100;
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


        // Add text entity to place entity
        placeEntity.appendChild(textEntity);

        // Append place entity to scene
        const scene = document.querySelector('#ENTITY');
        scene.appendChild(placeEntity);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const locations = [
        { latitude: 31.0271378, longitude: 121.4470954, text: 'Hello, Location x!' },
        { latitude: 31.0269501, longitude: 121.4472652, text: 'Hello, Location y!' },
        { latitude: 31.0268305, longitude: 121.4473130, text: 'Hello, Location z!' },
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
