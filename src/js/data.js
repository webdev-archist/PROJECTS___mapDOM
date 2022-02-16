
let arr1 = [
    /*Ces arrays simple vont avoir:
        1°) un titre,
        2°) et des ressources
    tout séparé par ':::'
    le programme devra déterminer comment afficher la ressource (est-ce une vidéo, une simple url, un pdf, etc..)
    */
    "Je suis un titre:::https://www.youtube.com/watch?v=Y80juYcu3ZI&list=PLwLsbqvBlImHG5yeUCXJ1aqNMgUKi1NK3&ab_channel=PierreGiraud:::https://www.shortcutfoo.com/app/dojos/vim:::Je suis une description écrite en dure"
]
, arr2 = [
    /*
    */
    [
        "Je suis un titre",
        "https://www.youtube.com/watch?v=Y80juYcu3ZI&list=PLwLsbqvBlImHG5yeUCXJ1aqNMgUKi1NK3&ab_channel=PierreGiraud",
        "https://www.shortcutfoo.com/app/dojos/vim",
        "Je suis une description écrite en dure"
    ]
]
, arr3 = [
    /*
    */
   {
       "Je suis un titre": [
           "https://www.youtube.com/watch?v=Y80juYcu3ZI&list=PLwLsbqvBlImHG5yeUCXJ1aqNMgUKi1NK3&ab_channel=PierreGiraud",
           "https://www.shortcutfoo.com/app/dojos/vim",
           "Je suis une description écrite en dure"
        ]
   }
]
, arr4 = [
    {
        titre: " Je suis un titre",
        resource: [
            "https://www.youtube.com/watch?v=Y80juYcu3ZI&list=PLwLsbqvBlImHG5yeUCXJ1aqNMgUKi1NK3&ab_channel=PierreGiraud",
            "https://www.shortcutfoo.com/app/dojos/vim",
            "Je suis une description écrite en dure"
        ]
    }
]


export default {arr1, arr2, arr3}





 