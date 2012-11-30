//Bodunrin Ladele
//Full Sail University

$('#home').on('pageinit', function(){
    console.log("Home page loaded.");//code needed for home page goes here
	
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
			$("#errors ul").html(html);
		},
		submitHandler: function() {
			var data = iForm.serializeArray();
			console.log(data);
			storeData(data);
		}
		});


});

$('#d')

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
		item.catgry		= ["Category: ", $('#catgry').val()];
		item.type 		= ["Type: ", $('#type').val()];
		item.name 		= ["Name: ", $('#name').val()];
		item.quantity	= ["Quantity: ", $('#quantity').value];
		item.usage 		= ["Usage: ", $('#usage').val()];
		item.condition	= ["Condition: ", $('#usage').val()];
		item.status 	= ["Status: ", $('#status').val()];
		item.notes 		= ["Notes: ", $('#notes').value];


	localStorage.setItem(id, JSON.stringify(item));
	alert("Item Saved!");
	changePage("showData");
	getData();
	console.log('getData');
}

//Use JSON to Auto-fill Data


//Get localStorage 
$("#storage").on('click', function(){
	$("#browse")
});




//Get JSON Data when browse page is open.
$("#browseBtn").on("click", function(){
	
	$.mobile.changePage("#browse");
	$.ajax({
		url: "items.json",
		type: "Get",
		dataType: "json",
		success: function(json){
			alert("All items are loaded.");

			$("#ajaxJson").empty(); //Remove all current

			for(var i=0, j=json.Items.length; i < j; i++){
        var items = json.Items[i];
                $('' +
                    '<li>' +
	                 '<p><strong> Category: </strong> ' + '<em>' + items.catgry + '</em>' + '</p>' +
	                 '<p><strong> Type: </strong>' + '<em>' + items.type + '</em>' + '</p>' +
	                 '<p><strong> Name: </strong>' + '<em>' + items.name + '</em>' + '</p>' +
	                 '<p><strong> Quantity: </strong>' + '<em>' + items.quantity + '</em>' + '</p>' +
	                 '<p><strong> Condition: </strong>' + '<em>' + items.condition + '</em>' + '</p>' +
	                 '<p><strong> Usage: </strong>' + '<em>' + items.usage + '</em>' + '</p>' +
	                 '<p><strong> Status: </strong>' + '<em>' + items.status + '</em>' + '</p>' +
	                 '<p><strong> Notes: </strong>' + '<em>' + items.notes + '</em>' + '</p>' +
	                 '</li>'
                    ).appendTo('#ajaxJson');
                }
                $("#ajaxJson").listview('refresh');

                $.mobile.changePage("#browse");
		}, 
		errors: function(data){}
	});
});







//Clear Local Storage.
var clearLocal = function(){
	if(localStorage.length === 0){
		alert("There is no data to clear.");
	}else{
		var conf = confirm("Sure you want to clear all saved items?");
		if(conf){
					localStorage.clear();
					alert("All movies are deleted!");
		};
		return false;
	};
};



//Get AJAX Data 
$('#ajax').on('pageinit', function(){

//JSON Data
	$("#jsonBtn").on("click", function(){
	        $("#ajaxData").empty(); //Remove all current data
	        $.ajax({
	            url: "items.json",
	            type: "GET",
	            dataType: "json",
	            success: function(json){
	            	console.log(json);
	                alert("JSON Data is now loaded.");
	                for(var i=0, j=json.Items.length; i < j; i++){
	            var items = json.Items[i];
	                $('' +
	                    '<li>' +
	                    '<p><strong> Category: </strong> ' + '<em>' + items.catgry + '</em>' + '</p>' +
	                    '<p><strong> Type: </strong>' + '<em>' + items.type + '</em>' + '</p>' +
	                    '<p><strong> Name: </strong>' + '<em>' + items.name + '</em>' + '</p>' +
	                    '<p><strong> Quantity: </strong>' + '<em>' + items.quantity + '</em>' + '</p>' +
	                    '<p><strong> Condition: </strong>' + '<em>' + items.condition + '</em>' + '</p>' +
	                    '<p><strong> Usage: </strong>' + '<em>' + items.usage + '</em>' + '</p>' +
	                    '<p><strong> Status: </strong>' + '<em>' + items.status + '</em>' + '</p>' +
	                    '<p><strong> Notes: </strong>' + '<em>' + items.notes + '</em>' + '</p>' +
	                    '</li>'
	                    ).appendTo('#ajaxData');
	                }
	                $("#ajaxData").listview('refresh');
	            },
	            errors: function(data){}
	        });
	});

//XML
	$('#xmlBtn').on('click', function(){

		$('#ajaxData').empty();
		$.ajax({
			url: "items.xml",
	        type: "GET",
	        dataType: "xml",
	        success: function(xml,data){
	            	console.log(xml);
	                alert("XML Data is now loaded.");
	                for(var i=0, j=json.Items.length; i < j; i++){
	            	
	            	$(xml).find("items").each(function(){
	            		var catgry 		= $(this).find('catgry').text(),
	            			type 		= $(this).find('type').text(),
	            			name 		= $(this).find('name').text(),
	            			quantity 	= $(this).find('quantity').text(),
	            			condition 	= $(this).find('condition').text(),
	            			status 		= $(this).find('status').text(),
	            			notes 		= $(this).find('notes').text();

	            		$("#ajaxData").appendTo($(	'<ul>' +
		            									'<li>' + "Category: " + catgry + '<br/>' + '</li>' +
		            									'<li>' + "Type: " + type + '<br/>' + '</li>' +
		            									'<li>' + "Name: " + name + '<br/>' + '</li>' +
		            									'<li>' + "Quantity: " + quantity + '<br/>' + '</li>' +
		            									'<li>' + "Condition: " + condition + '<br/>' + '</li>' +
		            									'<li>' + "Status: " + status + '<br/>' + '</li>' +
		            									'<li>' + "Notes: " + notes + '<br/>' + '</li>' +
	            									'</ul>'
	            								));
	            	});
					$('#ajaxData').listview();
				$('#ajaxData').listview('refresh');
			}
			error: function(data){}
		});
	});




//CSV













});


//Set Link & Submit Click Events
/*
$('#additem').on('click', function(){
	validate();
});

$('#browse').on('click', function(){
	getData();
});

$('#clear').on('click', function(){
	clearLocal();
});
*/




