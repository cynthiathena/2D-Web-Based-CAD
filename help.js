var first = true;
var koorAwal = {x:0, y:0};

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
        build = true;
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
            x: ((event.clientX - bound.left)-256)/256,
            y: ((event.clientY - bound.top)-256)/(-256)
        }
        mousePos = res
      }
    document.getElementById('webgl-app').onmousedown = function(event){
        
        fixmousePos = mousePos
        if (first == true){
            console.log(koorAwal)
            koorAwal = searchVert(fixmousePos);
            console.log(koorAwal)
            if (koorAwal){
                first = false;
                alert("berhasil memilih titik")
            }
        }
        else{
            fixVert(fixmousePos);
            first = true;
        }
    }
}
function helpme() {
    document.getElementById('helpbox').style.display = "inline";
}