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
    const numChoices = serializedData.length;

    for (var i = 0; i < serializedData.length; i++) {
      serializedData[i].count += serializedData.length - i;
    }

    const info = JSON.stringify({data: serializedData});
    const parsed = JSON.parse(info);

    $.ajax({
       method: 'POST',
       url:'/submit',
       dataType: 'json',
       data: parsed,
       success: function(error) {
         console.log(error);
       }
     })

  });

});



