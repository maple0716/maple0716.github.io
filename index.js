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
    let first = true;
    let targetLongitude =121.451667; // Modify the target longitude here
    let targetLatitude = 31.024722; // Modify the target latitude here

    arjs.on("gpsupdate", pos => {
        if (first) {
            const longitudeDiff = Math.abs(pos.coords.longitude - targetLongitude);
            const latitudeDiff = Math.abs(pos.coords.latitude - targetLatitude);

            // 检查手机是否接近目标位置（经度和纬度的差值小于某个阈值）
            if (longitudeDiff < 0.001 && latitudeDiff < 0.001) {
                setupObjects(pos.coords.longitude, pos.coords.latitude);
                first = true;
            }
        }
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

    function setupObjects(longitude, latitude) {
        // Use position of first GPS update (fake or real)
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const material2 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const material3 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        const material4 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        arjs.add(new THREE.Mesh(geom, material), longitude, latitude + 0.001); // slightly north
        arjs.add(new THREE.Mesh(geom, material2), longitude, latitude - 0.001); // slightly south
        arjs.add(new THREE.Mesh(geom, material3), longitude - 0.001, latitude); // slightly west
        arjs.add(new THREE.Mesh(geom, material4), longitude + 0.001, latitude); // slightly east
    }

    requestAnimationFrame(render);
}

main();



