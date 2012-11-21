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
				html += '<li>' + fieldName + '</li>';
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

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

//To Store Data into Local Storage
var storeData = function(data){
	if(!data){
		var id = Math.floor(Math.random()*10000001);
	}else{
			id = data;
	}
//Gather up all our form field value and store in an object.
//Object properties contain array with the form lable and input value.
	var item 		= {};
		item.cat 	= ["Categorie: ", $('#cat').val()];
		item.name 	= ["Name: ", $('#name').val()];
		item.status = ["Status: ", $('#status').val()];

	localStorage.setItem(id, JSON.stringify(item));
	alert("Item Saved!");
	changePage("showData");
	getData();
	console.log('getData');
}

//Use JSON to Auto-fill Data
var autofillData = function (){
     for(var n in JSON){
         var id = Math.floor(Math.random()*10000001);
         localStorage.setItem(id, JSON.stringify(json[n]));
     };
};

//Get Data function






