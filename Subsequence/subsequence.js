
 var fs  = require("fs");
 fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
     if (line != "") {

         var lines = line.split(';'),
             first = lines[0],
             second = lines[1],
             LoCoSe = {'regex': '', 'maxLength': 0},
             re;

         console.log(lines);

         re = new RegExp(first[0]);
         //
         //if (second.search(re) != -1) {
         //    console.log('Found ' + re + ' in ', second);
         //    LoCoSe = re;
         //} else {
         //    console.log('Not found ' + re + ' in ', second);
         //}
         //
         //re = new RegExp(first[0] + '.*' + first[1]);
         //
         //if (second.search(re) != -1) {
         //    console.log('Found ' + re + ' in ', second);
         //    LoCoSe = re;
         //} else {
         //    console.log('Not found ' + re + ' in ', second);
         //}
         //
         //re = new RegExp('M.*W');
         //
         //if (second.search(re) != -1) {
         //    console.log('Found ' + re + ' in ', second);
         //    LoCoSe = re;
         //} else {
         //    console.log('Not found ' + re + ' in ', second);
         //}


         // Check if first[0] is in second
          // If yes: check if first[0].*first[1] is in second
          // If no: check if first[1] is in second

         // if yes: check if first[0].*first[1].*first[2] is in second


         //console.log(LoCoSe);

         // Search re: X=0:

         var match = function (re) {
             return second.search(re) != -1;
         };

         var createRegex = function (firstChar, noOfChars) {
             var re = first[firstChar];
             for (var i = firstChar+1; i < firstChar+noOfChars; i++) {
                 re = re + '.*' + first[i];
             }
             return re;
         };

         console.log(createRegex(2,4));

         // Look for pos and all chars after (pos+i)
         for (var pos = 0; pos < first.length; pos++) {

             //Look for 
             for (var sequenceLength = 1; sequenceLength < first.length; sequenceLength++) {
                 re = createRegex(pos, sequenceLength);
                 if (match(re)) {
                     console.log('Found ' + re + ' in ', second);
                     // Go to next position (keep pos, increment seqLen)
                     if (sequenceLength >= LoCoSe.maxLength) {
                         LoCoSe.regex = re;
                         LoCoSe.maxLength = sequenceLength;
                     }
                 } else {
                     console.log('NOT find ' + re + ' in ', second);
                     // Go to next  position: look for pos + (pos+1)
                     //break;
                 }
             }
         }
         console.log('LCS: ', LoCoSe);
     }
 });