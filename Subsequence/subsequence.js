'strict';
 var fs  = require("fs");
 fs.readFileSync(process.argv[2],'utf8').split('\n').forEach(function (line) {
     if (line != "") {

         var seedStart = 0,
             seedSequencePoint = 0,
             foundSequence = [],
             longestSequence = [],
             lines = line.split(';'),
             seed = lines[0].split('').slice(0, 50),  // Slice down to max 50
             target = lines[1].split('').slice(0,50), //Slice down to max 50
             originalTarget = target,
             seedStartIndexInTarget,
             lowestSeedStartIndexInTarget = 50,

             checkNextSeedStart = function () {
                 if (seedStart === seed.length-1){
                     return;
                 } else {
                     seedStart = seedStart + 1;
                 }
                 if (foundSequence.length > longestSequence.length) {
                     longestSequence = foundSequence;
                 }

                 seedSequencePoint = 0;
                 foundSequence = [];
                 target = originalTarget;
                 checkSeedStart(seedStart, target);
             },

             checkSeedStart = function (seedStart, target) {
                 var subTarget = [];

                 if (longestSequence.length > (seed.length - seedSequencePoint)) {
                     return;
                 }

                 seedStartIndexInTarget = target.indexOf(seed[seedStart]);

                 if (seedStartIndexInTarget > -1) {
                     foundSequence.push(seed[seedStart]);

                     if (seedStartIndexInTarget >= lowestSeedStartIndexInTarget) {
                         checkNextSeedStart();
                     } else {
                         if (seedStartIndexInTarget < lowestSeedStartIndexInTarget) {
                             lowestSeedStartIndexInTarget = seedStartIndexInTarget;
                         }
                         seedSequencePoint = seedStart + 1;
                         subTarget = target.slice((seedStartIndexInTarget + 1));
                         if (subTarget.length === 0) {
                             checkNextSeedStart();
                         } else {
                             checkSeedSequencePoint(seedSequencePoint, subTarget);
                         }
                     }
                 } else {
                     checkNextSeedStart();
                 }
             },

             checkSeedSequencePoint = function (seedSequencePoint, target) {
                 var indexOfSequencePoint,
                     lastCharacterInSeed = seedSequencePoint === seed.length - 1,
                     subTarget = [];

                 indexOfSequencePoint = target.indexOf(seed[seedSequencePoint]);

                 if (indexOfSequencePoint > -1) {
                     foundSequence.push(seed[seedSequencePoint]);

                     if (lastCharacterInSeed) {
                         checkNextSeedStart();
                     } else {
                         seedSequencePoint = seedSequencePoint + 1;
                         subTarget = target.slice((indexOfSequencePoint+1));

                         if (subTarget.length === 0) {
                             checkNextSeedStart();
                         } else {
                             checkSeedSequencePoint(seedSequencePoint, subTarget);
                         }
                     }

                 } else {
                     if (lastCharacterInSeed) {
                         checkNextSeedStart();
                     } else {
                         seedSequencePoint = seedSequencePoint + 1;
                         checkSeedSequencePoint(seedSequencePoint, target);
                     }
                 }
             };

         checkSeedStart(seedStart, target);
         console.log(longestSequence.join(''));
     }
 });