function Table(selector, menu){
    let a = this
    ,jsonServerResponse = {}
    ,group = "";

    a.tabs = $(selector);
    a.groups = $(menu);
    a.tab = a.tabs.find("li");
    a.group = a.groups.find(".group-members");
    a.row = a.tabs.find("th");
    a.tr = a.tabs.find("tr");

    a.loadName = function(name){
        name = name.split(",");
        $.each(a.row, function(index, value) {
            if (index < name.length-1){
                value.innerHTML = name[index];
            }
        });
        return name; // array with names
    }
    a.loadMarks = function(mark){
        mark = mark.split(",");
        $.each(a.tr, function(index, value) {
            if (index < mark.length-1){
                value.getElementsByTagName("td")[0].innerHTML = mark[index];
            }
        });
        return mark; //array ["11", "11", "12", "6", "10", "10", ""]
    }
    a.post = function(event){
        $.ajax({
            'url' : 'group.php'
            ,'method' : 'POST'
            ,'dataType' : 'json'
            ,'timeout' : 1000
            ,'data' : {
                'group' : group
            }
            ,error : (oAjax)=>{
                console.log(oAjax);
            }
           ,complete : (oAjax)=>{
                
                jsonServerResponse = oAjax.responseJSON;
                if (oAjax.status == 200){ 
                    if (jsonServerResponse != undefined){
                        if (login == "professor" || login == "Admin"){
                            $(a.tabs).addClass("active_block");
                            a.loadName(jsonServerResponse.name);
                            a.loadMarks(jsonServerResponse.web);
                        }
                        return jsonServerResponse; //{name: "Bazir Bogdan,Bezsonnyy Artem,Boyko Kateryna,Bondarchyk Bogdan,Gafyak Ivan,Getalo Daryna,", web: "11,11,12,6,10,10,", bd: "10,12,12,7,10,11,", logic: "5,10,11,9,8,8,", english: "4,11,10,5,11,9,"}
                    }  //зависит от базы
                    else {
                        alert(`response that cannot be parsed as JSON:\n
                            ${oAjax.responseText}`);
                        }
                }
                else if(oAjax.status == 404){
                        alert('AJAX backend is not found.');
                        }
                else if(oAjax.statusText == 'timeout'){
                        alert('AJAX request has timed out.');
                        }
                else{
                        alert('Totally unpredicted error.');
                        }
           }
        })
    }

    a.active = function(){
        a.tabs.find(".nav-link").removeClass("active");
        $(this).children(".nav-link").addClass("active");
        if ($(this).hasClass("bd"))
            a.loadMarks(jsonServerResponse.bd);
        else if ($(this).hasClass("web"))
            a.loadMarks(jsonServerResponse.web);
        else if ($(this).hasClass("english"))
            a.loadMarks(jsonServerResponse.english);
        else if ($(this).hasClass("logic"))
            a.loadMarks(jsonServerResponse.logic);
        return $(this).children(".nav-link").attr("class"); //active
    }
    a.show = function(){
        a.post();
        $(a.tabs.parent().find(".block").removeClass("active_block"));
        return $(a.tabs.parent().find(".block")).hasClass("active_block"); //false (мы его удалаям в этом методе)
    }

    a.tab.click(a.active);
    a.group.click(a.show);

}