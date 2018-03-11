function processToSTR(csv) {
    var allTextLines = csv.split(/\r\n|\n/);
    var blocks = [];
    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
        var number = i;
        var time = data[0];
        var sentence = data[1];
        blocks.push(new Block(number, time, sentence));
    }
    console.log(blocks);

    var blocksTEXT = "";
    blocks.forEach(function (block) {
        blocksTEXT += block.number + "\n" + block.time + "\n" + block.sentence + "\n";
    });
    downloadSTR(blocksTEXT);
}

function downloadSTR(text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', "subtitulos_str.str");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}