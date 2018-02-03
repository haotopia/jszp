$.ajax({
    type: 'post',
    url: 'user()',
    dataType: "json",
    data: true,
    success: function (data) {
        if (data.status) {
            $('#use-content img')[0].src = data.src;
            $('#user-name')[0].innerHTML = data.user;
            $('#user-success')[0].innerHTML = data.content;
            $('#download').find('a')[0].href = data.downloadsrc;
            $('#alter').find('a')[0].href = data.altersrc;
        } else {
            alert(data.error);
        }
    },
    error: function (jqXHR) {
        alert("发生错误：" + jqXHR.status);
    }
});