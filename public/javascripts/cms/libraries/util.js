function postForm(url, params){
    var myForm = document.createElement("form");
    myForm.method = 'POST';
    myForm.action = url;
    for (var k in params) {
        var myInput = document.createElement("input");
        myInput.setAttribute("name", k);
        myInput.setAttribute("value", params[k]);
        myForm.appendChild(myInput);
    }
    var myInput = document.createElement("input");
    myInput.setAttribute("name", "process");
    myInput.setAttribute("value", "1");
    myForm.appendChild(myInput);
    document.body.appendChild(myForm);
    myForm.submit();
    document.body.removeChild(myForm);
}