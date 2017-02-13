$(document).ready(function(){
	var healthtext = '';
	var diettext = '';
	var key = '';
	var recipes = [];
	//Grabs dropdown menu items and updates dropdown button text
	$('.dropdown-item').click(function(){
		if($(this).parent().hasClass('js-health')){
			healthtext = $(this).text();
			$('#health-text').text(healthtext);
			healthtext = healthtext.toLowerCase();
			$('.health-button').css({'background-color': 'tomato', 'color': 'white'});
		}
		else{
			diettext = $(this).text();
			$('#diet-text').text(diettext);
			diettext = diettext.toLowerCase();
			$('.diet-button').css({'background-color': '#27ae60', 'color': 'white'});
		}
	});

	function getHealthString(str, x){
		if(str === '' || str === 'none')
			return '';
		else if(x === 'h')
			return '&health='.concat(str);
		else if(x === 'd')
			return '&diet='.concat(str);
		else
			return 'Wrong health/diet restrction';
	}

	function forEachFunc(item, index, array){
		recipes.push(array[index].recipe);
	};

	$('#search').click(function(){
		var url ='https://api.edamam.com/search?api_id=bc8cbf59&api_key=ecf7fb85c3b186ae3ea428fbc209fa4c';
		//Gets keyword
		key = '&q='.concat($('#searchword').val());
		//Health /Diet
		healthtext = getHealthString(healthtext, 'h');
		diettext = getHealthString(diettext, 'd');
		url = url + key + healthtext + diettext;
		$.ajax({
			url: url,
			method: 'GET',
		}).done(function(result){
			//Get the objects that contain the recipes which are under the hits node
			var data = result.hits;
			data.forEach(forEachFunc);
			var returnedItems = $('#flex-items');
			var template = Handlebars.compile($('#recipe-template').html());
			returnedItems.html(template(recipes);
		})
	});


	// var content = $('#content');
	// var data = {
	// 	title: "People List",
	// 	people: [
	// 		{
	// 			name: 'John'
	// 		},
	// 		{
	// 			name: 'Froy'
	// 		},
	// 		{
	// 			name: 'Nancy'
	// 		}
	// 	]
	// };

	// var template = Handlebars.compile($('#ptemplate').html());
	// content.html(template(data));

})