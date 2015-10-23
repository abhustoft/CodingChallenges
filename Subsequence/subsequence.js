'strict'
 var fs  = require("fs");
 fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
     if (line != "") {

         var lines = line.split(';'),
             found = [],
             seed = lines[0].split(''),
             target = lines[1].split(''),

             check = function (characterIndex, subTarget) {
                 var ind = subTarget.indexOf(seed[characterIndex]);

                 if (ind > -1) {
                     // Register the find
                     found.push(seed[characterIndex]);

                     // Look for next char in target *after* position of first find
                     // Next seed char should also look *after* this position in target
                     target = subTarget.slice((ind+1));

                     if(subTarget.length > 0) {
                         found = check(characterIndex + 1, target);
                         return found;
                     } else {
                         // Got to the end of target string, return result
                         return found;
                     }
                 } else {
                     if(subTarget.length > 0) {
                         found = check(characterIndex, subTarget.slice((1)));
                         return found;
                     } else {
                         return found;
                     }
                 }
             },

         longestFind = seed.reduce(function (previousValue, currentValue, seedIndex) {
            var currentValueFound = check(seedIndex, target);

             if (currentValueFound.length > found.length) {
                 found = currentValueFound;
             }

             return found;

         }, 0);

         console.log(longestFind.join(''));
     }
 });