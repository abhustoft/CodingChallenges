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

             checkNextSeedStart = function () {
                 if (seedStart === seed.length-1){
                     console.log('Checked all seedStarts, found: ' + longestSequence);
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

                 console.log('Longest sequence so far: ', longestSequence.join(''));
                 console.log('Start new sequence at ' + seed[seedStart] + ' (' + seedStart + ') in ' + seed.join('') + ' for ' + target.join(''));

                 if (longestSequence.length > (seed.length - seedSequencePoint)) {
                     console.log('Not possible to find longer than ', longestSequence.length);
                     return;
                 }

                 seedStartIndexInTarget = target.indexOf(seed[seedStart]);

                 if (seedStartIndexInTarget > -1) {
                     foundSequence.push(seed[seedStart]);
                     console.log('Found ' + foundSequence.join(''));

                     if (seedStartIndexInTarget > lowestSeedStartIndexInTarget) {
                         console.log('but need not look for substring of already found, got to next seedStart');
                         checkNextSeedStart();
                     } else {
                         if (seedStartIndexInTarget < lowestSeedStartIndexInTarget) {
                             lowestSeedStartIndexInTarget = seedStartIndexInTarget;
                         }
                         seedSequencePoint = seedSequencePoint + 1;
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
                     console.log('Found ' + foundSequence.join(''));

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
         console.log('\n\nCheck line ' + seed.join('') + ' against ' + originalTarget.join(''));
         checkSeedStart(seedStart, target);
         console.log(longestSequence.join(''));
     }
 });