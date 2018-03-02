$(document).ready(function(){
	$(".container").css({"marginTop":$(window).height()/10});
	weatherApi();

	$("#searchBtn").click(function(){
		var cityName = $("#searchCity").val();
		weatherApi(cityName);
	});
	$("#advice").mouseover(function(){
		$("#box").show("fast");
	});
	$("#advice").mouseout(function(){
		$("#box").hide("slow");
	});
})

function weatherApi(cityName){
	cityName = cityName || "%E7%BB%B5%E9%98%B3";
	var url = 'http://v.juhe.cn/weather/index?cityname='+cityName+'&dtype=&format=&key=1b096a1310caa8af855504bb91f0c3fc&callback=?'
	$.getJSON(url,function(data){
		$(".title").html("中央气象台"+data.result.sk.time+"发布");
		$("#nowTemp").html(data.result.sk.temp+"°C");
		$(".icon-zuobiao").html(data.result.today.city);
		$("#searchCity").css({"width":"100px","height":"25px","fontSize":"15px","marignRight":"10px"});
		$(".icon-feng").html(data.result.sk.wind_direction+" "+data.result.sk.wind_strength);
		$(".icon-shidu").html("湿度:"+data.result.sk.humidity);

		$("#box .dress").text(data.result.today.dressing_index);
		$("#box .shushidu").text(data.result.today.wash_index);
		$("#box .sunshine").text(data.result.today.uv_index);
		$("#box .sport").text(data.result.today.dressing_index);
		$("#box .fishing").text(data.result.today.exercise_index);
		$("#box .travel").text(data.result.today.travel_index);

		//七天数据
		var arr = data.result.future;
		var today = new Date();
		var year = today.getFullYear();
		var month = (today.getMonth()+1<10)?"0"+(today.getMonth()+1):today.getMonth()+1;
		var day = today.getDate();
		var str1 = "day_"+year+month+((today.getDate()<10)?"0"+(today.getDate()):data.getDate());
		var str2 = "day_"+year+month+((today.getDate()+1<10)?"0"+(today.getDate()+1):data.getDate()+1);
		var str3 = "day_"+year+month+((today.getDate()+2<10)?"0"+(today.getDate()+2):data.getDate()+2);
		var str4 = "day_"+year+month+((today.getDate()+3<10)?"0"+(today.getDate()+3):data.getDate()+3);
		var str5 = "day_"+year+month+((today.getDate()+4<10)?"0"+(today.getDate()+4):data.getDate()+4);
		var str6 = "day_"+year+month+((today.getDate()+5<10)?"0"+(today.getDate()+5):data.getDate()+5);
		var str7 = "day_"+year+month+((today.getDate()+6<10)?"0"+(today.getDate()+6):data.getDate()+6);

		$(".futureWeather .futureDay").html(`
			<p>今天</p>
			<p>明天</p>
			<p>后天</p>`+
			`<p>`+data.result.future[str4].week+`</p>`+
			`<p>`+data.result.future[str5].week+`</p>`+
			`<p>`+data.result.future[str6].week+`</p>`+
			`<p>`+data.result.future[str7].week+`</p>`
			);
		$(".futureWeather .futureDate").html(
			`<p>`+data.result.future[str1].date+`</p>`+
			`<p>`+data.result.future[str2].date+`</p>`+
			`<p>`+data.result.future[str3].date+`</p>`+
			`<p>`+data.result.future[str4].date+`</p>`+
			`<p>`+data.result.future[str5].date+`</p>`+
			`<p>`+data.result.future[str6].date+`</p>`+
			`<p>`+data.result.future[str7].date+`</p>`
			);
		$(".futureWeather .futureWea").html(
			`<p>`+data.result.future[str1].weather+`</p>`+
			`<p>`+data.result.future[str2].weather+`</p>`+
			`<p>`+data.result.future[str3].weather+`</p>`+
			`<p>`+data.result.future[str4].weather+`</p>`+
			`<p>`+data.result.future[str5].weather+`</p>`+
			`<p>`+data.result.future[str6].weather+`</p>`+
			`<p>`+data.result.future[str7].weather+`</p>`
			);
		
		var lowTemperature = [];
		var maxTemperature = [];
		var lowTemperature1 = data.result.future[str1].temperature.split("~");
		var lowTemperature2 = data.result.future[str2].temperature.split("~");
		var lowTemperature3 = data.result.future[str3].temperature.split("~");
		var lowTemperature4 = data.result.future[str4].temperature.split("~");
		var lowTemperature5 = data.result.future[str5].temperature.split("~");
		var lowTemperature6 = data.result.future[str6].temperature.split("~");
		var lowTemperature7 = data.result.future[str7].temperature.split("~");
		

		lowTemperature.push(lowTemperature1[0]);
		lowTemperature.push(lowTemperature2[0]);
		lowTemperature.push(lowTemperature3[0]);
		lowTemperature.push(lowTemperature4[0]);
		lowTemperature.push(lowTemperature5[0]);
		lowTemperature.push(lowTemperature6[0]);
		lowTemperature.push(lowTemperature7[0]);
		console.log(lowTemperature);


		maxTemperature.push(lowTemperature1[1]);
		maxTemperature.push(lowTemperature2[1]);
		maxTemperature.push(lowTemperature3[1]);
		maxTemperature.push(lowTemperature4[1]);
		maxTemperature.push(lowTemperature5[1]);
		maxTemperature.push(lowTemperature6[1]);
		maxTemperature.push(lowTemperature7[1]);
		console.log(maxTemperature);

		var lowTemperatureNum = [];
		var maxTemperatureNum = [];
		for(var i=0;i<7;i++){
			lowTemperatureNum.push(parseInt(lowTemperature[i]));
			maxTemperatureNum.push(parseInt(maxTemperature[i]))
		}
		console.log(lowTemperatureNum);
		console.log(maxTemperatureNum);


		//canvas画布
		$(".paintTem").html("<canvas width='1130px' height='200px' id='huabu'></canvas>");
		var c = document.getElementById("huabu");
		var cxt = c.getContext("2d");
		cxt.lineWidth = 4;
		cxt.font = "bold 15px arial";
		// 最低温度
		cxt.beginPath();
		cxt.moveTo(75,150-4.5*lowTemperatureNum[0]);
		for(var i=0;i<7;i++){
			var x = 75 + 150*i;
			var y = 150 - 4.5 * lowTemperatureNum[i];
			// console.log(x,y);
			cxt.lineTo(x,y);
			cxt.arc(x,y,2,0,2*Math.PI);
			cxt.font = "italic 20px sans-serif";
			cxt.fillText(lowTemperatureNum[i]+"°C",x-10,y-10);

		}
		cxt.strokeStyle = "#4F94CD";
		cxt.stroke();
		// 最高温度
		cxt.beginPath();
		cxt.moveTo(75,150-4.5*maxTemperatureNum[0]);
		for(var i=0;i<7;i++){
			var x = 75 + 150*i;
			var y = 150 - 4.5 * maxTemperatureNum[i];
			// console.log(x,y);
			cxt.lineTo(x,y);
			cxt.arc(x,y,2,0,2*Math.PI);
			cxt.font = "italic 20px sans-serif";
			cxt.fillText(maxTemperature[i],x-10,y-10);

		}

		cxt.strokeStyle = "#FFA500";
		cxt.stroke();
	})
}