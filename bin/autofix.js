#!/usr/bin/env node
const { extname, resolve } = require('path')
const chokidar = require('chokidar')
const stylelint = require('stylelint')

const [configFile, globPattern] = process.argv.slice(-2)

const cwd = process.cwd()

const fixFiles = function(files) {
  return stylelint.lint({
    configFile,
    files,
    fix: true
  })
}

const ansi = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  reset: '\x1b[0m'
}

chokidar
  .watch(globPattern, {
    usePolling: true,
    interval: 300
  })
  .on('change', function(file) {
    return fixFiles([resolve(__dirname, file)])
      .then(() => {
        console.log(`${ansi.green}[stylelint]${ansi.reset} Fixed ${file}`)
      })
      .catch(err => {
        console.log(
          `${ansi.red}[stylelint]${ansi.red} Failed in fixing ${file}`
        )
        console.log(`${ansi.red}${err.message}${ansi.reset}`)
      })
  })
