/* Your JS Code goes here */
import '../scss/index.scss';
import data from './data-sample.js';
import mapDOM from "./mapDOM.js"


let {arr1, arr2, arr3, arr4} = data
// , maps = []


window.data = data
window.mapDOM = mapDOM
let arr1MAP = new mapDOM(arr1)
// let arr2MAP = new mapDOM(arr2)
// let arr3MAP = new mapDOM(arr3)
// let arr4MAP = new mapDOM(arr4)



console.log(arr1MAP.mapDOM);
document.querySelector('body>main').appendChild(arr1MAP.mapDOM)
// // // // console.log(arr1MAP[arr1MAP.mapType]());


// arr1MAP.selectorToHTML("div>p+section>span^article>b>i^^cite")
// $$$("div>p+section>span^article>b>i^cite")
console.log($$$('tag#id.classes.separated.by.dots.and[attributes="sepearated by",commas=""]{Plus inner texts all included}>.nested-$*3>.sibling^.parent'))
console.log(arr1MAP.$('tag#id.classes.separated.by.dots.and[attributes="sepearated by",commas=""]{Plus inner texts all included}>.nested*3>.sibling^.parent'));






