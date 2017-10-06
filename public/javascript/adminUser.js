var loggedInId = readCookie('loggedIn');

if(loggedInId == null) {
    window.location.href = '../';
} else {
    fetch('http://localhost:1337/user/id='+loggedInId)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        var userId = data[0].id;
        var username = data[0].brugernavn;
        var userRealName = data[0].navn;
        var userMail = data[0].mail;
        var userPassword = data[0].kodeord;
        var userPermission = data[0].tilladelse;
        document.getElementById('userDropDown').innerHTML = username;
        if(userPermission == 'superadmin') {
            document.getElementById('mainNavBar').innerHTML += '<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Produkter <span class="caret"></span></a><ul class="dropdown-menu" id="categoryDropDown"><li><a href="panel.html">Alle produkter</a></li><li><a href="panel.html?id=1">CD Afspillere</a></li><li><a href="panel.html?id=2">DVD Afspillere</a></li><li><a href="panel.html?id=3">Effektforstærkere</a></li><li><a href="panel.html?id=4">Forforstærkere</a></li><li><a href="panel.html?id=5">Højtalere</a></li><li><a href="panel.html?id=6">Int. Forstærkere</a></li><li><a href="panel.html?id=7">Pladespillere</a></li><li><a href="panel.html?id=8">Rørforstærkere</a></li></ul></li>';
            document.getElementById('mainNavBar').innerHTML += '<li><a href="addProduct.html">Tilføj produkt</a></li>';
            document.getElementById('mainNavBar').innerHTML += '<li><a href="users.html">Brugere</a></li>';
            document.getElementById('mainNavBar').innerHTML += '<li><a href="messages.html">Beskeder</a></li>';
        } else if(userPermission == 'admin') {
            document.getElementById('mainNavBar').innerHTML += '<li><a href="messages.html">Beskeder</a></li>';
        }
    });
}

document.querySelector('#userLogOut').addEventListener('click', (event) => {
    document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = '../admin/';
});

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