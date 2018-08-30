/**
 * @param preferences - an array of integers. Indices of people, whom they love
 * @returns number of love triangles
 */
module.exports = function getLoveTrianglesCount(preferences = []) {
  
   var count = 0;
        var a, b, c, a2;
                
        for(var i =0; i < preferences.length; i++) {
        a = i+1;
            
        b = preferences[i];
            
        c = preferences[b-1];
            
        a2 = preferences[c - 1];
            
        if (a == a2 && a != b && b != c && a != c ) {
            count++;
            
            
        }    
        }
    
    return count/3;
    
    
    
};
