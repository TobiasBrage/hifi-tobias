var loggedInId = readCookie('loggedIn');

fetch('http://localhost:1337/user')
.then((response) => {
    return response.json();
})
.then((data) => {
    let usersHtml = '';
    let userCount = 0;
    data.forEach(function(userData) {
        if(loggedInId != userData.id) {
            userCount ++;
            usersHtml += '<li class="editUserListItem"><h2 class="editUserListName">'+userData.navn+'</h2><input type="button" value="Slet bruger" class="eraseUserButton" onclick="deleteUser('+userData.id+')"><h2 class="editUserListPermission">'+userData.tilladelse+'</h2></li>';
        }
    });
    if(userCount == 0) {
        usersHtml = '<h2 class="editUserError">Ingen brugere.</h2>';
    }
    document.getElementById('editUserListContainer').innerHTML = usersHtml;
});

fetch('http://localhost:1337/user/permissions')
.then((response) => {
    return response.json();
})
.then((data) => {
    let userPermissionHtml = "";
    data.forEach(function(permissionData) {
        userPermissionHtml += '<option value="'+permissionData.id+'">'+permissionData.navn+'</option>';
    });
    document.getElementById('addUserCategory').innerHTML = userPermissionHtml;
});

document.querySelector('#addUserSubmit').addEventListener('click', (event) => {
    let userForName = document.querySelector('#name').value;
    let username = document.querySelector('#username').value;
    let userMail = document.querySelector('#mail').value;
    let userPermission = document.querySelector('#addUserCategory').value;
    let userPassword = document.querySelector('#password').value;
    let userRepeatPassword = document.querySelector('#repeatpassword').value;

    if(userForName.length < 1) {
        alert('Brugerens navn er for kort.');
    } else if(username.length < 4) {
        alert('Brugerens brugernavn er for kort.');
    } else if(userMail.length < 4) {
        alert('Brugerens e-mail er for kort.');
    } else if(userPassword.length < 4) {
        alert('Brugerens kodeord er for kort.');
    } else if(userPassword != userRepeatPassword) {
        alert('Brugerens kodeord matcher ikke hinanden.');
    } else {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let init = {
            method: 'POST',
            headers: headers,
            body: `{"userforname":"${userForName}","username":"${username}","usermail":"${userMail}","userpermission":"${userPermission}","userpassword":"${userPassword}"}`,
            cache: 'no-cache',
            mode: 'cors'
        };
        let request = new Request('http://localhost:1337/add/user', init);
        fetch(request)
            .then(response => {
                return response.json();
            })
            .then((data) => { 
                if(data.message == 'userAdded') {
                    alert('Brugeren blev oprettet.');
                    location.reload();
                } else {
                    alert('Der skete en fejl med oprettelsen af brugeren.');
                }
        });
    }
});

function deleteUser(userId) {
    let confirmDeleteCategory = confirm("Slet denne bruger?\nHandlingen kan ikke gøres om.");
    if (confirmDeleteCategory == true) {
        fetch('http://localhost:1337/delete/user/id='+userId)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(data == 'deletedSuccess') {
                alert('Brugeren blev slettet.');
                location.reload();
            } else {
                alert('Der skete en fejl med at slette brugeren.');
            }
        });
    }
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