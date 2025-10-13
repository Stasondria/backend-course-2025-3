// main.js
import { Command } from 'commander';
import fs from 'fs';

const program = new Command();

program
    .requiredOption('-i, --input <path>', 'Input JSON file path')
    .option('-o, --output <path>', 'Output file path')
    .option('-d, --display', 'Display result in console')
    .parse(process.argv);

const options = program.opts();

// ѕерев≥рка обов'€зкового параметра
if (!options.input) {
    console.error('Please, specify input file');
    process.exit(1);
}

// ѕерев≥рка ≥снуванн€ файлу
if (!fs.existsSync(options.input)) {
    console.error('Cannot find input file');
    process.exit(1);
}

// „итанн€ JSON
const data = JSON.parse(fs.readFileSync(options.input, 'utf8'));

// “имчасовий/базовий результат Ч к≥льк≥сть запис≥в
const result = `Loaded ${data.length} records from ${options.input}`;

if (options.display) {
    console.log(result);
}

if (options.output) {
    fs.writeFileSync(options.output, result, 'utf8');
}

// якщо н≥ -o н≥ -d Ч н≥чого не виводимо
// JavaScript source code
