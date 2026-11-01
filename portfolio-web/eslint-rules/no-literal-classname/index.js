const MESSAGE_ID = 'literal-classname';
const rule = {
    meta: {
        type: 'problem',
        docs: {
            description: 'Disallow hard-coded string className values; use CSS module classes instead.'
        },
        schema: [],
        messages: {
            [MESSAGE_ID]: 'Hard-coded className string. Use a class from a *.module.css stylesheet (styles.x).'
        }
    },
    create(context) {
        return {
            JSXAttribute(node) {
                const { name, value } = node;
                if (name.type !== 'JSXIdentifier' || name.name !== 'className') {
                    return;
                }
                if (value?.type === 'Literal' && typeof value.value === 'string') {
                    context.report({ node, messageId: MESSAGE_ID });
                }
            }
        };
    }
};
export default rule;
