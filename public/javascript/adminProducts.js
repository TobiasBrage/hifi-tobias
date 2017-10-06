var searchParams = new URLSearchParams(window.location.search);
let getCat = searchParams.get('id');
var loggedInId = readCookie('loggedIn');

fetch('http://localhost:1337/user/id='+loggedInId)
.then((response) => {
    return response.json();
})
.then((data) => {
    var userPermission = data[0].tilladelse;
    if(userPermission == 'admin') {
        window.location.href = 'messages.html';
    }
});

fetch('http://localhost:1337/product/categories')
.then((response) => {
    return response.json();
})
.then((data) => {
    let selectResultHtml = '<li><a href="panel.html">Alle produkter</a></li>';
    for (catCount = 0; catCount < data.length; catCount++) { 
        selectResultHtml += '<li><a href="panel.html?id=' + data[catCount].id + '">' + data[catCount].navn + '</a></li>';
    }
    document.getElementById('categoryDropDown').innerHTML = selectResultHtml;
});

if (searchParams.has('id')) {
    fetch('http://localhost:1337/category/id='+getCat)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let lastCat = "";
        let productContainerCount = null;
        let searchResultHtml = '<h2 class="product-title">' + data[0].kategori + '</h2>';
        data.forEach(function(item) { 
            productContainerCount ++; 
            if(productContainerCount == 1) {
                searchResultHtml += '<span class="productContainerCount">';
            }
            searchResultHtml += '<div class="col col-md-4 col-xs-12 productItemContainer"><div class="product-link" href="#"><div class="editContainerOriginal" id="editContainerOriginal' + item.id + '"><img class="uneditedEditImage" src="../image/' + item.billede + '"><h2 class="uneditedEditTitle">' + item.navn + '</h2><p disabled class="uneditedEditDescription" id="uneditedEditDescription' + item.id + '">' + item.beskrivelse + '</p></div><div class="editContainer" id="editContainer' + item.id + '"><div class="editedEditImage">Vælg et billede fra listen.<select class="editSelectImage" id="editSelectImage' + item.id + '" onchange="imageChange(' + item.id + ')"></select><span class="editImageContainer"><img class="editImage" id="editImage' + item.id + '" src="../image/' + item.billede + '"></span></div><input type="text" class="editedEditTitle" id="editedEditTitle' + item.id + '" value="' + item.navn + '"><textarea class="editedEditDescription" id="editedEditDescription' + item.id + '">' + item.beskrivelse + '</textarea></div><div class="editButtonContainer" id="editButtonContainer' + item.id + '"><input type="button" class="deleteProductButton" value="Slet" onclick="deleteProduct(' + item.id + ')"><input type="button" class="editProductButton" value="Rediger" onclick="editProduct(' + item.id + ')"></div><div class="saveEditButtonContainer" id="saveEditButtonContainer' + item.id + '"><input type="button" class="cancelProductButton" value="Annuller" onclick="cancelProduct(' + item.id + ')"><input type="button" class="saveProductButton" value="Gem" onclick="saveProduct(' + item.id + ')"></div></div></div>';     
            lastCat = item.kategori; 
            if(productContainerCount == 3) {
                searchResultHtml += '</span>';
                productContainerCount = 0;
            }         
        });
        if(!data == "") {
            document.getElementById('productContainer').innerHTML = searchResultHtml;
        } else {
            document.getElementById('productContainer').innerHTML = '<p class="searchError">Ingen kategorier at vise.</p>';
        }
    });
} else {
    fetch('http://localhost:1337/category')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let searchResultHtml = "";
        let lastCat = "";
        let productContainerCount = null;
        data.forEach(function(item) { 
            productContainerCount ++; 
            if(lastCat != item.kategori) {
                searchResultHtml += '<h2 class="product-title">' + item.kategori + '</h2>';
                productContainerCount = 1;
            }
            if(productContainerCount == 1) {
                searchResultHtml += '<span class="productContainerCount">';
            }
            searchResultHtml += '<div class="col col-md-4 col-xs-12 productItemContainer"><div class="product-link"><div class="editContainerOriginal" id="editContainerOriginal' + item.id + '"><img class="uneditedEditImage" src="../image/' + item.billede + '"><h2 class="uneditedEditTitle">' + item.navn + '</h2><p disabled class="uneditedEditDescription" id="uneditedEditDescription' + item.id + '">' + item.beskrivelse + '</p></div><div class="editContainer" id="editContainer' + item.id + '"><div class="editedEditImage">Vælg et billede fra listen.<select class="editSelectImage" id="editSelectImage' + item.id + '" onchange="imageChange(' + item.id + ')"></select><span class="editImageContainer"><img class="editImage" id="editImage' + item.id + '" src="../image/' + item.billede + '"></span></div><input type="text" class="editedEditTitle" id="editedEditTitle' + item.id + '" value="' + item.navn + '"><textarea class="editedEditDescription" id="editedEditDescription' + item.id + '">' + item.beskrivelse + '</textarea></div><div class="editButtonContainer" id="editButtonContainer' + item.id + '"><input type="button" class="deleteProductButton" value="Slet" onclick="deleteProduct(' + item.id + ')"><input type="button" class="editProductButton" value="Rediger" onclick="editProduct(' + item.id + ')"></div><div class="saveEditButtonContainer" id="saveEditButtonContainer' + item.id + '"><input type="button" class="cancelProductButton" value="Annuller" onclick="cancelProduct(' + item.id + ')"><input type="button" class="saveProductButton" value="Gem" onclick="saveProduct(' + item.id + ')"></div></div></div>';     
            lastCat = item.kategori; 
            if(productContainerCount == 3) {
                searchResultHtml += '</span>';
                productContainerCount = 0;
            }      
        });
        if(!searchResultHtml == "") {
            document.getElementById('productContainer').innerHTML = searchResultHtml;
        } else {
            document.getElementById('productContainer').innerHTML = '<p class="searchError">Fejl.</p>';
        }
    });
}

function editProduct(editId) {
    $('.editContainerOriginal').show();
    $('.editContainer').hide();
    $('.editButtonContainer').show();
    $('.saveEditButtonContainer').hide();
    document.getElementById("editContainerOriginal"+editId).style.display = "none";
    document.getElementById("editContainer"+editId).style.display = "block";
    document.getElementById("editButtonContainer"+editId).style.display = "none";
    document.getElementById("saveEditButtonContainer"+editId).style.display = "block";

    fetch('http://localhost:1337/product/images')
    .then((response) => {
        return response.json();
    })
    .then((dataListImg) => {
        let selectResultHtml = null;
        let curProductImg = null;
        fetch('http://localhost:1337/product/id='+editId)
        .then((response) => {
            return response.json();
        })
        .then((dataCurImg) => {
            curProductImg = dataCurImg[0].billede;
            for (imgCount = 0; imgCount < dataListImg.length; imgCount++) { 
                if(dataListImg[imgCount].billede == curProductImg) {
                    selectResultHtml += '<option value="' + dataListImg[imgCount].billede + '" selected="selected">' + dataListImg[imgCount].billede + '</option>';
                } else {
                    selectResultHtml += '<option value="' + dataListImg[imgCount].billede + '">' + dataListImg[imgCount].billede + '</option>';
                }
            }
            document.getElementById('editSelectImage'+editId).innerHTML = selectResultHtml;
        });
    });
}

function cancelProduct(editId) {
    document.getElementById("editContainerOriginal"+editId).style.display = "block";
    document.getElementById("editContainer"+editId).style.display = "none";
    document.getElementById("editButtonContainer"+editId).style.display = "block";
    document.getElementById("saveEditButtonContainer"+editId).style.display = "none";

    document.querySelector('#editedEditDescription'+editId).innerHTML = document.querySelector('#uneditedEditDescription'+editId).innerHTML;
}

function deleteProduct(editId) {
    var confirmDeleteProduct = confirm("Slet dette produkt?\nHandlingen kan ikke gøres om.");
    if (confirmDeleteProduct == true) {
        fetch('http://localhost:1337/delete/product/id='+editId)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(data == "deletedSuccess") {
                location.reload();
            } else {
                alert('Der skete en fejl.');
            }
        });
    }
}

function saveProduct(editId) {
    let productImageEdit = document.querySelector('#editSelectImage'+editId).value;
    let productTitleEdit = document.querySelector('#editedEditTitle'+editId).value;
    let productDescriptionEdit = document.querySelector('#editedEditDescription'+editId).value;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let init = {
        method: 'POST',
        headers: headers,
        body: `{"id":"${editId}","image":"${productImageEdit}","title":"${productTitleEdit}","description":"${productDescriptionEdit}"}`,
        cache: 'no-cache',
        mode: 'cors'
    };

    let request = new Request('http://localhost:1337/edit/product', init);
    fetch(request)
        .then(response => {
            return response.json();
        })
        .then((data) => { 
            if(data.message == 'editedSuccess') {
                location.reload();
            } else {
                alert('Der skete en fejl.');
            }
    });
}

function imageChange(editId) {
    let tmpChoosenImg = document.querySelector('#editSelectImage'+editId).value;
    document.getElementById('editImage'+editId).src="../image/"+tmpChoosenImg;
}

function readCookie(cookieName) {
    var nameTmp = cookieName + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameTmp) == 0) return c.substring(nameTmp.length,c.length);
    }
    return null;
}