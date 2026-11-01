export default {
    extends: [
        '@onefinity/stylelint-config',
        '@dreamsicle.io/stylelint-config-tailwindcss'
    ],
    plugins: ['./stylelint-rules/canonical-spacing/index.js'],
    rules: {
        'declaration-property-value-disallowed-list': {
            display: ['inline-block']
        },
        'portfolio/canonical-spacing': true,
        '@stylistic/indentation': 4,
        'scss/at-rule-no-unknown': [true, {
            ignoreAtRules: [
                'apply',
                'custom-variant',
                'reference',
                'source',
                'theme',
                'utility',
                'variant'
            ]
        }]
    },
    overrides: [{
        files: ['**/*.module.css'],
        rules: {
            'selector-class-pattern': ['^[a-z][a-zA-Z0-9]*$', {
                resolveNestedSelectors: true
            }]
        }
    }]
};
