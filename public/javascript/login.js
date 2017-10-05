var loggedInId = readCookie('loggedIn');

if(loggedInId != null) {
    window.location.href = 'panel.html';
}

document.querySelector('#loginSubmit').addEventListener('click', (event) => {
    event.preventDefault();
    let username = document.querySelector('#brugernavn').value;
    let password = document.querySelector('#kodeord').value;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let init = {
        method: 'POST',
        headers: headers,
        body: `{"username":"${username}","password":"${password}"}`,
        cache: 'no-cache',
        mode: 'cors'
    };

    let request = new Request('http://localhost:1337/login', init);
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
                createCookie('loggedIn',data.userId,2);
                window.location.href = 'panel.html';
            }
    });
});

function createCookie(cookieName, cookieValue, expireInDays) {
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