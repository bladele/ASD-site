//Bodunrin Ladele
//Full Sail University
$('#home').on('pageinit', function() {
	console.log("Home page loaded."); //code needed for home page goes here
});



$('#additem').on("pageinit", function(){
	
	var itemForm = $('#additemform');
	var errorslink = $('#errorslink');
	
	itemForm.validate({
		invalidHandler: function(form, validator){
			errorslink.click();
			var html = '';
			$("#errors ul").html("");
			for(var key in validator.submitted){
				var label = $('label[for^="'+ key +'"]').not('[generated]');
				console.log(label.text());
			};
			$("#errors ul").html(html);
		},
		submitHandler: function(){
			var data = itemForm.serializeArray();
			console.log(data);
			storeData(data);
		}
	});
});


// Submit click events
$('#submit').on('click', validate);