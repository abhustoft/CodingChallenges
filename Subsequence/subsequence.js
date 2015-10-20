
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

         var matchTwo = function (x, y) {

             if (x === y) {
                 console.log(re);
                 return first[x];
             }

             re = first[x] + '.*' + first[y];
             console.log(re);
             return second.search(re) != -1;
         };

         var straightSequence = function (charPos) {

             // Look for pos and all chars after (pos+i)
             for (var pos = charPos; pos < first.length; pos++) {

                 //Look for match of following chars
                 for (var nextChar = pos; nextChar < second.length; nextChar++) {
                    if (matchTwo(pos, nextChar)) {
                        console.log('Found match of ' + first[pos] + ' and ' + first[nextChar]);
                        // Look for match of pos and nextChar AND nextChar+1!
                    } else {
                        console.log('No match of ' + first[pos] + ' and ' + first[nextChar]);
                    }
                 }
             }
         };

         straightSequence(0);


         console.log('LCS: ', LoCoSe);
     }
 });