$(document).on('ready', function (event) {


$('.myForm').on('submit', function (event) {
    event.preventDefault(); // Stop the form from causing a page refresh.

    $.ajax({
      url: 'http://localhost:3000',
      method: 'POST'
    }).then(function (response) {
      console.log("sort of virkar");
      
    }).catch(function (err) {
      console.error(err);
    });
  });

});
