window.onload = function(){
    // enter = submit
    var divToHide = document.getElementById('helpbox');
    document.onclick = function(e){
        if(e.target.id !== 'helpbox' && e.target.id !== 'helpbtn'){
        //element clicked wasn't the div; hide the div
        divToHide.style.display = 'none';
        }
    };
}
function helpme() {
    document.getElementById('helpbox').style.display = "inline";
}