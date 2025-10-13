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

// �������� ����'�������� ���������
if (!options.input) {
    console.error('Please, specify input file');
    process.exit(1);
}

// �������� ��������� �����
if (!fs.existsSync(options.input)) {
    console.error('Cannot find input file');
    process.exit(1);
}

// ������� JSON
const data = JSON.parse(fs.readFileSync(options.input, 'utf8'));

// ����������/������� ��������� � ������� ������
const result = `Loaded ${data.length} records from ${options.input}`;

if (options.display) {
    console.log(result);
}

if (options.output) {
    fs.writeFileSync(options.output, result, 'utf8');
}

// ���� � -o � -d � ����� �� ��������
// JavaScript source code
