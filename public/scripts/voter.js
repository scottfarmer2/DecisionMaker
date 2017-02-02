$(() => {
  $.ajax({
    method: "GET",
    url: "/api/voter"
  }).done((voter) => {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});
