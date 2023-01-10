/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        '@vue/eslint-config-typescript/recommended',
        // '@vue/eslint-config-prettier',
    ],
    env: {
        'vue/setup-compiler-macros': true,
    },
    rules: {
        'no-param-reassign': [2, { props: false }],
        quotes: [2, 'single', { avoidEscape: true }],
        'no-console': 'error',
        'no-debugger': 'error',
        'object-curly-spacing': [2, 'always'],
        'no-multi-spaces': ['error', { exceptions: { ImportDeclaration: true } }],
        'no-duplicate-imports': ['error', { includeExports: true }],
        'object-curly-newline': ['error'],
        'import/prefer-default-export': 'off',
        'prefer-promise-reject-errors': 'off',
        'max-len': ['error', 200],
        'no-shadow': 'off',
        'vue/first-attribute-linebreak': [
            'error',
            {
                singleline: 'ignore',
                multiline: 'beside',
            },
        ],
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: 1,
                multiline: {
                    max: 1,
                },
            },
        ],
        'vue/html-indent': [
            'error',
            2,
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
                alignAttributesVertically: true,
                ignores: [],
            },
        ],
        'vue/html-closing-bracket-newline': [
            'error',
            {
                singleline: 'never',
                multiline: 'never',
            },
        ],
        'vue/no-reserved-component-names': [
            'error',
            {
                disallowVueBuiltInComponents: true,
                disallowVue3BuiltInComponents: true,
            },
        ],
        'vue/padding-line-between-blocks': ['error', 'always'],
    },
};
