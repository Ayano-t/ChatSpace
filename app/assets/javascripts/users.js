$(function() {
  function addUser(user){
    var html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `;
    $("#user-search-result").append(html);
  }

  function addNoUser() {
    var html = `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">ユーザーが見つかりません</p>
    </div>
    `;
    $("#user-search-result").append(html);
    console.log(html)
  }

    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();
      $.ajax({
        type: "GET",
        url: "/users",
        dataType: 'json',
        data: { keyword: input },
      })
        .done(function(users){
          $("#user-search-result").empty();

          if (input.length !== 0) {
            users.forEach(function(user) {
              addUser(user);
            });
          } else if (input == 0) {
            return false;
          } else {
            addNoUser();
          }
       })
       .fail(function() {
        alert("ユーザー検索に失敗しました");
      });
  });
  $(document).on("click", ".chat-group-user__btn--add", function(){
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this)
      .parent()
      .remove();
    addDeleteUser(userName, userId);
    addMember(userId);
  });
  $(document).on("click", ".chat-group-user__btn--remove", function() {
    $(this)
      .parent()
      .remove();
  });
});