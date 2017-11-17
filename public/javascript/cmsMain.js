var userId = readCookie('userId');

fetch('http://localhost:1337/user/id='+userId)
.then((response) => {
    return response.json();
})
.then((data) => {
    document.getElementById("userDropDown").innerHTML = data[0].brugernavn;
    document.getElementById("cmsUsername").value = data[0].brugernavn;
    document.getElementById("cmsForname").value = data[0].navn;
    document.getElementById("cmsMail").value = data[0].mail;
});

document.querySelector('#cmsUserSubmit').addEventListener('click', (event) => {
    let userFirstName = document.getElementById('cmsForname').value;
    let userEmail = document.getElementById('cmsMail').value;
    let userName = document.getElementById('cmsUsername').value;

    if(userFirstName.length > 1) {
        if(userEmail.length > 5) {
            if(userName.length > 4) {
                
                let headers = new Headers();
                headers.append('Content-Type', 'application/json');
                let init = {
                    method: 'POST',
                    headers: headers,
                    body: `{"id":"${userId}","name":"${userFirstName}","mail":"${userEmail}","username":"${userName}"}`,
                    cache: 'no-cache',
                    mode: 'cors'
                };
                let request = new Request('http://localhost:1337/edit/user', init);
                fetch(request)
                    .then(response => {
                        return response.json();
                    })
                    .then((data) => { 
                        if(data.message == 'editedSuccess') {
                            alert('Dine oplysninger er blevet ændret.');
                            location.reload();
                        } else {
                            alert('Der skete en fejl med at ændre dine oplysninger.');
                        }
                });
            } else {
                alert('Dit brugernavn er for kort.');
            }
        } else {
            alert('Din e-mail er for kort.');
        }
    } else {
        alert('Dit navn er for kort.');
    }
});

function loadProducts() {
    fetch('http://localhost:1337/category')
    .then((response) => {
        return response.json();
    })
    .then((dataUser) => {
        var cmsProductHtml = '';
        dataUser.forEach(element => {
            let descriptionMax = 108;
            if(element.beskrivelse.length > descriptionMax) {
                shortDescription = element.beskrivelse.slice(0, descriptionMax);
                cmsProductHtml += '<li class="cmsProductItem" id="cmsProductItem'+element.id+'"><img class="cmsProductImage" src="../image/'+element.billede+'"><div id="cmsProductContentContainer'+element.id+'"><div class="cmsTitleContainer"><h3 class="cmsProductTitle">'+element.navn+'</h3></div><div class="cmsDescriptionContainer"><p id="cmsDescription'+element.id+'" class="cmsProductDescription">'+shortDescription+'...</p></div><div class="cmsProductEdit"><span class="glyphicon glyphicon-trash"  onClick="productDelete('+element.id+');"></span><span class="glyphicon glyphicon-edit" onClick="productEdit('+element.id+');"></span><span class="glyphicon glyphicon-resize-full" onClick="productFullSize('+element.id+');"></span></div></div></li>';            
            } else {
                cmsProductHtml += '<li class="cmsProductItem"><img class="cmsProductImage" src="../image/'+element.billede+'"><div class="cmsTitleContainer"><h3 class="cmsProductTitle">'+element.navn+'</h3></div><div class="cmsDescriptionContainer"><p class="cmsProductDescription">'+element.beskrivelse+'</p></div><div class="cmsProductEdit"><span class="glyphicon glyphicon-trash" onClick="productDelete('+element.id+');"></span><span class="glyphicon glyphicon-edit" onClick="productEdit('+element.id+');"></span></div></li>';
            }
        });
        document.getElementById("cmsProductUl").innerHTML = cmsProductHtml;
    });
}

function productFullSize(productId) {
    fetch('http://localhost:1337/category/id='+productId)
    .then((response) => {
        return response.json();
        alert('response');
    })
    .then((dataProduct) => {
        let editProductId = document.getElementById('cmsDescription'+productId);
        editProductId.innerHTML = dataProduct[0].beskrivelse;
        editProductId.classList.add('test');
        $('.cmsDescription'+productId).removeClass(".editProductId");
    });
}

function productDelete(productId) {
    var confirmDeleteProduct = confirm("Slet dette produkt?\nHandlingen kan ikke gøres om.");
    if (confirmDeleteProduct == true) {
        fetch('http://localhost:1337/delete/product/id='+productId)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(data == "deletedSuccess") {
                loadProducts();
            } else {
                alert('Der skete en fejl.');
            }
        });
    }
}

function productEdit(productId) {
    alert(productId);
}

var imageUploadState = null;

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
        } else if(imageUploadState == 'imageExcists') {
            alert('Billedet eksisterer allerede.');
        } else if(imageUploadState == 'imageInvalid') {
            alert('Billede er ikke tilføjet eller understøttes ikke.');
        } else {
            fetch('http://localhost:1337/product/lastid')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let lastProductId = data[0].varenr+1;
                let choosenImageFIle = $("#addProductImageUpload")[0].files[0];
                let productTitle = document.querySelector('#cmsTitle').value;
                let productPrice = document.querySelector('#cmsPrice').value;
                let productDescription = document.querySelector('#cmsDescription').value;
                let productCategory = document.querySelector('#cmsCategory').value;
                let headers = new Headers();

                headers.append('Content-Type', 'application/json');
                let init = {
                    method: 'POST',
                    headers: headers,
                    body: `{"image":"${choosenImageFIle.name}","title":"${productTitle}","description":"${productDescription}","price":"${productPrice}","category":"${productCategory}","stock":"1", "productid":"${lastProductId}"}`,
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
                            alert('Produktet blev oprettet.');
                            document.querySelector('#cmsTitle').value = '';
                            document.querySelector('#cmsPrice').value = '';
                            document.querySelector('#cmsDescription').value = '';
                            document.querySelector('#cmsImageFileName').innerHTML = '';
                            loadProducts();
                            updateCategoryList();
                        } else {
                            alert('Der skete en fejl med oprettelsen af produktet.');
                        }
                });
            });
        }
    });
    return false;
}

function imageChange() {
    let choosenImageFIle = $("#addProductImageUpload")[0].files[0]; 
    document.querySelector('#cmsImageFileName').innerHTML = choosenImageFIle.name;
}

document.querySelector('#cmsImageChooseBtn').addEventListener('click', (event) => {
    document.getElementById('addProductImageUpload').click();
});

loadProducts();

function updateCategoryList() {
    document.getElementById('cmsCategory').innerHTML = "";
    fetch('http://localhost:1337/product/categories')
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let selectResultHtml = null;
        for (catCount = 0; catCount < data.length; catCount++) { 
            selectResultHtml += '<option value="' + data[catCount].id + '">' + data[catCount].navn + '</option>';
        }
        document.getElementById('cmsCategory').innerHTML = selectResultHtml;
    });
}

updateCategoryList();