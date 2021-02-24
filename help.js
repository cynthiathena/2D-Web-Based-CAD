var first = true;
var koorAwal = {x:0, y:0};
var pol = false;
var gar = false;
var kotak = false;

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
<<<<<<< HEAD
            console.log(koorAwal)
            if (pol){
                koorAwal = searchVertPol(fixmousePos);
            }
            else if(gar){
                koorAwal = searchVertGar(fixmousePos);
            }
            else if(kotak){
                koorAwal = searchVertKot(fixmousePos);
            }
            console.log(koorAwal)
            if (koorAwal){
                first = false;
                alert("berhasil memilih titik")
            }
=======
            koorAwal = searchVert(fixmousePos);
            console.log(koorAwal)
            first = false;
>>>>>>> parent of ba0eae1 (debug drag)
        }
        else{
            if (pol){
                fixVertPol(fixmousePos);
            }
            else if (gar){
                fixVertGar(fixmousePos);
            }
            else if (kotak){
                fixVertKot(fixmousePos)
            }
            first = true;
        }
    }
}
function helpme() {
    document.getElementById('helpbox').style.display = "inline";
}