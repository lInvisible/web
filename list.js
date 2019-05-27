
class List{
    constructor(sSelector, sMenu, sInfo){
        this.list = $(sSelector);
        this.menu = $(sMenu);
        this.info = $(sInfo);
        this.group = this.menu.find(".menu-link");
        this.td = this.list.find("td");
        this.tbody = this.list.find("tbody")

        this.createEvents();
    }
    showList(event){
        $(this.list.parent().find(".block").removeClass("active_block"));
        $(this.list).addClass("active_block");
        let group = $(event.currentTarget).attr("id");
        this.tbody.attr("class", group);
        for (let i=0; i<= Groups[group].length; i++){
            let student = Groups[group][i];
            $(this.list.find("td")[i]).html(student);
        }
        return group; //it71 || it72 || it73 || it74
    }
    showInfo(event){
        if (login == "Admin"){
            $(this.info).css("display", "block");
            let group = this.tbody.attr("class")
            ,groupNum = $(event.currentTarget).attr("class");
            
            $(this.info.find(".name")).html(Groups[group][groupNum]);
            $(this.info.find(".number")).html(Info[group][groupNum][0]);
            $(this.info.find(".adress")).html(Info[group][groupNum][1]);

            return groupNum; //номер в списке группы, например 1
        }

    }
    createEvents(){
        this.group.click(this.showList.bind(this));
        this.td.click(this.showInfo.bind(this));
    }
    
}

