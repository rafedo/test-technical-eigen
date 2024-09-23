function reverseAlphabet(str) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = str.match(/\d+/g) || [];
    const letters = str.replace(/\d+/g, '').split('');
    
    const reversed = letters.reverse().map(char => {
        const index = alphabet.indexOf(char.toUpperCase());
        return index !== -1 ? alphabet[index] : char;
    });

    return reversed.join('') + (numbers.length ? numbers.join('') : '');
}

const result = reverseAlphabet("NEGIE1");
console.log(result);
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question('Masukkan string: ', (input) => {
    const result = reverseAlphabet(input);
    console.log(result);
    readline.close();
});