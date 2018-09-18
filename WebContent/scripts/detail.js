
$(function() {
	var id = parseId(window.location.search);
	console.log('id',id); //id를 제대로 받아왔는지 확인
	getDetail(id);
});

function getDetail(id) {
	var url = 'https://javascript-basic.appspot.com/locationDetail';
	
	$.getJSON(url,{
		id:id
	}, function(r) {
		console.log(r) //api로 반환된 결과 확인
		//데이터 화면에 표시
		$('.detail-header-name').html(r.name);
		$('.detail-header-city-name').html(r.cityName);
		$('.detail-desc-text').html(r.desc);
		
		//갤러리아
		var $gallery = $('#detail-images');
		var images = r.subImageList;
		for (var i=0; i<images.length; i++){
			var $image = $('<img src="'+images[i]+'"/>');
			$gallery.append($image);
		}
		Galleria.loadTheme('libs/galleria/themes/classic/galleria.classic.min.js');
		Galleria.run('#detail-images');
		
		showMarker(r.position.x,r.position.y);
	});
}

function parseId(str) {
	var s = str.substring(1);
	var args = s.split('&');
	
	for ( var i = 0; i<args.length; i++){
		var arg = args[i];
		var tokens = arg.split('=');
		
		if(tokens[0]==='id'){
			return tokens[1];
		}
	}
	return null;
}

/*지도표시*/

var map;

$(function() {
	var id=parseId(window.location.search);
	getDetail(id);
	showMap();
});

function showMap() {
	map = new google.maps.Map(document.getElementById('map'),{
		zoom: 12,
		center: {
			lat: 33.3617,
			lng: 126.5292
		}
	});
}

/*지도에 마커표시*/
function showMarker(lat,lng) {
	var pos = {
			lat:lat,
			lng:lng
	};
	
	new google.maps.Marker({
		position:pos,
		map:map
	});
	
	map.panTo(pos);
}

/*쿠키에 데이터 저장*/
var list = [1,2,3,4,5];

//stringify하기
document.cookie='list='+JSON.stringify(list);
//인자의 형태를 보고 js-cookie가 알아서 처리
Cookie.set('list',list);

//등록버튼을 클릭해 추가
$('.btn-register').click(function() {
	var myTrips  = Cookies.getJSON('MYTRIPS');
	
	//존재하지 않을 경우 빈 배열로 초기화
	if(!myTrips){
		myTrips=[];
	}
	
	//여행지를 myTrips에 추가
	myTrips.push({
		id: id,
		name: r.name,
		cityName: r.cityName,
		x: r.position.x,
		y: r.position.y
	});
	
	Cookies.set('MYTRIPS',myTrips);
	
	alert('여행지가 등록되었습니다!');
});