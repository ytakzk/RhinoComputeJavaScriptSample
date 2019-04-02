//
// Loader class for spinner while fetching stuffs over the Internet
//

export class Loader {

    constructor() {

        this.loader = document.getElementById('loader')
        
    }

    show() {

        this.loader.style.display = 'block'
    }

    dismiss() {

        this.loader.style.display = 'none'
    }

}