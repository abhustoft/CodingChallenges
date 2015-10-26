//    loop A
//    Is seed[seedStart] in target ?
//     No -> Increment Seedstart, looking for new sequence, start on new foundSequence - goto A
//     Yes -> seedSequencePoint = sequenceStart+1 - add sequencePoint to found list - first in new foundSequence
//            Increment targetPoint
//
//
//    Is seed[seedSequencePoint] in target ?
//     Yes -> Increment seedSequencePoint - add sequencePoint to foundSequence
//            Increment targetPoint
//     No -> If seedSequencePoint is last in seed: increment Seedstart, SeedSequencePoint=0,
//                 looking for new sequence, start on new foundSequence
//             if (foundSequence > longestFound) longestFound = foundSequence
//                 - goto A
//             else Increment seedSequencePoint

'strict'
 var fs  = require("fs");
 fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
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

             checkSeedStart = function (seedStart, target) {
                 var subTarget = [];

                 console.log('Longest seq so far: ', longestSequence.join(''));

                 if (longestSequence.length > (seed.length - seedSequencePoint)) {
                     console.log('Not possible to find longer than ', longestSequence.length);
                     return;
                 }
                 console.log('Start new sequence at ' + seed[seedStart] + ' in ' + seed.join('') + ' for ' + target.join(''));

                 seedStartIndexInTarget = target.indexOf(seed[seedStart]);

                 if (seedStartIndexInTarget > -1) {

                     if (seedStartIndexInTarget > lowestSeedStartIndexInTarget) {
                         console.log('Need not look for substring of already found, got to next seedStart');
                         if (seedStart === seed.length-1){
                             console.log('Done in checkSeedStart ' + longestSequence);
                             return;
                         } else {
                             seedStart = seedStart + 1;
                         }
                         if (foundSequence.length > longestSequence.length) {
                             longestSequence = foundSequence;
                         }
                         target = originalTarget;
                         checkSeedStart(seedStart, target);
                     } else {
                         if (seedStartIndexInTarget < lowestSeedStartIndexInTarget) {
                             lowestSeedStartIndexInTarget = seedStartIndexInTarget;
                         }
                         seedSequencePoint = seedSequencePoint + 1;
                         foundSequence.push(seed[seedStart]);
                         console.log('Found ' + foundSequence.join(''));
                         subTarget = target.slice((seedStartIndexInTarget + 1));
                         checkSeedSequencePoint(seedSequencePoint, subTarget);
                     }
                 } else {
                     if (seedStart === seed.length-1){
                         console.log('Done in checkSeedStart ' + longestSequence);
                         return;
                     } else {
                         seedStart = seedStart + 1;
                     }
                     if (foundSequence.length > longestSequence.length) {
                         longestSequence = foundSequence;
                     }
                     target = originalTarget;
                     checkSeedStart(seedStart, target);
                 }
             },

             checkSeedSequencePoint = function (seedSequencePoint, target) {
                 var ind,
                     subTarget = [];

                 if(seed[seedSequencePoint] === 'm') {
                     console.log('m');
                 }
                 ind = target.indexOf(seed[seedSequencePoint]);

                 if (ind > -1) {
                     foundSequence.push(seed[seedSequencePoint]);
                     console.log('Found ' + foundSequence.join(''));

                     if (seedSequencePoint === seed.length-1) {
                         if (seedStart === seed.length-1){
                             console.log('Done in checkSeedSeq ' + longestSequence);
                             return;
                         } else {
                             seedStart = seedStart + 1;
                         }

                         seedSequencePoint = 0;
                         if (foundSequence.length > longestSequence.length) {
                             longestSequence = foundSequence;
                         }
                         foundSequence = [];
                         target = originalTarget;
                         checkSeedStart(seedStart, target);
                     } else {
                         seedSequencePoint = seedSequencePoint + 1;

                         subTarget = target.slice((ind+1));
                         if (subTarget.length === 0) {
                             // End of target line, start new sequence
                             if (seedStart === seed.length-1){
                                 console.log('Done 2 in checkSeedSeq ' + longestSequence);
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
                         } else {
                             checkSeedSequencePoint(seedSequencePoint, subTarget);
                         }
                     }

                 } else {
                     if (seedSequencePoint === seed.length-1) {
                         if (seedStart === seed.length-1){
                             console.log('Done 2 in checkSeedSeq ' + longestSequence);
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
                     } else {
                         seedSequencePoint = seedSequencePoint + 1;
                         checkSeedSequencePoint(seedSequencePoint, target);
                     }
                 }
             };
         console.log('Check lines ' + seed.join('') + ' against ' + originalTarget.join(''));
         checkSeedStart(seedStart, target);
         console.log(longestSequence.join(''));
     }
 });