import toolbox from "./toolbox"

export default class mapDOM extends toolbox{
    constructor(obj) {
        super();
        // this.state = {}
        this.obj = obj
        this.mapDOM = {}
        this.typeTemplate = obj?._ || "codelab"

        this.mapType = this.findType(obj)
        this[this.mapType]()
    }

    string_type = () => {

        let arr = []
        , obj = this.obj.map(str => {
            let [titre, ...ressources] = this.obj[0].split(':::')
            let obj = {titre, ressources}
            return obj
        })
        console.log(obj);
        
        this.mapDOM_type(obj)
    }
    array_type = () => {
        console.log(this.obj);
        this.mapDOM_type(obj)
    }
    object_type = () => {

        this.mapDOM_type(obj)
    }
    mapDOM_type = (obj=this.obj) => {
        this.mapDOM = this[this.typeTemplate](obj)
    }



    codelab = (obj) => {
        let template = `<section>
            <ul></ul>
            <article></article>
        </section>
        `
        

        template = this.stringToHTML(template)
        

        let section = template
        , ul = template.querySelector('ul')
        , article = template.querySelector('article')
        , render = obj.map(item=>{
            console.log(ul)
            let li = document.createElement('li')
            li.innerHTML = item.titre
            li.ressources = item.ressources
            li.addEventListener("click", (e)=>{
                alert(this)
                // article.appendChild()
            })
            ul.appendChild(li)
        })
        console.log(section.innerHTML);

        
        return section
    }
}