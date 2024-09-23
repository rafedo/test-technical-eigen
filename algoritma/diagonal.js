function diagonalDifference(matrix) {
    let primaryDiagonal = 0;
    let secondaryDiagonal = 0;
    const size = matrix.length;

    for (let i = 0; i < size; i++) {
        primaryDiagonal += matrix[i][i];
        secondaryDiagonal += matrix[i][size - 1 - i];
    }

    return primaryDiagonal - secondaryDiagonal;
}

const matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]];
console.log(diagonalDifference(matrix));
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
readline.question('Masukkan ukuran matriks (N): ', (size) => {
    const matrix = [];
    let count = 0;

    const getRow = () => {
        if (count < size) {
            readline.question(`Masukkan baris ${count + 1} (pisahkan dengan spasi): `, (row) => {
                matrix.push(row.split(' ').map(Number));
                count++;
                getRow();
            });
        } else {
            const result = diagonalDifference(matrix);
            console.log(`Hasil pengurangan diagonal: ${result}`);
            readline.close();
        }
    };

    getRow();
});
