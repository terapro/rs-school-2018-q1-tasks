// DO WHATEVER YOU WANT HERE

const createEnumerableProperty = (propName) => propName;

const createNotEnumerableProperty = (name) => {
    Object.defineProperty(Object.prototype, name, {
        set: (val) => Object.prototype.buffer = val,
        get: (val) => Object.prototype.buffer,

    });
    return name;
};

const createProtoMagicObject = () => {
    var magic = function(){};
    magic.prototype = magic.__proto__;
    return magic;

};
const incrementor = () => {
    ++counter;
    return incrementor;

};

incrementor.valueOf= function() {
    return counter;

}

const asyncIncrementor = () => {
    counter2++;
    return asyncIncrementor;
};

asyncIncrementor.valueOf = function() {
    return counter2;

};
const createIncrementer  = function* () {
    var inc = 0;
    while(1) {
        yield ++inc;
    }

};

// return same argument not earlier than in one second, and not later, than in two
const returnBackInSecond = (t) => {
    return new Promise((res) => {
        setTimeout(() => res(t), 1000);
    });



};
const getDeepPropertiesCount = (obj) => {
    var counter = 0;
    var objToCheck =[obj];
    for (var i =0; i < objToCheck.length; i++) {
        counter+= Object.keys(objToCheck[i]).length;
        for(var key in objToCheck[i]) { 
            typeof objToCheck[i][key] == 'object' && objToCheck.push(objToCheck[i][key]);
        }
    }
    return counter;
};
const createSerializedObject = () => {
    return null;
};
const sortByProto = (arr) => { 
    return arr.sort(compareByProto);

}; 
const compareByProto = (a,b) => {
    if (a.__proto__ > b.__proto__) return 1;
    if (a.__proto__ < b.__proto__) return -1;   
}

var counter = 0;
var counter2 = 0;

exports.createEnumerableProperty = createEnumerableProperty;
exports.createNotEnumerableProperty = createNotEnumerableProperty;
exports.createProtoMagicObject = createProtoMagicObject;
exports.incrementor = incrementor;
exports.asyncIncrementor = asyncIncrementor;
exports.createIncrementer = createIncrementer;
exports.returnBackInSecond = returnBackInSecond;
exports.getDeepPropertiesCount = getDeepPropertiesCount;
exports.createSerializedObject = createSerializedObject;
exports.sortByProto = sortByProto;