document.querySelector('#contactSubmit').addEventListener('click', (event) => {
    console.log('event ok');
    event.preventDefault();
    let name = document.querySelector('#name').value;
    let mail = document.querySelector('#mail').value;
    let message = document.querySelector('#message').value;

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let init = {
        method: 'POST',
        headers: headers,
        body: `{"name":"${name}","mail":"${mail}","message":"${message}"}`,
        cache: 'no-cache',
        mode: 'cors'
    };

    if(name.length > 2) {
        if(mail.length > 8) {
            if(message.length > 20) {
                let request = new Request('http://localhost:1337/add/message', init);
                fetch(request)
                    .then(response => {
                        document.querySelector('#name').value = "";
                        document.querySelector('#mail').value = "";
                        document.querySelector('#message').value = "";
                        alert('Tak for din besked, du vil høre fra os indenfor 2 hverdage.');
                    }).catch(err => { 
                        console.log(err) 
                });
            } else {
                alert('Din besked er for kort.');
            }
        } else {
            alert('Din mail er for kort.');
        }
    } else {
        alert('Dit navn er for kort.');
    }
});