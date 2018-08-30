module.exports = function check(str, bracketsConfig) {
    
    var seqRow = [{}]; // All the sequences are pushed into this array. 
    var currentSeq = 0; // Index for seqRow array. This is the base state without opened sequences
    var keyFound = false;
    var bracketsConfigLength = bracketsConfig.length;
    var strLength = str.length
    
    for (var i = 0; i < strLength; i++) {
        keyFound = false;
        for (var j = 0; j < bracketsConfigLength; j++) {
            if (str[i] == seqRow[currentSeq].endKey) {// when opening and closing bracket can be the same
                currentSeq = seqRow[currentSeq].parent;
                keyFound = true;
                break;
            }
            if (str[i] == bracketsConfig[j][0]) { // Creates new sequence for current i
                seqRow.push(new Sequence(bracketsConfig[j][1], currentSeq));
                currentSeq = seqRow.length - 1;
                keyFound = true;
                break;
            }
        }
        if (!keyFound) {
            return false // Error : str has an unknown symbol
        }
    }
    return (currentSeq)? false : true;
    
    function Sequence(endKey, parent) { // Constructor for a sequence
        this.endKey = endKey;
        this.parent = parent;
    }

}
