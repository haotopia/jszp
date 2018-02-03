// 判断事件
function verifyForm(element) {
    var obj = document.getElementById(element) || document.getElementsByClassName(element);
    function addClassOrNot(elementThis, j) {
        if (elementThis.value == "") {
            if (element == 'email') {
                elementThis.nextElementSibling.innerHTML = '*没有填写邮箱';
            }
            if(j + 1) {
                sessionStorage.setItem(element + (j + 1), '');
            } else {
                sessionStorage.setItem(element,  '');
            }
            elementThis.nextElementSibling.className = '';
            
        } else {
            elementThis.nextElementSibling.className = 'sr-only';
            // var datas = new Object;
            // datas.keyname = element;
            // datas.value = obj.value;
            // var str = JSON.stringify(datas);
            if(j + 1) {
                // console.log(element + (j + 1));
                sessionStorage.setItem(element + (j + 1), elementThis.value);
                save();
                // console.log(element + j);     
            } else {
                sessionStorage.setItem(element, obj.value);
                save();
            }       
            
            if (element == 'email'){
                // 验证email
                var valuesIndex = elementThis.value;
                var search = valuesIndex.search('@');
                var index = valuesIndex.indexOf('@');
                var prevIndex = valuesIndex.substr(0, index - 1).length;
                var nextIndex = valuesIndex.substr(index + 1).length;
                if (search == -1 || prevIndex == 0 || nextIndex == 0) {
                    elementThis.nextElementSibling.innerHTML = '请填写正确的邮箱地址';
                    elementThis.nextElementSibling.className = '';
                }
            }        
        }
    }
    if (obj.length) {
        for (var i = 0; i < obj.length; i++) {
            obj[i].index = i;   
            obj[i].onblur = function () {
                addClassOrNot(this, this.index);
            }
        }
    } else {
        obj.onblur = function () {
            addClassOrNot(this);
        }
    }
}

var valuesId = [
    'name',
    'nationality',
    'origo',
    'birthplace',
    'party',
    'profession-title',
    'profession',
    'occupation',
    'in-service-time',
    'cell-phone',
    'email',
    'programme-info',
    'full-time-degree',
    'ft-school',
    'in-service-degree',
    'ins-school',
    'resume',
    'personal-info', 
];

var valuesClass = [
    'project-name',
    'project-nature',
    'project-asset',
    'article-title',
    'publish-name',
    'rank',
    'prize-name',
    'class',
    'org',
    'price-rank',
    'patent-name',
    'patent-id',
    'patent-country',
    'patent-holder',
    'patent-inventor'
];
for(var i = 0; i < valuesId.length; i++) {
    verifyForm(valuesId[i]);
}
for (var i = 0; i < valuesClass.length; i++) {
    verifyForm(valuesClass[i]);
}

// 复制项目
function copyProject(obj1, obj2) {
    var con = obj2.cloneNode(true);
    var num = obj1.getElementsByClassName('row').length;
    if (num <= 5) {
        obj1.insertBefore(con, obj1.childNodes[num]);
        sessionStorage.setItem(obj1.id, num);
    }
    var val = obj1.getElementsByClassName('row')[num - 1].getElementsByTagName('input');
    var pClass = obj1.getElementsByClassName('row')[num - 1].getElementsByTagName('p');
    for (var i = 0; i < val.length; i++) {
        val[i].value = '';
    }
    // 复制时不把提示复制
    for (var i = 0; i < pClass.length; i++) {
        pClass[i].className = 'sr-only';
    }
}


function clickAddBlur(element, main) {
    var obj = document.getElementById(element);
    var mainPos = document.getElementById(main);
    var addPos = mainPos.getElementsByClassName('row')[0];
    obj.onclick = function() {
        copyProject(mainPos, addPos);
        for (var i = 0; i < valuesClass.length; i++) {
            verifyForm(valuesClass[i]);
        }
    }
}

// 保存数据
function save() {
  
    for (var i = 0; i < valuesId.length; i++) {
        saveData(valuesId[i]);
    }
    for (var i = 0; i < valuesClass.length; i++) {        
        saveDataCla(valuesClass[i]);   
    }

    function saveData(eleId) {
        var obj = document.getElementById(eleId);
        var str = sessionStorage.getItem(eleId);
        if (str) {
            // console.log(datata);
            obj.value = str;
        }

        // console.log(sessionStorage.getItem(obj))
    }
    function saveDataCla(eleCla) {
        var obj = document.getElementsByClassName(eleCla);
       /*  if (obj.length > 1) {
            for (var n = 1; n < obj.length; n++)
                switch (eleCla) {
                    case 'project-asset':
                        var row = $(obj[0]).parent().parent().parent();
                        var con = row[0].cloneNode(true);
                        var parRow = $(row).parent();
                        var parRowLen = $(row).parent().children().length;
                        // var lastChi = $(parRow)[0].getElementsByClassName('row')[parRowLen-1];
                        // $(parRow)[0].insertBefore(con, $(parRow)[0].childNodes[parRowLen-2]);
                        console.log(1);
                        break;

                    default:
                        break;
                }
        } */
        for(var m = 0; m < obj.length; m++) {      
            var str = sessionStorage.getItem(eleCla + (m + 1));
            if (str) {
                obj[m].value = str;
            }
        }          
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


// 提交事件
var submit = document.getElementById('submit');
submit.onclick = function() {
    // 判断所有信息是否已填写
    var pClassName = document.getElementById('pc-content').getElementsByTagName('p');
    // 判断有几个没填
    var n = 0;
    for(var i = 0; i < pClassName.length; i++) {
        if(pClassName[i].className == 'sr-only') {
            var values = pClassName[i];
            if (values.previousElementSibling.type == 'file') {
                if(values.nextElementSibling.src) {
                    n++;
                }
            }
            if (values.previousElementSibling.value) {
                n++;
            }
        }
    }

    
    // console.log(candidateCon);
   
    // console.log(formData);
    if(n == pClassName.length) {
        // 传给后台
        // 传后台
        // 基本信息
        
        var candidateCon = '';
        var candidateValue = [
            "name",
            "nationality",
            "origo",
            "brithplace",
            "party",
            "profession_title",
            "profession",
            "occupation",
            "full_time_degree",
            "cell_phone",
            "email",
            "programme_info",
            "ft_school",
            "ft_major",
            "ins_school",
            "ins_major",
            "resume",
            "personal_info",
        ];
        var candidateSelect = [
            "sex",
            "dob",
            "join_time",
            "work_start_time",
            "team"
        ];

        // 获取值
        function getIdCon(element) {
            var obj = document.getElementById(element);
            return obj.value;
        }

        // 获取select的值
        function getSelect(element) {
            var obj = document.getElementById(element);
            var content = '';
            // 找是否有form-group
            var yOn = obj.className.search('form-group');
            if (yOn == 0) {
                var sel = obj.getElementsByTagName('select');
                for (var i = 0; i < sel.length; i++) {
                    var index = sel[i].selectedIndex;
                    var value = sel[i].options[index].value;
                    content += value;
                }
            } else if (yOn == -1) {
                var index = obj.selectedIndex;
                var value = obj.options[index].value;
                content += value;
            }
            return content;
        }

        // 有新增项的samedate
        function mainCon(arr, element) {
            var con = '';
            var mainValue = arr;
            var mainRow = document.getElementById(element).getElementsByClassName('row');
            function projectPart(ele, arr) {
                var arrs = arr;
                var content = '';
                var con = '';
                var obj = ele.getElementsByTagName('input');
                var obj2 = ele.getElementsByTagName('select');
                for (var i = 0; i < obj.length; i++) {
                    content += "{" + arrs[i] + ":" + obj[i].value + "},";
                }
                for (var i = obj.length; i < arr.length; i++) {
                    for (j = 0; j < obj2.length; j++) {
                        var index = obj2[j].selectedIndex;
                        var value = obj2[j].options[index].value;
                        con += value;
                    }
                    content += "{" + arr[i] + ":" + con + "},";
                }
                return content;
            }
            for (var i = 0; i < mainRow.length - 1; i++) {
                con += projectPart(mainRow[i], mainValue);
            }
            return con;
        }
        // 主持的主要项目
        var projectCon = '';
        var projectValue = [
            "pr_name",
            "pr_nature",
            "pr_assset",
            "pr_time"
        ];
        // var projectRow = document.getElementById('main-project').getElementsByClassName('row');
        // function projectPart(ele, arr) {
        //     var arrs = arr;
        //     var content = '';
        //     var con = '';
        //     var obj = ele.getElementsByTagName('input');
        //     var obj2 = ele.getElementsByTagName('select');
        //     for(var i = 0; i < obj.length; i++) {
        //         content += "{" + arrs[i] + ":" + obj[i].value +"},";
        //     }
        //     for(var i = obj.length; i < arr.length; i++) {
        //         for(j = 0; j < obj2.length; j++) {
        //             var index = obj2[j].selectedIndex;
        //             var value = obj2[j].options[index].value;
        //             con += value;
        //         }          
        //         content += "{" + arr[i] + ":" + con + "},";
        //     } 
        //     return content;
        // }

        // 代表著作
        var articleCon = '';
        var articleValue = [
            "ar_title",
            "ar_nature",
            "ar_rank",
            "ar_is"
        ];
        // var articleRow = document.getElementById('main-article').getElementsByClassName('row');

        // 获奖情况
        var prizeCon = '';
        var prizeValue = [
            "aw_name",
            "aw_class",
            "aw_org",
            "aw_rank",
            "aw_date",
        ];

        // 发明专利
        var patentCon = '';
        var patentValue = [
            "pa_name",
            "pa_id",
            "pa_country",
            "pa_owner",
            "pa_inv"
        ];

        // 基本信息部分
        for (var i = 0; i < candidateValue.length; i++) {
            candidateCon += candidateValue[i] + ':' + getIdCon(valuesId[i]) + ',';
        }
        for (var i = 0; i < candidateSelect.length; i++) {
            candidateCon += candidateSelect[i] + ':' + getSelect(candidateSelect[i]) + ',';
        }
        candidateCon = '{' + candidateCon + '},';

        // 主持的主要项目部分
        // for(var i = 0; i < projectRow.length - 1; i++) {
        //     projectCon += projectPart(projectRow[i], projectValue);
        // }
        projectCon = mainCon(projectValue, "main-project");

        //  代表著作部分
        // for (var i = 0; i < articleRow.length - 1; i++) {
        //     articleCon += projectPart(articleRow[i], articleValue);
        // }
        articleCon = mainCon(articleValue, "main-article");

        // 获奖情况
        prizeCon = mainCon(prizeValue, "main-prize");

        // 发明
        patentCon = mainCon(patentValue, "main-patent");

        $.ajax({
            type : 'post',
            url : '',
            dataType: "json",
            data: {
                candidate: candidateCon,
                project: projectCon,
                article: articleCon,
                prize: prizeCOn,
                patent: patentCon
            },
            success : function() {

            },
            error: function (jqXHR) {
                alert("发生错误：" + jqXHR.status);
            }
        });
        // 照片另外传
        var formData = new FormData();
        formData.append('person-logo', imgData);
        $.ajax({
            url: '/',
            type: 'POST',
            cache: false,
            data: formData,
            processData: false,
            contentType: false
        }).done(function (res) {
        }).fail(function (res) { });

    } else{
        alert('你还有地方没有填写');
    }
}

if (sessionStorage.getItem) {
    window.onload = function() {
        var copyId = [
            "main-project",
            "main-article",
            "main-prize",
            "main-patent"
        ];
        for (var i = 0; i < copyId.length; i++) {
            addItems(copyId[i]);
        }
        // 保存新增项
        function addItems(obj) {
            var item = sessionStorage.getItem(obj);
            // var ele = document.getElementById(obj);
            // var child = ele.getElementsByClassName('row');
            // console.log(child.length);
            // console.log(item);
            if (item) {
                var ele = document.getElementById(obj);
                var child = ele.getElementsByClassName('row');
                if (item >= child.length) {
                    for (var i = 1; i < item; i++) {
                        var children = ele.getElementsByClassName('row');
                        var firstItem = children[0].cloneNode(true);
                        ele.insertBefore(firstItem, ele.childNodes[children.length - 1]);
                        var num = ele.getElementsByClassName('row').length;
                        // console.log(children.length);
                        var val = ele.getElementsByClassName('row')[num - 2].getElementsByTagName('input');
                        var pClass = ele.getElementsByClassName('row')[num - 2].getElementsByTagName('p');
                        // console.log(ele.getElementsByClassName('row')[num - 2]);
                        for (var j = 0; j < val.length; j++) {
                            val[j].value = '';
                        }
                        // 复制时不把提示复制
                        for (var j = 0; j < pClass.length; j++) {
                            pClass[j].className = 'sr-only';
                        }
                    }
                }

                // 有默认事件
                for(var i = 0; i < valuesClass.length; i++) {
                    verifyForm(valuesClass[i]);
                }
                
            }
        }
        save();     
    }
}
