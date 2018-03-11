function processToSRT(csv) {
    var allTextLines = csv.split(/\r\n|\n/);
    var blocks = [];
    for (var i = 1; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
        var number = i;
        var time = data[0];
        var sentence = data[1];
        blocks.push(new Block(number, time, sentence));
    }
    downloadFile(arrayToSRTBlock(blocks), 'data:text/plain;charset=utf-8,', "subtitulos_srt.srt" );
}

function arrayToSRTBlock(blocks){
    var blocksTEXT = "";
    blocks.forEach(function (block) {
        blocksTEXT += block.number + "\n" + block.time + "\n" + block.sentence + "\n";
    });
    return blocksTEXT;
}