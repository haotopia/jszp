// var loginIn = document.getElementById('login-in');
// var sign = document.getElementById('sign-enter');
// var signIn = document.getElementById('sign-in');
// var login = document.getElementById('login-back');
// var findPwd = document.getElementById('find-pwd');
// var forPwd = document.getElementById('for-pwd');

// // 改变注册或者登陆或忘记密码的状态
// function changeState(new1, old1, old2) {
//     new1.style.display = 'block';
//     old1.style.display = 'none';
//     old2.style.display = 'none';
// }

// sign.onclick = function() {
    
//     console.log($('form input[type=email]').next().next()[0].innerHTML)
//     changeState(signIn, loginIn, findPwd);
   
//     $('form input[type=email]')[1].focus();
//     $('form input[type=email]').next().next()[0].innerHTML = '';
// }
// login.onclick = function() {
//     changeState(loginIn, signIn, findPwd);
// }
// forPwd.onclick = function() {
//     changeState(findPwd, signIn, loginIn);
// }

// 取出表单里的每一项存在name
function loginForm($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function (n, i) {
        indexed_array[n['name']] = n['value'];
    });
    console.log(indexed_array);
    return indexed_array;
}

// ajax
function ajaxSend(datas, actions) {
    $.ajax({
        type: 'post',
        url: actions,
        dataType: "json",
        data: datas,
        success: function (data) {
            if (data.status) {
                alert('登录成功');
                window.location.href='/public/index.php/candidate/index/form';
            } else {
                alert(data.error);
            }
        },
        error: function (jqXHR) {
            alert("发生错误：" + jqXHR.status);
        }
    });
}



// $('#sign')[0].onclick = function () {
//     var a = loginForm($('form.sign'));
//     console.log(a);
// }