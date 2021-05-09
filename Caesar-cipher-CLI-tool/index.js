const { program: commander } = require('commander')
const fs = require('fs')

commander.version('1.0.0').description('Casesar-shift-tool.')

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
// caesarCipher()

// Вывод
commander.parse(process.argv)
const options = commander.opts()

if (options.debug) console.log(options)
// console.log('\nCommand details:')
if (options.shift) const shiftRange = options.shift
// console.log(`Shift range: ${options.shift}`)
if (options.input) const inputFileName = options.input
// console.log(`Input file name: ${options.input}`)
if (options.output) const outputFileName = options.output
// console.log(`Output file name: ${options.output}`)
if (options.action) const actionType = options.action
//  console.log(`Action type: ${options.action}`)

// Функции
function caesarCipher(str, range, action) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
  let result = []

  // Decoding action condition
  if (action === 'decode') {
    range *= -1
  }

  // If range is more than alphabet's length
  if (Math.abs(range) >= alphabet.length) {
    if (range < 0) {
      range += alphabet.length
    } else {
      range -= alphabet.length
    }
  }

  // calculating
  str.split('').map((el) => {
    if (alphabet.includes(el) || alphabet.includes(el.toLowerCase())) {
      let index = alphabet.indexOf(el.toLowerCase())
      let isUpperCase

      // UpperCase condition
      if (el == el.toUpperCase()) {
        isUpperCase = true
      }

      // shift calculating
      el = () => {
        if (index + range >= alphabet.length) {
          return alphabet[alphabet.length - (index + range)]
        }
        // if negative shift handling
        if (index + range < 0) {
          return alphabet[alphabet.length + (range + index)]
        }
        return alphabet[index + range]
      }

      // return UpperCase, if it was
      if (isUpperCase) {
        result.push(el().toUpperCase())
      } else {
        result.push(el())
      }
    } else {
      result.push(el)
    }
  })

  return result.join('')
}

function readFile(inputFileName) {
  try {
    const content = fs.readFileSync(inputFileName, 'utf8')
    return content
  } catch (e) {
    console.log(e)
  }
}

function writeFile(outputFileName, content) {
  try {
    fs.writeFileSync(outputFileName, content, 'utf8')
  } catch (e) {
    console.log(e)
  }
}
