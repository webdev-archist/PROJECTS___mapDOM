/* Your JS Code goes here */
import '../scss/index.scss';
/* Demo JS */
import './demo.js';
import arr from './data.js';
import mapDOM from "./mapDOM.js"


let {arr1, arr2, arr3, arr4} = arr
// , maps = []


let arr1MAP = new mapDOM(arr1)
// let arr2MAP = new mapDOM(arr2)
// let arr3MAP = new mapDOM(arr3)
// let arr4MAP = new mapDOM(arr4)



console.log(arr1MAP.mapDOM);
document.querySelector('body>main').appendChild(arr1MAP.mapDOM)
// // // // console.log(arr1MAP[arr1MAP.mapType]());


arr1MAP.selectorToHTML({fr:"poopi"})






