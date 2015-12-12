
 var fs  = require("fs"),
     nums = [],
     rnums = [],
     findRestOfSequence = function (aIndex, bIndex, sequence) {
         var theMatch = '';
         for (var a = aIndex, b = bIndex; b < sequence.length; a = a + 1, b = b + 1) {
             if (sequence[a] === sequence[b]) {

                 if (theMatch.indexOf(sequence[a]) !== -1) {
                     // End of sequence, already in the seq
                     return theMatch;
                 }
                 theMatch = theMatch + ' ' + sequence[a];
             } else {
                 return theMatch;
             }
             }
         return theMatch;
     };

 fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {

     if (line != "") {

         nums = line.split(' ');
         rnums = nums.map(function (val) {
             return parseInt(val, 10);
         });

         rnums.some(function (aValue, aIndex) {
             return rnums.some(function (bValue, bIndex) {
                 var cycledSequence = '';

                 if (bIndex > aIndex) {
                     if (aValue === bValue) {
                         // Found a match, now see how far aValue+n === bValue+n
                         cycledSequence = findRestOfSequence(aIndex, bIndex, rnums);
                         console.log(cycledSequence.trim());
                         return true;
                     }
                 }
                 return false;
             });

         });
     }
 });