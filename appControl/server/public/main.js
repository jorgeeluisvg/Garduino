const socket = io();

socket.on('temp', function (data){
console.log(data);
let tem = document.getElementById('temp');
tem.innerHTML = `${data}`
});




