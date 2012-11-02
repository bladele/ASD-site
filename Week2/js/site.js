//Bodunrin Ladele
//DVD Lib App xhr

$(function(){

	$.ajax({
		url: 'xhr/mlist.php',
		type: 'GET',
		dataType: 'json',
		success: function(response){
			console.log(response.languages[0].name);
				for(var i=0, j=response.languages.length; i<j; i++){
					var lang = response.languages[i];
				};
		}
	});
});