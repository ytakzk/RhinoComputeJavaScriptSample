# RhinoComputeJavaScriptSample
Online Parametric column design via Rhino Compute Service

Try it out at [https://ytakzk.github.io/RhinoComputeJavaScriptSample/](https://ytakzk.github.io/RhinoComputeJavaScriptSample/).

![ScreenShot](https://github.com/ytakzk/RhinoComputeJavaScriptSample/raw/master/screenshot.png)

## How it works

1. Get your Rhino token via [https://www.rhino3d.com/compute/login](https://www.rhino3d.com/compute/login)
1. Copy the generated token and paste it into the prompt shown on [https://ytakzk.github.io/RhinoComputeJavaScriptSample/](https://ytakzk.github.io/RhinoComputeJavaScriptSample/)
1. Feed model parameters through browsers
1. Create some basic Rhino geometries with rhino3dm.js on the local computer (browser-based)
1. Call RhinoCompute API to compute complicated stuffs and get a JSON file as a result
1. Convert the JSON data into a Rhino geometry
1. Convert the Rhino geometry into Three.js geometry
1. Render it with Three.js

## Dependencies

#### For modelling
* [rhino3dm.js](https://github.com/mcneel/rhino3dm/blob/master/RHINO3DM.JS.md)
* [compute-rhino3d.js](https://developer.rhino3d.com/guides/rhinocommon/compute/compute-javascript-getting-started/)

#### For rendering

* [Three.js](https://threejs.org/)
* [dat.GUI](https://github.com/dataarts/dat.gui)

## Environments

Just tested with the latest Google Chrome but it should work with all the modern browsers.

## Author
ytakzk  
 [https://ytakzk.me](https://ytakzk.me)
