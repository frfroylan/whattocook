$(document).ready(function(){
	var healthtext = '';
	var diettext = '';
	var key = '';
	var recipes = [];
	var returnedItems = $('#flex-items');
	var template = Handlebars.compile($('#recipe-template').html());
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

	function addRecipeObj(item, index, array){
		recipes.push({
			'label': array[index].recipe.label,
			'image': array[index].recipe.image,
			'ingredients': array[index].recipe.ingredients,
			'servings': array[index].recipe.yield,
			'source': array[index].recipe.source,
		});
	};

	function pushToDom(item, index, array){
		var singleRecipe = item;
		for(var x = 0; x < array.length; x++){
			returnedItems.html(template(singleRecipe));
		}
	}

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
			data.forEach(addRecipeObj);
			recipes.forEach(pushToDom);
		})
	});
})