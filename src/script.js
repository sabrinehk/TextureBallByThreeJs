import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import GUI from 'lil-gui'



let sc = new THREE.Scene()
sc.background = new THREE.Color('#302a73')



let aml = new THREE.AmbientLight('#FFFFFF',0.5)
let direct = new THREE.DirectionalLight('#FFFFFF',0.5)
direct.position.set(1,1,1)
sc.add(aml,direct)



let textureLoader = new THREE.TextureLoader()

let nama1 = textureLoader.load('nama1/asli.webp')
nama1.minFilter = THREE.NearestFilter
nama1.colorSpace = THREE.SRGBColorSpace
let nama1ao = textureLoader.load('nama1/ao.webp')
let nama1dis = textureLoader.load('nama1/dis.webp')
let nama1normal = textureLoader.load('nama1/normal.webp')

let nama2 = textureLoader.load('nama2/asli.webp')
nama2.minFilter = THREE.NearestFilter
nama2.colorSpace = THREE.SRGBColorSpace
let nama2ao = textureLoader.load('nama2/ao.webp')
let nama2dis = textureLoader.load('nama2/dis.webp')
let nama2normal = textureLoader.load('nama2/normal.webp')



let sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5,32,32),
    new THREE.MeshStandardMaterial({
        side:THREE.DoubleSide,
        map:nama1,
        aoMap:nama1ao,
        aoMapIntensity:1,
        displacementMap:nama1dis,
        displacementScale:0.1,
        normalMap:nama1normal,
        normalScale:new THREE.Vector2(1,1),
        metalness:0,
        roughness:0
    })
)


sc.add(sphere)


let vaziat = true;

let btn = document.querySelector('.btn')
btn.addEventListener('click',()=>{
    if(vaziat){
        vaziat = false
        btn.innerHTML = 'texture 2'
        sphere.material.map = nama2
        sphere.material.aoMap = nama2ao
        sphere.material.displacementMap = nama2dis
        sphere.material.normalMap = nama2normal
    }
    else{
        vaziat = true
        btn.innerHTML = 'texture 1'
        sphere.material.map = nama1
        sphere.material.aoMap = nama1ao
        sphere.material.displacementMap = nama1dis
        sphere.material.normalMap = nama1normal
    }
})






let size = {
    width : window.innerWidth,
    height : window.innerHeight
}


let camera = new THREE.PerspectiveCamera(75,size.width/size.height)
camera.position.z = 1.5
sc.add(camera)

window.addEventListener('resize',()=>{
    size.width = window.innerWidth
    size.height = window.innerHeight
    camera.aspect = size.width/size.height
    camera.updateProjectionMatrix()
    renderer.setSize(size.width,size.height)
})



let canvas = document.querySelector('.web')

let renderer = new THREE.WebGLRenderer({
    canvas,
    antialias:true,
    alpha:true
})

renderer.setSize(size.width,size.height)

let orbit = new OrbitControls(camera,canvas)
orbit.enableDamping = true
orbit.maxDistance = 1.5
orbit.minDistance = 1.3
orbit.mouseButtons = {
    LEFT : THREE.MOUSE.ROTATE,
    MIDDLE: THREE.MOUSE.ROTATE,
    RIGHT : THREE.MOUSE.ROTATE
}



const clock = new THREE.Clock()
let animation =()=>{
    orbit.update()
    const elapstime = clock.getElapsedTime()
    renderer.render(sc,camera)
    window.requestAnimationFrame(animation)
}
animation()
