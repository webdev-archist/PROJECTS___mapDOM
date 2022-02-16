export default class toolbox {

    findType = () => {
        if(typeof this.obj[0] == "string"){
            return "string_type"
        }else if(Array.isArray(this.obj[0])){
            return "array_type"
        }else if(typeof this.obj[0] == "object"){

        }else alert('toolbox::findType => "Mauvais formats de la valeur d\'entrée"')
    }
    selectorToHTML = function (slt) {
        let blocks = []
        , isString = (slt) => {
            let parts = slt.split(">")
        }
        , isArray = (arr) => {
            arr.map(slt=>{
                let parts = slt.split(">")
            })
        }
        , isJson = (json) => {
            for(key in json){
                let elements = selectorToHTML(json[a])
                let block = document.createElement(key)
                appendArray(elements, block)
                blocks.push(block)
            }
        }
        , appendArray = (arr, container) => {
            arr.forEach(element=>{container.append(element)})
        }

        if(     typeof slt == 'string')isString(slt)
        else if(Array.isArray(slt))isArray(slt)
        else if(typeof slt == 'object')isJson(slt)
        
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