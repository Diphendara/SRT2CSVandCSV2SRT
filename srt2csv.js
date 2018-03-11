function processToCSV(lines) {
    var linesWithTrim = lines.map(function (x) {
        return x.trim();
    });
    var number = "";
    var time = "";
    var sentence = "";
    var blocks = [];
    for (var i = 0; i < linesWithTrim.length; i++) {
        if (checkStartBlock(linesWithTrim[i])) {
            number = linesWithTrim[i];
            continue;
        } else if (linesWithTrim[i].includes("-->")) {
            time = linesWithTrim[i];
            continue;
        } else if (linesWithTrim[i].match(/[a-z]/i)) {
            sentence += linesWithTrim[i];
            continue;
        } else if (linesWithTrim[i].length == 0) {
            //alert(number + "\n" + time + "\n" + sentence);
            blocks.push(new Block(number, time, sentence));
            number = "";
            time = "";
            sentence = "";
        }
    }
    downloadFile(arrayToCSVLine(blocks), 'data:text/csv;charset=UTF-8,'  + '\uFEFF', 'subtitulos_csv.csv');
}  

function arrayToCSVLine(blocks){
    var blocksTEXT = "Tiempo; Texto\n";
    blocks.forEach(function (x) {
        blocksTEXT += x.time + ";" + x.sentence + " \n";
    });
    return blocksTEXT.trim();
}
function checkStartBlock(text){
    return text.length == 1 && text.match(new RegExp('^\\d+$'));
}