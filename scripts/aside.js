function mainIcon() {
    var barra = document.getElementById("aSide");
    var legendas = document.getElementsByClassName('legendaIcoBar');
    if (barra.clientWidth == 48) { 
        barra.style.width = "15rem";
        setTimeout(()=> { 
            for(i = 0; i < legendas.length; i++) {
            legendas[i].style.display = "flex";
            }
        }, 900)
    } 
    else { 
        for(i = 0; i < legendas.length; i++) {
            legendas[i].style.display = 'none';
        }
        barra.style.width = "3rem"
    };
}

