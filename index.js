function main() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(80, 2, 0.1, 50000);
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#canvas1')
    });

    const geom = new THREE.BoxGeometry(20, 20, 20);
    const arjs = new THREEx.LocationBased(scene, camera);

    // You can change the minimum GPS accuracy needed to register a position - by default 1000m
    //const arjs = new THREEx.LocationBased(scene, camera. { gpsMinAccuracy: 30 } );
    const cam = new THREEx.WebcamRenderer(renderer, '#video1');

    const mouseStep = THREE.MathUtils.degToRad(5);


    let orientationControls;

    // Orientation controls only work on mobile device
    if (isMobile()) {
        orientationControls = new THREEx.DeviceOrientationControls(camera);
    }

    let fake = null;
    let targetLongitude = 121.4466584; // Modify the target longitude here
    let targetLatitude = 31.0271672; // Modify the target latitude here
    let targetLongitude1 = 121.4469028; // Modify the target longitude here
    let targetLatitude1 = 31.0271889; // Modify the target latitude here
    let targetLongitude2 = 121.4457913 // Modify the target longitude here
    let targetLatitude2 = 31.0272076; // Modify the target latitude here
    setupObjects(targetLatitude, targetLongitude);
    requestAnimationFrame(render);
    setupObjects(targetLatitude1, targetLongitude1);
    requestAnimationFrame(render);
    setupObjects(targetLatitude2, targetLongitude2);
    requestAnimationFrame(render);
    function isMobile() {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // true for mobile device
            return true;
        }
        return false;
    }

    function render(time) {
        resizeUpdate();
        if (orientationControls) orientationControls.update();
        cam.update();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    function resizeUpdate() {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth, height = canvas.clientHeight;
        if (width != canvas.width || height != canvas.height) {
            renderer.setSize(width, height, false);
        }
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
    }

    function setupObjects(targetlongitude, targetlatitude) {
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const material2 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const material3 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        const material4 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube1 = new THREE.Mesh(geom, material);
        const cube2 = new THREE.Mesh(geom, material2);
        const cube3 = new THREE.Mesh(geom, material3);
        const cube4 = new THREE.Mesh(geom, material4);

        // 根据手机距离立方体的距离，控制立方体的可见性
        arjs.on("gpsupdate", pos => {
            const longitudeDiff = Math.abs(pos.coords.longitude - targetLongitude);
            const latitudeDiff = Math.abs(pos.coords.latitude - targetLatitude);
            if (longitudeDiff < 0.0001 && latitudeDiff < 0.0001) {
                cube1.visible = true;
                cube2.visible = true;
                cube3.visible = true;
                cube4.visible = true;
            } else {
                cube1.visible = false;
                cube2.visible = false;
                cube3.visible = false;
                cube4.visible = false;
            }
            arjs.add(cube1, pos.coords.longitude, pos.coords.latitude + 0.001);
            arjs.add(cube2, pos.coords.longitude, pos.coords.latitude - 0.001); // slightly south
            arjs.add(cube3, pos.coords.longitude - 0.001, pos.coords.latitude); // slightly west
            arjs.add(cube4, pos.coords.longitude + 0.001, pos.coords.latitude);

        });
        arjs.on("gpserror", code => {
            alert(`GPS error: code ${code}`);
        });
        // Uncomment to use a fake GPS location
        //fake = { lat: 51.05, lon : -0.72 };
        if (fake) {
            arjs.fakeGps(fake.lon, fake.lat);
        } else {
            arjs.startGps();
        }
        let mousedown = false, lastX = 0;

        // Mouse events for testing on desktop machine
        if (!isMobile()) {
            window.addEventListener("mousedown", e => {
                mousedown = true;
            });

            window.addEventListener("mouseup", e => {
                mousedown = false;
            });

            window.addEventListener("mousemove", e => {
                if (!mousedown) return;
                if (e.clientX < lastX) {
                    camera.rotation.y += mouseStep;
                    if (camera.rotation.y < 0) {
                        camera.rotation.y += 2 * Math.PI;
                    }
                } else if (e.clientX > lastX) {
                    camera.rotation.y -= mouseStep;
                    if (camera.rotation.y > 2 * Math.PI) {
                        camera.rotation.y -= 2 * Math.PI;
                    }
                }
                lastX = e.clientX;
            });
        }
        
    }
    
}

main();
