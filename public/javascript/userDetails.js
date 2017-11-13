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

var userToken = readCookie('userTokenId');
var userSessionId = readCookie('userId');

if(userToken == null) {
    userLogOut();
} else {
    fetch('http://localhost:1337/user/token/id='+userToken)
    .then((response) => {
        return response.json();
    })
    .then((dataUser) => {
        var userTokenId = dataUser.userId;
        if(userSessionId == null) {
            userLogOut();
        } else {
            if(userSessionId != userTokenId) {
                userLogOut();
            }
        }
    });
}

document.querySelector('#userLogOut').addEventListener('click', (event) => {
    userLogOut();
});

function userLogOut() {
    document.cookie = "userTokenId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = '../cms/';
}

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