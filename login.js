let login = "";
class LogIN{
    constructor(sSelector){
        this.form  = $(sSelector);
        this.login =  this.form.find(".log");
        this.password =  this.form.find(".password");
        this.btn = this.form.find(".login");
        this.result = this.form.find(".result");
        this.createEvents();
    }
    aPost(event){
        event.preventDefault();
        $.ajax({
            'url' : 'login.php'
            ,'method' : 'POST'
            ,'dataType' : 'json'
            ,'timeout' : 1000
            ,'data' : {
                'login' : this.login.val()
                ,'password' : this.password.val()
            }
            ,error : (oAjax)=>{
                console.log(oAjax);
            }
           ,complete : (oAjax)=>{
                let jsonServerResponse = oAjax.responseJSON;
                if (oAjax.status == 200){ // 200 - OK
                    if (jsonServerResponse != undefined){
                        this.btn.css("display", "none");
                        this.result.html(`You are ${jsonServerResponse.result}`);
                        login = jsonServerResponse.result;
                        return jsonServerResponse; //{result: "Admin"}
                    }
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
    createEvents(){
        this.form.submit(this.aPost.bind(this));
    }
}