//Bodunrin Ladele
//Full Sail University

$('#home').on('pageinit', function(){
    //code needed for home page goes here
});

$('#additem').on('pageinit', function(){
	
	var iForm = $('#additemform'),
		errorslink = $('#errorslink');

		iForm.validate({
		invalidHandler: function(form, validator) {
			errorslink.click();
			var html = '';
			$("#errors ul").html("");
			for(var key in validator.submitted){
				var label = $('lable[for^="'+ key +'"]').not('[generated]');
				var legend = label.closet('fieldset').find('.ui-controlgroup-label');
				var fieldName = legend.lenght ? legend.text() : label.text();
				html += '<li>' + fieldName + '</li';
			};
			$("#errors ul"). html(html);
		},
		submitHandler: function() {
			var data = iForm.serializeArray();
			console.log(data);
			storeData(data);
		}
	});
		

});

