//Bodunrin Ladele
//Full Sail University


$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#addmovie').on('pageinit', function(){

		var mForm = $('#addmovieform');
		    mForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data);
		}
	});
	
	//any other code needed for addItem page goes here
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	 
};

var getData = function(){

	if(localStorage.length === 0){
		alert("There are movies in Local Storage, so default data has been added.");
		autoFillData();
	}

};

var storeData = function(data, key){

	var id;
	if(!key){
				id = Math.floor(Math.random()*10000001);
			}else{
				id = key;
			}
}; 

//Gather up all our form fiel value and store in an object.
//Object properties contain array with the form lable and input value.
getSelectedRadio();
var item = {};
	item.genre 	= ["Genre: ", $('genre').value()];
	item.title	= ["Title: ", $('title').value()];
	item.rating = ["Rating: ", $('rating').value()];
	item.status	= ["Status: ", $('status').value()];

	localStorage.setItem(id, JSON.stringify(item));
	alert("Movie Saved!");


var	deleteItem = function (){
			
};
					
var clearLocal = function(){

};


