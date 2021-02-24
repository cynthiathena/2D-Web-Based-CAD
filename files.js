function exportFile()
{
    //TO DO : determine model 
    var square  = "Square \n";
    var squareCoordinat = localStorage.getItem("verticesSquare") + "\n"
    var squareColor = localStorage.getItem("arrColorSquare")

    var contents = square + squareCoordinat + squareColor;
    var blob = new Blob([contents], {type:'text/plain'});
    var filename = document.getElementById("filename").value;
    var link = document.createElement("a");
    link.download = filename;

    if (window.webkitURL != null)
    {
        link.href = window.webkitURL.createObjectURL(blob);
    }
    else
    {
        link.href = window.URL.createObjectURL(blob);
        link.onclick = destroyClickedElement;
        link.style.display = "none";
        document.body.appendChild(link);
    }

    link.click();
}

function inputFromFile(file) {
    const reader = new FileReader();
    reader.addEventListener("load", function(e){
        console.log(e.target.result)

        //parser file 
        var inpFile = e.target.result
        var newLine1 = inpFile.search(/\n/)
        var newLine2 = inpFile.substring(newLine1+1,inpFile.length).search(/\n/) + newLine1 + 1

        var inpModel = inpFile.substring(0,newLine1)
        var arrInpVert = inpFile.substring((newLine1+1),newLine2).split(",").map(function(e) {
            return parseFloat(e);
        })
        var arrInpColor = inpFile.substring((newLine2+1),inpFile.length).split(",").map(function(e) {
            return parseFloat(e);
        })
        console.log(arrInpVert)
        console.log(arrInpColor)
        // console.log(inpFile.substr(0,newLine))
        localStorage.setItem("arrInpVert",arrInpVert)
        localStorage.setItem("arrInpColor",arrInpColor)
        localStorage.setItem("inpModel",inpModel)
        
    })
    // console.log(typeof(file))
    var file = document.getElementById("inputFile").files[0]
    console.log(typeof(file))
    reader.readAsText(file)
}