function longest(sentence) {
    const words = sentence.split(' ');
    let longestWord = '';

    for (const word of words) {
        if (word.length > longestWord.length) {
            longestWord = word;
        }
    }

    return longestWord;
}

const sentence = "Saya sangat senang mengerjakan soal algoritma";
console.log(longest(sentence)); 
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Masukkan kalimat: ', (input) => {
    const result = longest(input);
    console.log(`Kata terpanjang: ${result}`);
    readline.close();
});