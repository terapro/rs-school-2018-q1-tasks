// PLEASE DON'T change function name
module.exports = function makeExchange(currency) {
    const MAX_CURRENCY = 10000;
    const MIN_CURRENCY = 1;
    const COINS = [["H", 50], ["Q", 25], ["D", 10], ["N", 5], ["P", 1]]; // An order corresponds the position in this array of the coin value
    const COINS_QUANTITY = COINS.length;
    var wallet = {};
    var order, coins;

    function findOrder(cur) { // Finds the order
        var order;
        for (var i =0; i < COINS_QUANTITY; i++) {    
            if (cur >= COINS[i][1]) {
                return i;
            }
        } 
    }
    
    if (currency > MAX_CURRENCY) { // Process the limits

        return {error: "You are rich, my friend! We don't have so much coins for exchange"};

    } else if (currency < MIN_CURRENCY)
    {
        return {}
    }
    
    while (currency) { 
        order = findOrder(currency);
        coins = Math.floor(currency/COINS[order][1]);
        wallet[COINS[order][0]] = coins;
        currency = currency%COINS[order][1];
    }
    return wallet;
}
