//
// GUI class for parametric modelling
//

export class GUI {

    constructor(updateCallback) {

        const gui = new dat.GUI()

        const Items = function() {

            this.height        = 120
            this.top_radius    = 12
            this.top_freq      = 6.0
            this.top_phase     = 1.7

            this.bottom_radius = 13
            this.bottom_freq   = 2.6
            this.bottom_phase  = 0.3
            this.update = function() {
                
                updateCallback()
            }
        }
    
        this.items = new Items()
        gui.add(this.items, 'height', 70, 140, 1)

        gui.add(this.items, 'top_radius', 10, 20, 1)
        gui.add(this.items, 'top_freq', 1, 10, 1)
        gui.add(this.items, 'top_phase', 0, 3.14, 0.01)

        gui.add(this.items, 'bottom_radius', 10, 20, 1)
        gui.add(this.items, 'bottom_freq', 1, 10, 1)
        gui.add(this.items, 'bottom_phase', 0, 3.14, 0.01)

        gui.add(this.items, 'update')
    }

}