var submit = document.getElementById('submit');

var setPwd = document.getElementById('form-pwd');
var inputAll = setPwd.getElementsByTagName('input');
var i, len = inputAll.length;

for (i = 0; i < len; i++) {
   
    if (inputAll[i].type == 'password') {
        inputAll[i].onblur = function () {
            var span = $(this).parent().find('span')[0];
            if (this.value) {
                var reg = /^.{6,16}$/;
                var regEn = /^[a-zA-Z]+$/;
                var regNum = /^[0-9]+$/;
                var regChinese = /[\u4e00-\u9fa5]/gm;
                // console.log(regChinese.test(this.value))
                if (!reg.test(this.value) || regEn.test(this.value) || regNum.test(this.value) || regChinese.test(this.value)) {
                    span.innerHTML = '请输入6-16位且不能全数字或英文';
                    span.className = '';
                } else {
                    if ($(this).attr('name') == 'register') {
                        var pwdPrev = $('form input[type=password]')[0].value;
                        // console.log(1);
                        if (pwdPrev != this.value) {
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
        }
    }

}

submit.onclick = function() {
    var n = 0;
    for(var i = 0; i < len; i++) {
        if(inputAll[i].value) {
            n++;
            var span = $(inputAll[i]).parent().find('span')[0];
            if(span.className != 'sr-only') {
                n--;
            }
        }
    }
    // console.log(n);
    var data={
        'newpsw':inputAll[0].value
    };
    if(n == len) {
        $.ajax({
            type: 'post',
            url: 'resetPsw',
            dataType: 'json',
            data: data,
            success: function(data) {
                if(data.status) {
                    alert('修改成功');
                } else {
                    alert(data.error);
                }
            },
            error: function (jqXHR) {
                alert("发生错误：" + jqXHR.status);
            }
        });
    } else {
        alert('你还未填写完或填写有误');
    }
}
