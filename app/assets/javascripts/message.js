$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
         `<div class="messages" data-message-id=${message.id}>
            <div class="message-list__header">
              <div class="message-list__header__user-name">
                ${message.user_name}
              </div>
              <div class="message-list__header__date">
                ${message.created_at}
              </div>
            </div>
            <div class="message-list__message">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
            <img src=${message.image} >
          </div>`
        return html;
      } else {
        var html =
         `<div class="messages" data-message-id=${message.id}>
            <div class="message-list__header">
              <div class="message-list__header__user-name">
                ${message.user_name}
              </div>
              <div class="message-list__header__date">
                ${message.created_at}
              </div>
            </div>
            <div class="message-list__message">
              <p class="lower-message__content">
                ${message.content}
              </p>
            </div>
          </div>`
        return html;
      };
    }
    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        type: 'POST',
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
    .done(function(data){
      var html = buildHTML(data);
      $('.message-list').append(html);
      $('form')[0].reset();
      $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight});
    })
    .fail(function() {
        alert("メッセージ送信に失敗しました");
    })
    .always(() => {
      $(".submit-btn").removeAttr("disabled");
    });
  });

  var reloadMessages = function() {
    var last_message_id = $('.messages:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.message-list').append(insertHTML);
        $('.message-list').animate({scrollTop: $('.message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});

