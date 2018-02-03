
onBures('form-sign');

function onBures(ele) {
    var obj = document.getElementById(ele);
    var inputType = $(obj).find('input');
    for (var i = 0; i < inputType.length; i++) {
        inputType[i].onblur = function () {
            var span = $(this).next().next()[0];
            if ($(this).attr('type') == 'email') {              
                if (this.value) {
                    var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                    if (!myreg.test(this.value)) {
                        span = '请填写正确的邮箱格式';
                        span.className = '';
                        // $(this).focus();
                    } else {
                        span.innerHTML = '';
                        span.className = 'sr-only';
                    }
                } else {
                        span.innerHTML = '*未填写';
                        span.className = '';
                }
            } else if ($(this).attr('type') == 'password') {
                if (this.value) {
                    var reg = /^.{6,16}$/;
                    var regEn = /^[a-zA-Z]+$/; 
                    var regNum = /^[0-9]+$/;
                    var regChinese = /[\u4e00-\u9fa5]/gm;
                    // var re = new RegExp(regu); 
                    if (!reg.test(this.value) || regEn.test(this.value) || regNum.test(this.value) || regChinese.test(this.value)) {
                        span.innerHTML = '请输入6-16位且不能全数字或英文';
                        span.className = '';
                    } else {
                        // console.log($(this).attr('name'));
                        if ($(this).attr('name') == 'register') {
                            var pwdPrev = $('form input[type=password]')[0].value;
                            // console.log(1);
                            if(pwdPrev != this.value) {
                                span.innerHTML = '两次密码不一致';
                                span.className = '';
                            } else {
                                span.innerHTML = '';
                                span.className = 'sr-only';
                            }
                        } else {
                            span.innerHTML = '';
                            span.className = 'sr-only';
                        }
                        
                    }
                   
                } else {
                    span.innerHTML = '*未填写';
                    span.className = '';
                }
            } else if ($(this).attr('type') == 'text') {
                if(this.value) {
                    span.innerHTML = '';
                    span.className = 'sr-only';
                } else {
                    span.innerHTML = '*未填写';
                    span.className = '';
                }
            }
        }
    }
}

$('#sign')[0].onclick = function() {
    var inputAll = $('#form-sign input');
    var n = 0;
    for (var i = 0; i < inputAll.length; i++) {
        var inputSpan = $(inputAll[i]).next().next()[0];
        if (inputAll[i].value == '') {
            inputSpan.innerHTML = '*未填写';
            inputSpan.className = '';
            n++;
        } else {
            if (inputSpan.className != 'sr-only') {
                n++;
            };
        }
    }
    if(n == 0) {
        var data = loginForm($('#form-sign'));
        ajaxSend(data, 'signCheck');
    } else {
        alert("您还没有填完或者填写不正确！");
    }
};
