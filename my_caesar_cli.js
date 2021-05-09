const { program: commander } = require('commander')
const { pipeline, Stream } = require('stream')
const fs = require('fs')

let shiftRange, inputFileName, outputFileName, actionType

commander.version('1.0.0').description('Casesar-shift-tool.')

class Transformer extends Stream.Transform {
  constructor(range, action, options = {}) {
    options = Object.assign({}, options, {
      decodeStrings: false,
    })
    super(options)
    this.range = range
    this.action = action
  }

  _transform(chunk, _encoding, callback) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('')
    let result = []

    // Decoding action condition
    if (this.action === 'decode') {
      this.range *= -1
    }

    // If range is more than alphabet's length
    if (Math.abs(this.range) >= alphabet.length) {
      if (this.range < 0) {
        this.range += alphabet.length
      } else {
        this.range -= alphabet.length
      }
    }

    // calculating
    chunk
      .toString('utf8')
      .split('')
      .map((el) => {
        if (alphabet.includes(el) || alphabet.includes(el.toLowerCase())) {
          let index = alphabet.indexOf(el.toLowerCase())
          let isUpperCase

          // UpperCase condition
          if (el == el.toUpperCase()) {
            isUpperCase = true
          }

          // shift calculating
          el = () => {
            if (index + this.range >= alphabet.length) {
              return alphabet[index + this.range - alphabet.length]
            }
            // if negative shift handling
            if (index + this.range < 0) {
              return alphabet[alphabet.length + (this.range + index)]
            }
            return alphabet[index + this.range]
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

    this.push(result.join(''))
    callback(process.exit())
  }
}

// опции
commander
  .requiredOption('-s, --shift <range>', 'Shift range parameter')
  .option(
    '-i, --input <fileName>',
    'Input file name with extension example: "input.txt"'
  )
  .option(
    '-o, --output <fileName>',
    'Input file name with extension example: "output.txt"'
  )
  .requiredOption(
    '-a, --action <actionType>',
    'An action for process, encode/decode'
  )

// Работа с консолью
commander.parse(process.argv)
const options = commander.opts()

if (options.debug) console.log(options)
if (options.shift) shiftRange = +options.shift
if (options.input) inputFileName = options.input
if (options.output) outputFileName = options.output
if (options.action) actionType = options.action

// file existing/permission check
checkFile(inputFileName)
checkFile(outputFileName)

// check actions
if (actionType == 'decode' || actionType == 'encode') {  
} else {
  process.stderr.write(`This action - "${actionType}" doesn't support. Please check action name in your input line. It should be 'decode' or 'encode'\n`)
}

// stream
pipeline(
  inputFileName ? fs.createReadStream(inputFileName, 'utf8') : process.stdin,
  new Transformer(shiftRange, actionType),
  outputFileName ? fs.createWriteStream(outputFileName) : process.stdout,
  (err) => {
    if (err) {
      console.error('Error: ', err)
    } else {
      // console.log('Pipeline succeeded')
    }
  }
)

// Functions
function checkFile(path) {
  fs.access(path, fs.F_OK, (err) => {
    if (err) {
      process.stderr.write(`File with name "${path}" doesn't exist. Please check files name in your input line.\n`)
    }
    //file exists
  })
}
