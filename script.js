$(document).ready(function(){
	var healthtext = '';
	var diettext = '';
	var key = '';
	var recipes = [];
	var returnedItems = $('#container');
	var template = Handlebars.compile($('#recipe-template').html());

	//Updates dropdown button text and color when selection is made
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

	//Returns health or diet string and adds necessary text
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

	//Adds recipe info to recipes array
	function addRecipeObj(item, index, array){
		recipes.push({
			'label': array[index].recipe.label,
			'image': array[index].recipe.image,
			'ingredients': array[index].recipe.ingredients,
			'servings': array[index].recipe.yield,
			'source': array[index].recipe.source,
		});
	};

	//When search button is clicked create a new url
	$('#search').click(function(){
		var url ='https://api.edamam.com/search?api_id=bc8cbf59&api_key=ecf7fb85c3b186ae3ea428fbc209fa4c';
		//Gets keyword
		key = '&q='.concat($('#searchword').val());
		//Health /Diet
		healthtext = getHealthString(healthtext, 'h');
		diettext = getHealthString(diettext, 'd');
		//URL generated each time a new click is made
		url = url + key + healthtext + diettext;
		console.log(url);
		$.ajax({
			url: url,
			method: 'GET',
		}).done(function(result){
			//Get the objects that contain the recipes which are under the hits node
			var data = result.hits;
			data.forEach(addRecipeObj); //Performs funciton on each object 
			returnedItems.html(template(recipes));
			$('.main-header').css('display','block');
		}).fail(function(err){
			alert('Error occured: ', err);
		})
	});
})