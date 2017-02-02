$(() => {
  $.ajax({
    method: "GET",
    url: "/api/choices"
  }).done((choices) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});
