class App {
    init() {
        THREE.Object3D.DefaultUp.set(0, 0, 1);

        // SCENE
        this.scene = new THREE.Scene();
        this.container = document.getElementById('ThreeJS');

        // RENDERER
        if (Detector.webgl) {
            this.renderer = new THREE.WebGLRenderer({ antialias: true });
        } else {
            this.renderer = new THREE.CanvasRenderer();
        }

        this.renderer.gammaInput = this.renderer.gammaOutput = true;

        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        document.body.appendChild(this.renderer.domElement);

        // CAMERA
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 3000);
        this.camera.position.set(0, -30, 50);
        this.scene.add(this.camera);
        // this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        // THREEx.WindowResize(this.renderer, this.camera);

        // Background clear color
        this.renderer.setClearColor(0xffffff, 1);
        this.renderer.clear();
        this.scene.add(new THREE.HemisphereLight(0xffffff, 0x222222));
        var grid = new THREE.GridHelper(50, 50, new THREE.Color('yellow'), new THREE.Color('grey'));
        grid.rotation.x = Math.PI / 2;
        this.scene.add(grid);
        this.scene.add(new THREE.Mesh(new THREE.SphereGeometry(10)));

        // Lights
        [[1, 1, 1],[-1, 1, 1],[1, -1, 1],[-1, -1, 1]].forEach((pos) => {
            var dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
            dirLight.position.set(pos[0] * 100, pos[1] * 100, pos[2] * 100);
            this.scene.add(dirLight);
        });

        this.animate = this.animate.bind(this);
        // this.animate();
    }

    animate() {
        this.renderer.render(this.scene, this.camera);
        console.log(this.camera.position);
        // requestAnimationFrame(this.animate);
    }
}

window.app = new App();
window.app.init();
