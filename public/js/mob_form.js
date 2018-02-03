var caBtn = document.getElementById('ca-btn-next');
caBtn.onclick = function() {
    var mainHea = document.getElementById('pc-maincon').getElementsByTagName('h3');
    var mainPo = document.getElementById("main-project");
    var proBtn = document.getElementsByClassName('pro-next-button')[0];
    mainHea[5].style.display = 'block';
    mainPo.style.display = 'block';
    proBtn.style.display = 'flex';
}


mainBtn('ca-btn-next');
mainBtn('pro-btn-next');
mainBtn('art-btn-next');
mainBtn('pri-btn-next');
function mainBtn(btn) {
    var button = document.getElementById(btn);
    button.onclick = function() {
        function isOrWrite(obj) {
            var n = 0;
            for(var j = 0; j < obj.length; j++) {
                if($(obj[j]).prev()[0].value) {
                    obj[j].className = 'sr-only';
                    n++;
                } else {
                    
                    if($(obj[j]).prev()[0].type == 'file') {
                        // console.log($(obj[j]).next().next()[0].value)
                        if(imgData) {
                            n++;
                            // console.log($(obj[j]).next().next()[0].value);
                        } else {
                            obj[j].className = '';
                        }     
                    }  else {
                        obj[j].className = '';
                    }
                }
            }
            leng += obj.length;
            return n;
        }
        var sib = $(this).parent().prevAll();
        var num = 0;
        var leng = 0;
        for (var i = 0; i < sib.length; i++) {
            var pValue = sib[i].getElementsByTagName('p');
            num += parseInt(isOrWrite(pValue));
            
        }
        if(leng == num) {
            for(var i = 0; i <sib.length; i++) {
                sib[i].style.display = 'none';
            }
            $(this).parent().hide();
            $(this).parent().next()[0].style.display = 'block';
            $(this).parent().next().next()[0].style.display = 'block';
            $(this).parent().next().next().next()[0].style.display = 'flex';   
        } else {
            alert('你还未填写完');
        }
           
    }
}

// 上一步 需要给出上一步的id, 方便显示
prevBtn('pro-btn-prev', 'ca-next-button');
prevBtn('art-btn-prev', 'pro-next-button');
prevBtn('pri-btn-prev', 'art-next-button');
function prevBtn(btn, btnPar) {
    var button = document.getElementById(btn);
    button.onclick = function() {
        var btnpar = document.getElementsByClassName(btnPar)[0];
        if (btnPar == 'ca-next-button') {          
            var sib = $(btnpar).prevAll();
            for (var i = 0; i < sib.length; i++) {
                sib[i].style.display = 'block';
            }       
        } else {
            $(btnpar).prev()[0].style.display = 'block';
            $(btnpar).prev().prev()[0].style.display = 'block';
        }
        btnpar.style.display = 'flex';
        $(btnpar).next()[0].style.display = 'none';
        $(btnpar).next().next()[0].style.display = 'none';
        $(btnpar).next().next().next()[0].style.display = 'none';
    }
}

// 暂时没想到怎么处理 数字
/* nextBtn('ca-btn-next', "main-project", 'pro-next-button', 5);
nextBtn('pro-btn-next', "main-article", 'art-next-button', 6);
nextBtn('art-btn-next', "main-prize", 'pri-next-button', 7);
nextBtn('pri-btn-next', "main-patent", 'submit', 8);

// 上一步
nextBtn('art-btn-prev', "main-project", 'pro-next-button', 5);
nextBtn('pri-btn-prev', "main-article", 'art-next-button', 6);

// function nePrevBtn(element, arr) {
//     var obj = document.getElementById(element);
//     obj.onclick = function() {
//         this.parentNode
//     }
// }
function sameBtn(btn, j, thisFun, mainHea) {
    function next(elem) {
        do {
            elem = elem.nextSibling;
        } while (elem && elem.nodeType !== 1);
        return elem;
    }
    for (var i = 0; i < mainHea.length; i++) {
        var nextElem = next(mainHea[i]);
        if (nextElem) {
            nextElem.style.display = 'none';
        }
        mainHea[i].style.display = 'none';
    }
    thisFun.parentNode.style.display = 'none';
    var proBtn = document.getElementsByClassName(btn)[0];
    proBtn.style.display = 'flex';
    return mainHea;
}
function nextBtn(element, nextEle, btn, j) {
    var obj = document.getElementById(element);
    obj.onclick = function () {
        var mainHea = document.getElementById('pc-maincon').getElementsByTagName('h3');
        sameBtn(btn, j, this, mainHea);
        var mainPro = document.getElementById(nextEle);       
        mainHea[j].style.display = 'block';
        mainPro.style.display = 'block';
        
    }
}

prevBtnFir('pro-btn-prev','ca-next-button', 4);
function prevBtnFir(element, btn, j) {
    var obj = document.getElementById(element);
    obj.onclick = function () {
        var mainHea = document.getElementById('pc-maincon').getElementsByTagName('h3');
    //     function next(elem) {
    //         do {
    //             elem = elem.nextSibling;
    //         } while (elem && elem.nodeType !== 1);
    //         return elem;
    //     }
    //     for (var i = 0; i < mainHea.length; i++) {
    //         var nextElem = next(mainHea[i]);
    //         if (nextElem) {
    //             nextElem.style.display = 'none';
    //         }
    //         mainHea[i].style.display = 'none';
    //     }
    //     this.parentNode.style.display = 'none';
    //     var proBtn = document.getElementsByClassName(btn)[0];
        sameBtn(btn, j, this, mainHea)
        for(var i = 0; i < j; i++) {
            mainHea[i].style.display = 'block';
            $("#pc-maincon>h3+div")[i].style.display = 'block';
        }
        // proBtn.style.display = 'flex';
    }
} */