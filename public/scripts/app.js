// $(() => {
//   $.ajax({
//     method: "POST",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });



$(function  () {

  let listData = $("ol.choices").sortable({group: 'serialization'});

  $('#submit-button').on('click', function(event) {
    event.preventDefault();
    let serializedData = (listData).sortable('serialize').get()[0];
      console.log(serializedData);

      $.ajax({
        method: 'POST',
        url:'/poll_table',
        data: serializedData
      })


    });



});



