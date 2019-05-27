function Menu(sSelector){
    let m          = this;

    m.menu         = $(sSelector);
    m.menuItems    = m.menu.children("li");

    m.showSubmenu  = function(){
        $(this).children(".submenu")
        .stop().css("display", "block").animate({"opacity" : 1}, 600);
    }

    m.hideSubMenu = function(){
        $(this).children(".submenu")
        .stop().animate({"opacity" : 0}, 600, function(){
            $(this).css("display", "none");
        });
    }

    m.menuItems
        .mouseover(m.showSubmenu)
        .mouseout(m.hideSubMenu);
}