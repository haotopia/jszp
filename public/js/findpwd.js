onBures('form-pwd');
// 失去焦点时判断
function onBures(ele) {
    var obj = document.getElementById(ele);
    var inputType = $(obj).find('input');
    for (var i = 0; i < inputType.length; i++) {
        inputType[i].onblur = function () {
            // console.log(1);
            if ($(this).attr('type') == 'email') {
                if (this.value) {
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

                    // $(this).focus();
                }
            } else if ($(this).attr('type') == 'text') {
                if (this.value) {
                    $(this).next().next()[0].innerHTML = '';
                    $(this).next().next()[0].className = 'sr-only';
                } else {
                    $(this).next().next()[0].innerHTML = '*未填写';
                    $(this).next().next()[0].className = '';
                }
            }
        }
    }
}

$('#submit')[0].onclick = function () {
    var inputAll = $('#form-pwd input');
    var n = 0;
    for (var i = 0; i < inputAll.length; i++) {
        if (inputAll[i].value == '') {
            $(inputAll[i]).next().next()[0].innerHTML = '*未填写';
            $(inputAll[i]).next().next()[0].className = '';
            n++;
        } else {
            if ($(inputAll[i]).next().next()[0].className != 'sr-only') {
                n++;
            };
        }
    }
    if (n == 0) {
        var data = loginForm($('#form-pwd'));
        ajaxSend(data, 'reset/mail');
    }
};
