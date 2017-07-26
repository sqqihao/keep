/*
    因为异步的js不允许document.write;
    document.write("从远程服务器执行JS; performance is"+ window.performance.now());
*/
var oDiv = document.createElement('div');
oDiv.innerText =  "从远程服务器执行JS" + window.performance.now();
oDiv.style.color = 'blue';
document.body.appendChild(oDiv);