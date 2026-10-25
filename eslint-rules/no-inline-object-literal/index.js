const MESSAGE_ID = 'inline-object';
const rule = {
    meta: {
        type: 'layout',
        docs: {
            description: 'Disallow single-line object literals; every property must be on its own line.'
        },
        schema: [],
        messages: {
            [MESSAGE_ID]: 'Object literal must span multiple lines (one property per line).'
        }
    },
    create(context) {
        return {
            ObjectExpression(node) {
                if (node.properties.length === 0) {
                    return;
                }
                if (node.loc.start.line !== node.loc.end.line) {
                    return;
                }
                context.report({ node, messageId: MESSAGE_ID });
            }
        };
    }
};
export default rule;
