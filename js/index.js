import {Renderer} from './render.js'
import {Modeler} from './modeler.js'
import {GUI} from './gui.js'

function updated() {

  Pace.start()

  modeler.compute(gui).then(mesh => {

    Pace.stop()

    renderer.render(mesh)
  })

}

const gui = new GUI(updated)

const renderer = new Renderer()
const modeler  = new Modeler()

modeler.load(_ => {

  Pace.start()

  modeler.compute(gui).then(mesh => {

    Pace.stop()

    renderer.render(mesh)
  })

})
