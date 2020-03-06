// verifico d¡si la function remove existe en prototype de array
if (typeof Array.prototype.remove === 'undefined')
    // agregamos la funcionalidad toggle al array (cn prototyp agregamos mas metodos)
    Array.prototype.remove = function (value) {

        // buscamos la posision 
        const index = this.findIndex(_value => _value.id === value)

        //si la posision no es -1 (no existe el elemento) pues lo elimino cn splice()
        if (index > -1) this.splice(index, 1)
    }