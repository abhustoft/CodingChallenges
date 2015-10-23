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

             match = function (re) {
                 //console.log(re);
                 return second.search(re) != -1;
             },

             registerLongest = function () {
                 if (re.length > finalRe.length) {
                     finalRe = re;
                 }
             },

             getReForNext = function (nextChar) {
                 prevRe = re;
                 return re + '.*' + nextChar;
             },

             backUpOneAndCheck = function (nextChar, index) {
                 // No match - remove last char in re
                 if (index === (first.length-1)) {
                     return;
                 }
                 return prevRe + '.*' + nextChar;

             },

             checkSequence = function (char, i) {
                 var nextChar = first[i+1];

                 if (match(re)) {
                     //console.log('Found match of ' +  re);
                     registerLongest();
                     re = getReForNext(nextChar);
                 } else {
                     re = backUpOneAndCheck(nextChar, i);

                     if (!re) {
                         return;
                     }
                 }
             },

             charInLine = function (char, index) {
                 var remainingFirstLine = first.slice(index).split('');
                 re = first[index];

                 remainingFirstLine.forEach(checkSequence);
             };

         var firstArr = first.split('');
         firstArr.forEach(charInLine);

         console.log(finalRe.replace(matchRe,''));
     }
 });