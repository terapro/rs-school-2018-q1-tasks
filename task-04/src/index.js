module.exports = function solveEquation(equation) {

    var stringEls = ['*','x^2', '*', 'x'];
    var a, b, c, d, x1, x2;
    var fragments;
    var answ;

    function splitByFlags(str, flags) { // Splits str by fragments between flags
        var fragments =[]; // elements of str between flag elements
        var startPos = 0; // Start position in str
        var nextPos;
        var length = flags.length;

        for (var i=0; i < length; i++) {
            nextPos = str.indexOf(flags[i], startPos);
            fragments.push(str.substring(startPos, nextPos));
            startPos = nextPos + flags[i].length;
        }
        fragments.push(str.substring(startPos, str.length));

        return fragments;
    }

    function removeSpaces (str) { 
        return str.replace(/\s/g,'');
    }

    equation = removeSpaces(equation);
    fragments = splitByFlags(equation, stringEls);

    a = fragments[0];
    b = fragments[2];
    c = fragments[4];

    d = b * b - 4 * a * c;
    x1 = (-b + Math.sqrt(d))/(2*a);
    x2 = (-b - Math.sqrt(d))/(2*a);

    x1 = Math.round(x1);
    x2 = Math.round(x2);

    answ = [x1, x2].sort((a,b) => a-b);

    return answ;
}
