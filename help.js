window.onload = function(){
    // enter = submit
    var divToHide = document.getElementById('helpbox');
    document.onclick = function(e){
        if(e.target.id !== 'helpbox' && e.target.id !== 'helpbtn'){
        //element clicked wasn't the div; hide the div
        divToHide.style.display = 'none';
        }
    };
    setWarna = document.getElementById('set-color');
    setWarna.value = "#FFFFFF";
    setWarna.addEventListener("change", setColor, false);
      // enter = submit
    document.getElementById('polygonSides').addEventListener("change", function(event) {
    //   if (event.key === "Enter") {
        console.log(event.target.value)
        side = event.target.value;
    })
  
    document.getElementById('polygonLength').addEventListener("change", function(event) {
    //   if (event.key === "Enter") {
        console.log(event.target.value)
        length = event.target.value;
    //   }
    })

    document.getElementById('webgl-app').onmousemove = function(event){
        const bound = document.getElementById('webgl-app').getBoundingClientRect()
        console.log("masuk")
        const res = {
            x: event.clientX - bound.left,
            y: event.clientY - bound.top
        }
        mousePos = res
        console.log(mousePos)
      }
}
function helpme() {
    document.getElementById('helpbox').style.display = "inline";
}