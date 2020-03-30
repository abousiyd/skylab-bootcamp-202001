
function addMethodToggleToArray() {
    if (typeof Array.prototype.toggle === 'undefined')
    // agregamos la funcionalidad toggle al array (cn prototyp agregamos mas metodos)
    Array.prototype.toggle = function (value) {

        // buscamos la posision 
        const index = this.findIndex(_value => _value === value)

        //si la posision no es -1 (no existe el elemento) pues lo elimino cn splice()
        if (index > -1) this.splice(index, 1)
        else this.push(value)
    }
}
export default addMethodToggleToArray;

