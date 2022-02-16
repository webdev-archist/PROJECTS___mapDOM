export default class toolbox {

    findType = () => {
        if(typeof this.obj[0] == "string"){
            return "string_type"
        }else if(Array.isArray(this.obj[0])){
            return "array_type"
        }else if(typeof this.obj[0] == "object"){

        }else alert('toolbox::findType => "Mauvais formats de la valeur d\'entrée"')
    }
    selectorToHTML = function (emmetSelector) {
        let blocks = [], fragment = document.createElement('div')
        , isString = (emmet_str) => {
            let tmp = emmet_str.split(">")
            , [container_str, ...elements_str] = tmp
            , container = document.createElement(container_str) //IL FAUT VÉRIFIER SI container_str EST COMPLEXE OU SI (ex: "a" est simple, "a*3" est complexe)
            //IL FAUT ICI POUVOIR TRADUIRE LA SYNTAXE emmet AU MIEUX

            //SINON DANS UN 1er TEMPS, TRADUIRE UN EMMET SIMPLE SERA SUFFISANT            
            , elements = elements_str.map(element=>document.createElement(element))
            , element0 = elements.shift()
            , elementN = element0
            elements.forEach(()=>{
                let element = elements.shift()
                elementN.append(element)
                elementN = element
            })
            container.append(element0)
            console.log(container);
        }
        , isArray = (arr) => {
            arr.map(arrItem=>{
                let bl = arrItem.split(">")
            })
        }
        , isJson = (json) => {
            for(let key in json){
                let elements = this.selectorToHTML(json[key])
                let block = document.createElement(key)
                appendArray(elements, block)
                blocks.push(block)
            }
        }
        , appendArray = (arr, container) => {
            arr.forEach(element=>{container.append(element)})
        }

        if(     typeof emmetSelector == 'string')isString(emmetSelector)
        else if(Array.isArray(emmetSelector))isArray(emmetSelector)
        else if(typeof emmetSelector == 'object')isJson(emmetSelector)

        return blocks
    }
    stringToHTML = function (str) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(str, 'text/html');
        return doc.body.firstChild;
    };


    getTemplate = (type) => {
        switch(type){
            case"codelab":
                return `<section>
                    <ul></ul>
                    <article></article>
                </section>
                `
            break

            default:break;
        }
    }
}