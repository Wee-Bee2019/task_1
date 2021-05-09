<<<<<<< HEAD
# Caesar cipher CLI tool

CLI tool that will encode and decode a text by Caesar cipher.

## Caesar cipher
In cryptography, a Caesar cipher, also known as Caesar's cipher, the shift cipher, Caesar's code or Caesar shift, is one of the simplest and most widely known encryption techniques. It is a type of substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet. For example, with a left shift of 3, D would be replaced by A, E would become B, and so on. The method is named after Julius Caesar, who used it in his private correspondence.

## Description
For use the tool you have to write the next console command.

>node my_caesar_cli

and this options.

**CLI tool should accept 4 options:**
- >-s, --shift
- >-i, --input
- >-o, --output
- >-a, --action

### Example

>node my_caesar_cli -a encode -s 7 -i "./input.txt" -o "./output.txt"

## Options

>-s, --shift

:exclamation: **This option is required** :exclamation:

A range for shift. It supports positive and negative numbers. 

Example: When -s -3 

![Example](https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Caesar_cipher_left_shift_of_3.svg/220px-Caesar_cipher_left_shift_of_3.svg.png "Example")

____

>-i, --input

**Optional**

The input data source to converting. It supports input **methods**:

**1. From file.**

Filename of input file with the the extension ***"\*.txt"***. For using this method you should declare the option in the command line with the command ***"node my_caesar_cli"***:

Examples:

> - -i "./input.txt"
>- -i input.txt
>- -i "...somePath/input.txt"

**2. From command line.**

If you didn't declare the option in the command line, you will be prompted to enter a text to convert.

____

- >-o, --output

**Optional**

The output data destination:

**1. From file.**

Filename for output file with the the extension ***"\*.txt"***. For using this method you should declare the option in the command line with the command ***"node my_caesar_cli"***. In this case you will see the result in the output file:

Examples:

> - -o "./output.txt"
>- -o output.txt
>- -o "...somePath/input.txt"

**2. From command line.**

If you didn't declare the option in the command line, you will see the result in the terminal.

____

>-a, --action

:exclamation: **This option is required** :exclamation:

Option for conversion operation. Accepts input "decode" or "encode"
