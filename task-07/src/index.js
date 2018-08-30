module.exports = function getZerosCount(number) {
    var powers = [];
    var powersLength = 11;
    var result = 0;
    
    for (var i = 0; i < powersLength; i++) {
        powers[i] = (powers[i-1])? powers[i-1] * 5 : 5;
        result += Math.floor(number/powers[i]);
    }
    return result;
}
