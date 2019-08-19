
    // $(window).resize(function(){
    //     $(".zoom2")[0].scrollWidth = $('.product2 img')[0].width;
    // })
    // if($(window).scrollTop()){
    //     console.log("aaaa");
    // }

    
    // var x = 0;
    // $(window).scroll(function(){
    //     console.log("Scrolled " + x + ' times');
        
    //     var position = $('body').scrollTop()
    //     console.log(position);
    // })

function dayCaculating(){
    var start = new Date("2018-03-27");
    var end = new Date();
    var resault = new Date(end - start)/1000/60/60/24;
    //console.log(Math.floor(resault));
    return Math.floor(resault);
}
 
function appendDays(){
    var days = dayCaculating();
    // console.log(days);
    $("#day").append(days);
}

function navbar(){
    // $(window).scroll(function(){
    //     vitrihientai = $(window).scrollTop();
    //     console.log(vitrihientai);
    // })
    $(window).scroll(function(){
        if($(window).scrollTop() >= 200){
            $("#navbar ").addClass("crop");
        }
        else{
            $("#navbar ").removeClass("crop");
        }
    })
}

function clickEvent(){
    $('.direct1').click(function() {
        $('html, body').animate({scrollTop:$('#chung').offset().top}); // will take two seconds to scroll to the element
        return false;
    });
    $('.direct2').click(function() {
        $('html, body').animate({scrollTop:$('#beo').offset().top}); // will take two seconds to scroll to the element
        return false;
    });
    $('.direct3').click(function() {
        $('html, body').animate({scrollTop:$('#us').offset().top}); // will take two seconds to scroll to the element
        return false;
    });
}

// function clickMenu(number){
//     $(`.direct${number}`).click(function() {
//         var div = $(`top${number}`);
//         var pos = div.offset().top;
//         $('body').animate({scrollTop:pos},1000); // will take two seconds to scroll to the element
//     });
// }

$(document).ready(function(){
    clickEvent();
    navbar();
    appendDays();
})
