function Menu(sSelector){
    let m          = this;

    m.menu         = $(sSelector);
    m.menuItems    = m.menu.children("li");

    m.showSubmenu  = function(){
        $(this).children(".b-submenu")
        // .show();
        // .addClass("b-submenu_shown");
        // .stop().slideDown();
        .stop().css("display", "block").animate({"opacity" : 1}, 600);
    }

    m.hideSubMenu = function(){
        $(this).children(".b-submenu")
        // .hide();
        // .removeClass("b-submenu_shown");
        // .stop().slideUp();
        .animate({"opacity" : 0}, 600, function(){
            $(this).css("display", "none");
        });
    }
    m.showHideSubmenu = function(){
        m.menuItems.children(".b-submenu").stop().slideUp();
        $(this).children(".b-submenu").stop().slideToggle();
    }

    // m.menuItems
    //     .mouseover(m.showSubmenu)
    //     .mouseout(m.hideSubMenu);

    m.menuItems.click(m.showHideSubmenu);
}

