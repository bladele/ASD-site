//Bodunrin Ladele
//Full Sail University


$('#home').on('pageinit', function () {
    console.log("Home page loaded."); //code needed for home page goes here

});




$('#itemform').on('pageinit', function () {

    var itemForm = $('#additemform'),
        logerrorslink = $('#logerrorslink');

    itemForm.validate({
        invalidHandler: function(form, validator){
			logerrorslink.click();
            var html = '';
            $("#errors ul").html("");
            for(var key in validator.submitted){
				var label = $('label[for^="'+ key +'"]').not('[generated]');
				var legend = label.closest('fieldset').find('.ui-controlgroup-label');
				var fieldName =  legend.length ? legend.text() : label.text();
				html += '<li>'+ fieldName +'</li>';
			};
            $("#newLogerrors ul").html(html);
        },
        submitHandler: function(){
            var data = itemForm.serializeArray();
            console.log(data);
            storeData(data);
        }
    });
    
//Any other code needed for addItem page goes here


});

$('#browseBtn').on('click', function(){ // display link gets data
	getData();
});


//The functions below can go inside or outside the pageinit function for the page in which it is needed.
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
	item.category 	= ["Category: ", $('#category').val()];
	item.condition 	= ["Condition: ", $('#condition').val()];
	item.status 	= ["Status: ", $('#status').val()];
	item.notes 		= ["Notes: ", $('#notes').val()];
	
	localStorage.setItem(id, JSON.stringify(item));
	alert("Item Saved!");
};




//Get JSON Data when browse page is open. ------------------------------------------------------------------------------------------->
$("#browseBtn").on("click", function () {

    $.mobile.changePage("#browse");
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