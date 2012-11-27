//Bodunrin Ladele
//Full Sail University

$('#home').on('pageinit', function(){
    console.log("Home page loaded.");//code needed for home page goes here

// transition to page, using data from a form and reloading the page from scratch
	var loadAllItems = function(tobrowse){
		$.mobile.changePage("#browse" + tobrowse, {
			type:"post",
			data:$("form").serialize(),
			reloadPage:true
		});
	};

	
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


//Get localStorage 
$("#storage").on('click', function(){
	$("#browse")
})









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
$("#json").on("click", function(){
        $("#ajaxJson").empty(); //Remove all current data
        $.ajax({
            url: "data.json",
            type: "GET",
            dataType: "json",
            success: function(json){
                alert("JSON Data is now loaded.");
                for(var i=0, j=json.Movies.length; i < j; i++){
            var movies = json.Movies[i];
                $('' +
                    '<li><p><strong> Genre: </strong> ' + '<em>' + movies.genre + '</em>' + '</p>' +
                    '<p><strong> Title: </strong>' + '<em>' + movies.title + '</em>' + '</p>' +
                    '<p><strong> Status: </strong>' + '<em>' + movies.status + '</em>' + '</p>' +
                    '<p><strong> Rating: </strong>' + '<em>' + movies.rating + '</em>' + '</p>'
                    ).appendTo('#ajaxJson');
                }
                $("#ajaxJson").listview('refresh');
            },
        });
});


//Set Link & Submit Click Events
/*
$('#additem').on('click', function(){
	validate();
});

$('#browse').on('click', function(){
	getData();
});
*/

$('#clear').on('click', function(){
	clearLocal();
});


