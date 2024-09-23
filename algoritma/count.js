function countOccurrences(input, query) {
    const result = query.map(q => input.filter(i => i === q).length);
    return result;
}

const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];
console.log(countOccurrences(INPUT, QUERY));
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
readline.question('Masukkan elemen INPUT (pisahkan dengan koma): ', (inputStr) => {
    const inputArray = inputStr.split(',').map(item => item.trim());
    
    readline.question('Masukkan elemen QUERY (pisahkan dengan koma): ', (queryStr) => {
        const queryArray = queryStr.split(',').map(item => item.trim());
        const result = countOccurrences(inputArray, queryArray);
        console.log(`Jumlah kemunculan: ${JSON.stringify(result)}`);
        readline.close();
    });
});