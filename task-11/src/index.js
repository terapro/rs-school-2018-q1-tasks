class SmartCalculator {
    constructor(initialValue) {
        this.totalSum = 0;
        this.totalProd = 0;
        this.previousNumber = initialValue;
        this.productMode = false;
        this.powerMode = false;
        this.previousPower = 1;
    }
    add(number) {
        this.powerMode && this.resetPowerMode();    
        if(this.productMode) {
            this.productMode = false;
            this.totalSum += this.totalProd * this.previousNumber;   
        } else {
            this.totalSum += this.previousNumber;
        }
        this.previousNumber = number;
        return this;
    }
    subtract(number) {
        this.add(-1 * number);
        return this;
    }
    multiply(number) {
        this.powerMode && this.resetPowerMode();
        if(this.productMode) {
            this.totalProd *= this.previousNumber;   
        } else {
            this.productMode = true;
            this.totalProd = this.previousNumber;
        }
        this.previousNumber = number;
        return this;
    }
    devide(number) {
        this.multiply(1/number); 
        return this;
    }
    pow(number) {
        if(this.powerMode) {
            this.previousPower = Math.pow(this.previousPower, number);
        } else {
            this.powerMode = true;  
            this.previousPower = number;
        }
        return this;
    }
    resetPowerMode() {
        this.previousNumber = (this.previousNumber>=0)? Math.abs(Math.pow(this.previousNumber, this.previousPower)): -1 * Math.abs(Math.pow(this.previousNumber, this.previousPower));
        this.powerMode = false;
    }
    valueOf() {
        this.powerMode && this.resetPowerMode();
        return (this.productMode)? this.totalProd * this.previousNumber + this.totalSum : this.totalSum + this.previousNumber;
    }
}

module.exports = SmartCalculator;