/**
 * Created by a on 2017/8/29.
 */
$(function () { // 2017.08.31
  //var status = window.location.href.split("l?search=")[1];
  //var status="";
  //if (status == "true") {
    var _holderName = window.sessionStorage.getItem('holderName');// 2017.08.31
    var _idCard = window.sessionStorage.getItem('idCard');// 2017.08.31
    var _bankNum = window.sessionStorage.getItem('bankNum');// 2017.08.31
    var _bankAdd = window.sessionStorage.getItem('bankAdd');// 2017.08.31
    var _ulKey = window.sessionStorage.getItem('ulKey');// 2017.08.31
    //console.log(_holderName,_idCard,_bankNum,_bankAdd,_ulKey)
    $("#holderName").val(_holderName);// 2017.08.31
    $("#idCard").val(_idCard);// 2017.08.31
    $("#bankNum").val(_bankNum);// 2017.08.31
    $("#bankAdd").val(_bankAdd);// 2017.08.31
    $("#branchBank").val(_ulKey);// 2017.08.31
  //}
});// 2017.08.31

$(document).ready(function () {
  var regs = {
    holderName: {
      reg: /^[\u4E00-\u9FA5]{1,8}$/,
      empty: "姓名是必填项",
      error: "姓名不符合格式"
    },
    idCard: {
      reg: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
      empty: "身份证是必填项",
      error: "身份证不符合格式"
    },
    bankNum: {
      reg: /([\d]{4})([\d]{4})([\d]{4})([\d]{4})([\d]{0,})/,
      empty: "银行卡是必填项",
      error: "银行卡不符合格式"
    }
  };
  var promptBox = false; //让提示框显示一次
  //var promptBox = ""; //让提示框显示一次

  $("#postInfo").on("click", function () {
    var holderName = $("#holderName").val().trim("");
    var idCard = $("#idCard").val().trim("");
    var bankNum = $("#bankNum").val().trim("");
    var bankAdd = $("#bankAdd").val().trim("");
    //var branchBank = $("#branchBank").val().trim("");
    // var branchBank = $("#branchBank").text().trim("");
    var holderNameReg = /^[\u4E00-\u9FA5]{1,8}$/;
    if (!holderName) {
      $("#holderName").attr("placeholder", "名称是必填项");
    } else if (holderNameReg && !holderNameReg.test(holderName)) {
      $("#holderName").val("");
      $("#holderName").attr("placeholder", "您输入的名称不符合格式");
    }
    var holderNameStatus = test("holderName", holderName, regs);
    var idCardStatus = test("idCard", idCard, regs);
    var bankNumStatus = test("bankNum", bankNum, regs);
    console.log(holderNameStatus);
    console.log(idCardStatus);
    console.log(idCardStatus);


    //正则验证成功后弹出框
    if (holderNameStatus && idCardStatus && bankNumStatus && bankAdd) {
      //alert("全部符合规则");
      //if (promptBox == false) {
        $("#remindBox").show();
        $(".zhezhao").show(); //2017.08.31
        $(".mPicker-mask").css({
          "display": "block"
        });
    //  } else { // 关闭提示框后 提交表单
        //提交表单
      //  var param = $("form#payInfo").serialize();
        /* $.ajax({
         async: true,
         type: "POST",
         url: "dddddddd.form",
         data: param,
         dataType: "JSON",
         success: function (data) {
         console.log(JSON.stringify(data, null, 2));
         }
         });*/
      //}

    }
  });

  $("#jump").on("click", function () { // 跳过
    $("#remindBox").hide();
    $(".zhezhao").hide(); //2017.08.31
    promptBox = true;
  });
  $("#provide").on("click", function () { //提供
    $("#remindBox").hide();
    $(".zhezhao").hide(); //2017.08.31
    // 看需求是调页面还是打开其他提示框
    promptBox = true;
  });
  /*提交表单*/
  // $("#payInfo").click(function () {
  //   $("#payInfo").submit();
  // })
});
// 正则验证
function test(name, val, regs) {
  var reg = regs[name].reg;
  var emptyStr = regs[name].empty;
  var errorStr = regs[name].error;
  if (!val) {
    $("input[name=" + name + "]").attr("placeholder", emptyStr);
  } else if (val && !reg.test(val)) {
    $("input[name=" + name + "]").val("");
    $("input[name=" + name + "]").attr("placeholder", errorStr);
  } else if (reg.test(val)) {
    return true;
  }
}


$(function () {
  var kaihuhang = window.sessionStorage.getItem('ulKey');
  console.log(kaihuhang);
  $("#branchBank").val(kaihuhang || '请选择');

  $("#branchBank").on("click", function () {
    var holderName = $("#holderName").val();
    var idCard = $("#idCard").val();
    var bankNum = $("#bankNum").val();
    var bankAdd = $("#bankAdd").val();
    window.sessionStorage.setItem('holderName', holderName);// 2017.08.31
    window.sessionStorage.setItem('idCard', idCard);// 2017.08.31
    window.sessionStorage.setItem('bankNum', bankNum);// 2017.08.31
    window.sessionStorage.setItem('bankAdd', bankAdd);// 2017.08.31
    window.location.href = 'searchbank.html';
  });
});

function testInput(_this, obj) {
  var val = $(_this).val();
  if (!val) {
    $(_this).attr("placeholder", obj.empty);
  } else if (val && !obj.reg.test(val)) {
    $(_this).val("");
    $(_this).attr("placeholder", obj.errorStr);
  } else if (obj.reg.test(val)) {
    return true;
  }
}