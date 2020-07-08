window.onload = function () {
    new fullpage("#fullpage",{
        sectionsColor:['#0da5d6','#2ab561','#de8910','#16ba9d','#0da5d6'],
        verticalCentered: false,
        afterLoad:function (origin, destination, direction) {
            if (origin != null){
                origin.item.classList.remove("current");
            }
            destination.item.classList.add("current");
        }
    })
};