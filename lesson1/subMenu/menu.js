function Container() {
    this.id = 'container';
    this.className = 'container';
}

Container.prototype.render = function() {
    var div = document.createElement('div');
    div.id = this.id;
    div.className = this.className;

    return div;
}

function Menu(id, className, items) {
    Container.call(this);
    this.id = id;
    this.className = className;
    this.items = items;
}

Menu.prototype = Object.create(Container.prototype);

Menu.prototype.render = function() {
        var ul = document.createElement('ul');
        ul.className = this.className;
        ul.id = this.id;

        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i] instanceof MenuItem) {
                ul.appendChild(this.items[i].render());
            }
        }

        return ul;
    }
    //добавил id и class для возможности удаления
function MenuItem(link, label, id, className) {
    Container.call(this);
    this.link = link;
    this.label = label;
    this.id = id;
    this.className = className;
}

MenuItem.prototype = Object.create(Container.prototype);

MenuItem.prototype.render = function() {
    var li = document.createElement('li');
    li.className = this.className;
    li.id = this.id;
    var a = document.createElement('a');
    a.href = this.link;
    a.textContent = this.label;
    li.appendChild(a);

    return li;
}

Container.prototype.removeElement = function() {
    var elem = document.getElementById(this.id);
    elem.remove();
}

function MenuExt(id, className, items) {
    Menu.call(this);
    this.id = id;
    this.className = className;
    this.items = items;
}

MenuExt.prototype = Object.create(Menu.prototype);

MenuExt.prototype.render = function() {
    var ul = document.createElement('ul');
    ul.className = this.className;
    ul.id = this.id;

    for (var i = 0; i < this.items.length; i++) {
        console.log(this.items[i]);
        if ((this.items[i] instanceof Menu) || (this.items[i] instanceof MenuItem)) {
            ul.appendChild(this.items[i].render());
        }
    }

    return ul;
}