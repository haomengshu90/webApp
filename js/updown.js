// //图片更换时候调用
// function uploadFace(sender) {
//   //判断选择的是否是图片
//   if (!sender.value.match(/.jpg|.gif|.jpeg|.bmp|.png/i)) {
//     alert("请选择图片文件！");
//   } else {
//     //将选择的图片显示在预览元素中
//     var face = document.getElementById("face");
//     face.style.zIndex = 10;
//     face.style.display = 'block';
//     var preview = document.getElementById("preview");
//     preview.src = window.URL.createObjectURL(sender.files[0]);
//
//   }
// }


function previewImage(file,id,inputId,num) {

    var MAXWIDTH = 90;
    var MAXHEIGHT = 90;
    var div = document.getElementById(id);
    if (file.files && file.files[0]) {
        div.innerHTML = "<img id=imghead"+num+" style='height:100%;width:100%;' onclick=$('#"+inputId+"').click()>";
        div.style.background = 'none';
        div.style.padding='10px'
        // $(div).css("background",'none')
        //     .css("padding","10px")
        var img = document.getElementById('imghead'+num);
        img.onload = function () {
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            img.width = rect.width;
            img.height = rect.height;
//                 img.style.marginLeft = rect.left+'px';
            //img.style.marginTop = rect.top + 'px';
        }
        var reader = new FileReader();
        reader.onload = function (evt) {
            img.src = evt.target.result;
        }
        reader.readAsDataURL(file.files[0]);
    }
    else //兼容IE
    {
        var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
        file.select();
        var src = document.selection.createRange().text;
        div.innerHTML = '<img id=imghead>';
        var img = document.getElementById('imghead');
        img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
        var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
        status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
        div.innerHTML = "<div id=divhead style='width:" + rect.width + "px;height:" + rect.height + "px;margin-top:" + rect.top + "px;" + sFilter + src + "\"'></div>";
    }
}


function clacImgZoomParam( maxWidth, maxHeight, width, height ){
    var param = {top:0, left:0, width:width, height:height};
    if( width>maxWidth || height>maxHeight ){
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;

        if( rateWidth > rateHeight ){
            param.width =  maxWidth;
            param.height = Math.round(height / rateWidth);
        }else{
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }
    param.left = Math.round((maxWidth - param.width) / 2);
    param.top = Math.round((maxHeight - param.height) / 2);
    return param;
}