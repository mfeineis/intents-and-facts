import R, {
    isArray,
    isFunction,
    isString,
    join,
    map,
    mapObjIndexed,
    pipe,
    reduce,
} from "ramda";

const header = (props, children) => [
    ["header", props, ...children],
];

const ul = (props, children) => [
    ["ul", props, ...children],
];

const li = (props, children) => [
    ["li", props, ...children],
];

const a = (props, children) => [
    ["a", props, ...children],
];

const mainMenu = () => [
    [header,
        [ul, { class: "menu-items" },
            [li, [a, { href: "/home" }, "Home"]],
            [li, [a, { href: "/about" }, "About"]],
        ],
    ],
];

const sentinel = { sentinel: true };

const escape = x => JSON.stringify(x, null, "  ");
const joinMarkup = join("");

const mapAttr = pipe(
    mapObjIndexed((value, key) => (
        ` ${escape(key)}="${escape(value)}"`
    )),
    values,
    joinMarkup
);

const render = it => {
    if (isString(it)) {
        return it;
    }

    const [tag, props = sentinel, ...children] = it;
    let isSimpleString = false;

    if (props === sentinel) {
        props = null;
    } else if (isString(props)) {
        children = props;
        props = null;
        isSimpleString = true;
    } else if (isArray(props)) {
        children = [props].concat(children);
        props = null;
    }

    if (isString(tag)) {
        if (isSimpleString) {
            // HTML with string child
            return joinMarkup([
                `<${tag}${mapAttr(props)}>`,
                children,
                `</${tag}>`,
            ]);
        } else {
            // HTML with children
            return joinMarkup([
                `<${tag}${mapAttr(props)}>`,
                joinMarkup(map(render, children)),
                `</${tag}>`,
            ]);
        }
    } else if (isFunction(tag)) {
        const items = tag(props, ...children);

        if (isString(items)) {
            return items;
        } else if (isArray(items)) {
            return render(items);
        } else {
            throw new Error(`Unsupported tag result "${escape(items)}"`);
        }
    } else {
        throw new Error(`Unsupported tag "${escape(tag)}"`);
    }
};

const renderMainMenu = ({ path }) => (
    render([mainMenu])
);

export {
    renderMainMenu,
};