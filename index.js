document.addEventListener('DOMContentLoaded', function () {
    // 定义经纬度和文字数据（从后端 PHP 文件获得）
    const locations = [
        { latitude: 31.0271378, longitude: 121.4470954, text: 'Hello, Location 1!' },
        { latitude: 31.0269501, longitude: 121.4472652, text: 'Hello, Location 2!' },
        { latitude: 31.0268305, longitude: 121.4473130, text: 'Hello, Location 3!' },
        // 添加更多位置...
    ];
    console.log(locations[0].latitude, locations[0].longitude, locations[0].text)

    // 创建 AR 对象的函数
    function createARObject(latitude, longitude, text) {
        const scene = document.querySelector('#arObjectsContainer');

        // 创建立方体实体
        const entity = document.createElement('a-box');
        entity.setAttribute('material', 'color: red;');
        entity.setAttribute('scale', '5 5 5');
        entity.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
        scene.appendChild(entity);

        // 创建文字实体
        const textEntity = document.createElement('a-entity');
        textEntity.setAttribute('text', `value: ${text}; color: black; align: center; width: 2;`);
        textEntity.setAttribute('position', '0 5 0');
        entity.setAttribute('scale', '5 5 5');
        entity.appendChild(textEntity);
    }

    // 根据数据创建 AR 对象
    for (let i = 0; i < locations.length; i++) {
        const latitude = locations[i].latitude;
        const longitude = locations[i].longitude;
        const text = locations[i].text;
        createARObject(latitude, longitude, text);
    }
});
