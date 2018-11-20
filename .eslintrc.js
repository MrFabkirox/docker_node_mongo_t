module.exports = {
  "env": {
    "node": true,
    "browser": true,
    "es6": true
  },
//  "extends": "eslint:recommended",
  "extends": "./.eslintrc.stock.js",
  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module"
  },
  "rules": {
    "comma-dangle": ["error", {
      "arrays": "never",
      "objects": "never",
      "imports": "never",
      "exports": "never",
      "functions": "ignore"
    } ],
    "indent": [
      "error", 2
    ],
    "linebreak-style": [
      "warn", "unix"
    ],
    "quotes": [
      "error", "single"
    ],
    "semi": [
      "error", "always"
    ],
    "max-len": [
      "error", 
        {"code": 80 }
    ],
    "no-console": "off",
    "no-trailing-spaces": "error",
    "no-unused-vars": [
      "error", {
        "vars": "local",
        "args": "none"
      }
    ],
    "no-unused-vars": [
      "error", {
        "vars": "local",
        "args": "none"
      }
    ],
    "no-undef": "warn"
  }
};
