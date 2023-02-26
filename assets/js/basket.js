"use strict"


let tableBody = document.querySelector("tbody");

let products = JSON.parse(localStorage.getItem("basket"));


if (products != null) {

    for (const product of products) {
        tableBody.innerHTML += `<tr>
        <td>
        <img src="${product.img}" alt="">
        </td>
        <td>${product.name}</td>
        <td>${product.description}</td>
        <td>${product.price}</td>
        <td><span class="minus">- </span><span>${product.count}</span><span class="plus"> +</span></td>
        <td class="d-none">${product.id}</td>    
        <td><i class="fa-solid fa-trash-can"></i></td>
        </tr>`
    }
    getBasketCount(products);
    totalPrice(products);

} else {
    document.querySelector("table").classList.add("d-none");
    document.querySelector(".alert-danger").classList.remove("d-none");
    document.querySelector("#basket .total").classList.add("d-none");
    document.querySelector(".clear-btn").classList.add("d-none")
}



function getBasketCount(arr) {
    let sum = 0;
    for (const item of arr) {
        sum += item.count
    }


    document.querySelector("sup").innerText = sum;
}




//DELETE DATA FROM BASKET

let deleteIcons = document.querySelectorAll("tbody tr td i");


for (const deleteIcon of deleteIcons) {
    deleteIcon.addEventListener("click", function () {
        let newList = products.filter(m => m.id != deleteIcon.parentNode.previousElementSibling.innerText)



        products = newList;   

        localStorage.setItem("basket", JSON.stringify(products))   

        window.location.reload();   

        if (products.length == 0) {   
            localStorage.clear();
        }
    })
}

// let newList = products.splice(i,1)  



//total price
function totalPrice(arr) {
    let sum = 0;
    for (const item of arr) {
        sum += parseInt(item.price) * parseInt(item.count);       
    }
    document.querySelector("#basket .total h3").innerHTML = `<span>Total: ${sum} AZN </span>`;   
}



//clear all products 
let clearBtn = document.querySelector(".clear-btn");
clearBtn.addEventListener("click", function () {
    localStorage.clear();
    window.location.reload();
})



let minusIcons = document.querySelectorAll("tbody tr td .minus")

for (const minusIcon of minusIcons) {
    minusIcon.addEventListener("click", function () {
        for (const product of products) {

            if (product.id == minusIcon.parentNode.nextElementSibling.innerText) {
                if (minusIcon.nextElementSibling.innerText == 0) {
                    return;
                }
                minusIcon.nextElementSibling.innerText--;
                product.count--;
                totalPrice(products)
                window.location.reload();
            }
        }
        localStorage.setItem("basket", JSON.stringify(products))
    })
}



let plusIcons = document.querySelectorAll("tbody tr td .plus")

for (const plusIcon of plusIcons) {
    plusIcon.addEventListener("click", function () {
        for (const product of products) {
            if (product.id == plusIcon.parentNode.nextElementSibling.innerText) {  
                plusIcon.previousElementSibling.innerText++;                      
                product.count++;                                                  
                totalPrice(products)                                               
                window.location.reload();
            }
        }
        localStorage.setItem("basket", JSON.stringify(products))                   

    })
}



