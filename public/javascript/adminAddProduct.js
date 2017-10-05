var imageUploadState = null;

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

fetch('http://localhost:1337/product/lastid')
.then((response) => {
    return response.json();
})
.then((data) => {
    document.getElementById('productid').value = data[0].varenr+1;
});

function imageUpload() {
    var imageData = new FormData(document.getElementById("addProductImageForm"));
    imageData.append("imgUploadPost", "");
    $.ajax({
      url: "imageUpload.php",
      type: "POST",
      data: imageData,
      processData: false,
      contentType: false  
    }).done(function(imgReturnData) {
        imageUploadState = imgReturnData;
        if(imageUploadState == 'imageError') {
            alert('Der skete en fejl med overførelsen af billedet.');
            $('#uploadedImage').hide();
        } else if(imageUploadState == 'imageExcists') {
            document.querySelector('#imageChoosenFileName').innerHTML = 'Billedet eksisterer allerede.';
            $('#uploadedImage').hide();
        } else if(imageUploadState == 'imageInvalid') {
            document.querySelector('#imageChoosenFileName').innerHTML = 'Billede er ikke tilføjet eller understøttes ikke.';
            $('#uploadedImage').hide();
        } else {
            document.querySelector('#imageChoosenFileName').innerHTML = 'Billedet er blevet uploadet.';
            let choosenImageFIle = $("#addProductImageUpload")[0].files[0]; 
            document.getElementById('uploadedImage').src="../image/"+choosenImageFIle.name;
            $('#uploadedImage').show();
        }
    });
    return false;
}

function imageChange() {
    let choosenImageFIle = $("#addProductImageUpload")[0].files[0]; 
    document.querySelector('#imageChoosenFileName').innerHTML = choosenImageFIle.name;
}

document.querySelector('#imageChooseBtn').addEventListener('click', (event) => {
    document.getElementById('addProductImageUpload').click();
});

document.querySelector('#addProductSubmit').addEventListener('click', (event) => {
    if(imageUploadState == 'imageError') {
        alert('Der skete en fejl med overførelsen af billedet.');
    } else if(imageUploadState == 'imageExcists') {
        alert('Billedet eksisterer allerede.');
    } else if(imageUploadState == 'imageInvalid') {
        alert('Billedet er ikke understøttet.');
    } else if(imageUploadState == null) {
        alert('Der er ikke tilføjet noget billede.');
    } else {
        let choosenImageFIle = $("#addProductImageUpload")[0].files[0]; 
        let productImage = choosenImageFIle.name;
        let productTitle = document.querySelector('#title').value;
        let productDescription = document.querySelector('#addProductDescription').value;
        let productPrice = document.querySelector('#price').value;
        let productCategory = document.querySelector('#addProductListCategory').value;
        let productStock = document.querySelector('#stock').value;
        let productId = document.querySelector('#productid').value;

        if(productTitle.length < 1) {
            alert('Du mangler at give produktet en titel.');
        } else if(productDescription.length < 1) {
            alert('Du mangler at give produktet en beskrivelse.');
        } else if(productPrice.length < 1) {
            alert('Du mangler at give produktet en pris.');
        } else if(productStock.length < 1) {
            alert('Du mangler at give produktet en lager beholdning.');
        } else if(productId.length < 1) {
            alert('Du mangler at give produktet et varenummer.');
        } else {
            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            let init = {
                method: 'POST',
                headers: headers,
                body: `{"image":"${productImage}","title":"${productTitle}","description":"${productDescription}","price":"${productPrice}","category":"${productCategory}","stock":"${productStock}", "productid":"${productId}"}`,
                cache: 'no-cache',
                mode: 'cors'
            };
            let request = new Request('http://localhost:1337/add/product', init);
            fetch(request)
                .then(response => {
                    return response.json();
                })
                .then((data) => { 
                    if(data.message == 'productAdded') {
                        window.location.href = 'panel.html';
                    } else {
                        alert('Der skete en fejl med oprettelsen af produktet.');
                    }
            });
        }
    }
});

document.querySelector('#editCatButton').addEventListener('click', (event) => {
    $('#newProductContainer').show();
    $('#cancelCatButton').show();
    $('#editCatButton').hide();
});

document.querySelector('#cancelCatButton').addEventListener('click', (event) => {
    $('#newProductContainer').hide();
    $('#cancelCatButton').hide();
    $('#editCatButton').show();
});

document.querySelector('#eraseCategoryButton').addEventListener('click', (event) => {
    let confirmDeleteCategory = confirm("Slet denne kategori?\nHandlingen kan ikke gøres om.");
    let productCategory = document.querySelector('#addProductListCategory').value;
    if (confirmDeleteCategory == true) {
        fetch('http://localhost:1337/delete/category/id='+productCategory)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            updateCategoryList();
        });
    }
});

document.querySelector('#addCategorySubmit').addEventListener('click', (event) => {
    let categoryName = document.getElementById('addCategoryInput').value;
    if(categoryName.length > 5) {
        fetch('http://localhost:1337/add/category/id='+categoryName)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(data == 'categoryAdded') {
                alert("Kategorien blev tilføjet med navnet '"+categoryName+"'.");
                updateCategoryList();
                document.getElementById('addCategoryInput').value = '';
            } else {
                alert('Der skete en fejl med oprettelsen af kategorien.');
            }
        });
    } else {
        alert('Kategori navnet er for kort.');
    }
});

function updateCategoryList() {
    document.getElementById('addProductListCategory').innerHTML = "";
    fetch('http://localhost:1337/product/categories')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let selectResultHtml = null;
        for (catCount = 0; catCount < data.length; catCount++) { 
            selectResultHtml += '<option value="' + data[catCount].id + '">' + data[catCount].navn + '</option>';
        }
        document.getElementById('addProductListCategory').innerHTML = selectResultHtml;
    });
}

updateCategoryList();