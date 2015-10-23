'strict'
 var fs  = require("fs");
 fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
     if (line != "") {

         var lines = line.split(';'),
             found = [],
             seed = lines[0].split(''),  // Slice down to max 50
             target = lines[1].split(''),//Slice down to max 50

             check = function (characterIndex, subTarget) {
                 var ind;

                 if (subTarget.length === 0) {
                     return found;
                 }

                 ind = subTarget.indexOf(seed[characterIndex]);

                 if (ind > -1) {
                     found.push(seed[characterIndex]);
                     target = subTarget.slice((ind+1));
                     found  = check(characterIndex + 1, target);
                 } else {
                     found  = check(characterIndex, subTarget.slice((1)));
                 }
                 return found;
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