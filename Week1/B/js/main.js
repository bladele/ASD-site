//Bodunrin Ladele
//Full Sail University
//Love Log App


/*$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	*/
		
$('#newLog').on('pageinit', function(){

		var lLform = $('#lovelogform')
			logerrorslink = $('#logerrorslink')
		;

		lLform.validate({
			invalidHandler: function(form, validator) {
				logerrorslink.click();
				var html = '';
				$("#newLogerrors ul").html("");
				for(var key in validator.submitted){
					var label = $('label[for^="'+ key +'"]').not('[generated]');
					var legend = label.closest('fieldset').find('.ui-controlgroup-label');
					var fieldName =  legend.length ? legend.text() : label.text();
					html += '<li>'+ fieldName +'</li>';
				};
				$("#newLogerrors ul").html(html);
			},
			submitHandler: function() {
				var data = myForm.serializeArray();
				console.log(data);
				storeData(data);
		}
	});
	
	//any other code needed for addItem page goes here
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var getSelectedRadio = [];
var j;

var autofillData = function (){
	 
};

var getData = function(){

};

//getElementById Function
function ge(x){
	var theElement = document.getElementById(x);
	return theElement;
	};
	
	//Find value of selected radio button.
function getSelectedRadio(){
	var radio = document.forms[0].role;
	for(var i=0; i<radio.length; i++){
		if(radio[i].checked){
			roleValue = radio[i].value;
		}
	}
}

var storeData = function(data){

		var id = Math.floor(Math.random()*1000000001);
	
	
	//Gather up all our form fiel value and store in an object.
	//Object properties contain array with the form lable and input value.
	getSelectedRadio();
	for(var key in data){
		var itemtype		= data[key].type;
		var itemtitle		= data[key].title;
		var itemlocation	= data[key].location;
		var itemrole		= data[key].role;	
		var itemwow			= data[key].wow;
		var fieldnmae = length.length ? length.text() : lable.text();
		item[key] = [fielname, itemValue];
		}
		console.log(key);
		//Save data into Local Storage: Use Stringify to convert our object to a string.
		localStorage.setItem(id, JSON.stringify(item));
		alert("Love Log Saved!");
}; 

var	deleteItem = function (){
			
};
					
var clearLocal = function(){
	if(localStorage.length === 0){
		alert("There is no data to clear.")
	}else{
		localStorage.clear();
		alert("All love logs are deleted!");
		window.location.reload();
		return false;
	};

};


