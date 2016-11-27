$(document).ready(function() {

	//Changes form to signup
	$(document).on('click', '#toSignUp', function() {
		$("#emailWarning").empty();
		$("#password1Warning").empty();
		$('#loginContainer').load('switchform #signupForm', {switch: 'toSignup'}, function(){
			document.title = 'Sign Up';
		});
	 });

	//Changes form to login
	$(document).on('click', '#toLogIn', function() {
		$("#emailWarning").empty();
		$("#password1Warning").empty();
		$("#password2Warning").empty();
		$('#loginContainer').load('switchform #loginForm', {switch: 'toLogin'}, function(){
			document.title = 'Login';
		});
	 });

	// Checks wether a given string meets a certain criteria
	// when user focuses out on an element
	$(document).on('focusout', 'input', function() {

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
						if(id === 'email'){
							$('#emailWarning').fadeIn(500);
						}
						if(id === 'password1'){
							$('#password1Warning').fadeIn(500);
						}
					}
				} else{
					$('#' + id ).removeClass('input-error');
					$('#' + id + 'Warning').empty();
				}
			},

		});
	});

	/**
	* Returns a error message
	* @param {String} id - string to identify id of element
	*/
	function message(id){
		if(id === 'email'){
			return 'Check if your email is correct'
		}else if(id === 'password1'){
			return 'Password has to be at least 5 characters'
		}else if(id === 'password2'){
			return 'Retyped password has to be at least 5 characters'
		} else{
			return ''
		}
	}

	/**
	* Takes an element object and returns true if empty
	* @param {Object} element - jQuery element object
	*/
	function isEmpty(element){
    	return !$.trim(element.html())
  }
});
