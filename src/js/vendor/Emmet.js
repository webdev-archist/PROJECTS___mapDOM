//https://github.com/christiansandor/Emmet.js


export default class  Emmet{
    constructor(abbreviation, name = "$$$"){
        this.name = name
        this.abbreviation = abbreviation
        this.regexes = {
            // indexesRe: /(.+?)(>|\+|\^|\*|\$)/g,
            indexesRe: /(.+?)(>|\+|\^)/g,
            escapeRe: /("|')([^\1]*?)\1/g,
            innerTextRe: /\{([^}]*?)}/g,
            excludes: "([^\\*\\.#\\(\\{]+)",
            attrsRe: /\[([^\)]*)\]/g,
            // attrsRe_: /\[([^\)]*)\]/g, // POUR REMPLACER LES ATTRIBUTS QUI SONT ACTUELLEMENTS GÉNÉRÉ PAR '(' AU LIEU DES CROCHET '['
            mult: /(\*\d+$)/g,
            mult$: /\$/g,
        }
        this.regexes.tagRe =  new RegExp("^" + this.regexes.excludes),
        this.regexes.idRe = new RegExp("#" + this.regexes.excludes, "g"),
        this.regexes.classesRe = new RegExp("\\." + this.regexes.excludes, "g")

        this.escaped = []
        this.mult = []

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
        let text = textParam || ""
        , matched

        console.log(text);
        let tag = text.match(this.regexes.tagRe)?.[0] || "div"
        , id = text.match(this.regexes.idRe)
        , classes = text.match(this.regexes.classesRe)
        , attrs = text.match(this.regexes.attrsRe)
        , innerText = text.match(this.regexes.innerTextRe)
        , mult = text.match(this.regexes.mult)?.[0]
        , mult$ = text.match(this.regexes.mult$) ? true : false
        ;

        let el = document.createElement(tag);
        console.log(text);
        console.log(text.match(this.regexes.mult))

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

        if(mult){
            let i
            , arr = [el]
            mult = parseInt(mult.substr(1)) - 1
            for(i=0;i<mult;i++){
                arr.push(el.cloneNode())
            }
            el = arr
        }
        
        return el;
    }

    emmet = (text = this.abbreviation, htmlOnly, args) => {
        var tree = this.element();
        var current = tree;
        var lastElement = tree;
        var usedText = text || "";
        var returnValue;
        console.log(tree);

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
                let elts = this.element(elementText)
                if(Array.isArray(elts)){
                    elts.forEach((elt,i)=>{
                        elt.className = elt.className.replace('$',parseInt(i)+1)
                        if(i==elts.length-1)elt.classList.add('__filled__')
                        else elt.classList.add('__emty__')
                        current.appendChild(lastElement = elt)
                    })
                }else 
                    current.appendChild(lastElement = elts);
                if (splitter === ">") current = lastElement;
                else if (splitter === "^") current = current.parentNode;
            });

        // FAIRE UNE FONCTION ICI POUR RECHERCHER LES CLASS .__empty__ et .__filled__
        // ET FAIRE LE 'filling' DES CLASS .__empty__ À PARTIR DES CLASSES .__filled__
        alert('travail ici')
            
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