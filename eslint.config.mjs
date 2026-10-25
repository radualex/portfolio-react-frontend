import reactPlugin from 'eslint-plugin-react';
import configure, { configs } from '@onefinity/eslint-config';

import propsInline from './eslint-rules/jsx-props-inline/index.js'; // eslint-disable-line @onefinity/eslint-config/import-grouping
import componentPropsString from './eslint-rules/use-component-props-string/index.js';
import noLiteralClassname from './eslint-rules/no-literal-classname/index.js';
import noInlineObjectLiteral from './eslint-rules/no-inline-object-literal/index.js';
import noInlineHandlers from './eslint-rules/no-inline-handlers/index.js';
import noClassnameTernary from './eslint-rules/no-classname-ternary/index.js';

const config = configure([{
    ignores: [
        '**/*.d.ts',
        '**/*.js',
        'eslint-rules/**',
        'dist/**',
        'node_modules/**',
        '.netlify/**'
    ]
}, configs.react, {
    plugins: {
        react: reactPlugin,
        sprout: {
            rules: {
                'jsx-props-inline': propsInline,
                'use-component-props-string': componentPropsString,
                'no-literal-classname': noLiteralClassname,
                'no-inline-object-literal': noInlineObjectLiteral,
                'no-inline-handlers': noInlineHandlers,
                'no-classname-ternary': noClassnameTernary
            }
        }
    },
    settings: {
        react: {
            version: '19.1.1'
        }
    },
    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/no-unescaped-entities': 'off',
        'react/jsx-fragments': ['error', 'element'],
        'react/self-closing-comp': ['error', {
            component: true,
            html: true
        }],
        '@stylistic/object-curly-spacing': ['error', 'always', {
            emptyObjects: 'never'
        }],
        '@stylistic/object-curly-newline': ['error', {
            ImportDeclaration: 'never'
        }],
        'curly': ['error', 'all'],
        'react/function-component-definition': ['error', {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function'
        }],
        '@stylistic/jsx-max-props-per-line': 'off',
        '@stylistic/jsx-first-prop-new-line': 'off',
        '@stylistic/jsx-closing-bracket-location': 'off',
        '@stylistic/multiline-ternary': 'off',
        'object-property-newline': 'off',
        'sprout/jsx-props-inline': 'error',
        'sprout/use-component-props-string': 'error',
        'sprout/no-literal-classname': 'error',
        'sprout/no-inline-object-literal': 'error',
        'sprout/no-inline-handlers': 'error',
        'sprout/no-classname-ternary': 'error',
        '@typescript-eslint/naming-convention': ['error', {
            selector: 'variable',
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
            custom: {
                regex: '^.{2,}$',
                match: true
            }
        }, {
            selector: 'parameter',
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
            custom: {
                regex: '^.{2,}$',
                match: true
            }
        }, {
            selector: 'parameter',
            modifiers: ['unused'],
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            leadingUnderscore: 'require',
            trailingUnderscore: 'forbid'
        }, {
            selector: 'function',
            format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            leadingUnderscore: 'forbid',
            trailingUnderscore: 'forbid',
            custom: {
                regex: '^.{2,}$',
                match: true
            }
        }],
        '@stylistic/padding-line-between-statements': ['error', {
            blankLine: 'always',
            prev: '*',
            next: 'return'
        }],
        'unicorn/catch-error-name': 'off',
        'unicorn/prefer-minimal-ternary': 'off',
        'no-restricted-syntax': ['error', {
            selector: 'ReturnStatement > Identifier[name="undefined"]',
            message: 'Use `return;` instead of `return undefined;`.'
        }, {
            selector: 'ConditionalExpression ConditionalExpression',
            message: 'Nested ternaries are hard to follow. Extract a function or use if/else.'
        }],
        'unicorn/filename-case': ['error', {
            cases: {
                camelCase: true,
                pascalCase: true,
                kebabCase: true
            }
        }],
        '@onefinity/eslint-config/import-grouping': ['error', {
            groups: [{
                matches: /^(?!.*\.mock$)(?:\w|@\w).*$/.source
            }, {
                label: 'Constants',
                matches: /\/constants/.source
            }, {
                label: 'Components',
                matches: /\/(components|admin)/.source
            }, {
                label: 'Containers',
                matches: /\/containers/.source
            }, {
                label: 'Helpers',
                matches: /\/helpers/.source
            }, {
                label: 'Hooks',
                matches: /\/hooks/.source
            }, {
                label: 'Store',
                matches: /\/store/.source
            }, {
                label: 'Styles',
                matches: /\.(css|scss)$/.source
            }, {
                label: 'Types',
                matches: /\/types/.source
            }]
        }]
    }
}, {
    linterOptions: {
        reportUnusedDisableDirectives: 'error'
    }
}]);

const promoteRuleWarnings = (rules) => {
    return Object.fromEntries(Object.entries(rules).map(([rule, setting]) => {
        const severity = Array.isArray(setting) ? setting.at(0) : setting;

        if (severity !== 'warn' && severity !== 1) {
            return [rule, setting];
        }

        const parsedErrorSetting = Array.isArray(setting) ? ['error', ...setting.slice(1)] : 'error';

        return [rule, parsedErrorSetting];
    }));
};

const promoteWarningsToErrors = (entry) => {
    if (entry === null || typeof entry !== 'object' || !entry.rules) {
        return entry;
    }

    return {
        ...entry,
        rules: promoteRuleWarnings(entry.rules)
    };
};

export default config.flat().map((entry) => {
    return promoteWarningsToErrors(entry);
});
