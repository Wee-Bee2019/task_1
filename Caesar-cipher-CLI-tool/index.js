const { program: commander } = require('commander')

commander.version('1.0.0').description('Casesar-shift-tool.')

commander.parse(process.argv)
const options = commander.opts()

// опции
commander
  .option('-s, --shift <range>', 'Shift range parameter')
  .option(
    '-i, --input <fileName>',
    'Input file name with extension example: "input.txt"'
  )
  .option(
    '-o, --output <fileName>',
    'Input file name with extension example: "output.txt"'
  )
  .option('-a, --action <actionType>', 'An action for process, encode/decode')
  .option('-d, --debug', 'output extra debugging')

// добавить чтение/запись файлов

// добавишь шифратор/дешифратор строки

// Вывод
if (options.debug) console.log(options)
console.log('\nCommand details:')
if (options.shift) console.log(`Shift range: ${options.shift}`)
if (options.input) console.log(`Input file name: ${options.input}`)
if (options.output) console.log(`Output file name: ${options.output}`)
if (options.action) console.log(`Action type: ${options.action}`)

