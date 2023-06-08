AFRAME.registerComponent('ar-distance', {
    schema: {
        target: { type: 'selector' },
        distance: { type: 'number', default: 5 }
    },
    tick: function () {
        var camera = this.el.sceneEl.camera;
        var target = this.data.target.object3D;
        var distance = this.data.distance;

        var cameraPosition = camera.getWorldPosition(new THREE.Vector3());
        var targetPosition = target.getWorldPosition(new THREE.Vector3());

        var currentDistance = cameraPosition.distanceTo(targetPosition);

        if (currentDistance <= distance) {
            this.data.target.setAttribute('visible', true);
        } else {
            this.data.target.setAttribute('visible', false);
        }
    }
});

AFRAME.registerComponent('placetext', {
    schema: {
        latitude: { type: 'number' },
        longitude: { type: 'number' },
        text: { type: 'string' },
        scale: { type: 'number', default: 10 }
    },
    init: function () {
        const textScale = this.data.scale * 3;
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


        placeEntity.setAttribute('ar-distance', {
            target: textEntity,
            distance: 10
        });


        // Add text entity to place entity
        placeEntity.appendChild(textEntity);

        // Append place entity to scene
        const scene = document.querySelector('#ENTITY');
        scene.appendChild(placeEntity);
    },
});


document.addEventListener('DOMContentLoaded', function () {
    const locations = [
        { latitude: 31.0279391, longitude: 121.4469188, text: 'Hello, Location 1!' },
        { latitude: 31.0282544, longitude: 121.4464867, text: 'Hello, Location 2!' },
        { latitude: 31.0278487, longitude: 121.4472833, text: 'Hello, Location 3!' },
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
