#!/usr/bin/env node
const { resolve } = require('path')
const chokidar = require('chokidar')
const stylelint = require('stylelint')

const cwd = process.cwd()
let [syntax, globPattern] = process.argv.slice(-2)
const defaultOptions = {
  fix: true
}
if (!/^css$/i.test(syntax)) {
  defaultOptions.syntax = syntax
}

const fixFiles = function(files) {
  return stylelint.lint(
    Object.assign({}, defaultOptions, {
      files
    })
  )
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
    return fixFiles([resolve(cwd, file)])
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
