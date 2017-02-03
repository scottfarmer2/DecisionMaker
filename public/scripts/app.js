// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });



$(function  () {
  console.log('heellloooooooooooooo');
  $("ol.example").sortable({
  group: 'serialization'});
});



