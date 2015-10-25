'strict'
 var fs  = require("fs");
 fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
     if (line != "") {

         var seedStart = 0,
         seedSequencePoint = 0,
         targetPoint = 0,
         foundSequence = [],
         longestSequence = [];

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

         var lines = line.split(';'),
             seed = lines[0].split('').slice(0, 50),  // Slice down to max 50
             target = lines[1].split('').slice(0,50),//Slice down to max 50
             originalTarget = target,

             checkSeedStart = function (seedStart, target) {
                 var ind,
                     subTarget = [];

                 //if (target.length === 0) {
                 //    return found;
                 //}

                 console.log('Start new sequence at: ' + seed[seedStart], seedStart);

                 ind = target.indexOf(seed[seedStart]);

                 if (ind > -1) {
                     seedSequencePoint = seedSequencePoint + 1;
                     foundSequence.push(seed[seedStart]);
                     subTarget = target.slice((ind+1));
                     checkSeedSequencePoint(seedSequencePoint, subTarget);
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
                     checkSeedStart(seedStart, target);
                 }
             },

             checkSeedSequencePoint = function (seedSequencePoint, target) {
                 var ind,
                     subTarget = [];

                 //if (target.length === 0) {
                 //    return found;
                 //}

                 console.log('Check ' + seed[seedSequencePoint] + ' against target ', target);

                 if(seed[seedSequencePoint] === 'm') {
                     console.log('m');
                 }
                 ind = target.indexOf(seed[seedSequencePoint]);

                 if (ind > -1) {
                     foundSequence.push(seed[seedSequencePoint]);

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
                         checkSeedSequencePoint(seedSequencePoint, subTarget);
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
                         checkSeedStart(seedStart, target);
                     } else {
                         seedSequencePoint = seedSequencePoint + 1;
                         checkSeedSequencePoint(seedSequencePoint, target);
                     }
                 }
             };

         checkSeedStart(seedStart, target);
         console.log(longestSequence);

         //longestFind = seed.reduce(function (previousValue, currentValue, seedIndex) {
         //   var currentValueFound = check(seedIndex, target);
         //
         //    if (currentValueFound.length > found.length) {
         //        found = currentValueFound;
         //    }
         //    return found;
         //
         //}, 0);

         //console.log(longestFind.join(''));
     }
 });