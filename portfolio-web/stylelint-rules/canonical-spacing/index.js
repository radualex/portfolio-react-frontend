import stylelint from 'stylelint';

const RULE_NAME = 'portfolio/canonical-spacing';
const SPACING_SCALE_PX = 4;
const FAMILIES = [
    'min-w',
    'min-h',
    'max-w',
    'max-h',
    'inset',
    'right',
    'bottom',
    'left',
    'size',
    'gap',
    'top',
    'px',
    'py',
    'pt',
    'pb',
    'pl',
    'pr',
    'ms',
    'me',
    'ps',
    'pe',
    'mx',
    'my',
    'mt',
    'mb',
    'ml',
    'mr',
    'p',
    'm',
    'w',
    'h'
];
const PATTERN = new RegExp(`(?<=^|\\s)(${FAMILIES.join('|')})-\\[(\\d+(?:\\.\\d+)?)px\\](?=\\s|$)`, 'g');

const toScale = (px) => {
    const units = Number(px) / SPACING_SCALE_PX;

    return Number.isInteger(units * 4) ? String(units) : undefined;
};

const canonicalize = (params) => {
    return params.replace(PATTERN, (whole, family, px) => {
        const units = toScale(px);

        return units === undefined ? whole : `${family}-${units}`;
    });
};

const rule = (enabled) => {
    return (root, result) => {
        if (!enabled) {
            return;
        }

        root.walkAtRules('apply', (atRule) => {
            const canonical = canonicalize(atRule.params);

            if (canonical === atRule.params) {
                return;
            }

            for (const [whole, family, px] of atRule.params.matchAll(PATTERN)) {
                const units = toScale(px);

                if (units === undefined) {
                    continue;
                }

                stylelint.utils.report({
                    fix: () => {
                        atRule.params = canonical;
                    },
                    message: `Unexpected arbitrary spacing "${whole}". Use "${family}-${units}" (${px}px = ${units} × ${SPACING_SCALE_PX}px).`,
                    node: atRule,
                    result,
                    ruleName: RULE_NAME,
                    word: whole
                });
            }
        });
    };
};

rule.meta = { fixable: true };

export default stylelint.createPlugin(RULE_NAME, rule);
