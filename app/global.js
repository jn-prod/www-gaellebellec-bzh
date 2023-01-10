var posts = [],
  events = [],
  results = [],
  postsApi,
  calendarApi,
  resultsApi;

function eventConstructor(date, city, event) {
  var event =
    '<div class="row event">' +
    '<div class="col-sm-12">' +
    '<div class="row">' +
    '<div class="col-sm-3 spacer-sm-top">' +
    '<span class="d-block"><i class="far fa-calendar" aria-hidden="true"></i> ' +
    date +
    "</span>" +
    '<span class="d-block"><i class="fa fa-map-marker-alt" aria-hidden="true"></i> ' +
    city +
    "</span>" +
    "</div>" +
    '<div class="col-sm-9">' +
    '<h3 class="text-danger spacer-sm-top">' +
    event +
    "</h3>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";

  return event;
}

function resultConstructor(date, city, event, place) {
  var result =
    '<div class="row result">' +
    '<div class="col-sm-12">' +
    '<div class="row">' +
    '<div class="col-sm-2 spacer-sm-top">' +
    '<span class="d-block rank"><i class="fa fa-trophy" aria-hidden="true"></i> #' +
    place +
    "</span>" +
    "</div>" +
    '<div class="col-sm-3 spacer-sm-top">' +
    '<span class="d-block"><i class="far fa-calendar" aria-hidden="true"></i> ' +
    date +
    "</span>" +
    '<span class="d-block"><i class="fa fa-map-marker-alt" aria-hidden="true"></i> ' +
    city +
    "</span>" +
    "</div>" +
    '<div class="col-sm-7">' +
    '<h3 class="text-danger spacer-sm-top"> ' +
    event +
    "</h3>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";

  return result;
}

if (enVersion === false) {
  postsApi = apis.posts.fr;
  calendarApi = apis.calendar.fr;
  resultsApi = apis.results.fr;
} else {
  postsApi = apis.posts.en;
  calendarApi = apis.calendar.en;
  resultsApi = apis.results.en;
}

/*------
SLIDER
------*/
function changeHeaderBg(curNumber) {
  setInterval(function () {
    var rootPath;
    var max = 5;
    if (enVersion === false) {
      rootPath = ".";
    } else {
      rootPath = "..";
    }

    curNumber++;

    if (curNumber > max) {
      curNumber = 1;
    }

    var prevNumber = curNumber - 1;
    var nextNumber = curNumber + 1;
    if (prevNumber === 0) {
      prevNumber = max;
    }

    if (nextNumber > max) {
      nextNumber = 1;
    }

    //    $('.bg1').css({'background-image': 'url(' + rootPath + '/assets/img/header_' + prevNumber + '.jpg)'})
    // $('.bg2').animate({opacity: 0}, 0).css({'background-image': 'url(' + rootPath + '/assets/img/header_' + curNumber + '.jpg)'}).animate({opacity: 1}, 2500);
    $("#header-bg-2")
      .removeClass("bg" + curNumber)
      .addClass("bg" + nextNumber)
      .animate({ opacity: 0 }, 0)
      .animate({ opacity: 1 }, 2500);
    $("#header-bg-1")
      .removeClass("bg" + prevNumber)
      .addClass("bg" + curNumber);

    // $('.bg' + curNumber).animate({opacity: 0}, 0).css({'background-image': 'url(' + rootPath + '/assets/img/header_' + curNumber + '.jpg)'}).animate({opacity: 1}, 2500);
  }, 4000);
}

changeHeaderBg(5);

/*------
POSTS
------*/

/*Posts init*/
$.getJSON(postsApi, function (data) {
  $.each(data.values, function (key, val) {
    posts.push(
      '<div class="row post">' +
        '<div class="col-sm-12">' +
        '<div class="row">' +
        '<div class="col-sm-12">' +
        '<h3 class="text-danger spacer-sm-top">' +
        this[0] +
        "</h3>" +
        "</div>" +
        "</div>" +
        '<div class="row">' +
        '<div class="col-sm-10">' +
        "<p>" +
        this[1] +
        "</p>" +
        "</div>" +
        '<div class="col-sm-2">' +
        '<span class="btn btn-danger read-more">Lire +</span>' +
        "</div>" +
        "</div>" +
        '<div class="row hidde">' +
        '<div class="col-sm-12">' +
        "<p>" +
        this[2] +
        "</p>" +
        '<p> <a rel="nofollow" target="_blank" href="' +
        this[3] +
        '"> Suivre le lien</a></p>' +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>"
    );
  });
  posts.reverse();
  $(posts[0]).appendTo("#posts");
});

/*Display all posts*/
$("#more-posts").on("click", function () {
  $("#more-posts").remove();
  $.each(posts, function (key, val) {
    if (key !== 0) {
      $(val).appendTo("#posts");
    }
  });
});

/*Display this post detail*/
$("#posts").on("click", ".read-more", function () {
  $($(this).parents().get(1)).addClass("hidde");
  $($(this).parents().get(2).lastChild).removeClass("hidde");
});

/*------
CALENDAR
------*/

/*Calendar init*/
$.getJSON(calendarApi, function (data) {
  /* Date Init*/
  var date = new Date(Date.now());

  /*import*/
  $.each(data.values, function (key, val) {
    var event = {
      date: this[0],
      event: this[1],
      city: this[2],
    };
    var eventDateSplit = event.date.split("/");
    var eventDate = new Date(
      eventDateSplit[2],
      eventDateSplit[1] - 1,
      eventDateSplit[0]
    );
    /*Push only futur Date*/
    if (eventDate > date) {
      events.push(event);
    }
  });

  /*N'importer que la première date à venir*/
  if (events.length >= 1) {
    $(
      eventConstructor(events[0].date, events[0].city, events[0].event)
    ).appendTo("#events");
  } else {
    $(
      '<div class="row event">' +
        '<div class="row">' +
        '<div class="col-sm-12">' +
        '<h3 class="text-danger spacer-sm-top"> Aucune épreuve à venir</h3>' +
        "</div>" +
        "</div>" +
        "</div>"
    ).appendTo("#events");
  }

  /*Supprimer le button si aucun ou 1 event */
  if (events.length <= 1) {
    $("#more-events").remove();
  }
});

/*Display All Events*/
$("#more-events").on("click", function () {
  $("#more-events").remove();

  $.each(events, function (key, val) {
    /*Ne pas importer la première date*/
    if (key !== 0) {
      $(
        eventConstructor(
          events[key].date,
          events[key].city,
          events[key].event
        )
      ).appendTo("#events");
    }
  });
});

/*------
RESULTS
------*/

/*Results init*/
$.getJSON(resultsApi, function (data) {
  $.each(data.values, function (key, val) {
    var result = {
      date: this[0],
      event: this[1],
      city: this[2],
      place: this[3],
    };
    /*Envoie des résultats*/
    results.push(result);
  });
  $(
    resultConstructor(
      results[0].date,
      results[0].city,
      results[0].event,
      results[0].place
    )
  ).appendTo("#results");
});

/*Display all results*/
$("#more-results").on("click", function () {
  $("#more-results").remove();
  $.each(results, function (key, val) {
    if (key !== 0) {
      $(
        resultConstructor(
          results[key].date,
          results[key].city,
          results[key].event,
          results[key].place
        )
      ).appendTo("#results");
    }
  });
});

/*------
NEWSLETTER
------*/

$(".newsletter").on("click", () => {
  var newsFrom =
    '<div id="newsletter-form" class="container-fluid d-flex text-center">' +
    '<div class="center">' +
    '<div class="row justify-content-center">' +
    '<div class="col-6">' +
    "<p>Abonnez-vous maintenant et restez informé chaque mois de mes prochaines compétitions, mes derniers classements et surtout mon défrief du mois!</p>" +
    '<form action="https://docs.google.com/forms/d/e/1FAIpQLSe2TveY73jexT4zlbmeJxS9P1T-Xt2nj90DJ-mfm4G3WQddng/formResponse" target="_blank" method="POST" id="mG61Hd" class="form-inline">' +
    '<div class="input-group">' +
    '<input placeholder="votre@email.ici" type="email" class="form-control" jsname="YPqjbf" autocomplete="email" tabindex="0" aria-label="Votre adresse e-mail" name="emailAddress" value="" required="" dir="auto" data-initial-dir="auto" data-initial-value="">' +
    "</div>" +
    '<div class="input-group">' +
    '<input placeholder="votre prénom" type="text" class="form-control" jsname="YPqjbf" autocomplete="off" tabindex="0" aria-label="Prénom" aria-describedby="i.desc.1993717463 i.err.1993717463" name="entry.1462355575" value="" dir="auto" data-initial-dir="auto" data-initial-value="">' +
    "</div>" +
    '<input type="submit" class="btn btn-danger">' +
    '<input type="hidden" name="fvv" value="1">' +
    '<input type="hidden" name="draftResponse" value="[null,null,&quot;6858085896552653950&quot;]">' +
    '<input type="hidden" name="pageHistory" value="0">' +
    '<input type="hidden" name="fbzx" value="6858085896552653950">' +
    "</form>" +
    "</div>" +
    "</div>" +
    '<div class="row justify-content-center">' +
    '<div class="col-1">' +
    '<span id="close-newsletter" class="btn btn-outline-secondary">X</span> ' +
    "</div>" +
    "</div> " +
    "</div>" +
    "</div>";

  $(newsFrom).appendTo("body");
});

$(document).on("click", "#close-newsletter", () => {
  $("#newsletter-form").remove();
});
