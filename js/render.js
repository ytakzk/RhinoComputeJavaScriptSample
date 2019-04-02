export class Renderer {

    constructor() {

        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.renderer.domElement)

        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.set(0, 60, 100)
        this.camera.lookAt(0, 0, 0)
        
        this.scene = new THREE.Scene()
        this.scene.background = new THREE.Color(0xffffff)
        this.scene.add(this.camera)
    
        const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1)
        const material = new THREE.MeshBasicMaterial({ color: 0x0055ff, wireframe: true })
    
        this.mesh = new THREE.Mesh(geometry, material)
        this.scene.add(this.mesh)

        this.animate()
    }

    animate() {

        // this.mesh.rotation.x += 0.01
        // this.mesh.rotation.y += 0.01
        this.mesh.rotation.z += 0.01

        requestAnimationFrame(() => this.animate())
        this.renderer.render(this.scene, this.camera)
    }

    render(mesh) {

        if (mesh == undefined) { return }

        // Convert Rhino mesh to Three.js mesh for rendering

        const geometry = new THREE.BufferGeometry()

        const vertexbuffer = new Float32Array(3 * mesh.vertices().count)
        for (var i = 0; i < mesh.vertices().count; i++) {

          const pt = mesh.vertices().get(i)

          vertexbuffer[i*3]   = pt[0]
          vertexbuffer[i*3+1] = pt[1]
          vertexbuffer[i*3+2] = pt[2]
        }
        
        geometry.addAttribute('position', new THREE.BufferAttribute(vertexbuffer, 3))

        const indices = []
        for (var i = 0; i < mesh.faces().count; i++) {

          const face = mesh.faces().get(i)
          indices.push(face[0], face[1], face[2])

          if(face[2] != face[3]) {

            indices.push(face[2], face[3], face[0])
          }
        }

        geometry.setIndex(indices)
  
        const normalBuffer = new Float32Array(3 * mesh.normals().count)
        for (var i = 0; i < mesh.normals().count; i++) {

          const normal = mesh.normals().get(i)

          normalBuffer[i*3]   = normal[0]
          normalBuffer[i*3+1] = normal[1]
          normalBuffer[i*3+2] = normal[2]
        }

        geometry.addAttribute('normal', new THREE.BufferAttribute(normalBuffer, 3))

        this.mesh.geometry = geometry
      }
}
