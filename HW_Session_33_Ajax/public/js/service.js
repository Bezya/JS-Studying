function Service() {

    this.hideElement = function(element) { element.classList.add('hide') }; //скрывает элемент

    this.showElement = function(element) { element.classList.remove('hide') }; //показывает элемент

    this.inheritance = function(parent, child) { //функция наследования
        let tempChild = child.prototype;
        child.prototype = Object.create(parent.prototype);
        child.prototype.constructor = child;

        for (let key in tempChild) {
            if (tempChild.hasOwnProperty(key)) {
                child.prototype[key] = tempChild[key];
            }
        }
    };
}