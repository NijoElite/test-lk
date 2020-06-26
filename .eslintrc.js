module.exports = {
    'env': {
        'browser': true,
        'es2020': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'react-app'
    ],
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 11,
        'sourceType': 'module'
    },
    'plugins': [
        'react'
    ],
    'rules': {
        'react/prop-types': [
            0
        ],
        'no-multiple-empty-lines': [
            'error'
        ],
        'no-console': [
            'error'  
        ],
        'eol-last': [
            'error',
            'always',
        ],
        'object-curly-spacing': [
            'error',
            'always'
        ],
        'array-bracket-spacing': [
            'error',
            'never'
        ],
        'computed-property-spacing': [
            'error',
            'never'
        ],
        'no-multi-spaces': [
            'error'
        ],
        'space-infix-ops': [
            'error'
        ],
        'jsx-quotes': [
            'error'
        ],
        'arrow-parens': [
            'error',
            'as-needed'
        ],
        'semi-spacing': [
            'error', 
            {
                'before': false, 
                'after': true
            }
        ],
        'comma-dangle': [
            'error', 
            {
                'arrays': 'always-multiline',
                'objects': 'always-multiline',
                'imports': 'never',
                'exports': 'never',
                'functions': 'never'
            }
        ],
        'indent': [
            'error',
            2,
            {
                'SwitchCase': 1,
            }
        ],
        'keyword-spacing': [
            'error',
            {
                'before': true,
                'after': true
            }
        ],
        'comma-spacing': [
            'error',
            {
                'before': false,
                'after': true
            }
        ],
        'no-trailing-spaces': [
            'error'
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ]
    }
};
