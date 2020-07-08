window.onload = function () {
    let oToolbar = document.querySelector(".toolbar");
    let oNav = document.querySelector(".nav");
    let oMenu = document.querySelector("#myMenu");
    let oMenuUp = document.querySelector(".menu-up");
    let oMenuDown = document.querySelector(".menu-down");

    new fullpage('#fullpage',{
        sectionsColor: ['skyblue','green','yellow','pink','orange','red','#ccc'],
        anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage', 'sixthPage'],
        menu:'#myMenu',
        onLeave : function (origin, destination, direction) {
            if (destination.isFirst) {
                oToolbar.style.display = "block";
                oNav.style.top = oToolbar.offsetHeight + "px";
                oMenu.style.display = "none";
            } else {
                oToolbar.style.display = "none";
                oNav.style.top = "0px";
                oMenu.style.display = "block";
            }
        }
    });

    oMenuUp.onclick = function () {
        fullpage_api.moveSectionUp();
    };

    oMenuDown.onclick = function () {
        fullpage_api.moveSectionDown();
    }
};