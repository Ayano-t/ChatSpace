$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
         `<div class="message-list">
            <div class="message-list__header">
              <div class="message-list__header__user-name">
                ${message.user_name}
              </div>
              <div class="message-list__header__date">
                ${message.created_at}
              </div>
            </div>
            <div class="message-list">
              <p class="message-list__message">
                ${message.content}
              </p>
            </div>
            <img src=${message.image} >
          </div>`
        return html;
      } else {
        var html =
         `<div class="message-list">
            <div class="message-list__header">
              <div class="message-list__header__user-name">
                ${message.user_name}
              </div>
              <div class="message-list__header__date">
                ${message.created_at}
              </div>
            </div>
            <div class="message-list">
              <p class="message-list__message">
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
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('form')[0].reset();
    })
    .always(() => {
      $(".submit-btn").removeAttr("disabled");
      });
    .fail(function() {
        alert("メッセージ送信に失敗しました");
      });
  });
});