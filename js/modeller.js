//
// Modeller class based on Three.js
//

var rg // rhino3dm module will be stored

export class Modeller {

    constructor() {

      // authenticate with Rhino.Compute server
      RhinoCompute.authToken = RhinoCompute.getAuthToken()      
    }

    // load rhino3dm module
    load(callback) {

      rhino3dm().then((module) => {

        console.log('rhino3dm loaded!')
        rg = module
        callback()
      })

    }
    
    // parametric modelling through Rhino.Compute API
    async compute(gui) {

      if (rg == null) { return }

      const height        = parseFloat(gui.items.height)
      const top_radius    = parseFloat(gui.items.top_radius)
      const bottom_radius = parseFloat(gui.items.bottom_radius)
      const top_freq      = parseFloat(gui.items.top_freq)
      const bottom_freq   = parseFloat(gui.items.bottom_freq)
      const top_phase     = parseFloat(gui.items.top_phase)
      const bottom_phase  = parseFloat(gui.items.bottom_phase)

      //
      // rhino3dm operation
      //

      // create pointlists
      var points1 = new rg.Point3dList(10)
      var points2 = new rg.Point3dList(10)

      // generate column profiles
      const n = 30
      for (var i = 0; i < n; i++) {

        const angle        = i / n * Math.PI * 2.0

        const topAngle     = i / n * Math.PI * 2.0 * top_freq
        const bottomAngle  = i / n * Math.PI * 2.0 * bottom_freq

        const r1 = top_radius + top_radius * 0.2 * Math.sin(topAngle)
        const r2 = bottom_radius + bottom_radius * 0.2 * Math.sin(bottomAngle)

        const p1x = Math.cos(angle + top_phase) * r1
        const p1y = Math.sin(angle + top_phase) * r1
        const p2x = Math.cos(angle + bottom_phase) * r2
        const p2y = Math.sin(angle + bottom_phase) * r2

        points1.add(p1x, p1y, -height * 0.5)
        points2.add(p2x, p2y, height * 0.5)
      }

      // create nurbscurves from pointlists
      const curve1 = new rg.NurbsCurve.create(true, 3, points1)
      const curve2 = new rg.NurbsCurve.create(true, 3, points2)

      // loft the curves by calling RhinoCompute API (returns a JSON file)
      var objects = await RhinoCompute.Brep.createDevelopableLoft(curve1, curve2, false, false, 5)

      // decode the result
      const brep = objects.map(r => rg.CommonObject.decode(r))[0]

      // create a mesh from the brep by calling RhinoCompute API
      var object = await RhinoCompute.Mesh.createFromBrep(brep)

      // decode it
      const mesh = object.map(r => rg.CommonObject.decode(r))[0]

      return mesh
    }
}
