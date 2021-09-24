class Product{
    constructor(id, name, amount, cost){
        this.id = Number(id);
        this.name = name;
        this.amount = Number(amount);
        this.cost = Number(cost);
    }

    getValue(){
        return this.amount * this.cost;
    }

    infoHTML(){
        return `<p>${this.id}  ${this.name}  $${this.amount}  $${this.cost}  $${this.getValue()}</p>`;
    }
}

class Inventory{
    constructor(){
        this.products = new Array();
    }

    add(prod){
        if(this._searchPos(prod.id) >= 0 || this.products.length == 20){
            return null;
        }else{
            length = this.products.length;
            for(let i = 0; i < length; i++){
                if(prod.id < this.products[i].id){
                    this.products.push(this.products[length-1]);
                    for(let j = length-1; j > i; j--){
                        this.products[j] = this.products[j-1];
                    }
                    this.products[i] = prod;
                    return prod;
                }
            }
            this.products.push(prod);
            return prod;
        }
    }

    search(id){
        let result = null, pos = this._searchPos(id);

        if(pos >= 0){
            result = this.products[pos];
        }

        return result;
    }

    _searchPos(id){
        let pos = -1;

        for(let i = 0; (i < this.products.length) && (pos == -1); i++){
            if (this.products[i].id == id){
                pos = i;
            }
        }

        return pos;
    }
    
    delete(id){
        let pos = this._searchPos(id);

        if (pos >= 0){
            let prod = this.products[pos];
            for (let i = pos; i < this.products.length-1; i++){
                this.products[i] = this.products[i+1];
            }
            this.products.pop();
            return prod;
        }else{
            return null;
        }
    }

    listN(){
        let list = '';
        for(let i = 0; i < this.products.length; i++){
            list +=  this.products[i].infoHTML();
        }

        return list;
    }

    listR(){
        let list = '';
        for(let i = this.products.length - 1; i >= 0 ; i--){
            list += this.products[i].infoHTML();
        }

        return list;
    }
}

class Interface{
    show(info){
        let details=document.getElementById('detalles');
        details.innerHTML = `<br> La info es: <br> ${info}`;
    }
}

let invent = new Inventory();
let ui = new Interface();
const btnAdd=document.getElementById('btnAdd');
btnAdd.addEventListener('click',()=>{
    let id = document.getElementById('idA').value;
    let name = document.getElementById('name').value;
    let amount = document.getElementById('amount').value;
    let cost = document.getElementById('cost').value;
    let product = new Product(id, name, amount, cost);
    ui.show(invent.add(product).infoHTML());
});

const btnDelete=document.getElementById('btnDelete');
btnDelete.addEventListener('click',()=>{
    let id = document.getElementById('idE').value;
    ui.show(invent.delete(id).infoHTML());
});

const btnSearch=document.getElementById('btnSearch');
btnSearch.addEventListener('click',()=>{
    let id = document.getElementById('idB').value;
    ui.show(invent.search(id).infoHTML());
});

const btnNormalO=document.getElementById('btnNormalO');
btnNormalO.addEventListener('click',()=>{
    ui.show(invent.listN());
});

const btnReverseO=document.getElementById('btnReverseO');
btnReverseO.addEventListener('click',()=>{
    ui.show(invent.listR());
});