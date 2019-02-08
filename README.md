# stylelint-watch-autofix
ファイルを監視して変更があったら自動で Stylelint で行う CLI です。

## Install

```sh
npm i yutahaga/stylelint-watch-autofix#master -D
```

## Usage

In `package.json`
```json
{
  "scripts": {
    "stylelint-watch": "stylelint-watch-autofix \"src/**/*.{css,vue}\""
  }
}
```
