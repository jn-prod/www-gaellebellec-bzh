$(function(){
	var posts = [],
		events = [],
		results = [];

	function eventConstructor (date, city, event){
	  var event = 
	  '<div class="row event">'+
	    '<div class="col-sm-12">'+
		  '<div class="row">'+
            '<div class="col-sm-3 spacer-sm-top">'+
              '<span class="d-block"><i class="fa fa-calendar" aria-hidden="true"></i> ' + date + '</span>'+
              '<span class="d-block"><i class="fa fa-map-marker" aria-hidden="true"></i> ' + city + '</span>'+
            '</div>'+
            '<div class="col-sm-9">'+
              '<h3 class="text-danger spacer-sm-top">' + event + '</h3>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>'

      return event
	}

	function resultConstructor (date, city, event, place){
	  var result =
	  '<div class="row result">'+
	    '<div class="col-sm-12">'+
          '<div class="row">'+
            '<div class="col-sm-2 spacer-sm-top">'+
              '<span class="d-block rank"><i class="fa fa-trophy" aria-hidden="true"></i> #' + place + '</span>'+
            '</div>'+
            '<div class="col-sm-3 spacer-sm-top">'+
              '<span class="d-block"><i class="fa fa-calendar" aria-hidden="true"></i> ' + date + '</span>'+
              '<span class="d-block"><i class="fa fa-map-marker" aria-hidden="true"></i> ' + city + '</span>'+
            '</div>'+
            '<div class="col-sm-7">'+
              '<h3 class="text-danger spacer-sm-top"> ' + event + '</h3>'+
            '</div>'+
          '</div>'+    
        '</div>'+
      '</div>'

      return result
	}

	/*------
	POSTS
	------*/

	/*Posts init*/
	$.getJSON( "https://sheets.googleapis.com/v4/spreadsheets/1kKnjdWTbLGFc-bl7VEYyrrO-xEk6ws5YeU41llRYZw4/values/posts!2:1000?key=AIzaSyD1hD6OXLqkeWVizdMh2PYxF1ZyCa_jPo4", function( data ) {
		$.each(data.values, function(key, val){
			posts.push(
			  '<div class="row post">'+
	            '<div class="row">'+
	              '<div class="col-sm-12">'+
	              	'<h3 class="text-danger spacer-sm-top">' + this[0] + '</h3>'+
				  '</div>'+
				'</div>'+
				'<div class="row">'+
	              '<div class="col-sm-10">'+
	                '<p>' + this[1] + '</p>'+
	              '</div>'+
	              '<div class="col-sm-2">'+
	                '<span class="btn btn-danger read-more">Lire +</span>'+
	              '</div>'+
	            '</div>'+
				'<div class="row hidde">'+
	              '<div class="col-sm-12">'+
	              	'<p>' + this[2] + '</p>'+
	              '</div>'+
	            '</div>'+
	          '</div>'
			)
		})
		posts.reverse()
		$(posts[0]).appendTo("#posts")
	})

	/*Display all posts*/
	$("#more-posts").on('click', function(){
		$("#more-posts").remove()
		$.each(posts, function(key, val){
			if(key !== 0 ){
				$(val).appendTo("#posts")
			}
		})
	})

	/*Display this post detail*/
	$('#posts').on('click', '.read-more', function(){
		$($(this).parents().get(1)).addClass('hidde')
		$($(this).parents().get(2).lastChild).removeClass('hidde')
	})

	/*------
	CALENDAR
	------*/

	/*Calendar init*/
	$.getJSON( "https://sheets.googleapis.com/v4/spreadsheets/1kKnjdWTbLGFc-bl7VEYyrrO-xEk6ws5YeU41llRYZw4/values/calendarOutput!1:1000?key=AIzaSyD1hD6OXLqkeWVizdMh2PYxF1ZyCa_jPo4", function( data ) {
		/* Date Init*/
		var date = new Date(Date.now())

		/*import*/
		$.each(data.values, function(key, val){
			var event = {
				date : this[0],
				event : this[1],
				city : this[2]
			}
			var eventDateSplit = (event.date).split('/')
			var eventDate = new Date(eventDateSplit[2], eventDateSplit[1] - 1, eventDateSplit[0])
			/*Push only futur Date*/
			if( eventDate > date ){
				events.push(event)
			}	
		})

		/*N'importer que la première date à venir*/
		if(events.length >=1){
			$(
				eventConstructor(events[0].date, events[0].city, events[0].event)
			).appendTo("#events")			
		} else {
			$(
			  '<div class="row event">'+
	            '<div class="row">'+
	              '<div class="col-sm-12">'+
	              	'<h3 class="text-danger spacer-sm-top"> Aucune épreuve à venir</h3>'+
				  '</div>'+
				'</div>'+
	          '</div>'
			).appendTo("#events")
		}

		/*Supprimer le button si aucun ou 1 event */
		if(events.length <= 1){
			$('#more-events').remove()
		}
	})

	/*Display All Events*/
	$("#more-events").on('click', function(){
		$("#more-events").remove()

		$.each(events, function(key, val){
			/*Ne pas importer la première date*/
			if(key !== 0 ){
				$(
					eventConstructor(events[key].date, events[key].city, events[key].event)
				).appendTo("#events")
			}

		})			
	})

	/*------
	RESULTS
	------*/

	/*Results init*/
	$.getJSON( "https://sheets.googleapis.com/v4/spreadsheets/1kKnjdWTbLGFc-bl7VEYyrrO-xEk6ws5YeU41llRYZw4/values/resultsOutput!1:1000?key=AIzaSyD1hD6OXLqkeWVizdMh2PYxF1ZyCa_jPo4", function( data ) {
		$.each(data.values, function(key, val){
			var result = {
				date : this[0],
				event : this[1],
				city : this[2],
				place : this[3]
			}
			/*Envoie des résultats*/
			results.push(result)
		})
		$(
			resultConstructor(results[0].date, results[0].city, results[0].event, results[0].place)
		).appendTo("#results")
	})

	/*Display all results*/
	$("#more-results").on('click', function(){
		$("#more-results").remove()
		$.each(results, function(key, val){
			if(key !== 0 ){
				$(
					resultConstructor(results[key].date, results[key].city, results[key].event, results[key].place)
				).appendTo("#results")
			}
		})
	})
})