import {Renderer} from './render.js'
import {Modeller} from './modeller.js'
import {GUI} from './gui.js'
import {Loader} from './loader.js'

const loader    = new Loader()
const renderer  = new Renderer()
const modeller  = new Modeller()

// called when a new mesh is generated
function update() {

    // show a spinner
    loader.show()

    // compute via Rhino.Compute
    modeller.compute(gui).then(mesh => {
  
      // dismiss the spinner
      loader.dismiss()

      // render
      renderer.render(mesh)
  
    })

}

const gui = new GUI(update)

// load rhino3dm module
modeller.load(update)
