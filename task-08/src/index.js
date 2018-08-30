module.exports = function getZerosCount(number, base) {

    /* SOLUTION
    
    To find the number of zeroes in the factorial of the given number in a current notation:
    
    1. Make factorization of the base of the final positional notation. The ratio of these factors will be the condition for the 0 digit in the end of the factorial number in this notation. For instance, in decimal system to receive every 0 we need: {5: 1, 2: 1} - one '5' and one '2'. For the base 60: {2: 2, 3: 1, 5: 1}. For the base 26 - {2:1, 13:1}, where the 13 is not the number, it is the symbol in this notation at the 14th position in its alphabet.
    
    2. Count the number of the chosen factors, e.g. stat = {2: 34, 3: 18}
    
    3. Determine how many 0 digits will be - relate the balance and statistics. E.g. balance = {2: 1, 5 : 1}, statistics = {2: 8, 5: 2}, number = 11, base =10, result = 2
    
    */
    
    var balance = multipliersBalanceToMakeZero(base); // The ratio of a
    
    var statistics = countAllMultipliers(number, balance);
    
    return calcZeroes(balance, statistics);

    /**
     * Makes the factorization of the base and returns the ratio of the prime factors (except the 1) to receive the 0 in the end of the factorial number
     * 
     * @param   {number} base - The base of the final positional notation
     *                        
     * @returns {object} The balance. {key1: value1, key2: value2, ...} to be {factor1: fraction1, factor2: fraction2, ...}. 
     */
    
    function multipliersBalanceToMakeZero(base){
        var bal = {};
        var n2 = base;
        for (var i = 2; i <= base; i++) {
            while(n2%i == 0) { 
                bal[i] = (bal[i])? ++bal[i] : 1;
                n2 /= i;
            }
        }
        return bal;
    }
    /**
     * Counts the quantity of the current factor in the product row (the factorial of the number)
     * 
     * @param   {number} number     The number in decimal notation
     * @param   {string} multiplier  Factor in the product row
     * @returns {number} the quantity 
     */
    function countMultiplier(number, multiplier) {
        var multiplierPower = multiplier;
        var result = 0;
        while(multiplierPower <= number) {
            result += Math.floor(number/multiplierPower);
            multiplierPower *= multiplier;
        }
        return result;  
    }
    /**
     * Makes the statistics. It implements countMultiplier function for every factor
     * 
     * @param   {number} number The number to count the quantity of given multipliers in its factorial
     * @param   {object} bal    Every key of this object is the factor to be counted
     *                          
     * @returns {object} Object with calculated quantities for every factor. {key1: value1, key2: value2, ...} to be {factor1: quantity1, factor2: quantity2, ...}
     */
    function countAllMultipliers(number, bal) { 
        var stat ={};
        for (var key in bal) {
            stat[key] =  countMultiplier(number, key);
        }
        return stat;
    }
    /**
     * Calculates the number of 0 digits: calculates the quantity in one fraction for every factor and takes its minimum
     * 
     * @param   {object} bal  Balance of factors
     * @param   {object} stat Statistics of factors
     *                        
     * @returns {number} the final number of 0 digits
     */
    function calcZeroes(bal, stat) {
        var min;
        var trigger = 1;
        var result;
        for (var key in bal) {
            if(trigger--) {
                result = Math.floor(stat[key] / bal[key]); // Makes any real value for result to find then its min
            }
            min = Math.floor(stat[key] / bal[key]);  
            result = (min < result)? min : result;
        }  
        return result;
    }
}