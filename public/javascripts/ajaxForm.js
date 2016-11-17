$(document).ready(function() {

	//$('#'+innskra-button).addClass('input-error');


	$('input').focusout(function() {
		var id = $(this).attr('id');
		$.ajax({
			type: 'POST',
			data: {id: id, value: $('#'+id).val()},
			url: '/validate',
			success: function(data){
				console.log(id);
				if(!data){
					$('#'+id).addClass('input-error');
					if(isEmpty($('#' + id + 'Warning'))){
						$('#' + id + 'Warning').append('<p>' + message(id) + '<p>');
					}
				} else{
					$('#' + id ).removeClass('input-error');
					$('p', '#' + id ).empty().remove();
				}
			},

		});
	});

	function message(id){
		if(id==='email'){
			return 'Tölvupóstfang ófullnægjandi'
		}else if(id === 'password1'){
			return 'Lykilorð þarf að vera a.m.k. 5 stafir'
		}else if(id === 'password2'){
			return 'Endurtekið lykilorð þarf að vera a.m.k. 5 stafir'
		} else{
			return ''
		}
	}

	function isEmpty(element){
    	return !$.trim(element.html())
  }
});
