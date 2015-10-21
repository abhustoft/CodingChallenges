'strict'
 var fs  = require("fs");
 fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
     if (line != "") {

         var lines = line.split(';'),
             first = lines[0],
             second = lines[1],
             finalRe = '',
             prevRe,
             re = '',
             matchRe = /\.\*/g,
             longestMatch = 0,

             match = function (re) {
                 //console.log(re);
                 return second.search(re) != -1;
             },

             registerLongest = function () {
                 //console.log('Found match of ' +  re.replace(matchRe,''));
                 if (re.length > finalRe.length) {
                     finalRe = re;
                     longestMatch = re.replace(matchRe, '').length;
                     //console.log('Longest match:', longestMatch)
                 }
             },

             getReForNext = function (nextChar) {
                 prevRe = re;
                 return re + '.*' + nextChar;
             },

             backUpOneAndCheck = function (nextChar, index) {
                 // No match - remove last char in re
                 if (index === (first.length-1)) {
                     console.log('End of line for matching ' + first[index] + ' Start on new sequence with ' + first[index+1]);
                     return;
                 }
                 //console.log(re + ' did not match, try ' + prevRe + ' and ' + first[i+1]);
                 return prevRe + '.*' + nextChar;

             },

             checkSequence = function (char, i) {
                 var nextChar = first[i+1];

                 if (match(re)) {
                     registerLongest();
                     re = getReForNext(nextChar);
                     //console.log('Try ' + re);
                 } else {
                     re = backUpOneAndCheck(nextChar, i);
                 }
             },

             charInLine = function (char, index) {
                 var remainingFirst = first.slice(index).split('');
                 re = first[index];

                 remainingFirst.forEach(checkSequence);
             };

         //console.log(lines);

         var firstArr = first.split('');
         firstArr.forEach(charInLine);

         console.log(finalRe.replace(matchRe,''));
     }
 });