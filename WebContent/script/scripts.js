$(function () {
	$(window).scroll(function(){
		var top = $(window).scrollTop();
		
		if(top > 0){
			$('#header').addClass('inverted');
		}else{
			$('#header').removeClass('inverted');
		}
	});
	$(window).trigger('scroll');
	var dpFrom = $('#from').datepicker({
		dateFormat:'yy-mm-dd',
		minDate: 0
	});
	dpFrom.datepicker('setDate', new Date());
	
	var dpTo = $('#to').datepicker({
		dateFormat: 'yy-mm-dd',
		minDate: 0,
		onSelect: function(){
			dpTo.datepicker('option', 'minDate', dpFrom.datepicker('getDate'));
		}
	});
	dpTo.datepicker('setDate', 4);
});