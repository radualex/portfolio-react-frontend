export default {
    extends: [
        '@onefinity/stylelint-config'
    ],
    rules: {
        'declaration-property-value-disallowed-list': {
            display: ['inline-block']
        },
        '@stylistic/indentation': 4
    },
    overrides: [{
        files: ['**/*.module.scss'],
        rules: {
            'selector-class-pattern': ['^[a-z][a-zA-Z0-9]*$', {
                resolveNestedSelectors: true
            }]
        }
    }]
};
