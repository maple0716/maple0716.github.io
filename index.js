AFRAME.registerComponent('pic', {   
    schema: {
        scale: {
            type: 'number',
            default: 10
        }
    },

    init: function () {
        const textScale = this.schema.scale * 100;
        const locations = [
            { latitude: 31.0271378, longitude: 121.4470954, text: 'Hello, Location 1!' },
            { latitude: 31.0269501, longitude: 121.4472652, text: 'Hello, Location 2!' },
            { latitude: 31.0268305, longitude: 121.4473130, text: 'Hello, Location 3!' },
        ]
        const scene1 = document.querySelector('#ENTITY');

        // Call the Hikar API (OpenStreetMap-based) to get local POIs.
        // Note that data is only available for Europe and Turkey.
        for (let i = 0; i < locations.length; i++) {
            const entity = document.createElement('a-entity');
            entity.setAttribute('look-at', '[gps-projected-camera]');
            const text = document.createElement('a-text');
            text.setAttribute('value', locations[i].latitude);
            text.setAttribute('scale', {
                x: textScale,
                y: textScale,
                z: textScale
            });
            text.setAttribute('align', 'center');
            text.setAttribute('position', {
                x: 0,
                y: this.data.scale * 20,
                z: 0
            });
            entity.setAttribute('gps-projected-entity-place', {
                latitude: locations[i].latitude,     
                longitude: locations[i].longitude,
            });
            entity.appendChild(text);
            const box = document.createElement('a-box');
            box.setAttribute('scale', {
                x: this.data.scale * 10,
                y: this.data.scale * 10,
                z: this.data.scale * 10
            });
            box.setAttribute('height', 3);
            box.setAttribute('material', 'color: red;');
            entity.appendChild(box);
            entity.setAttribute('position', {
                x: 0,
                y: this.data.scale * 10,
                z: 0
            });           
            scene1.appendChild(entity);
        };
    }
});
