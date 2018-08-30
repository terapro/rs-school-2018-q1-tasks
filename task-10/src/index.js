module.exports = function longestConsecutiveLength(arr) {
    var length = arr.length;
    arr.sort((a,b) => a-b);
    max = 1;
    x =1;
    
    for (var i =1 ; i < length; i++) {

        if (arr[i-1] && arr[i] - arr[i-1] == 1) {
            x++;
        } else if (arr[i] !== arr[i-1]){
            max = (x > max)? x : max;
            x = 1; 
        }
    }
    return (length)? max : 0;
}
