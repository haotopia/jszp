// 复制项目
function copyProject(obj1, obj2) {
    var project = [
        "一",
        "二",
        "三",
        "四",
        "五",
    ];
    var con = obj2.cloneNode(true);
    var row = obj1.getElementsByClassName('row');
    var num = row.length;
    if (num <= 5) {
        obj1.insertBefore(con, obj1.childNodes[num]);
        // sessionStorage.setItem(obj1.id, num);
        var header = row[num - 1].getElementsByTagName('h4')[0];
        header.innerHTML = '项目' + project[num - 1];

    }

    var val = row[num - 1].getElementsByTagName('input');
    var pClass = row[num - 1].getElementsByTagName('p');
    for (var i = 0; i < val.length; i++) {
        val[i].value = '';
    }
    // 复制时不把提示复制
    for (var i = 0; i < pClass.length; i++) {
        pClass[i].className = 'sr-only';
    }
    // saveAdd(obj1.id, true);
}

function clickAddBlur(element, main) {
    var obj = document.getElementById(element);
    var mainPos = document.getElementById(main);
    var addPos = mainPos.getElementsByClassName('row')[0];
    obj.onclick = function () {
        copyProject(mainPos, addPos);
        // for (var i = 0; i < valuesClass.length; i++) {
        //     verifyForm(valuesClass[i]);
        // }
    }
}

// 增加项目、增加离开焦点事件
clickAddBlur('project-btn', 'main-project');

// 代表性著作、 论文情况
clickAddBlur('article-btn', 'main-article');

// 重要获奖情况
clickAddBlur('prize-btn', 'main-prize');
var prizeDate = document.getElementsByClassName('date')[0];
selectOption(1960, 2020, prizeDate);

// 专利
clickAddBlur('patent-btn', 'main-patent');


// 基本信息保存 id:pc-main-infor

// 基本信息
save('pc-main-infor');

// 学位学历
save('pc-main-teach');

// 个人学习状况
save('pc-main-study');

// 个人介绍
save('pc-main-intro');

function save(ele) {
    console.log(ele);
    if (!sessionStorage.getItem(ele)) {
        sessionStorage.setItem(ele, '{}');
    }

    //  var datas = {};
    function getFormVal(formEle) {

        // var data = JSON.parse(sessionStorage.getItem(ele)); 

        if ((formEle.getElementsByTagName('input')).length) {
            var obj = formEle.getElementsByTagName('input');
            //  sessionStorage[ele] = {};
            //  sessionStorage[ele]['names'] = 'name';
            //  console.log(sessionStorage[ele]['names'])
            //  var str = JSON.stringify(sessionStorage[ele]);
            //  sessionStorage[ele].setItem(obj[0].name, obj[0].value);
            // sessionStorage.getItem(ele) = new Object();

            // var data = new Object();
            /* var name = obj[0].name;
            var value = obj[0].value; */
            var data = JSON.parse(sessionStorage.getItem(ele));
            var name = obj[0].name;
            if (data[name]) {
                obj[0].value = data[name];
            }
            //  if(sessionStorage.getItem(ele)) {

            //      var name = obj[0].name;
            //      obj[0].value = data[name];
            //  }


            /*  data[name] = value;
             var str = JSON.stringify(data);
             sessionStorage.setItem(ele, str); */

            // 失去焦点时
            obj[0].onblur = function () {
                verifyForm(this, ele);
            }
            //  console.log(JSON.parse(sessionStorage.getItem(ele)));
            //  datas[name] = value;

            //  datas.value = obj[0].value;
            //  var str = JSON.stringify(datas);
            //  for(var n = 0; n < sessionStorage.length; n++) {

            // if(sessionStorage[ele] == ele) {
            //  sessionStorage[ele]['name'] = obj[0].value;
            //  console.log(sessionStorage[ele])
            // }
            //  }
        } else if (formEle.getElementsByTagName('select').length) {
            var obj = formEle.getElementsByTagName('select');
            var value = '';
            if (obj.length > 1) {
                var name = formEle.id;
                for (n = 0; n < obj.length; n++) {
                    value += obj[n].value;
                }
            } else {
                var name = obj[0].name;
                value = obj[0].value
            }
            //  sessionStorage.setItem(ele, str);
            var data = JSON.parse(sessionStorage.getItem(ele));
            data[name] = value;
            var str = JSON.stringify(data);
            sessionStorage.setItem(ele, str);
        } else if (formEle.getElementsByTagName('textarea').length) {
            var obj = formEle.getElementsByTagName('textarea');
            for (var n = 0; n < obj.length; n++) {
                var name = obj[n].name;
                // var value = obj[n].value;
                var data = JSON.parse(sessionStorage.getItem(ele));
                //  data[name] = value;
                if (data[name]) {
                    obj[n].value = data[name];
                }
                // var str = JSON.stringify(data);
                // sessionStorage.setItem(ele, str);
                obj[n].onblur = function () {
                    verifyForm(this, ele);
                }
            }

        }
        //  console.log(1)
        //  var obj = formEle.getElementsByTagName('input') || formEle.getElementsByTagName('select');
        //  console.log((formEle.getElementsByTagName('input')).length);
        //  for(var m = 0; m < obj.length; m++) {
        //      console.log(obj[m].value);
        //     //  console.log(1);
        //  }
    }
    function getValue(rowEle) {
        var form_group = rowEle.getElementsByClassName('form-group');
        for (var j = 0; j < form_group.length; j++) {
            getFormVal(form_group[j]);
        }
    }
    var obj = document.getElementById(ele);
    var row = obj.getElementsByClassName('row');
    for (var i = 0; i < row.length; i++) {
        getValue(row[i]);
    }
    //  var str = JSON.stringify(datas);
    //  sessionStorage.setItem(ele, str);
}

// 失去焦点

function verifyForm(_this, main) {
    if (!_this.value) {
        $(_this).next()[0].className = '';
    } else {
        $(_this).next()[0].className = 'sr-only';
    }
    var name = _this.name;
    var value = _this.value;

    var datas = JSON.parse(sessionStorage.getItem(main));
    datas[name] = value;
    var str = JSON.stringify(datas);
    sessionStorage.setItem(main, str);
}

// sessionStorage['pc-main-infor'].name;
// console.log(JSON.parse(sessionStorage.getItem('pc-main-infor'))['name']);
// console.log(sessionStorage['pc-main-infor']);

// 从主持的项目开始为新增项

saveAdd('main-project');

// 著作
saveAdd('main-article');

// 获奖情况
saveAdd('main-prize');

// 重要发明
saveAdd('main-patent');
function saveAdd(ele, bool) {


    function getFormVal(formEle, num) {
        // var str = JSON.stringify(data);
        // sessionStorage.setItem(ele, str);
        if ((formEle.getElementsByTagName('input')).length) {
            var obj = formEle.getElementsByTagName('input');
            for (var n = 0; n < obj.length; n++) {
                var name = obj[n].name;
                // var value = obj[n].value;
                var dataIn = JSON.parse(sessionStorage.getItem(ele))[ele];
                // if (dataIn[num][name]) {
                //     obj[n].value = dataIn[num][name];
                // }
                var arr = new Array();
                arr.push({name});
                for(var m in dataIn) {
                    dataIn = arr;
                }
                console.log(typeof dataIn);
                dataIn[num].push({name});
                var strIn = JSON.stringify(dataIn);
                sessionStorage(ele, strIn);
                // console.log(dataIn[0] = {})
                console.log(dataIn)
                for(var m = 0; m < dataIn.length; m++) {
                    // if(dataIn[i][])
                }
                // dataIn[num][name] = value;

                // var datas = {};
                // console.log
                // dataIn[name] = value;

                // var strIn = JSON.stringify(dataIn);
                // console.log(strIn);

                // console.log(dataIn);
                // dataIn[name] = value;

                // // dataIn[num][name] = value;
                // // dataLog = dataIn;
                // // var strIn = JSON.stringify(dataIn);
                // data[num][name] = value;
                // var strIn = JSON.stringify(data);
                // console.log(strIn);

                // sessionStorage.setItem(ele, strIn);
                obj[n].onblur = function () {
                    addVerifyForm(this, ele, num);
                }
                // console.log(data);
            }


            // data[name] = value;
            // var str = JSON.stringify(data);
            // sessionStorage.setItem(ele, str);
        } else if (formEle.getElementsByTagName('select').length) {
            /* var obj = formEle.getElementsByTagName('select');
            var value = '';
            if (obj.length > 1) {
                var name = formEle.id;
                for (n = 0; n < obj.length; n++) {
                    value += obj[n].value;
                }
            } else {
                var name = obj[0].name;
                value = obj[0].value;
            }

            // data[name] = value;
            var dataIn = JSON.parse(sessionStorage.getItem(ele));
            dataIn[num][name] = value;
            var strIn = JSON.stringify(dataIn);
            sessionStorage.setItem(ele, strIn); */
            // var str = JSON.stringify(data);
            // sessionStorage.setItem(ele, str);
        }
    }
    function getValue(rowEle, num) {
        // console.log(num);
        var form_group = rowEle.getElementsByClassName('form-group');
        for (var j = 0; j < form_group.length; j++) {
            getFormVal(form_group[j], num, j);
        }
    }
    var obj = document.getElementById(ele);
    var row = obj.getElementsByClassName('row');
    if (!sessionStorage.getItem(ele)) {
        sessionStorage.setItem(ele, '{}');
        var data = JSON.parse(sessionStorage.getItem(ele));
        data[ele] = [];
        var str = JSON.stringify(data);
        sessionStorage.setItem(ele, str);
    }
    if (!bool) {

        // var getItem = sessionStorage.getItem(ele);
        var data = JSON.parse(sessionStorage.getItem(ele));
        var n = 0;
        for (var n in data) {
            n++;
        }
        // console.log(n);
        if (n > 1 && n <= 5) {
            var project = [
                "一",
                "二",
                "三",
                "四",
                "五"
            ];
            var mainPors = document.getElementById(ele);
            for (var i = 1; i < n; i++) {
                var addPos = mainPors.getElementsByClassName('row')[0];
                var con = addPos.cloneNode(true);
                //    console.log(mainPors.childNodes[i]);
                mainPors.insertBefore(con, mainPors.childNodes[i]);
                //    console.log(i);
                //    console.log($(mainPors.childNodes[i+1]).find('h4')[0]);

                //    console.log(mainPors, addPos);
                //    copyProject(mainPors, addPos);
            }
            for (var i = 0; i < n; i++) {
                $(mainPors).find('h4')[i].innerHTML = '项目' + project[i];
                //    console.log($(mainPors).find('h4')[0]);
            }

            //    var mainPors = document.getElementById(ele);
            //    var addPos = mainPors.getElementsByClassName('row')[0];
            //    copyProject(mainPors, addPos);
        }
    }
    for (var i = 0; i < row.length - 1; i++) {
        // console.log(!JSON.parse(sessionStorage.getItem(ele))[i])
        /* if (!JSON.parse(sessionStorage.getItem(ele))[i]) {
            var data = JSON.parse(sessionStorage.getItem(ele));
            data[i] = {};
            var str = JSON.stringify(data);
            sessionStorage.setItem(ele, str);
        } */
        getValue(row[i], i);
    }
}

function addVerifyForm(_this, main, num) {
    if (!_this.value) {
        $(_this).next()[0].className = '';
    } else {
        
        $(_this).next()[0].className = 'sr-only';
     
    }
    var name = _this.name;
    var value = _this.value;
    var datas = JSON.parse(sessionStorage.getItem(main));
    datas[main][num] = {name: value};
    var str = JSON.stringify(datas);
    sessionStorage.setItem(main, str);
}
