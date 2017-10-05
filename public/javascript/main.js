fetch('http://localhost:1337/product/categories')
.then((response) => {
    return response.json();
})
.then((data) => {
    let selectResultHtml = '<li><a href="produkt/">Alle produkter</a></li>';
    for (catCount = 0; catCount < data.length; catCount++) { 
        selectResultHtml += '<li><a href="produkt/?id=' + data[catCount].id + '">' + data[catCount].navn + '</a></li>';
    }
    document.getElementById('categoryDropDown').innerHTML = selectResultHtml;
});

$(function(){
    var searchResultHtml = '<h2 class="featured-title">Udvalgte produkter</h2>';
    for (featuredLimit = 3; featuredLimit > 0; featuredLimit--) { 
        fetch('http://localhost:1337/product/id=rand')
            .then((response) => {
                return response.json();
        })
        .then((data) => {
            data.forEach(function(item) { 
                searchResultHtml += '<div class="col col-md-4 col-xs-12 featuredItemContainer"><a class="featured-link" href="#"><img class="featured-image" src="image/' + item.billede + '"><h2 class="featured-item-title">' + item.navn + '</h2><p class="featured-item-description">' + item.beskrivelse + '</p></a></div>';           
            });
            if(!searchResultHtml == "") {
                document.getElementById('featuredProducts').innerHTML += searchResultHtml;
                searchResultHtml = "";
            } else {
                document.getElementById('featuredProducts').innerHTML = '<p class="searchError">Fejl.</p>';
            }
        })
    }
});

$("#srcInput").on('keydown', function(){
    var searchQuery = document.querySelector('#srcInput').value;
    var results = false;
    if(searchQuery.length > 1) {
        fetch('http://localhost:1337/search/src='+searchQuery)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            var searchResultHtml = "";
            data.forEach(function(item) { 
                searchResultHtml += '<li class="searchItemContainer"><h2 class="searchItemTitle">'+ item.navn +'</h2></li>'; 
                $("#searchResultContainer").show();   
            });
            if(!searchResultHtml == "") {
                document.getElementById('searchResultContainer').innerHTML = searchResultHtml;
                results = true;
            } else {
                $("#searchResultContainer").hide();
                results = false;  
            }
        });
    } else {
        $("#searchResultContainer").hide();  
    }
});
$('#srcInput').blur(function() {
    $("#searchResultContainer").hide();
});