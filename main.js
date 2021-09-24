class Product{
    constructor(id, name, amount, cost){
        this.id = Number(id);
        this.name = name;
        this.amount = Number(amount);
        this.cost = Number(cost);
    }

    infoHTML(){
        return `<section>
            <div>
                <p>La info es</p>
                    <p>${this.dato}</p>
            </div>
        </section>`;
    }
}

class Inventory{
    constructor(){
        this.products = new Array();
    }

    add(prod){
        if(this._searchPos(prod.id) >= 0){
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
                    return prod.infoHTML();
                }
            }
            this.products.push(prod);
            return prod.infoHTML();
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
            for (let i = pos; i < this.products.length-1; i++){
                this.products[i] = this.products[i+1];
            }
            return this.products.pop();
        }else{
            return null;
        }
    }

    listar(){
        return 'cantidad de elementos html';
    }
}

class Interface{
    show(info){
        let details=document.getElementById('detalles');
        details.innerHTML = info.infoHTML();
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
    invent.add(product);
    ui.show(product);
});