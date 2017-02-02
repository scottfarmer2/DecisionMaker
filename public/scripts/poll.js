$(() => {
  $.ajax({
    method: "GET",
    url: "/api/poll"
  }).done((poll) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});
