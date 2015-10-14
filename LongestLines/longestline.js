var fs  = require("fs");

var noOfLines,
    lineArray = [];

fs.readFileSync(process.argv[2],'utf8').split('\n').forEach(function (line, lineNo) {
    if (line != "") {

        if (lineNo === 0) {
            noOfLines = parseInt(line, 10);
            return;
        }

        //Make array of array of each line
        lineArray.push(line);
    }
 });

var indexLines = function (line, index) {
    return {'len': line.length,
        'pos': index};
};

var byLength = function (a, b) {
    return b.len - a.len;
};

var printLongest = function (line, index, sortedArray) {
    index < noOfLines ? console.log(lineArray[sortedArray[index].pos]): true;
};

lineArray.map(indexLines).sort(byLength).forEach(printLongest);