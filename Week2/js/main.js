//Bodunrin Ladele
//Full Sail University


$('#home').on('pageinit', function(){
    //code needed for home page goes here
});    
        
$('#addmovie').on('pageinit', function(){

        
        var mForm = $('#addmovieform'),
            errorslink = $('#errorslink')
        ;

            mForm.validate({
            invalidHandler: function(form, validator) {    
                errorslink.click();
                var html = '';
                $("#errors ul").html("");
                for(var key in validator.submitted){
                    var label = $('label[for^="'+ key +'"]').not('[generated]');
                    var legend = label.closest('fieldset').find('.ui-controlgroup-label');
                    var fieldName =  legend.length ? legend.text() : label.text();
                    html += '<li>'+ fieldName +'</li>';
                };
                $("#errors ul").html(html);
            },
            submitHandler: function() {
                var data = mForm.serializeArray();
                console.log(data);
                storeData(data);
        }
    });
    
    //any other code needed for addItem page goes here
    
});

$('#displaylink').on('click', function(){
    getData();
});

$('#clear').on('click', function(){
    clearLocal();
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

//To Store Data into Local Storage
var storeData = function(data){
    if(!data){
            var id = Math.floor(Math.random()*10000001);
    }else{
            id = data;
    };



//Gather up all our form field value and store in an object.
//Object properties contain array with the form lable and input value.
var item = {};
    item.genre  = ["Genre: ", $('#genre').val()];
    item.title  = ["Title: ", $('#title').val()];
    item.rating = ["Rating: ", $('#rating').val()];
    item.status = ["Status: ", $('#status').val()];
    

    localStorage.setItem(id, JSON.stringify(item));
    alert("Movie Saved!");
    changePage("showData");
    getData();
    console.log('getData');
};	
	
//Use JSON to Auto-fill Data
var autofillData = function (){
     for(var n in JSON){
         var id = Math.floor(Math.random()*10000001);
         localStorage.setItem(id, JSON.stringify(JSON[n]));
     };
};


//Get Data function
var getData = function(){
        if(localStorage.length === 0){
            alert("There are movies in Local Storage, so default data has been added.");
            autoFillData();
        }; 
    };
    //Write Data from Local Storage to the browser.
    $('#data').empty();
    var makeDiv = document.createElement('div');
    makeDiv.setAttribute("id", "items");
    var makeList = document.createElement('ul');
    makeDiv.appendChild(makeList);
    $('#data').append(makeDiv);
    $('#items').show;
    for(i = 0, len=localStorage.length; i<len; i++){
        var makeli = document.createElement('li');
        var linksLi = document.createElement('li');
        makeList.appendChild(makeli);
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        //Convert the string from local storage value back to an abject by using JSON.parse()
        var obj = JSON.parse(value);
        var makeSublist = document.createElement('ul');
        makeli.appendChild(makeSublist);
        for(var n in obj){
            var makeSublistLi = document.createElement('li');
            makeSublist.appendChild(makeSublistLi);
            var optSubText = obj[n][0] + " " + obj[n][1];
            makeSublistLi.innerHTML = optSubText;
            makeSublist.appendChild(linksLi);
        }
        makeEventLinks(localStorage.key(i), linksLi); //Creat edit and delete buttons/link for each item in local storage.
    }

//Make Item Links
//Create the edit and delet links for each stored item when displayed.
function makeEventLinks(key, linksLi) {
	//add edit single item link
	var editLink = document.createElement('a');
	editLink.href = "#addmovie"; 
	editLink.key = key;
	var editText = "Edit Movie";
	editLink.addEventListener("click", editMovie);
	editLink.innerHTML = editText;
	linksLi.appendChild(editLink);

	//add line break
	var breakTag = document.createElement('br');
	linksLi.appendChild(breakTag);

	//add delete single item link
	var deleteLink = document.createElement('a');
	deleteLink.href = "#browse";
	deleteLink.key = key;
	var deleteText = "Delete Log";
	deleteLink.addEventListener("click", deleteLog);
	deleteLink.innerHTML = deleteText;
	linksLi.appendChild(deleteLink);
}

//Edit a single log.
function editMovie() {
	//Grab the data from our item from local storage.
	var value = localStorage.getItem(this.key);
	var item = JSON.parse(value);

	//populate the form fields with current localStorage values.
	$("#genre").val(item.genre[1]);
	$("#title").val(item.title[1]);
	$("#rating").val(item.rating[1]);
	$("#status").val(item.status[1]);

	//Remove the initial listner fromt the input 'save log' botton.
	save.removeEventListener("click", storeData);
	//Change Submit Button Value to Edit Botton
	$('submit').value = "Edit Movie";
	var editSubmit = $('submit');
	/*Save the key value established in this function as a property of the editSubmit event
	so we can ust that value when we save the data edited.*/
	editSubmit.addEventListener("click", validate);
	editSubmit.key = this.key; 
}


// Delete One Item
var deleteItem = function (){
        var conf = confirm("Sure you want to delete this movie?");
        if(conf){
                    localStorage.removeItem(this.key);
                    alert("Movie was deleted.");
                    getData();
        }else{
                    alert("Movie was not deleted.");
        };    
};


//Clear Local Storage.                    
var clearLocal = function(){
    if(localStorage.length === 0){
        alert("There is no data to clear.");
    }else{
        var conf = confirm("Sure you want to clear all saved movies?");
        if(conf){
                    localStorage.clear();
                    alert("All love logs are deleted!");
        };
        return false;
    };
};





