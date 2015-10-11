'strict'
var fs  = require("fs");
fs.readFileSync(process.argv[2],'utf8').split('\n').forEach(function (line) {
    if (line != "") {
        var specification,
            X,
            Y,
            numberCount,
            sizedArray,

            makeNumberList = function (value, index) {
                return index + 1;
            },

            fizzBuzzReplace = function (value) {
                if (!(value % X) && !(value % Y)) {
                    return 'FB';
                }

                if (!(value % X)) {
                    return 'F';
                }

                if (!(value % Y)) {
                    return 'B';
                }

                return value;
            };

        specification = line.split(' ');

        X = parseInt(specification[0]);
        Y = parseInt(specification[1]);
        numberCount = parseInt(specification[2]);
        sizedArray  = Array.apply(null, Array(numberCount));

        console.log(sizedArray.map(makeNumberList).map(fizzBuzzReplace).join(' '));
    }
});