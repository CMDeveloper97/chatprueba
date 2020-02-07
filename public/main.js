document.addEventListener('DOMContentLoaded', () => {

var socket = io.connect('https://35.223.250.5:2000', {'forceNew' : true});

socket.on('messages', function(data){
    render(data);
});

function render(data){
     var html = data.map(function(elem,index){
        return (`<div>
               <strong>${elem.autor}</strong>
               <em>${elem.text}</em>
            </div>`);
    });

    document.getElementById('messages').innerHTML = html;
}    

const AddMessage = e => {
    var payload = {
        autor: document.getElementById('user').value,
        text: document.getElementById('texto').value
    }

    socket.emit('NewMessage', payload);

    return false;

};

    document.getElementById('form').addEventListener('submit', e => {
        e.preventDefault();
        
        AddMessage();
    })

});