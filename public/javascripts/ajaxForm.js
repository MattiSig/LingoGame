$(document).ready(function() {

	// $("#signUp").click(function(event){
	//     event.preventDefault();
	// });

	$(document).on('click', '#signUp', function() {
		$('#loginform').load('signup #signupForm');
		// $('#loginform').load('#logIn');
		$("#emailWarning").empty();
		$("#password1Warning").empty();
	// $("#password2Warning").empty();
	 });

	 $(document).on('click', '#signUpUser', function() {
		//  document.getElementById("signUpUser").disabled = true;
		 console.log("virkar takkinn?");
		 $.ajax({
			 type: 'POST',
			 url: '/signup',
			 async: false,
			 data:  {email: $('#email').val(), password1: $('#password1').val(), password2: $('#password2').val()},
			 success: function(data){
				 if(data){
						 console.log(data);
				 }
			 }

		 });


 	 });


	//  $('#logIn').on('click', '#logIn', function() {
		$("#logIn").unbind("click").click(function() {
			$('#loginform').load('login #loginform');
			$("#emailWarning").empty();
			$("#password1Warning").empty();
			$("#password2Warning").empty();
 	 	});


		$(document).on('click', '#logIn', function() {
			$('#loginform').load('login #loginform');
			// $('#loginform').load('#logIn');
			$("#emailWarning").empty();
			$("#password1Warning").empty();
		// $("#password2Warning").empty();
		 });
		// var counter = 0;

		// $("#signUp").unbind("click").click(function() {
		// document.getElementById("signUp").disabled = true;
		// segjum bakendanum að það sé signup mode og birtum signup formið.
		// $('#loginform').load('signup');
		// console.log("fjandinn");
		// });

	// $("#logIn").click(function(){

			// $('#signupForm').load('login #loginform');
			// $(this).attr('id', '#signUp');
		// 	console.log(this.id);
		//
		// });

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
						if(id === 'email'){
							$('#emailWarning').fadeIn(500);
						}
						if(id === 'password1'){
							$('#password1Warning').fadeIn(500);
						}
						// if(id === 'errorMsg'){
						// 	$('#errorMsg').fadeIn(500);
						// }
					}
				} else{
					$('#' + id ).removeClass('input-error');
					$('p', '#' + id ).empty().remove();
				}
			},

		});
	});

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

	function isEmpty(element){
    	return !$.trim(element.html())
  }
});
