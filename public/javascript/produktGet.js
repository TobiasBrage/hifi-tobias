var searchParams = new URLSearchParams(window.location.search);
let getSrc = searchParams.get('src');
let getCat = searchParams.get('id');

fetch('http://localhost:1337/product/categories')
.then((response) => {
    return response.json();
})
.then((data) => {
    let selectResultHtml = '<li><a href="../produkt/">Alle produkter</a></li>';
    for (catCount = 0; catCount < data.length; catCount++) { 
        selectResultHtml += '<li><a href="../produkt/?id=' + data[catCount].id + '">' + data[catCount].navn + '</a></li>';
    }
    document.getElementById('categoryDropDown').innerHTML = selectResultHtml;
});

if(searchParams.has('src')) {
    if(getSrc.length > 2) {
        fetch('http://localhost:1337/search/src='+getSrc)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            var searchResultHtml = "";
            var lastCat = "";
            data.forEach(function(item) { 
                if(lastCat != item.kategori) {
                    searchResultHtml += '<h2 class="product-title">' + item.kategori + '</h2>';
                }
                searchResultHtml += '<div class="col col-md-4 col-xs-12"><a class="product-link" href="#"><img class="featured-image" src="../image/' + item.billede + '"><h2 class="featured-item-title">' + item.navn + '</h2><p class="featured-item-description">' + item.beskrivelse + '</p></a></div>';     
                lastCat = item.kategori;        
            });
            if(!searchResultHtml == "") {
                document.getElementById('productContainer').innerHTML = searchResultHtml;
            } else {
                document.getElementById('productContainer').innerHTML = '<p class="searchError">"' + getSrc + '"' + ' gav ingen resultater. <a href="../produkt/">Vis alle produkter?</a></p>';
            }
        });
    } else {
        document.getElementById('productContainer').innerHTML = '<p class="searchError">Din søgning er for kort. <a href="../produkt/">Vis alle produkter?</a></p>';
    }
    document.getElementById('srcInput').value=getSrc; 
} else if (searchParams.has('id')) {
    fetch('http://localhost:1337/category/id='+getCat)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        var searchResultHtml = '<h2 class="product-title">' + data[0].kategori + '</h2>';
        let productContainerCount = null;
        data.forEach(function(item) { 
            productContainerCount ++; 
            if(productContainerCount == 1) {
                searchResultHtml += '<span class="productContainerCount">';
            }
            searchResultHtml += '<div class="col col-md-4 col-xs-12 productItemContainer"><a class="product-link" href="#"><img class="featured-image" src="../image/' + item.billede + '"><h2 class="featured-item-title">' + item.navn + '</h2><p class="featured-item-description">' + item.beskrivelse + '</p></a></div>';      
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

        
        searchResultHtml += '<div class="col col-md-4 col-xs-12 productItemContainer"><div class="product-link" href="#"><div class="editContainerOriginal" id="editContainerOriginal' + item.id + '"><img class="uneditedEditImage" src="../image/' + item.billede + '"><h2 class="uneditedEditTitle">' + item.navn + '</h2><p disabled class="uneditedEditDescription" id="uneditedEditDescription' + item.id + '">' + item.beskrivelse + '</p></div><div class="editContainer" id="editContainer' + item.id + '"><div class="editedEditImage">Vælg et billede fra listen.<select class="editSelectImage" id="editSelectImage' + item.id + '" onchange="imageChange(' + item.id + ')"></select><span class="editImageContainer"><img class="editImage" id="editImage' + item.id + '" src="../image/' + item.billede + '"></span></div><input type="text" class="editedEditTitle" id="editedEditTitle' + item.id + '" value="' + item.navn + '"><textarea class="editedEditDescription" id="editedEditDescription' + item.id + '">' + item.beskrivelse + '</textarea></div><div class="editButtonContainer" id="editButtonContainer' + item.id + '"><input type="button" class="deleteProductButton" value="Slet" onclick="deleteProduct(' + item.id + ')"><input type="button" class="editProductButton" value="Rediger" onclick="editProduct(' + item.id + ')"></div><div class="saveEditButtonContainer" id="saveEditButtonContainer' + item.id + '"><input type="button" class="cancelProductButton" value="Annuller" onclick="cancelProduct(' + item.id + ')"><input type="button" class="saveProductButton" value="Gem" onclick="saveProduct(' + item.id + ')"></div></div></div>';     
        lastCat = item.kategori; 
        
    });
} else {
    fetch('http://localhost:1337/category')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        var searchResultHtml = "";
        var lastCat = "";
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
            searchResultHtml += '<div class="col col-md-4 col-xs-12 productItemContainer"><a class="product-link" href="#"><img class="featured-image" src="../image/' + item.billede + '"><h2 class="featured-item-title">' + item.navn + '</h2><p class="featured-item-description">' + item.beskrivelse + '</p></a></div>';     
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
