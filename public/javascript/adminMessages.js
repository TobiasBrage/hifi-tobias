fetch('http://localhost:1337/messages')
.then((response) => {
    return response.json();
})
.then((data) => {
    let messageHtml = '';
    let messageCount = 0;
    data.forEach(function(userData) {
        messageCount ++;
        messageHtml += '<li class="messageItem"><h2 class="messageName">'+userData.navn+'</h2><h2 class="messageMail">'+userData.mail+'</h2><p class="messageContent">'+userData.besked+'</p><input type="button" class="messageDelete" value="Slet besked" onclick="deleteMessage('+userData.id+')"></li>';
    });
    if(messageCount == 0) {
        messageHtml = '<h2 class="editUserError">Ingen beskeder.</h2>';
    }
    document.getElementById('messageContainer').innerHTML = messageHtml;
});

function deleteMessage(messageId) {
    let confirmDeleteMessage = confirm("Slet denne besked?\nHandlingen kan ikke gøres om.");
    if (confirmDeleteMessage == true) {
        fetch('http://localhost:1337/delete/message/id='+messageId)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if(data == 'deletedSuccess') {
                location.reload();
            }
        });
    }
}