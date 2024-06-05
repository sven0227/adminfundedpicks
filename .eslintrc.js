module.exports = {
  extends: ['next/core-web-vitals', 'plugin:import/recommended', 'prettier'],

  rules: {
    // 'no-unused-vars': 'error', // Disallow unused variables
    'no-console': 'warn', // Warn about console logs
    // eqeqeq: 'error', // Enforce strict equality
    // curly: 'error', // Require curly braces for all control statements
    'react/display-name': 'off',
    '@next/next/no-img-element': 'off',

    // semi: ['error', 'always'], // Enforce semicolons
    // quotes: ['error', 'single'], // Enforce single quotes
    // indent: ['error', 2], // Enforce 2-space indentation
    // 'linebreak-style': ['error', 'unix'], // Enforce Unix linebreaks
    'no-trailing-spaces': 'error', // Disallow trailing whitespace
    'eol-last': ['error', 'always'], // Require newline at the end of files
    'comma-dangle': ['error', 'never'], // Disallow trailing commas
    'object-curly-spacing': ['error', 'always'], // Enforce consistent spacing inside braces
    'array-bracket-spacing': ['error', 'never'], // Disallow spaces inside array brackets
    'key-spacing': ['error', { beforeColon: false, afterColon: true }], // Enforce spacing between keys and values in objects
    // 'space-before-function-paren': ['error', 'never'], // Disallow space before function parentheses
    'arrow-spacing': ['error', { before: true, after: true }], // Enforce spacing around arrow functions
    'keyword-spacing': ['error', { before: true, after: true }], // Enforce spacing around keywords
    // 'block-spacing': ['error', 'always'], // Enforce spacing inside single-line blocks
    // 'newline-before-return': 'error', // Require newline before return statement
    // 'padding-line-between-statements': ['error', { blankLine: 'always', prev: '*', next: 'return' }], // Require blank line before return statements
    'import/newline-after-import': ['error', { count: 1 }] // Enforce newline after import statements
  },

  // "rules": {
  //   "jsx-a11y/alt-text": "off",
  //   "react/display-name": "off",
  //   "react/no-children-prop": "off",
  //   "@next/next/no-img-element": "off",
  //   "@next/next/no-page-custom-font": "off",
  //   "lines-around-comment": [
  //     "error",
  //     {
  //       "beforeBlockComment": true,
  //       "beforeLineComment": true,
  //       "allowBlockStart": true,
  //       "allowObjectStart": true,
  //       "allowArrayStart": true
  //     }
  //   ],
  //   "padding-line-between-statements": [
  //     "error",
  //     {
  //       "blankLine": "any",
  //       "prev": "export",
  //       "next": "export"
  //     },
  //     {
  //       "blankLine": "always",
  //       "prev": [
  //         "const",
  //         "let",
  //         "var"
  //       ],
  //       "next": "*"
  //     },
  //     {
  //       "blankLine": "any",
  //       "prev": [
  //         "const",
  //         "let",
  //         "var"
  //       ],
  //       "next": [
  //         "const",
  //         "let",
  //         "var"
  //       ]
  //     },
  //     {
  //       "blankLine": "always",
  //       "prev": "*",
  //       "next": [
  //         "function",
  //         "multiline-const",
  //         "multiline-block-like"
  //       ]
  //     },
  //     {
  //       "blankLine": "always",
  //       "prev": [
  //         "function",
  //         "multiline-const",
  //         "multiline-block-like"
  //       ],
  //       "next": "*"
  //     }
  //   ],
  //   "newline-before-return": "error",
  //   "import/newline-after-import": [
  //     "error",
  //     {
  //       "count": 1
  //     }
  //   ],
  //   "import/order": [
  //     "error",
  //     {
  //       "groups": [
  //         "builtin",
  //         "external",
  //         [
  //           "internal",
  //           "parent",
  //           "sibling",
  //           "index"
  //         ],
  //         [
  //           "object",
  //           "unknown"
  //         ]
  //       ],
  //       "pathGroups": [
  //         {
  //           "pattern": "react",
  //           "group": "external",
  //           "position": "before"
  //         },
  //         {
  //           "pattern": "next/**",
  //           "group": "external",
  //           "position": "before"
  //         },
  //         {
  //           "pattern": "~/**",
  //           "group": "external",
  //           "position": "before"
  //         },
  //         {
  //           "pattern": "@/**",
  //           "group": "internal"
  //         }
  //       ],
  //       "pathGroupsExcludedImportTypes": [
  //         "react",
  //         "type"
  //       ],
  //       "newlines-between": "always-and-inside-groups"
  //     }
  //   ]
  // },
  settings: {
    react: {
      version: 'detect'
    },
    'import/parsers': {},
    'import/resolver': {
      node: {},
      typescript: {
        project: './jsconfig.json'
      }
    }
  },
  overrides: []
}
