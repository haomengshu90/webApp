$(document).ready(function () {
	$("#showAdd").on("click",function(){
	var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
            mk = new BMap.Marker(r.point);
            getAddress(r.point);
        }else {
            alert('failed'+this.getStatus());
        }
    });
    //获取地址信息，设置地址label
    
	
	function getAddress(point){
        var gc = new BMap.Geocoder();
        gc.getLocation(point, function(rs){
            var addComp = rs.addressComponents;
            var address =  addComp.province +  addComp.city + addComp.district + addComp.street + addComp.streetNumber;//获取地址
			$("#operateAddress").val(address);
        });
	  }
	})
});