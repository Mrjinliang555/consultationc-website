// JavaScript Document
$(function () {

    var rightCode = '';

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

    $('input').blur(function(){
        var val = $(this).val();
        if( val.trim().length == 0 ){
            common.toast({html:$(this).attr('error')})
            return false; 
        }
    })

    $('#login-btn').click(function(){
        var userName = $('#username input').val();
        var password = $('#password input').val();
        var code = $('#verify input').val();
        if( userName.trim().length == 0 || password.trim().length == 0 || code.trim().length == 0 ){
            common.toast({html:'请输入用户名、密码和验证码'});
            return false;
        }
        if( code.toLowerCase() != rightCode ){
            common.toast({html:'验证码不正确'})
            return false;
        }

        Interface.getAsynData({
            type: 'post',
            url: 'login.php',
            data: {
                username: userName,
                password: password
            },
            ifOpenLoading: true
        }, function( res ){
            if( res.code == '000' ){
                common.setLocalStorage('userInfo', res.data, true)
                return window.location.href = '../home/';
            }else {
                common.toast({html: '用户或密码错误'})
            }
        },function(err){
            // console.log( err )
            common.toast({html: '用户或密码错误'})
        })

        // return window.location.href = '../home/';

    })

    renderVerificationCode()

    // 验证码
    function renderVerificationCode(){
        var nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
        'y', 'z'];

         drawCode();
        // 绘制验证码
        function drawCode() {
            var canvas = document.getElementById("verifyCanvas");  //获取HTML端画布
            var context = canvas.getContext("2d");                 //获取画布2D上下文
            context.fillStyle = "rgb(208, 253, 172)";                  //画布填充色
            context.fillRect(0, 0, canvas.width, canvas.height);   //清空画布
            context.fillStyle = "red";                           //设置字体颜色
            context.font = "25px Arial";                           //设置字体
            var rand = new Array();
            var x = new Array();
            var y = new Array();
            for (var i = 0; i < 5; i++) {
                rand[i] = nums[Math.floor(Math.random() * nums.length)]
                x[i] = i * 16 + 10;
                y[i] = Math.random() * 20 + 20;
                context.fillText(rand[i], x[i], y[i]);
            }
                
            rightCode = rand.join('').toLowerCase();
            //alert(rand);
            //画3条随机线
            for (var i = 0; i < 3; i++) {
                drawline(canvas, context);
            }

            // 画30个随机点
            for (var i = 0; i < 30; i++) {
                drawDot(canvas, context);
            }
            convertCanvasToImage(canvas)
        }

        // 随机线
        function drawline(canvas, context) {
            context.moveTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height));             //随机线的起点x坐标是画布x坐标0位置，y坐标是画布高度的随机数
            context.lineTo(Math.floor(Math.random() * canvas.width), Math.floor(Math.random() * canvas.height));  //随机线的终点x坐标是画布宽度，y坐标是画布高度的随机数
            context.lineWidth = 0.5;                                                  //随机线宽
            context.strokeStyle = 'rgba(50,50,50,0.3)';                               //随机线描边属性
            context.stroke();                                                         //描边，即起点描到终点
        }
        // 随机点(所谓画点其实就是画1px像素的线，方法不再赘述)
        function drawDot(canvas, context) {
            var px = Math.floor(Math.random() * canvas.width);
            var py = Math.floor(Math.random() * canvas.height);
            context.moveTo(px, py);
            context.lineTo(px + 1, py + 1);
            context.lineWidth = 0.2;
            context.stroke();

        }
        // 绘制图片
        function convertCanvasToImage(canvas) {
            document.getElementById("verifyCanvas").style.display = "none";
            var image = document.getElementById("code_img");
            image.src = canvas.toDataURL("image/png");
            return image;
        }

         // 点击图片刷新
        document.getElementById('code_img').onclick = function () {
            $('#verifyCanvas').remove();
            $('#verify').append('<canvas width="100" height="40" id="verifyCanvas"></canvas>');
            rightCode = '';
            drawCode();
        }

    }

    
   


   
})
