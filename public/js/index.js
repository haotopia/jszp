onBures('form-login');
// 失去焦点时判断
function onBures(ele) {
    var obj = document.getElementById(ele);
    var inputType = $(obj).find('input');
    for(var i = 0; i < inputType.length; i++) {
        inputType[i].onblur = function() {
            // console.log(1);
            if ($(this).attr('type') == 'email') {
                if(this.value) {
                    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                    if (!myreg.test(this.value)) {
                        $(this).next().next()[0].innerHTML = '请填写正确的邮箱格式';
                        $(this).next().next()[0].className = '';
                         // $(this).focus();
                    } else {
                        $(this).next().next()[0].innerHTML = '';
                        $(this).next().next()[0].className = 'sr-only';
                    }
                } else {
                    var _this = this;
                    // var n = 0;
                    // $('#for-pwd')[0].onclick = function () {
                    //     console.log(1)
                    // }
                    // $('#sign-enter')[0].onclick = function () {
                    //     n++;
                    // }
                   
                    $(this).next().next()[0].innerHTML = '*未填写';
                    $(this).next().next()[0].className = '';
                    // } 
                    
                    $('#for-pwd')[0].onclick = function () {
                        $(_this).next().next()[0].innerHTML = '';
                        $(_this).next().next()[0].className = 'sr-only';
                    }
                    $('#sign-enter')[0].onclick = function () {
                        $(_this).next().next()[0].innerHTML = '';
                        $(_this).next().next()[0].className = 'sr-only';
                    }
                    
                    // $(this).focus();
                }           
            } else if ($(this).attr('type') == 'password') {
                if(this.value) {
                    $(this).next().next()[0].innerHTML = '';
                    $(this).next().next()[0].className = 'sr-only';
                } else {
                    $(this).next().next()[0].innerHTML = '*未填写';
                    $(this).next().next()[0].className = '';
                }
            }
            if (this.type == 'checkbox') {
                localStorage.setItem(this.name, 'checked');
            } else {
                localStorage.setItem(this.name, this.value);
            }    
        }   
    }
}


// 登录
$('#login')[0].onclick = function() {
    var inputAll = $('#form-login input');
    var n = 0;
    for(var i = 0; i < inputAll.length; i++) {
        if(inputAll[i].value == '') {
            $(inputAll[i]).next().next()[0].innerHTML = '*未填写';
            $(inputAll[i]).next().next()[0].className = '';
            n++;
        } else {
            if($(inputAll[i]).next().next()[0].className != 'sr-only') {
                n++;
            };
        }
    }
    if(n == 0 ) {
        var data = loginForm($('form.login'));
        ajaxSend(data, 'loginCheck');
    }
    /* var emailVa = $('form.login input[type=email]')[0].value;
    var padVa = $('form.login input[type=password]')[0].value;
    if (emailVa || padVa) {
        if(emailVa == '') {
            alert('请输入账号');
        } else if(padVa == ''){
            alert("请输入密码");
        } else {
            var search = emailVa.search('@');
            var index = emailVa.indexOf('@');
            var prevIndex = emailVa.substr(0, index - 1).length;
            var nextIndex = emailVa.substr(index + 1).length;
            if (search == -1 || prevIndex == 0 || nextIndex == 0) {
                alert('请填写正确的邮箱地址');
            } else {
                var data = loginForm($('form.login'));
                ajaxSend(data, 'login()');
            }
        }

    } else {
        $()
    } */
   
}

var checkBox = $('#form-login').find('input[type=checkbox]');
// console.log(checkBox);
checkBox[0].onchange = function() {
    if(this.checked) {
        var input = $('#form-login').find('input');
        for(var i = 0; i < input.length; i++) {
            // console.log(input[i].name)
            if (typeof (Storage) !== "undefined") {
                if(input[i].type == 'checkbox') {
                    localStorage.setItem(input[i].name, 'checked');
                } else {
                    localStorage.setItem(input[i].name, input[i].value);
                }    
            }
            
        }
    } else {
        var input = $('#form-login').find('input');
        for (var i = 0; i < input.length; i++) {
            if (typeof (Storage) !== "undefined") {
                localStorage.removeItem(input[i].name);
            }   
        }
    };
}

window.onload = function() {
    if (typeof (Storage) !== "undefined") {
      var input = $('#form-login').find('input');
    //   for(var i = 0; i < input.length; i++) {
    //       console.log(input[i])
    //   }
      for(var i = 0; i < input.length; i++) {
          if(input[i].type == 'checkbox') {
              if (localStorage.getItem(input[i].name) == 'checked') {
                //   console.log(input[i].checked)
                  input[i].checked = true;
              }
          } else {
              input[i].value = localStorage.getItem(input[i].name);
          }
          
      }
    }
}