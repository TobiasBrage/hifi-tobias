var userToken = readCookie('userTokenId');

if(userToken == null) {
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "userTokenId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
} else {
    fetch('http://localhost:1337/user/token/id='+userToken)
    .then((response) => {
        return response.json();
    })
    .then((dataUser) => {
        var userSessionId = readCookie('userTokenId');
        var userTokenId = dataUser.userId;
        if(userSessionId == null) {
            createCookie('userId',userTokenId,0.5);
        } else {
            if(userSessionId != userTokenId) {
                document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "userTokenId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            }
            window.location.href = './cmsindex.html';
        }
    });
}

document.querySelector('#cmsLoginSubmit').addEventListener('click', (event) => {
    event.preventDefault();
    let username = document.querySelector('#cmsLoginUsernameInput').value;
    let password = document.querySelector('#cmsLoginPasswordInput').value;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let init = {
        method: 'POST',
        headers: headers,
        body: `{"username":"${username}","password":"${password}"}`,
        cache: 'no-cache',
        mode: 'cors'
    };

    let request = new Request('http://localhost:1337/cmslogin', init);
    fetch(request)
        .then((response) => {
            return response.json();
        })
        .then((data) => { 
            let loginRespond = data.message;
            if(loginRespond == 'wrongUsername') {
                alert('Forkert brugernavn.');
            } else if(loginRespond == 'wrongPassword') {
                alert('Forkert kodeord.');
            } else if(loginRespond == 'shortPassword') {
                alert('For kort kodeord.');
            } else if(loginRespond == 'shortUsername') {
                alert('For kort brugernavn.');
            } else if(loginRespond == 'userLoggedIn') {
                createCookie('userId',data.userId,0.5);
                createCookie('userTokenId',data.cookieSession,0.5);
                window.location.href = '../cms/cmsindex.html';
            }
    });
});

function createCookie(cookieName, cookieValue, expireInDays) {
    var d = new Date();
    d.setTime(d.getTime() + (expireInDays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

function createUserIdCookie(cookieName, cookieValue, expireInDays) {
    var d = new Date();
    d.setTime(d.getTime() + (expireInDays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
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