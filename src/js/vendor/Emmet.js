//https://github.com/christiansandor/Emmet.js


export default class  Emmet{
    constructor(abbreviation, name = "$$$"){
        this.name = name
        this.abbreviation = abbreviation
        this.regexes = {
            indexesRe: /(.+?)(>|\+|\^|$)/g,
            escapeRe: /("|')([^\1]*?)\1/g,
            innerTextRe: /\{([^}]*?)}/g,
            excludes: "([^\\.#\\(\\{]+)",
            attrsRe: /\(([^\)]*)\)/g,
        }
        this.regexes.tagRe =  new RegExp("^" + this.regexes.excludes),
        this.regexes.idRe = new RegExp("#" + this.regexes.excludes, "g"),
        this.regexes.classesRe = new RegExp("\\." + this.regexes.excludes, "g")

        this.escaped = [];
        this.innerTexts = [];

        this.inDocument()
        this.expanded = this.emmet(abbreviation?abbreviation:"div{exemple}")
    }

    inDocument = () => {
        window[this.name] = this.emmet;
        if (window.jQuery) {
            window.jQuery[this.name] = function (text, htmlOnly, args) {
                var el = this.emmet(text, htmlOnly, args);
                return htmlOnly ? el : window.jQuery(el);
            };
            window.jQuery[this.name].template = function (text, htmlOnly, args) {
                var template = this.emmet.template(text, htmlOnly, args);
                return function () {
                    var el = template.apply(null, arguments);
                    return htmlOnly ? el : window.jQuery(el);
                };
            };
        }
    }
    unescape(text) {
        return text.replace(/""/g, () => {
            return "\"" + this.escaped.shift() + "\"";
        });
    }

    element(textParam) {
        var text = textParam || "";

        var tag = text.match(this.regexes.tagRe);
        var id = text.match(this.regexes.idRe);
        var classes = text.match(this.regexes.classesRe);
        var attrs = text.match(this.regexes.attrsRe);
        var innerText = text.match(this.regexes.innerTextRe);

        var el = document.createElement(tag ? tag[0] : "div");

        if (id) el.id = id.pop().replace(this.regexes.idRe, "$1");
        if (classes) {
            el.className = classes.map(function (className) {
                return className.slice(1);
            }).join(" ");
        }
        if (innerText) {
            el.innerHTML += innerText.map(() => {
                return this.unescape(this.innerTexts.shift());
            }).join(" ");
        }

        if (attrs) {
            attrs.map((chunkParam) => {
                var chunk = chunkParam.replace(this.regexes.attrsRe, "$1").split(",");
                chunk.map((attrParam) => {
                    var attr = attrParam.split("=");
                    var key = attr.shift();
                    var value = JSON.parse(this.unescape(attr.join("=")));

                    el.setAttribute(key, value);
                });
            });
        }

        return el;
    }

    emmet = (text = this.abbreviation, htmlOnly, args) => {
        var tree = this.element();
        var current = tree;
        var lastElement = tree;
        var usedText = text || "";
        var returnValue;

        if (text === void 0) throw new Error("There should be a string to parse.");

        this.escaped = [];
        this.innerTexts = [];

        if (args) usedText = this.emmet.templatedString(text, args);

        usedText
            .replace(this.regexes.escapeRe, (full, quotes, escape) => {
                this.escaped.push(escape);
                return "\"\"";
            })
            .replace(this.regexes.innerTextRe, (full, innerText) => {
                this.innerTexts.push(innerText);
                return "{}";
            })
            .replace(/\s+/g, "")
            .replace(this.regexes.indexesRe, (full, elementText, splitter) => {
                current.appendChild(lastElement = this.element(elementText));
                if (splitter === ">") current = lastElement;
                else if (splitter === "^") current = current.parentNode;
            });

        returnValue = tree.children.length > 1 ? tree.children : tree.children[0];
        return htmlOnly ? tree.innerHTML : returnValue;
    }

    templatedString = (text, args) => {
        return args.reduce(function (str, el, i) {
            return str.replace(new RegExp("\\{" + i + "\\}", "g"), function () {
                return el;
            });
        }, text);
    };

    template = (text, htmlOnly, args) => {
        if (text === void 0) throw new Error("There should be a template string to parse.");
        return () => {
            return this.emmet(text, htmlOnly, [].concat.apply(args || []/*, arguments*/));
        };
    };
}