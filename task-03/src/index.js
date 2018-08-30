class Sorter {
    constructor() {
        this.store =[];
        this.func = (a, b) =>  (a > b)?  1 : -1;
        this.funcDefault = (a, b) =>  (a > b)?  1 : -1;
        
        
    }

    add(element) {

        this.store.push(element); 


    }

    at(index) {
       
        return this.store[index];
        
    }

    get length() {
        return this.store.length;
    }

    toArray() {

        return this.store;
    }

    sort(indices) {
        // your implementation
        var elems =[];
        var index;


        
        for (var i =0; i < indices.length; i ++) {
            index = indices[i];
            elems.push(this.store[index]);
        }
        
        elems.sort(this.func);
        indices.sort(this.funcDefault);
        for (var i =0; i < indices.length; i ++) {
            index = indices[i];
            this.store[index] = elems[i];
        }

    }

    setComparator(compareFunction) {
        
       this.func =  compareFunction;
        
    }
}

module.exports = Sorter;