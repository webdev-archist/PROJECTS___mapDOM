import emmet_closer from './emmet_closer.js'
import Emmet from './Emmet.js'

export default class toolbox {

    constructor(yo){
        // alert(yo)
        // this.emmet = new Emmet()
        this.emmet = new Emmet()
    }

    $ = (abbreviation) => {
        return this.emmet.emmet(abbreviation)
    }
    findType = (obj) => {
        if(typeof obj == "undefined")throw new Error("findType:: vous n'avez pas entré d'object dans mes arguments de fonction '(")
        if(typeof obj[0] == "string"){
            return "string_type"
        }else if(Array.isArray(obj[0])){
            return "array_type"
        }else if(typeof obj[0] == "object"){

        }else alert('toolbox::findType => "Mauvais formats de la valeur d\'entrée"')
    }
    selectorToHTML = function (emmetSelector) {
        let blocks = [], fragment = document.createElement('div')
        , isString = (emmet_str) => {
            let i, j, emmet_str_current_substring, emmet_str_previous_substring, emmet_str_current_operator, emmet_str_previous_operator, emmet_str_expanded
            , emmetIndex_step = 1, emmet_isEnd = 0, emmet_parents_list = [], emmet_parents_list_ = []
            , arr = [], emmet_arr = [], patterns = [">","+","^","(",")"]
            , container_obj = {}, container_obj_previous, container_obj_previous_parent
            if(emmet_str.indexOf('(')){
                if(this.allIndexesOf(emmet_str, '(').length == this.allIndexesOf(emmet_str, ')').length){
                    for(i in emmet_str){
                        let arr_ = arr.slice().reverse()
                        if(emmet_str.charAt(i) == '(')
                            arr.push([i])
                        if(emmet_str.charAt(i) == ')'){
                            console.log(emmet_str.charAt(i))
                            console.log(arr_)
                            for(j in arr_){
                                console.log(arr_[j])
                                let arrPair = arr_[j]
                                if(arrPair.length==1){
                                    arrPair.push(parseInt(i)+1)
                                    break
                                }
                            }
                        }
                    }
                }
            }
            j=0
            console.log(emmet_str)
            for(i in emmet_str){
                console.log("tour: "+i, "emmet_str.length: "+emmet_str.length);
                if(parseInt(i)+1 == emmet_str.length)emmet_isEnd = 1
                emmet_str_current_operator = emmet_str[i]
                console.log("\n\n"+emmetIndex_step+"\n\n");
                if(emmetIndex_step > 1){
                    emmetIndex_step--;
                    j = parseInt(i)+1
                }else if(patterns.indexOf(emmet_str_current_operator) != -1 || emmet_isEnd){
                    console.log("current operator: "+emmet_str_current_operator, "previous operator: "+emmet_str_previous_operator);
                    console.log("current index: "+i, "previous index: "+j);
                    console.log(emmet_str.substring(j));
                    console.log(emmet_str.substring(j, parseInt(i)+emmet_isEnd));
                    emmet_str_current_substring = emmet_str.substring(j, parseInt(i)+emmet_isEnd)
                    console.log(i+"\n"+j+"\n"+emmet_str_current_substring)
                    // debugger
                    emmet_str_expanded = document.createElement(emmet_str_current_substring)

                    console.log(JSON.stringify(emmet_parents_list));
                    console.log(JSON.stringify(emmet_parents_list_));
                    if(emmet_str_previous_operator){
                        if(emmet_str_previous_operator == ">"){
                            container_obj_previous[emmet_str_current_substring] = {}
                            container_obj_previous_parent = container_obj_previous
                            container_obj_previous = container_obj_previous[emmet_str_current_substring]
                            emmet_parents_list.push(container_obj_previous)
                            emmet_parents_list_.push(emmet_str_current_substring)
                            // debugger
                            // console.log('___________');
                            // console.log(JSON.stringify(container_obj_previous_parent));
                            // console.log(JSON.stringify(container_obj));
                            // console.log(JSON.stringify(emmet_parents_list));
                        }
                        if(emmet_str_previous_operator == "+"){
                            // console.log('----------');
                            // console.log(JSON.stringify(container_obj_previous_parent));
                            // console.log(JSON.stringify(container_obj));
                            // console.log(JSON.stringify(emmet_parents_list));
                            container_obj_previous_parent[emmet_str_current_substring] = {}
                            container_obj_previous = container_obj_previous_parent[emmet_str_current_substring]
                            emmet_parents_list.pop()
                            emmet_parents_list_.pop()
                            emmet_parents_list.push(container_obj_previous)
                            emmet_parents_list_.push(emmet_str_current_substring)
                            // debugger
                            // console.log(JSON.stringify(container_obj_previous_parent));
                            // console.log(JSON.stringify(container_obj));
                        }
                        if(emmet_str_current_operator == "^"){
                            let ok = emmet_str[parseInt(i)+1]
                            , okk = parseInt(i)+1
                            , ii = i
                            // debugger
                            while(emmet_str[parseInt(ii)+1] == '^'){
                                ii++
                                emmetIndex_step++
                            }
                            // debugger
                        }
                        if(emmet_str_previous_operator == "^"){
                            // console.log('----------');
                            // console.log(JSON.stringify(container_obj_previous_parent));
                            // console.log(JSON.stringify(container_obj));
                            // console.log(JSON.stringify(emmet_parents_list));
                            // console.log(JSON.stringify(emmet_parents_list_));
                            // console.log(JSON.stringify(emmet_parents_list.at(-1)));
                            // console.log(JSON.stringify(emmet_parents_list.at(-2)));
                            // debugger
                            emmet_parents_list.at(-3)[emmet_str_current_substring] = {}
                            // debugger
                            container_obj_previous = emmet_parents_list.at(-3)[emmet_str_current_substring]
                            container_obj_previous_parent = emmet_parents_list.at(-4)
                            emmet_parents_list.pop()
                            emmet_parents_list_.pop()
                            emmet_parents_list.pop()
                            emmet_parents_list_.pop()
                            emmet_parents_list.push(container_obj_previous)
                            emmet_parents_list_.push(emmet_str_current_substring)
                            // debugger
                            // console.log('___________')
                            // console.log(JSON.stringify(container_obj_previous_parent));
                            // console.log(JSON.stringify(container_obj));
                            // console.log(JSON.stringify(emmet_parents_list));
                            // console.log(JSON.stringify(emmet_parents_list_));
                            // console.log(JSON.stringify(emmet_parents_list.at(-1)));
                            // console.log(JSON.stringify(emmet_parents_list.at(-2)));
                        }
                        if(emmet_str_previous_operator == "("){}
                    }

                    if(!Object.keys(container_obj).length){
                        container_obj[emmet_str_current_substring] = {}
                        container_obj_previous = container_obj[emmet_str_current_substring]
                        container_obj_previous_parent = container_obj
                        emmet_parents_list.push(container_obj_previous)
                        emmet_parents_list_.push(emmet_str_current_substring)
                    }
                    emmet_str_previous_operator = emmet_str_current_operator
                    emmet_str_previous_substring = emmet_str_current_substring
                    j = parseInt(i)+1
                    console.log(JSON.stringify(container_obj));
                }
                // debugger
            }
            console.log(container_obj);
            /*------------------------------*/
            /*------------------------------*/
            /*
            let tmp = emmet_str.split(">")
            , [container_str, ...elements_str] = tmp
            , container = document.createElement(container_str) //IL FAUT VÉRIFIER SI container_str EST COMPLEXE OU SI (ex: "a" est simple, "a*3" est complexe)
            //IL FAUT ICI POUVOIR TRADUIRE LA SYNTAXE emmet AU MIEUX

            //SINON DANS UN 1er TEMPS, TRADUIRE UN EMMET SIMPLE SERA SUFFISANT            
            , elements = elements_str.map(element=>document.createElement(element))
        / * POUR REMPLACER L'INSTRUCTION CI-DESSUS
            , elements = elements_str.map(sub_emmet=>{
                    let sub_emmet_expanded// = une fonction qui traite '+', '^', '$', '*'
                    return document.createElement(sub_emmet_expanded)
                )
            }
        * /
            , element0 = elements.shift()
            , elementN = element0
            elements.forEach(()=>{
                let element = elements.shift()
                elementN.append(element)
                elementN = element
            })
            container.append(element0)
            console.log(container);
            */
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
    allIndexesOf = (str, searched) => {
        let arr = []
        while(str.indexOf(searched)!=-1){
            arr.push(str.indexOf(searched))
            str = str.substring(arr.at(-1)+1)
        }
        return arr
    }


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