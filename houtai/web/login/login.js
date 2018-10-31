// JavaScript Document
$(function () {

    $('#password span').click(function(){

        var input = $(this).prev()[0];
        if( $(this).hasClass('glyphicon-eye-open') ){
            input.type = 'text';
            $(this).removeClass('glyphicon-eye-open').addClass('glyphicon-eye-close');
        }else {
            $(this).addClass('glyphicon-eye-open').removeClass('glyphicon-eye-close');
            input.type = 'password';
        }

        

    });

    $('#login-btn').click(function(){
        var userName = $('#username input').val();
        var password = $('#password input').val();
        return window.location.href = '#home'
    })
   
})
