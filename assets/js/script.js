"use strict"

//LOCAL STORAGE


// localStorage.setItem("name","Cavid");

// localStorage.setItem("surname", "Ismayilzade")

// // console.log(localStorage.getItem("name"));




// // localStorage.removeItem();



// let names = ["Pervin","Elekber","Aqshin"]

// // localStorage.setItem("name", names);



// localStorage.setItem("name", JSON.stringify(names));



// console.log(JSON.parse(localStorage.getItem("names")));


// document.querySelector("button").onclick = function(){
//     // localStorage.removeItem("name");
//     

//     // localStorage.clear();
//    


//     let datas = JSON.parse(localStorage.getItem("names")); 
//     

//     for (const item of datas) {
//         console.log(item);
//     }  
//     

// }


//  SESSION STORAGE

// sessionStorage.setItem("email","test@gmail.com")

// console.log(sessionStorage.getItem("email"));



//  BASKET



let cardBtns = document.querySelectorAll("#shop a")

let products = [];  

if(localStorage.getItem("basket") != null){                   
    products = JSON.parse(localStorage.getItem("basket"))    
  

}

cardBtns.forEach(btn => {
    btn.addEventListener("click", function (e) {              

        e.preventDefault();                                   

        let productImg = this.parentNode.previousElementSibling.getAttribute("src");  
        let productName = this.parentNode.firstElementChild.innerText;
        let productDesc = this.previousElementSibling.previousElementSibling.innerText;
        let productPrice = this.previousElementSibling.innerText;
        let productId = parseInt(this.parentNode.parentNode.getAttribute("data-id"));

        let exitProduct = products.find(m => m.id == productId)
     
       
        if(exitProduct != undefined){
            exitProduct.count +=1;
        }else{
            products.push({
                
                
                id:productId,
                name: productName,        
                img: productImg,
                description: productDesc,
                price:productPrice,
                count: 1
            })
        }

        getBasketCount(products);

      

        localStorage.setItem("basket", JSON.stringify(products));
      
        
    })
});



function getBasketCount(arr){
    let sum = 0;
    for (const item of arr) {
        sum+=item.count
    }
    //document.querySelector("sup").innerText = arr.length;   

    document.querySelector("sup").innerText = sum; 
}

getBasketCount(products);