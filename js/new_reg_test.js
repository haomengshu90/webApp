/*支付页正则*/
$(document).ready(function (){
    /*定义的正则*/
    function holderNameReg(){
        var reg =  /^([\u4e00-\u9fa5]){2,7}$/;
        var holderName=$("#holderName");
        var holderNameVal=holderName.val().trim("");
        if(reg.test(holderNameVal)){
            return true;
        }else if(holderNameVal && !reg.test(holderNameVal)){
            holderName.val("");
            holderName.attr("placeholder","姓名格式不正确");
        }else if(!holderNameVal){
            holderName.attr("placeholder","请输入正确姓名");
        }
    }

    function idCardReg(){
        var reg=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        var idCard=$("#idCard");
        var idCardVal=idCard.val();
        if(reg.test(idCardVal)){
            console.log("success");
            return true;
        }else if(idCardVal&&!reg.test(idCardVal)){
            idCard.val("");
            idCard.attr("placeholder","身份证格式不正确");
        }else{
            idCard.attr("placeholder","请输入正确身份证");
        }
    }

    function bankCardReg(){
        var reg=/\d{15}|\d{19}/;
        var bankNum=$("#bankNum");
        var bankNumVal=bankNum.val();
        if(reg.test(bankNumVal)){

            return true;
        }else if(bankNumVal&&!reg.test(bankNumVal)){
            bankNum.val("");
            bankNum.attr("placeholder","银行卡格式不正确");
        }else{
            bankNum.attr("placeholder","请输入正确银行卡");
        }
    }

    /*
     $(".liReg input").on("blur", function () {
     holderNameReg();
     */

    $(".liReg input").on("blur", function () {
        holderNameReg();
        idCardReg();
        bankCardReg();
    });


});




/*增加商户页面正则验证*/
$(function () {
//				$("#inputUl input").each(function () {
//					$(this).on("change",function () {
//
//          });
//        });

    $("#inputUl input").on("change", function () {
        var merchantName = $("#merchantName").val(); //商户名称
        var operateAddress = $("#operateAddress").val(); //经营地址 百度地图部分
        var houseNum = $("#houseNum").val(); //门牌号


        /*商户正则*/
        var merchantNameReg = /^[\u4E00-\u9FA5]{5,12}$/;
        if (!merchantName) {
            $("#merchantName").attr("placeholder", "名称是必填项");
        } else if (merchantName && !merchantNameReg.test(merchantName)) {
            $("#merchantName").val("");
            $("#merchantName").attr("placeholder", "您输入的名称不符合格式");
        }

        /*用户名正则验证*/

        if(merchantName && operateAddress){
            $("#next").addClass("active");
            $("#next").on("click.submit",function () {
                window.location.href="pay.html";
                /*$.ajax({
                 async:true,
                 type: "POST",
                 url: url,
                 data:{"merchantName":merchantName},
                 dataType:"JSON",
                 success:function (data) {
                 window.location.href="pay.html";
                 console.log(JSON.stringify(data));
                 }
                 });*/
            });
        }else {
            $("#next").removeClass("active");
            $("#next").off("click.submit");
        }
    });
});






/*增加信用卡页面正则*/

$(function () {
    $("#addInfoBtn").on("click",function () {
        var cardNum = $("#bankNum").val();
        var reg = /^\d{16}$/;
        console.log(reg.test(cardNum));
        if(cardNum && reg.test(cardNum)){
        window.location.href="updown.html";/*ajax  成功发送后再提交 现在演示用*/
            /*$.ajax({
                async:true,
                type: "POST",
                url: "",
                data:{"card":cardNum},
                dataType:"JSON",
                success:function (data) {
                    window.location.href="updown.html";
                    console.log(JSON.stringify(data));
                }
            });*/
            console.log("通过")
        }else if(cardNum && !reg.test(cardNum)){
            $("#bankNum").val("");
            $("#bankNum").attr("placeholder","格式不正确");
        }else if(!cardNum){
            $("#bankNum").attr("placeholder","请输入信用卡号");
        }
    });
});

