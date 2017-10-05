var loggedInUserId = readCookie('loggedIn');

fetch('http://localhost:1337/user/id='+loggedInUserId)
.then((response) => {
    return response.json();
})
.then((data) => {
    document.getElementById('name').value = data[0].navn;
    document.getElementById('mail').value = data[0].mail;
    document.getElementById('username').value = data[0].brugernavn;
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

document.querySelector('#userSaveSubmit').addEventListener('click', (event) => {
    let userFirstName = document.getElementById('name').value;
    let userEmail = document.getElementById('mail').value;
    let userName = document.getElementById('username').value;

    if(userFirstName.length > 1) {
        if(userEmail.length > 5) {
            if(userName.length > 4) {
                
                let headers = new Headers();
                headers.append('Content-Type', 'application/json');
                let init = {
                    method: 'POST',
                    headers: headers,
                    body: `{"id":"${loggedInUserId}","name":"${userFirstName}","mail":"${userEmail}","username":"${userName}"}`,
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

document.querySelector('#userDeleteSubmit').addEventListener('click', (event) => {
    let confirmDeleteCategory = confirm("Slet din bruger?\nHandlingen kan ikke gøres om.");
    if (confirmDeleteCategory == true) {
        fetch('http://localhost:1337/delete/user/id='+loggedInUserId)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(data == 'deletedSuccess') {
                alert('Din bruger blev slettet.');
                document.cookie = "loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                window.location.href = '../admin/';
            } else {
                alert('Der skete en fejl med at slette din bruger.');
            }
        });
    }
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