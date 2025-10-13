// main.js (final for variant 4)
import { Command } from 'commander';
import fs from 'fs';

const program = new Command();

program
    .requiredOption('-i, --input <path>', 'Input JSON file path')
    .option('-o, --output <path>', 'Output file path')
    .option('-d, --display', 'Display result in console')
    .option('-v, --variety', 'Display flower variety')
    .option('-l, --length <num>', 'Filter flowers by petal length greater than specified', parseFloat)
    .parse(process.argv);

const options = program.opts();

// ѕерев≥рки
if (!options.input) {
    console.error('Please, specify input file');
    process.exit(1);
}

if (!fs.existsSync(options.input)) {
    console.error('Cannot find input file');
    process.exit(1);
}

// „итанн€ JSON
let data;
try {
    const raw = fs.readFileSync(options.input, 'utf8');
    data = JSON.parse(raw);
    if (!Array.isArray(data)) {
        console.error('Input JSON must be an array of records');
        process.exit(1);
    }
} catch (err) {
    console.error('Error reading or parsing input file:', err.message);
    process.exit(1);
}

// ‘≥льтрац≥€ за довжиною пелюстки (€кщо задано)
let filtered = data;
if (options.length !== undefined && !Number.isNaN(options.length)) {
    filtered = filtered.filter(item => {
        // безпечна перев≥рка на на€вн≥сть пол€
        return item && item.petal && typeof item.petal.length === 'number' && item.petal.length > options.length;
    });
}

// ‘ормуванн€ результату Ч кожен р€док: "petal.length petal.width [variety]"
const lines = filtered.map(item => {
    const pl = item && item.petal && typeof item.petal.length === 'number' ? item.petal.length : '';
    const pw = item && item.petal && typeof item.petal.width === 'number' ? item.petal.width : '';
    let line = `${pl} ${pw}`;
    if (options.variety && item && item.variety) line += ` ${item.variety}`;
    return line.trim();
});

const result = lines.join('\n');

// ¬ив≥д
if (options.display) {
    console.log(result);
}

if (options.output) {
    try {
        fs.writeFileSync(options.output, result, 'utf8');
    } catch (err) {
        console.error('Cannot write to output file:', err.message);
        process.exit(1);
    }
}

// якщо н≥ -o н≥ -d Ч програма не виводить н≥чого (за умовою методички)
