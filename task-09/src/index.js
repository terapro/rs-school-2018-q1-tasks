module.exports = function solveSudoku(puzzle) {
    //return the solved puzzle as a 2d array of 9 x 9
    var zerosCount = 0;
    var zerosCount2 = 0;
    var currentDigit;
    var currentCell;
    var current2Cell;
    var digitFactor = 0;
    var marker = [// Sets current Row, Column, Sector for checking
        ['r1c1s1', 'r1c2s1', 'r1c3s1', 'r1c4s2', 'r1c5s2', 'r1c6s2', 'r1c7s3', 'r1c8s3', 'r1c9s3'],
        ['r2c1s1', 'r2c2s1', 'r2c3s1', 'r2c4s2', 'r2c5s2', 'r2c6s2', 'r2c7s3', 'r2c8s3', 'r2c9s3'],
        ['r3c1s1', 'r3c2s1', 'r3c3s1', 'r3c4s2', 'r3c5s2', 'r3c6s2', 'r3c7s3', 'r3c8s3', 'r3c9s3'],
        ['r4c1s4', 'r4c2s4', 'r4c3s4', 'r4c4s5', 'r4c5s5', 'r4c6s5', 'r4c7s6', 'r4c8s6', 'r4c9s6'],
        ['r5c1s4', 'r5c2s4', 'r5c3s4', 'r5c4s5', 'r5c5s5', 'r5c6s5', 'r5c7s6', 'r5c8s6', 'r5c9s6'],
        ['r6c1s4', 'r6c2s4', 'r6c3s4', 'r6c4s5', 'r6c5s5', 'r6c6s5', 'r6c7s6', 'r6c8s6', 'r6c9s6'],
        ['r7c1s7', 'r7c2s7', 'r7c3s7', 'r7c4s8', 'r7c5s8', 'r7c6s8', 'r7c7s9', 'r7c8s9', 'r7c9s9'],
        ['r8c1s7', 'r8c2s7', 'r8c3s7', 'r8c4s8', 'r8c5s8', 'r8c6s8', 'r8c7s9', 'r8c8s9', 'r8c9s9'],
        ['r9c1s7', 'r9c2s7', 'r9c3s7', 'r9c4s8', 'r9c5s8', 'r9c6s8', 'r9c7s9', 'r9c8s9', 'r9c9s9']
    ];
    var digitsSets = [];
    for (var i = 0; i < 27; i++) {
        digitsSets[i] = [true, true, true, true, true, true, true, true, true];
    }

    // It gathers variants for every row, column and sector

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            currentDigit = puzzle[i][j];
            if (currentDigit === 0) {
                zerosCount++;
                puzzle[i][j] = [];
            } else {
                upgradeRCS(i, j, currentDigit);
            }
        }
    }
    do { 
        zerosCount2 = zerosCount;
        cellVariants();
       } while(zerosCount2-zerosCount !== 0);


    return puzzle;


    function checkDigitInSector() {
        for (var s = 1; s < 10; s++) {
            for (var d = 0; d < 9; d++) {
                digitFactor = 0;
                for (var i = 0; i < 9; i++) {
                    for (var j = 0; j < 9; j++) {
                        if (parseInt(marker[i][j][5]) === s) {
                            if ((typeof puzzle[i][j] === 'object' && puzzle[i][j][d]) || (typeof puzzle[i][j] === 'number' && puzzle[i][j] === d + 1)) {
                                digitFactor++;
                                currentDigit = d + 1;
                                currentCell = i;
                                current2Cell = j;
                            }
                        }
                    }
                }
                if (digitFactor === 1) {
                    setCellSolution(currentCell, current2Cell, currentDigit)
                }
                if (digitFactor === 0) {
                    throw new Error('No variants for ' + currentDigit + ' in a sector ' + s)
                }
            }
        }
    }


    function upgradeRCS(i, j, currentDigit) {
        digitsSets[parseInt(marker[i][j][1]) - 1][currentDigit - 1] = false;
        digitsSets[parseInt(marker[i][j][3]) + 8][currentDigit - 1] = false;
        digitsSets[parseInt(marker[i][j][5]) + 17][currentDigit - 1] = false;
    }

    function setCellSolution(i, j, currentDigit) {
        puzzle[i][j] = currentDigit;
        upgradeRCS(i, j, currentDigit);
        zerosCount--;
    }

    function cellVariants() {// It gathers variants for every empty cell
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                if (typeof puzzle[i][j] === 'object') {
                    digitFactor = 0;
                    for (var d = 0; d < 9; d++) {
                        puzzle[i][j][d] = (digitsSets[parseInt(marker[i][j][1]) - 1][d] &&
                                           digitsSets[parseInt(marker[i][j][3]) + 8][d] && digitsSets[parseInt(marker[i][j][5]) + 17][d]);
                        if (puzzle[i][j][d]) {
                            digitFactor++;
                            currentDigit = d + 1;
                        }
                    }
                    if (digitFactor === 1) {// The solution for a cell is found
                        setCellSolution(i, j, currentDigit);
                    }
                    if (digitFactor === 0) {
                        throw new Error('No variants for a сell ')
                    }
                }
            }
        }
    }

    // How many every digit 1..9 can be found in a row, column and sector? Only one time?
    function checkDigitInRow() {
        for (var i = 0; i < 9; i++) {
            for (var d = 0; d < 9; d++) {
                digitFactor = 0;
                for (var j = 0; j < 9; j++) {
                    if ((typeof puzzle[i][j] === 'object' && puzzle[i][j][d]) || (typeof puzzle[i][j] === 'number' && puzzle[i][j] === d + 1)) {
                        digitFactor++;
                        currentDigit = d + 1;
                        currentCell = j;
                    }
                }
                if (digitFactor === 1) {
                    setCellSolution(i, currentCell, currentDigit)
                }
                if (digitFactor === 0) {
                    throw new Error('No variants for ' + currentDigit + ' in a row' + i)
                }
            }
        }
    }

    //Column
    function checkDigitInColumn() {
        for (var j = 0; j < 9; j++) {
            for (var d = 0; d < 9; d++) {
                digitFactor = 0;
                for (var i = 0; i < 9; i++) {
                    if ((typeof puzzle[i][j] === 'object' && puzzle[i][j][d]) || (typeof puzzle[i][j] === 'number' && puzzle[i][j] === d + 1)) {
                        digitFactor++;
                        currentDigit = d + 1;
                        currentCell = i;
                    }
                }
                if (digitFactor === 1) {
                    setCellSolution(currentCell, j, currentDigit)
                }
                if (digitFactor === 0) {
                    throw new Error('No variants for ' + currentDigit + ' in a column')
                }
            }
        }
    }

    // Sector
    function checkDigitInSector()
    {
        for (var s = 1; s < 10; s++) {
            for (var d = 0; d < 9; d++) {
                digitFactor = 0;
                for (var i = 0; i < 9; i++) {
                    for (var j = 0; j < 9; j++) {
                        if (parseInt(marker[i][j][5]) === s) {
                            if ((typeof puzzle[i][j] === 'object' && puzzle[i][j][d]) || (typeof puzzle[i][j] === 'number' && puzzle[i][j] === d + 1)) {
                                digitFactor++;
                                currentDigit = d + 1;
                                currentCell = i;
                                current2Cell = j;
                            }
                        }
                    }
                }
                if (digitFactor === 1) {
                    setCellSolution(currentCell, current2Cell, currentDigit);
                }
                if (digitFactor === 0) {
                    throw new Error('No variants for ' + currentDigit + ' in a sector ' + s)
                }
            }
        }
    }
}
