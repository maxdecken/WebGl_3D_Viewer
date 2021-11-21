function versionInfo(){
    alert("This is Version 1.0. Made by: Max Decken");
}

function disbaleDeveloperTools() {
    if (devTools.checked == true){
        document.getElementById("box").className = "visiblePanel";
    }else{
        document.getElementById("box").className = "invisiblePanel";
    }
  }