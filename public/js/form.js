// 基本信息
// 出生时间
// 保存图片的数据;
// if (typeof (Storage) !== "undefined") {

// } else {
//     alert("xzzx");
// }
var imgData;

var year = document.getElementById('year');
var month = document.getElementById('month');
var day = document.getElementById('day');

// 参加党派时间
var joinYear = document.getElementById('join-year');
var joinMonth = document.getElementById('join-month');
var joinDay = document.getElementById('join-day');

// 参加工作时间
var workYear = document.getElementById('work-start-time-year');
var workMonth = document.getElementById('work-start-time-month');
var workDay = document.getElementById('work-start-time-day');

// 团队名称team
var teamSelect = document.getElementById('team');

// 团队名称
var team = [
    "电磁场及电磁兼容团队",
    "电力系统保护与稳定控制团队",
    "电力系统输配电技术及电力市场研究团队",
    "电力系统稳定与新能源电力系统研究团队",
    "电力系统运行与智能监控团队",
    "电力系统自动化团队",
    "电机与电力电子技术团队",
    "电气工程新技术团队",    
    "高电压与绝缘技术研究团队",
    "供用电技术研究团队",
    "光伏发电与储能技术研究团队",
    "输变电设备状态检测与信号传感技术研究团队",
    "新能源电力系统动态模拟与控制保护团队",
    "新能源电力系统团队",  
];

function selectOption(start, end, obj) {
    var select = '';
    for(i = start; i <= end; i++) {
        if(i < 10) {
            select += '<option>' + '0' + i + '</option>';
        } else {
            select += '<option>' + i + '</option>';
        }
       
    }
    obj.innerHTML = select;
}

// 判断是否为闰年
function onchangeTime(obj, month, year, day) {
    // 判断是否为闰年
    var twoMonthDate = 29;
    function secMonth() {
        var index = month.selectedIndex;
        var num = parseInt(month.options[index].text);
        var yearIndex = year.selectedIndex;
        var yearNum = parseInt(year.options[yearIndex].text);
        twoMonthDate = (yearNum % 4 == 0 && yearNum % 100 != 0) || yearNum % 400 == 0 ? 29 : 28;
        switch (num) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                selectOption(1, 31, day);
                break;
            case 2:
                selectOption(1, twoMonthDate, day);
                break;
            default:
                selectOption(1, 30, day);
                break;
        }
    }
    obj.onchange = function() {
        secMonth();
    }
}

// 选择数组中的内容
function chooseCon(obj, content) {
    var con = content;
    var conOption = '';
    for(var i = 0; i < con.length; i++) {
        conOption += '<option>' + con[i] + '</option>';
    }
    obj.innerHTML = conOption;
}

// 出生时间
selectOption(1960, 2020, year);
selectOption(1, 12, month);
selectOption(1, 31, day);

// 参加党派时间
selectOption(1960, 2020, joinYear);
selectOption(1, 12, joinMonth);
selectOption(1, 31, joinDay);

// 参加工作时间
selectOption(1960, 2020, workYear);
selectOption(1, 12, workMonth);
selectOption(1, 31, workDay);

// 判断出生年、月
onchangeTime(year, month, year, day);
onchangeTime(month, month, year, day);

// 参加党派时间年、月
onchangeTime(joinYear, joinMonth, joinYear, joinDay);
onchangeTime(joinMonth, joinMonth, joinYear, joinDay);

// 参加工作时间年、月
onchangeTime(workYear, workMonth, workYear, workDay);
onchangeTime(workMonth, workMonth, workYear, workDay);

// 团队名称
chooseCon(teamSelect, team);

// 图片上传
var personLogo = document.getElementById('person-logo');
var personImg = document.getElementById('person-img');
personLogo.onchange = function() {
    var imgFile = personLogo.files[0];
    // var _this = this;
    // console.log(this.value)
    if(imgFile) {
        // 限制图片2M左右
        if(parseInt(imgFile.size / 1024) < 2000) {
            var fr = new FileReader();
            fr.readAsDataURL(imgFile);
            if (this.value) {
                var judge = this.value;
                var n = judge.lastIndexOf('.');
                var sty = judge.substr(n + 1);
                if (sty == "jpeg" || sty == "png" || sty == "jpg" || sty == "bmp") {
                    function next(elem) {
                        do {
                            elem = elem.nextSibling;
                        } while (elem && elem.nodeType !== 1);
                        return elem;
                    }
                    fr.onload = function () {
                        // var img = new Image();
                        // img.src = fr.result;
                        personImg.src = fr.result;
                        imgData = imgFile;
                        // sessionStorage.setItem(_this.name, fr.result);
                        // console.log(imgFile);
                    }
                    // personImg.src = fr.result;
                    /* fr.onload = function () {
                        var img = new Image();
                        img.src = fr.result;
                      
                        personImg.src = fr.result;
                        var canvas, ctx, img64;
        
                        img.onload = function() {
                            var max_width = 413;
                            var img_w, img_h;
                            if(img.width > max_width) {
                                img_w = max_width;
                                img_h = img.height * max_width / img.width;
                            } else {
                                img_w = img.width;
                                img_h = img.height;
                            }
                            canvas = document.createElement('canvas');
                            canvas.width = img_w;
                            canvas.height = img_h;
                            ctx = canvas.getContext("2d");
                            ctx.drawImage(img, 0, 0, img_w, img_h);
                            img64 = canvas.toDataURL(imgFile.type, 0.3);
                            imgDate = img64;
                            // console.log(img64);
                        }
                        
                    }; */
                    personImg.style.display = 'block';
                    var nextElem = next(this);
                    if (nextElem) {
                        nextElem.className = 'sr-only';
                    }
                } else {
                    alert("请上传图片");
                }
            }  
        } else {
            alert("上传的图片应不超过2M");
        }
        
    }
    
    
}


// 学位学历

// 主持的主要项目
var projectStaY = document.getElementsByClassName('project-time-starty')[0];
var projectStaM = document.getElementsByClassName('project-time-startm')[0];
var projectEndY = document.getElementsByClassName('project-time-endy')[0];
var projectEndM = document.getElementsByClassName('project-time-endm')[0];

// 项目起止时间

selectOption(1960, 2020, projectStaY);
selectOption(1960, 2020, projectEndY);
selectOption(1, 12, projectStaM);
selectOption(1, 12, projectEndM);
