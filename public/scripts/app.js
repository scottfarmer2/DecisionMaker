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



// $(function  () {


//  let listData = $("ol.choices").sortable({group: 'serialization'});

//  $('#submit-button').on('click', function(event) {

//    let data = {};

//    // let pollId = knex.

//    listData.children().each(function(index) {
//      let listValues = {};
//      listValues[$(this).data('id')] = $(this).text();
//      data[$(this).data('id')] = listValues;
//    });

//    event.preventDefault();
//    // let serializedData = (listData).sortable('serialize').get()[0];
//      // console.log(serializedData);
//      // console.log($(document));
//      $.ajax({
//        method: 'POST',
//        url:'/poll_table',
//        dataType: 'json',
//        data: data,
//        success: function(error) {
//          console.log(error);
//        }
//      })


//    });

