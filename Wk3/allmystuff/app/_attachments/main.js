//Bodunrin Ladele
//Full Sail University


$('#home').on('pageinit', function () {
    console.log("Home page loaded."); //code needed for home page goes here

});


$('#itemform').on('pageinit', function () {

    var itemForm = $('#additemform'),
        itemerrorslink = $('#itemerrorslink');

    itemForm.validate({
        invalidHandler: function(form, validator){
			itemerrorslink.click();
			rules:{usage:"required"}
            var html = '';
            $("#errors ul").html("");
            for(var key in validator.submitted){
				var label = $('label[for^="'+ key +'"]').not('[generated]');
				var legend = label.closest('fieldset').find('.ui-controlgroup-label');
				var fieldName =  legend.length ? legend.text() : label.text();
				html += '<li>'+ fieldName +'</li>';
			};
            $("#itemformerrors ul").html(html);
        },
        submitHandler: function(){
        var data = itemForm.serializeArray();
        console.log(data);
        storeData(data);
        }
    });    
});

//Any other code needed for addItem page goes here

//Store Data function
var storeData = function(idValue, revValue){
	
	var item 		= {};
	item.category 	= $('#category').val();
	item.type 		= $('#type').val();
	item.name 		= $('#name').val();
	item.quantity	= $('#quantity').val();
	item.category 	= $('#category').val();
	item.condition 	= $('#condition').val();
	item.status 	= $('#status').val();
	item.notes 		= $('#notes').val();
	//Changes id to format I can use in CouchDB
	item["_id"] = "item:" + $('#category').val() + ":" + $('#type').val() + ":" + $('#name').val();
	
	$.couch.db("amsdb").saveDoc(item,{
		success: function(data){
			//Console log the id
			data.id = "item:" + $('#category').val() + ":" + $('#type').val() + ":" + $('#name').val();
			console.log(data);
		},
		error: function(status){
			console.log(status);
		}
	}); 
	alert("Item Saved!");
	$.mobile.changePage("#browse");
};

var save = $('#submit');
save.on("click");


//----------------------------View For All Items ------------------------------------------
$('#browse').on("pageinit", function(){
	$.couch.db("amsdb").view("amsdb/items",{
    	success: function(data){
    		console.log(data);
    		$("#itemData").empty();
            $.each(data.rows, function (index, value){
            	var item = (value.value || value.doc);
            	$('#itemData').append(
            		$('<li>').append(
            			$('<a>')
            				.attr("href", "itemspecs.html?item=" + item.name)
            				.text(item.name)
            		)
            	);
            });        
                $("#itemData").listview('refresh');
        }
    });
});


//--------------------------------- Detailed view of Item ------------------------------------------------------


var urlVars = function(urlData){
	var urlData = $($.mobile.activePage).data("url");
	var urlParts = urlData.split('?');
		var urlPairs = urlParts[1].split('&');
		var urlValues = {};
		for (var pair in urlPairs){
				var keyValue = urlPairs[pair].split('=');
				var key = decodeURIComponent(keyValue[0]);
				var value = decodeURIComponent(keyValue[1]);
				urlValues[key] = value;
				var urlname = key
		}
		return [urlValues, urlname];
};

$('#itemspecs').live("pageshow", function(){
		var specs = urlVars()[0]["specs"];
		console.log(specs);
		var itemdis;
		$.couch.db("amsdb").view("amsdb/specs", {
				success: function(data){
	    		$("#itemSpecs").empty();
	    		$.each(data.rows, function (index, value){
            	var item = (value.value || value.doc);
	            if(item.name === itemdis){
	            	itemdis = item;
	            	itemVal = value;
	            	};
	            	$('' +
                        '<li>' +
                        '<p><strong> Category: </strong> ' + '<em>' + data.category + '</em>' + '</p>' +
                        '<p><strong> Type: </strong>' + '<em>' + data.type + '</em>' + '</p>' +
                        '<p><strong> Name: </strong>' + '<em>' + data.name + '</em>' + '</p>' +
                        '<p><strong> Quantity: </strong>' + '<em>' + data.quantity + '</em>' + '</p>' +
                        '<p><strong> Condition: </strong>' + '<em>' + data.condition + '</em>' + '</p>' +
                        '<p><strong> Usage: </strong>' + '<em>' + data.usage + '</em>' + '</p>' +
                        '<p><strong> Status: </strong>' + '<em>' + data.status + '</em>' + '</p>' +
                        '<p><strong> Notes: </strong>' + '<em>' + data.notes + '</em>' + '</p>' +
                        '</li>'
	            ).appendTo('#itemSpecs');
	            }); 
	            $("#itemSpecs").listview('refresh');
	            
	            }
	   });		
});
//---------------------------------------------------------------

//View For Book Items
$("#books").on("pageinit", function(){
    $.ajax({
    	"url":"_view/books",
    	"dataType": "json",
    	"success": function(data){
    		$("#bookData").empty();
    		console.log(data);
    		$('<h3>').html("").appendTo('#books');
                $.each(data.rows, function (index, item) {
                    $('' +
                        '<li>' +
                        '<p><strong> Category: </strong> ' + '<em>' + item.value.category + '</em>' + '</p>' +
                        '<p><strong> Type: </strong>' + '<em>' + item.value.type + '</em>' + '</p>' +
                        '<p><strong> Name: </strong>' + '<em>' + item.value.name + '</em>' + '</p>' +
                        '<p><strong> Quantity: </strong>' + '<em>' + item.value.quantity + '</em>' + '</p>' +
                        '<p><strong> Condition: </strong>' + '<em>' + item.value.condition + '</em>' + '</p>' +
                        '<p><strong> Usage: </strong>' + '<em>' + item.value.usage + '</em>' + '</p>' +
                        '<p><strong> Status: </strong>' + '<em>' + item.value.status + '</em>' + '</p>' +
                        '<p><strong> Notes: </strong>' + '<em>' + item.value.notes + '</em>' + '</p>' +
                        '</li>'
                    ).appendTo('#bookData');
            });        
                $("#bookData").listview('refresh');
                $.mobile.changePage("#books");
        },
            errors: function (data) {}
    });
    
    
});

//View For Entertainment Items
$("#entertainment").on("pageinit", function(){
    $.ajax({
    	"url":"_view/entertainment",
    	"dataType": "json",
    	"success": function(data){
    		$("#entData").empty();
    		console.log(data);
    		$('<h3>').html("").appendTo('#entertainment');
                $.each(data.rows, function (index, item) {
                    $('' +
                        '<li>' +
                        '<p><strong> Category: </strong> ' + '<em>' + item.value.category + '</em>' + '</p>' +
                        '<p><strong> Type: </strong>' + '<em>' + item.value.type + '</em>' + '</p>' +
                        '<p><strong> Name: </strong>' + '<em>' + item.value.name + '</em>' + '</p>' +
                        '<p><strong> Quantity: </strong>' + '<em>' + item.value.quantity + '</em>' + '</p>' +
                        '<p><strong> Condition: </strong>' + '<em>' + item.value.condition + '</em>' + '</p>' +
                        '<p><strong> Usage: </strong>' + '<em>' + item.value.usage + '</em>' + '</p>' +
                        '<p><strong> Status: </strong>' + '<em>' + item.value.status + '</em>' + '</p>' +
                        '<p><strong> Notes: </strong>' + '<em>' + item.value.notes + '</em>' + '</p>' +
                        '</li>'
                    ).appendTo('#entData');
            });        
                $("#entData").listview('refresh');
                $.mobile.changePage("#entertainment");
        },
            errors: function (data) {}
    });
});

//View For Gear Items
$("#gear").on("pageinit", function(){
    $.ajax({
    	"url":"_view/gear",
    	"dataType": "json",
    	"success": function(data){
    		$("#gearData").empty();
    		console.log(data);
    		$('<h3>').html("").appendTo('#gear');
                $.each(data.rows, function (index, item) {
                    $('' +
                        '<li>' +
                        '<p><strong> Category: </strong> ' + '<em>' + item.value.category + '</em>' + '</p>' +
                        '<p><strong> Type: </strong>' + '<em>' + item.value.type + '</em>' + '</p>' +
                        '<p><strong> Name: </strong>' + '<em>' + item.value.name + '</em>' + '</p>' +
                        '<p><strong> Quantity: </strong>' + '<em>' + item.value.quantity + '</em>' + '</p>' +
                        '<p><strong> Condition: </strong>' + '<em>' + item.value.condition + '</em>' + '</p>' +
                        '<p><strong> Usage: </strong>' + '<em>' + item.value.usage + '</em>' + '</p>' +
                        '<p><strong> Status: </strong>' + '<em>' + item.value.status + '</em>' + '</p>' +
                        '<p><strong> Notes: </strong>' + '<em>' + item.value.notes + '</em>' + '</p>' +
                        '</li>'
                    ).appendTo('#gearData');
            });        
                $("#gearData").listview('refresh');
                $.mobile.changePage("#gear");
        },
            errors: function (data) {}
    });
});

//View For Household Items
$("#household").on("pageinit", function(){
    $.ajax({
    	"url":"_view/household",
    	"dataType": "json",
    	"success": function(data){
    		$("#houseData").empty();
    		console.log(data);
    		$('<h3>').html("").appendTo('#household');
                $.each(data.rows, function (index, item) {
                    $('' +
                        '<li>' +
                        '<p><strong> Category: </strong> ' + '<em>' + item.value.category + '</em>' + '</p>' +
                        '<p><strong> Type: </strong>' + '<em>' + item.value.type + '</em>' + '</p>' +
                        '<p><strong> Name: </strong>' + '<em>' + item.value.name + '</em>' + '</p>' +
                        '<p><strong> Quantity: </strong>' + '<em>' + item.value.quantity + '</em>' + '</p>' +
                        '<p><strong> Condition: </strong>' + '<em>' + item.value.condition + '</em>' + '</p>' +
                        '<p><strong> Usage: </strong>' + '<em>' + item.value.usage + '</em>' + '</p>' +
                        '<p><strong> Status: </strong>' + '<em>' + item.value.status + '</em>' + '</p>' +
                        '<p><strong> Notes: </strong>' + '<em>' + item.value.notes + '</em>' + '</p>' +
                        '</li>'
                    ).appendTo('#houseData');
            });        
                $("#houseData").listview('refresh');
                $.mobile.changePage("#household");
        },
            errors: function (data) {}
    });
});

//View For Vehicle Items
$("#vehicles").on("pageinit", function(){
    $.ajax({
    	"url":"_view/vehicles",
    	"dataType": "json",
    	"success": function(data){
    		$("#motorData").empty();
    		console.log(data);
    		$('<h3>').html("").appendTo('#vehicles');
                $.each(data.rows, function (index, item) {
                    $('' +
                        '<li>' +
                        '<p><strong> Category: </strong> ' + '<em>' + item.value.category + '</em>' + '</p>' +
                        '<p><strong> Type: </strong>' + '<em>' + item.value.type + '</em>' + '</p>' +
                        '<p><strong> Name: </strong>' + '<em>' + item.value.name + '</em>' + '</p>' +
                        '<p><strong> Quantity: </strong>' + '<em>' + item.value.quantity + '</em>' + '</p>' +
                        '<p><strong> Condition: </strong>' + '<em>' + item.value.condition + '</em>' + '</p>' +
                        '<p><strong> Usage: </strong>' + '<em>' + item.value.usage + '</em>' + '</p>' +
                        '<p><strong> Status: </strong>' + '<em>' + item.value.status + '</em>' + '</p>' +
                        '<p><strong> Notes: </strong>' + '<em>' + item.value.notes + '</em>' + '</p>' +
                        '</li>'
                    ).appendTo('#motorData');
            });        
                $("#motorData").listview('refresh');
                $.mobile.changePage("#vehicles");
        },
            errors: function (data) {}
    });
});

/*
//Get Data from local storage
$("#browse").on('pageinit', function(){
	getData();
}); 

//Clear Data Function
$("#clrBtn").on('click', function(){
	clearLocal();
	});


//The functions below can go inside or outside the pageinit function for the page in which it is needed.
//Store Data Function.
function storeData(key){
	if(!key){
		var id = Math.floor(Math.random() * 100000001);
	}else{
		id = key;
	}
	var item 		= {};
	item.category 	= ["Category: ", $('#category').val()];
	item.type 		= ["Type: ", $('#type').val()];
	item.name 		= ["Name: ", $('#name').val()];
	item.quantity 	= ["Quantity: ", $('#quantity').val()];
	item.condition 	= ["Condition: ", $('#condition').val()];
	item.usage 		= ["Usage: ", $('#usage').val()];
	item.status 	= ["Status: ", $('#status').val()];
	item.notes 		= ["Notes: ", $('#notes').val()];
	
	localStorage.setItem(id, JSON.stringify(item));
	alert("Item Saved!");
	$.mobile.changePage("#browse");
	getData();
	console.log(getData);
};
*/


//Populate Dummy Data
/*function getDumyData(){
	for(var n in json){
		var id = Math.floor(Math.random() * 100000001);
		localStorage.setItem(id, JSON.stringify(json[n]));
	}
}*/


/*//Get Data
function getData(){
	if(localStorage.length === 0){
		alert("Currently, there are not items saved, so dummy data will be loaded.");
		//getDumyData();
	};
	
	//Write Data from Local Storage to the browser.
    $('#data').empty();
    var makeDiv = document.createElement('div');
    makeDiv.setAttribute("id", "items");
    var makeList = document.createElement('ul');
    makeDiv.appendChild(makeList);
    
    makeList.setAttribute("id", "itemslist");
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
        console.log(getData);
        };
};
        

    
    
//Make Item Links
//Create the edit and delet links for each stored item when displayed.
	function makeEventLinks(key, linksLi) {
		//add edit single item link
		var editLink = document.createElement('button');
		editLink.href = "#"; 
		editLink.key = key;
		var editText = "Edit Item";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
	
		//add line break
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);
	
		//add delete single item link
		var deleteLink = document.createElement('button');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Item";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	//Edit a single log.
	function editItem() {
		//Grab the data from our item from local storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
	
		//populate the form fields with current localStorage values.
		$("#category").val(item.category[1]);
		$("#type").val(item.type[1]);
		$("#name").val(item.name[1]);
		$("#quantity").val(item.quantity[1]);
		$("#condition").val(item.condition[1]);
		$("#usage").val(item.usage[1]);
		$("#status").val(item.status[1]);
		$("#notes").val(item.notes[1]);
	
		//Remove the initial listner fromt the input 'save log' botton.
		save.removeEventListener("click", storeData);
		//Change Submit Button Value to Edit Botton
		$('#submit').value = "Edit Item";
		var editSubmit = $('#submit');
		//Save the key value established in this function as a property of the editSubmit event
		//so we can ust that value when we save the data edited.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
		};
		
		// Delete One Item
		function deleteItem(){
	        var ask = confirm("Sure you want to delete this item?");
	        if(ask){
	                    localStorage.removeItem(this.key);
	                    alert("Item was deleted.");
	                    getData();
	        }else{
	                    alert("Item was not deleted.");
	        }  
        }

//Clear Local Storage
	function clearLocal(){
		if(localStorage.length === 0){
	        alert("There are no items to clear.");
	    }else{
	        localStorage.clear();
	        alert("All items are deleted!");
	        window.location.reload();
	        return false;
	    }
    }
*/

/*
//Get JSON Data when browse page is open. ------------------------------------------------------------------------------------------->
$("#browse").on("pageinit", function () {

    
    $.ajax({
        url: "items.json",
        type: "Get",
        dataType: "json",
        success: function (json) {
            alert("All items are loaded.");

            $("#ajaxJson").empty(); //Remove all current

            for (var i = 0, j = json.Items.length; i < j; i++) {
                var items = json.Items[i];
                $('' +
                    '<li>' +
	                    '<p><strong> Category: </strong> ' + '<em>' + items.category + '</em>' + '</p>' +
	                    '<p><strong> Type: </strong>' + '<em>' + items.type + '</em>' + '</p>' +
	                    '<p><strong> Name: </strong>' + '<em>' + items.name + '</em>' + '</p>' +
	                    '<p><strong> Quantity: </strong>' + '<em>' + items.quantity + '</em>' + '</p>' +
	                    '<p><strong> Condition: </strong>' + '<em>' + items.condition + '</em>' + '</p>' +
	                    '<p><strong> Usage: </strong>' + '<em>' + items.usage + '</em>' + '</p>' +
	                    '<p><strong> Status: </strong>' + '<em>' + items.status + '</em>' + '</p>' +
	                    '<p><strong> Notes: </strong>' + '<em>' + items.notes + '</em>' + '</p>' +
                    '</li>').appendTo('#ajaxJson');
            }
            $("#ajaxJson").listview('refresh');

            $.mobile.changePage("#browse");
        },
        errors: function (data) {}
    });
});

*/


