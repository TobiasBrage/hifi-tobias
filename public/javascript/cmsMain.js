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