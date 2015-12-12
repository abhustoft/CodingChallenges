
 var fs  = require("fs"),
     nums = [],
     rnums = [],
     indexMatches = [],
     findLengthOfSequence = function (aIndex, bIndex, sequence) {
         var seqLength = 0,
             theMatch = '';
         for (var a = aIndex, b = bIndex; b < sequence.length; a = a + 1, b = b + 1) {
             if (sequence[a] === sequence[b]) {

                 if (theMatch.indexOf(sequence[a]) !== -1) {
                     // End of sequence, already in the seq
                     console.log(theMatch);
                     return seqLength;
                 }
                 theMatch = theMatch + sequence[a];
                 seqLength = seqLength + 1;
             } else {
                 return seqLength;
             }
         }
         return seqLength;
     };

 fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {

     if (line != "") {

         nums = line.split(' ');
         rnums = nums.map(function (val) {
             return parseInt(val, 10);
         });

        // console.log(rnums);

         rnums.some(function (aValue, aIndex, aNumbers) {
             var restArray = aNumbers.slice(aIndex+1),
                 sequenceLength = 0,
                 aMatch = false;
             debugger;

             aMatch = rnums.some(function (bValue, bIndex, bNumbers) {
                 if (bIndex > aIndex) {
                     if (aValue === bValue) {
                         // Found a match, now see how far aValue+n === bValue+n
                         sequenceLength = findLengthOfSequence(aIndex, bIndex, rnums);

                         //
                         //if (sequenceLength > 0) {
                         //    console.log('seq starts at ', aIndex);
                         //    console.log('ands is this long: ', sequenceLength);
                         //}
                         return true;
                     }
                 }
                 return false;
             });

             return aMatch;

         });


         // Read first number A
         // Loop through rest of the array looking for a match
            //Found a match, look if next number is equal A+1
                //Match, look if next number is equal A+2
                //No match -> first sequence found
         // A not found, read B


         //console.log(answer_line);

     }
 });