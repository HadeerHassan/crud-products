var alertFirst = document.getElementById("alertFirst");
var productNameInp = document.getElementById("productNameInp");
var productPriceInp = document.getElementById("productPriceInp");
var productCategoryInp = document.getElementById("productCategoryInp");
var productDescInp = document.getElementById("productDescInp");
var updateIndex;//undefind
var addBtn = document.getElementById("addBtn");

//validation---
function validateProductName() {
    var regex = /^[A-Za-z]{3,8}$/;
    if (regex.test(productNameInp.value) == true && productNameInp.value != "") {
        productNameInp.classList.remove("is-invalid");
        productNameInp.classList.add("is-valid");
        alertFirst.classList.replace("d-block", "d-none");

        addBtn.disabled = false;

        return true;
    }
    else {
        productNameInp.classList.add("is-invalid");
        productNameInp.classList.remove("is-valid");
        alertFirst.classList.replace("d-none", "d-block");
        addBtn.disabled = true;
        return false;

    }

}

function validatePrice()
{
    var regex=/^\d+(,\d{1,2})?$/;

    if (regex.test(productPriceInp.value) == true && productPriceInp.value != "") {
        productPriceInp.classList.remove("is-invalid");
        productPriceInp.classList.add("is-valid");
        alertPrice.classList.replace("d-block", "d-none");
        addBtn.disabled = false;
        return true;
    }
    else {
        productPriceInp.classList.add("is-invalid");
        productPriceInp.classList.remove("is-valid");
        alertPrice.classList.replace("d-none", "d-block");
        addBtn.disabled = true;
        return false;

    }

}

// productNameInp.addEventListener("keyup", validateProductName);


var productsList;//lma y3ml refresh hyfdaaa
if (localStorage.getItem("myProducts") == null)//zbon gdid malo4 7aga
{
    productsList = [];
}
else {
    productsList = JSON.parse(localStorage.getItem("myProducts"));
    displayProducts();
    //productList malyaan bel7aga bta3 embar7
}



addBtn.addEventListener("click", function () {


    if (addBtn.innerHTML == "add") {
        addProduct();
    }
    else {
        updateProducts();
    }
})


//add product----

function addProduct() {
    if (validateProductName() == true && validatePrice()==true) {

        var product =
        {
            name: productNameInp.value,
            price: productPriceInp.value,
            category: productCategoryInp.value,
            desc: productDescInp.value,
        }
        productsList.push(product);//product dllwa2y w products embar7 
        localStorage.setItem("myProducts", JSON.stringify(productsList));
        displayProducts();
        clearForm();
    }
    else {
        window.alert("Form Invalid")
    }



}

//update product

function updateProducts() {
    var product =
    {
        name: productNameInp.value,
        price: productPriceInp.value,
        category: productCategoryInp.value,
        desc: productDescInp.value,
    }
    productsList[updateIndex] = product;
    localStorage.setItem("myProducts", JSON.stringify(productsList));
    displayProducts();
    clearForm();

    addBtn.innerHTML = "add";

}
function setData(index) {
    updateIndex = index;//number
    //index => rakm el montag ely 3awz update
    productNameInp.value = productsList[index].name;
    productPriceInp.value = productsList[index].price;
    productCategoryInp.value = productsList[index].category;
    productDescInp.value = productsList[index].desc;

    addBtn.innerHTML = "update";

}



//display product----

function displayProducts() {
    var cont = ``;

    for (var i = 0; i < productsList.length; i++) {
        cont += `<tr>
            <td>`+ i + `</td>
            <td>` + productsList[i].name + `</td>
            <td>`+ productsList[i].price + `</td>
            <td>`+ productsList[i].category + `</td>
            <td>`+ productsList[i].desc + `</td>
            <td><button onclick='setData(`+ i + `)'  class="btn btn-warning">update</button></td>
            <td><button onclick="deleteProduct(`+ i + `)" class="btn btn-danger">delete</button></td>
            </tr>`;
    }

    document.getElementById("tableBody").innerHTML = cont;
}




function clearForm() {
    productNameInp.value = "";
    productPriceInp.value = "";
    productDescInp.value = "";
    productCategoryInp.value = "";
}

//search product
function searchProducts(term) {
    var cartoona = ``;
    for (var i = 0; i < productsList.length; i++) {
        if (productsList[i].name.toLocaleLowerCase().includes(term.toLocaleLowerCase()) == true) {
            cartoona += `<tr>
                    <td>`+ i + `</td>
                    <td>` + productsList[i].name + `</td>
                    <td>`+ productsList[i].price + `</td>
                    <td>`+ productsList[i].category + `</td>
                    <td>`+ productsList[i].desc + `</td>
                    <td><button class="btn btn-warning">update</button></td>
                    <td><button onclick="deleteProduct(`+ i + `)" class="btn btn-danger">delete</button></td>
                   
                  </tr>`
        }
    }
    document.getElementById("tableBody").innerHTML = cartoona;
}


//delete product
function deleteProduct(index) {
    productsList.splice(index, 1);
    localStorage.setItem("myProducts", JSON.stringify(productsList));
    displayProducts();
}






