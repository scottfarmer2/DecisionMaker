$(() => {
  $.ajax({
    method: "GET",
    url: "/api/voterChoices"
  }).done((voterChoices) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});
