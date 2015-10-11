/**
 * Created by abh on 10/10/15.
 */
/*Sample code to read in test cases:*/
var fs  = require("fs");
fs.readFileSync(process.argv[2]).toString().split('\n').forEach(function (line) {
    if (line != "") {
        var seed,
            X,
            Y,
            max,
            buf,
            numbers;

        seed = line.split(' ');

        X = parseInt(seed[0]);
        Y = parseInt(seed[1]);
        max = parseInt(seed[2]);
        buf = Array.apply(null, Array(max)).map(function (curr, ind) {
            return ind+1;
        });

        numbers = buf.map(function (curr) {

            if (!(curr % X) && !(curr % Y)) {
                return 'FB';
            }

            if (!(curr % X)) {
                return 'F';
            }

            if (!(curr % Y)) {
                return 'B';
            }

            return curr;
        });

        console.log(numbers.join(' '));
    }
});