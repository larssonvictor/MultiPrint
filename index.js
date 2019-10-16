const fs = require('fs');

const getRandomNumber = (min,max,sign) => {
    const firstNumber = Math.round(Math.random(min,max)*10);
    const secondNumber = Math.round(Math.random(min,max)*10);

    return `${firstNumber}${sign}${secondNumber}=`;
}

const getRow = (nbrsPerRow, rowSettings) => {
    const {min,max,sign} = rowSettings;
    let row = '';
    for(let i=0;i<nbrsPerRow;i++){
        row = row.concat(`${getRandomNumber(min,max,sign)}\t\t`);
    }
    return row.concat('\n\n');
}

const getFileName = () => {
    const date = new Date();
    return `${date.toISOString().slice(0,10).replace(/-/g,"")}-${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
}

const createSheet = (nbrOfRows = 1, nbrsPerRow = 1) => {
    const stream = fs.createWriteStream(`./output/${getFileName()}.txt`);
    const rowSettings = {
        min:1,
        max:10,
        sign:"x"
    };
    stream.once('open', function(fd) {
        for(let i=0; i<nbrOfRows; i++){
            console.log('here');
            
            stream.write(getRow(nbrsPerRow,rowSettings));
        }
        stream.end();
      });
    
}

createSheet(20,5);