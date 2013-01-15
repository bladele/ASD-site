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





//Get AJAX Data ------------------------------------------------------------------------------------------------------------------------------------------------>

//JSON Data
$("#jsonBtn").on("click", function () {
    $("#ajaxData").empty(); //Remove all current data
    $.ajax({
        url: "items.json",
        type: "GET",
        dataType: "json",
        success: function (json) {
            console.log(json);
            alert("JSON Data is now loaded.");
            for (var i = 0, j = json.Items.length; i < j; i++) {
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
                    '</li>').appendTo('#ajaxData');
            }
            $("#ajaxData").listview('refresh');
        },

    });
});



//XML
$('#xmlBtn').on('click', function () {

    $('#ajaxData').empty();
    $.ajax({
        url: "items.xml",
        type: "GET",
        dataType: "xml",
        success: function (xml,data) {
            console.log(xml);
            alert("XML Data is now loaded.");
                $(xml).find("items").each(function () {
                    var catgry = $(this).find('catgry').text(),
                        type = $(this).find('type').text(),
                        name = $(this).find('name').text(),
                        quantity = $(this).find('quantity').text(),
                        condition = $(this).find('condition').text(),
                        status = $(this).find('status').text(),
                        notes = $(this).find('notes').text();

            $("#ajaxData").append(
                    $('<ul>' +
                        '<li>' + "Category: " + catgry + '<br />' + '</li>' +
                        '<li>' + "Type: " + type + '<br />' + '</li>' +
                        '<li>' + "Name: " + name + '<br />' + '</li>' +
                        '<li>' + "Quantity: " + quantity + '<br />' + '</li>' +
                        '<li>' + "Condition: " + condition + '<br />' + '</li>' +
                        '<li>' + "Status: " + status + '<br />' + '</li>' +
                        '<li>' + "Notes: " + notes + '<br />' + '</li>' +
                        '</ul>'));
                });
                $('#ajaxData').listview();
                $('#ajaxData').listview('refresh');   
        },
        errors: function (data) {}
    });
});

/*CSV
$('#csvBtn').on('click', function () {
    $('#ajaxData').empty();

    $.ajax({
        url: "items.csv",
        type: "GET",
        dataType: "text",
        success: function (data) {
            console.log(data);
            alert("CSV Data is now loaded.");
                var lines = data.split("\n");
                for (var lineNum = 1; lineNum < lines.length; lineNum++) {
                    var row = lines[lineNum];
                    var columns = row.split(",");
                    $("#ajaxData").append(
                    $('<ul>' +
                        '<li>' + "Category: " + columns(0) + '<br />' + '</li>' +
                        '<li>' + "Type: " + columns(1) + '<br />' + '</li>' +
                        '<li>' + "Name: " + columns(2) + '<br />' + '</li>' +
                        '<li>' + "Quantity: " + columns(3) + '<br />' + '</li>' +
                        '<li>' + "Condition: " + columns(4) + '<br />' + '</li>' +
                        '<li>' + "Status: " + columns(5) + '<br />' + '</li>' +
                        '<li>' + "Notes: " + columns(6) + '<br />' + '</li>' +
                        '</ul>'));
                }
                $('#ajaxData').listview();
                $('#ajaxData').listview('refresh');
            },
        });
});

*/