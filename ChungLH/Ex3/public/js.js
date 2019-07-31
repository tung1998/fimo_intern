function checkPassword(){
    if($("#pw")[0].value == $("#rpw")[0].value){
        $("#check p").remove();
        $("#check").append(`<p class="text-success text-center">OKOK</p>`);
        $('#submit').attr('type', 'submit');
    }
    else if($("#pw")[0].value != $("#rpw")[0].value){
        $("#check p").remove();
        $("#check").append(`<p class="text-danger text-center">Mat khau khong trung khop</p>`)
    }
}
