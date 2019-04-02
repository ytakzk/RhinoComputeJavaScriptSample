var rg

export class Modeler {

    constructor() {

      RhinoCompute.authToken = RhinoCompute.getAuthToken()      
      this.loaded = false
    }

    load(callback) {

      rhino3dm().then((module) => {

        console.log('rhino3dm loaded!')
        rg = module
        callback()
      })

    }

    async compute(gui) {

      if (rg == null) { return }

      const height        = parseFloat(gui.items.height)
      const top_radius    = parseFloat(gui.items.top_radius)
      const bottom_radius = parseFloat(gui.items.bottom_radius)
      const top_freq      = parseFloat(gui.items.top_freq)
      const bottom_freq   = parseFloat(gui.items.bottom_freq)
      const top_phase     = parseFloat(gui.items.top_phase)
      const bottom_phase  = parseFloat(gui.items.bottom_phase)

      // rhino operation
      
      var points1 = new rg.Point3dList(10)
      var points2 = new rg.Point3dList(10)

      for (var i = 0; i < 30; i++) {

        const angle = i / 30 * Math.PI * 2.0
        const topAngle     = i / 30 * Math.PI * 2.0 * top_freq
        const bottomAngle  = i / 30 * Math.PI * 2.0 * bottom_freq

        const r1 = top_radius + top_radius * 0.2 * Math.sin(topAngle)
        const r2 = bottom_radius + bottom_radius * 0.2 * Math.sin(bottomAngle)

        const p1x = Math.cos(angle + top_phase) * r1
        const p1y = Math.sin(angle + top_phase) * r1
        const p2x = Math.cos(angle + bottom_phase) * r2
        const p2y = Math.sin(angle + bottom_phase) * r2

        points1.add(p1x, p1y, -height * 0.5)
        points2.add(p2x, p2y, height * 0.5)
      }

      const curve1 = new rg.NurbsCurve.create(true, 3, points1)
      const curve2 = new rg.NurbsCurve.create(true, 3, points2)

      var objects = await RhinoCompute.Brep.createDevelopableLoft(curve1, curve2, false, false, 20)

      const brep = objects.map(r => rg.CommonObject.decode(r))[0]

      var object = await RhinoCompute.Mesh.createFromBrep(brep)

      // decode the json file returned from the API server
      const meshes = object.map(r => rg.CommonObject.decode(r))

      return meshes[0]
    }
}
