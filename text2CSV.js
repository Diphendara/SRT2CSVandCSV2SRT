function downloadCSV(text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=UTF-8,'  + '\uFEFF' + encodeURIComponent(text));
    element.setAttribute('download', "subtitulos_csv.csv");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function processToCSV(lines) {
    var linesWithTrim = lines.map(function (x) {
        return x.trim();
    });
    console.log(linesWithTrim.length);
    var number = "";
    var time = "";
    var sentence = "";
    var blocks = [];
    for (var i = 0; i < linesWithTrim.length; i++) {
        if (linesWithTrim[i].length == 1) {
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
    var blocksTEXT = "Tiempo; Texto\n";
    blocks.forEach(function (x) {
        blocksTEXT += x.time + ";" + x.sentence + " \n";
    });
    downloadCSV(blocksTEXT.trim());
}            