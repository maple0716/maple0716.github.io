const latitude = 31.0272076;
const longitude = 121.4466584;
const text= 'hello,weizhi1!';
const latitude1 = 44.504417;
const longitude1 = 121.4457913;
const text1 = 'hello,weizhi2!';
function createARObject(latitude, longitude, text, latitude1, longitude1, text1) {
    const scene = document.querySelector('a-scene');
    const entity = document.createElement('a-box');
    entity.setAttribute('material', 'color: red;');
    entity.setAttribute('scale', '20 20 20');
    entity.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
    scene.appendChild(entity);

    const textEntity = document.createElement('a-entity');
    textEntity.setAttribute('text', `value: ${text}; color: black; align: center; width: 10;`);
    textEntity.setAttribute('position', '0 10 0');
    entity.appendChild(textEntity);

    const entity1 = document.createElement('a-box');
    entity1.setAttribute('material', 'color: red;');
    entity1.setAttribute('scale', '20 20 20');
    entity1.setAttribute('gps-entity-place', `latitude: ${latitude1}; longitude: ${longitude1}`);
    scene.appendChild(entity1);

    const textEntity1 = document.createElement('a-entity');
    textEntity1.setAttribute('text', `value: ${text1}; color: black; align: center; width: 10;`);
    textEntity1.setAttribute('position', '0 10 0');
    entity1.appendChild(textEntity1);
}
createARObject(latitude, longitude, text, latitude1, longitude1, text1);
