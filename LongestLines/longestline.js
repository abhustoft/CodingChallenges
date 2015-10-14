var fs  = require("fs");

var noOfLines,
    sorted,
    lineArray = [];

fs.readFileSync(process.argv[2],'utf8').split('\n').forEach(function (line, lineNo) {
    if (line != "") {

        debugger;
        if (lineNo === 0) {
            noOfLines = parseInt(line, 10);
            return;
        }

        //Make array of array of each line
        //var aLine = line.split(' ');
        lineArray.push(line);
    }
 });

var indexLine = function (line, index) {
    return {'len': line.length,
        'pos': index};
};

var byLength = function (a, b) {
    return b.len - a.len;
};

var printLongest = function (line, index) {
    if (index < noOfLines) {
        console.log(lineArray[sorted[index].pos]);
    }
};

//Create indexing array: Map over array, create array of line sizes and index


//Sort indexing array
sorted = lineArray.map(indexLine).sort(byLength);

//Output the X longest lines
sorted.forEach(printLongest);
