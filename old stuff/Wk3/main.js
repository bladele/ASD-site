//Bodunrin Ladele
//Full Sail University
$('#home').on('pageinit', function () {
    console.log("Home page loaded."); //code needed for home page goes here
});


$('#additem').on('pageinit', function () {
    //Set Link & Submit Click Events
    var displayData = $('#browse')
    var saveItem = $('#submit');
    save.on("click", storeData);

    var validate = function(){
        console.log('validated');
        iForm.validate({
            invalidHandler: function (form, validator) {},
            submitHandler: function () {
                var data = iForm.serializeArray();
                console.log(data);
                storeData(data);
            } 
        });
    };

    function storeData(data) {
        console.log('data');
        var id = Math.floor(Math.random() * 1000001);
        if(!data.key){
        }else{
            id = key;
        }
        var item = {};
        item.catgry     = ["Category: ", $('#catgry').val()];
        item.type       = ["Type: ", $('#type').val()];
        item.name       = ["Name: ", $('#name').val()];
        item.quantity   = ["Quantity: ", $('#quantity').value];
        item.condition  = ["Condition: ", $('#condition').val()];
        item.usage      = ["Usage: ", $('#usage').val()];
        item.status     = ["Status: ", $('#status').val()];
        item.notes      = ["Notes: ", $('#notes').value];
        item.key        = id; 

        $.couch.db("allmystuff").saveDoc(item, {
            success: function(item) {
                console.log(item);
            },
            error: function(status){
                console.log(status);
            }
        });

        localStorage.setItem(id, JSON.stringify(item));
        alert("Item Saved");
    }
});

//SHOW DATA: Get JSON Data when browse page is open from any of the other pages.
//For the browseBtn on the home page
$("#browseBtn").on("click", function () {

    $.mobile.changePage("#browse");
    $.ajax({
        url: "_view/items",
        type: "Get",
        dataType: "json",
        success: function (data) {
            $("#ajaxJson").empty(); //Remove all current
            console.log(data);
            $('<h3>').html("").appendTo('#browse');
                $.each(data.rows, function (index, item) {

                    $('' +
                        '<li>' +
                        '<p><strong> Category: </strong> ' + '<em>' + item.value.catgry + '</em>' + '</p>' +
                        '<p><strong> Type: </strong>' + '<em>' + item.value.type + '</em>' + '</p>' +
                        '<p><strong> Name: </strong>' + '<em>' + item.value.name + '</em>' + '</p>' +
                        '<p><strong> Quantity: </strong>' + '<em>' + item.value.quantity + '</em>' + '</p>' +
                        '<p><strong> Condition: </strong>' + '<em>' + item.value.condition + '</em>' + '</p>' +
                        '<p><strong> Usage: </strong>' + '<em>' + item.value.usage + '</em>' + '</p>' +
                        '<p><strong> Status: </strong>' + '<em>' + item.value.status + '</em>' + '</p>' +
                        '<p><strong> Notes: </strong>' + '<em>' + item.value.notes + '</em>' + '</p>' +
                        '</li>'
                    ).appendTo('#ajaxJson');
            });        
                $("#ajaxJson").listview('refresh');
                $.mobile.changePage("#browse");
        },
            errors: function (data) {}
    });
});

//For the browseBtn on the about page
$("#browseBtn1").on("click", function () {

    $.mobile.changePage("#browse");
    $.ajax({
        url: "_view/items",
        type: "Get",
        dataType: "json",
        success: function (data) {
            $("#ajaxJson").empty(); //Remove all current
            console.log(data);
            $('<h3>').html("").appendTo('#browse');
                $.each(data.rows, function (index, item) {

                    $('' +
                        '<li>' +
                        '<p><strong> Category: </strong> ' + '<em>' + item.value.catgry + '</em>' + '</p>' +
                        '<p><strong> Type: </strong>' + '<em>' + item.value.type + '</em>' + '</p>' +
                        '<p><strong> Name: </strong>' + '<em>' + item.value.name + '</em>' + '</p>' +
                        '<p><strong> Quantity: </strong>' + '<em>' + item.value.quantity + '</em>' + '</p>' +
                        '<p><strong> Condition: </strong>' + '<em>' + item.value.condition + '</em>' + '</p>' +
                        '<p><strong> Usage: </strong>' + '<em>' + item.value.usage + '</em>' + '</p>' +
                        '<p><strong> Status: </strong>' + '<em>' + item.value.status + '</em>' + '</p>' +
                        '<p><strong> Notes: </strong>' + '<em>' + item.value.notes + '</em>' + '</p>' +
                        '</li>'
                    ).appendTo('#ajaxJson');
            });        
                $("#ajaxJson").listview('refresh');
                $.mobile.changePage("#browse");
        },
            errors: function (data) {}
    });
});

//For the browseBtn on the contacts page
$("#browseBtn2").on("click", function () {

    $.mobile.changePage("#browse");
    $.ajax({
        url: "_view/items",
        type: "Get",
        dataType: "json",
        success: function (data) {
            $("#ajaxJson").empty(); //Remove all current
            console.log(data);
            $('<h3>').html("").appendTo('#browse');
                $.each(data.rows, function (index, item) {

                    $('' +
                        '<li>' +
                        '<p><strong> Category: </strong> ' + '<em>' + item.value.catgry + '</em>' + '</p>' +
                        '<p><strong> Type: </strong>' + '<em>' + item.value.type + '</em>' + '</p>' +
                        '<p><strong> Name: </strong>' + '<em>' + item.value.name + '</em>' + '</p>' +
                        '<p><strong> Quantity: </strong>' + '<em>' + item.value.quantity + '</em>' + '</p>' +
                        '<p><strong> Condition: </strong>' + '<em>' + item.value.condition + '</em>' + '</p>' +
                        '<p><strong> Usage: </strong>' + '<em>' + item.value.usage + '</em>' + '</p>' +
                        '<p><strong> Status: </strong>' + '<em>' + item.value.status + '</em>' + '</p>' +
                        '<p><strong> Notes: </strong>' + '<em>' + item.value.notes + '</em>' + '</p>' +
                        '</li>'
                    ).appendTo('#ajaxJson');
            });        
                $("#ajaxJson").listview('refresh');
                $.mobile.changePage("#browse");
        },
            errors: function (data) {}
    });
});

//For the browseBtn on the loans page
$("#browseBtn3").on("click", function () {

    $.mobile.changePage("#browse");
    $.ajax({
        url: "_view/items",
        type: "Get",
        dataType: "json",
        success: function (data) {
            $("#ajaxJson").empty(); //Remove all current
            console.log(data);
            $('<h3>').html("").appendTo('#browse');
                $.each(data.rows, function (index, item) {

                    $('' +
                        '<li>' +
                        '<p><strong> Category: </strong> ' + '<em>' + item.value.catgry + '</em>' + '</p>' +
                        '<p><strong> Type: </strong>' + '<em>' + item.value.type + '</em>' + '</p>' +
                        '<p><strong> Name: </strong>' + '<em>' + item.value.name + '</em>' + '</p>' +
                        '<p><strong> Quantity: </strong>' + '<em>' + item.value.quantity + '</em>' + '</p>' +
                        '<p><strong> Condition: </strong>' + '<em>' + item.value.condition + '</em>' + '</p>' +
                        '<p><strong> Usage: </strong>' + '<em>' + item.value.usage + '</em>' + '</p>' +
                        '<p><strong> Status: </strong>' + '<em>' + item.value.status + '</em>' + '</p>' +
                        '<p><strong> Notes: </strong>' + '<em>' + item.value.notes + '</em>' + '</p>' +
                        '</li>'
                    ).appendTo('#ajaxJson');
            });        
                $("#ajaxJson").listview('refresh');
                $.mobile.changePage("#browse");
        },
            errors: function (data) {}
    });
});

//For the browseBtn on the additem page
$("#browseBtn4").on("click", function () {

    $.mobile.changePage("#browse");
    $.ajax({
        url: "_view/items",
        type: "Get",
        dataType: "json",
        success: function (data) {
            console.log(data);
            $('<h3>').html("").appendTo('#browse');
                $.each(data.rows, function (index, item) {

                    $('' +
                        '<li>' +
                        '<p><strong> Category: </strong> ' + '<em>' + item.value.catgry + '</em>' + '</p>' +
                        '<p><strong> Type: </strong>' + '<em>' + item.value.type + '</em>' + '</p>' +
                        '<p><strong> Name: </strong>' + '<em>' + item.value.name + '</em>' + '</p>' +
                        '<p><strong> Quantity: </strong>' + '<em>' + item.value.quantity + '</em>' + '</p>' +
                        '<p><strong> Condition: </strong>' + '<em>' + item.value.condition + '</em>' + '</p>' +
                        '<p><strong> Usage: </strong>' + '<em>' + item.value.usage + '</em>' + '</p>' +
                        '<p><strong> Status: </strong>' + '<em>' + item.value.status + '</em>' + '</p>' +
                        '<p><strong> Notes: </strong>' + '<em>' + item.value.notes + '</em>' + '</p>' +
                        '</li>'
                    ).appendTo('#ajaxJson');
            });        
                $("#ajaxJson").listview('refresh');
                $.mobile.changePage("#browse");
        },
            errors: function (data) {}
    });
});




