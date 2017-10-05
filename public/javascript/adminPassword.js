var loggedInUserId = readCookie('loggedIn');

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

document.querySelector('#userSavePassword').addEventListener('click', (event) => {
    let oldPassword = document.getElementById('oldPassword').value;
    let newPassword = document.getElementById('newPassword').value;
    let newRepeatPassword = document.getElementById('newRepeatPassword').value;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let init = {
        method: 'POST',
        headers: headers,
        body: `{"id":"${loggedInUserId}","oldPassword":"${oldPassword}","newPassword":"${newPassword}","newRepeatPassword":"${newRepeatPassword}"}`,
        cache: 'no-cache',
        mode: 'cors'
    };
    let request = new Request('http://localhost:1337/edit/password', init);
    fetch(request)
        .then(response => {
            return response.json();
        })
        .then((data) => { 
            if(data.message == 'changePasswordSuccess') {
                alert('Din adgangskode blev ændret.');
                location.reload();
            } else if(data.message == 'shortOldPassword') {
                alert('Din nuværende adgangskode er for kort.');
            } else if(data.message == 'noNewMatchPassword') {
                alert('Din nye adgangskode matcher ikke hinanden.');
            } else if(data.message == 'shortNewPassword') {
                alert('Din nye adgangskode er for kort.');
            } else if(data.message == 'noMatchPassword') {
                alert('Din nuværende adgangskode matcher ikke.');
            } else if(data.message == 'noMatchPassword') {
                alert('Din nuværende adgangskode matcher ikke.');
            } else {
                alert('Der skete en fejl med ændringen af din adgangskode.');
            }
    });
    
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