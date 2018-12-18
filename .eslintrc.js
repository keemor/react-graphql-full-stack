module.exports = {
    'parserOptions': {
        'ecmaVersion': 6,
        'sourceType': 'module'
    },
    'env': {
        'browser': true,
        'node': true
    },
    "parser": "babel-eslint",
    //'extends': ['eslint:recommended', "plugin:react/recommended"],
    'rules': {
        'linebreak-style': 0,
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        //'no-console': ["warn", { allow: ["error"] }],
        'react/prop-types': 0,
        'max-len': ['warn', {
            'code': 120,
            'tabWidth': 4,
            'ignoreComments': true,
            'ignoreTrailingComments': true,
            'ignoreStrings': true,
            'ignoreTemplateLiterals': true,
            'ignoreRegExpLiterals': true
        }]
    }
};
