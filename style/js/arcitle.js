window.onload = function () {
  if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    var imgJs1 = document.createElement('script')
    var imgJs2 = document.createElement('script')
    imgJs1.src = 'http://127.0.0.1/360img/js/pinchzoom.js'
    imgJs2.src = 'http://127.0.0.1/360img/js/underscore.js'
    document.documentElement.appendChild(imgJs2)
    $('.btn-container .game').html('图片放大').attr("class", 'big-img')
    $("button").remove(".download")
    $("button").remove(".downloadAll")
    setTimeout(() => {
      document.documentElement.appendChild(imgJs1)
      // setTimeout(() => {
      //   $('.pinch-zoom').each(function () {
      //     new RTP.PinchZoom($(this), {});
      //   });
      // }, 20)
      
    }, 16)
  } else {
    // 公众号
    $('.isGirl').attr('src', 'http://127.0.0.1/images/saoma/' + Math.floor(Math.random() * 847) + '.jpg')
    var script = document.createElement('script')
    script.src = 'http://192.168.0.105/live2d/js/autoload.js'
    document.documentElement.appendChild(script)
    $('.isGirl').mouseenter(() => {
      showMessage("关注公众号,每日更新哦~您还在等什么,拿起爪机扫码关注吧~~", 6000, 9)
    })
    setTimeout(() => {
      showMessage("进入妹纸学院,妹纸们正等着哥哥来消灭哦~~", 6000, 9)
    }, 3000)
    setTimeout(() => {
      showMessage("一起玩美女小游戏考验哥哥对美女观察的够不够仔细哦,哥哥完不成妹子会伤心的哦~", 9000, 9)
    }, 10000)
    setTimeout(() => {
      showMessage("关注公众号,每日更新哦~您还在等什么,拿起爪机扫码关注吧~~", 9000, 9)
    }, 15000)
  }
  
  // 右侧今日推荐
  let recItem = document.querySelectorAll('.rec-item');
  recItem.forEach(item => {
    item.onmouseenter = function () {
      recItem.forEach(citem => {
        citem.classList.remove('current');
      })
      item.classList.add('current');
    }
  })
  let recItem1 = document.querySelectorAll('.rec-item1');
  recItem1.forEach(item => {
    item.onmouseenter = function () {
      recItem1.forEach(citem => {
        citem.classList.remove('current');
      })
      item.classList.add('current');
    }
  })
  let mySwiper = new Swiper('.img-wrap',{
    wrapperClass : 'my-wrapper',
    slideClass : 'my-slide',
    loop: true,
    speed: 500,
    autoplay: {
      disableOnInteraction: false,
      delay: 2500,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  })
  mySwiper.autoplay.stop();
  // 按钮组功能
  // 上一张
  let downloadsAll = document.querySelectorAll('.downloadAll');
  let game = document.querySelectorAll('.game');
  let isAuto = false;
  $('.prev').click(() => {
    mySwiper.slidePrev();
  })
  $('.next').click(() => {
    mySwiper.slideNext();
  })
  $('.auto').click(() => {
    let text = '';
    if (isAuto) {
      mySwiper.autoplay.stop();
      text = '自动轮播';
      showMessage("哥哥已经关闭了自动轮播,需要手动点击或者键盘操作才可以切换了呢~", 6000, 9)
    } else {
      showMessage("哥哥已经开启了自动轮播,一张张妹纸在您面前，有木有心跳加速呢~", 6000, 9)
      mySwiper.autoplay.start();
      text = '停止轮播';
    }
    isAuto = !isAuto;
    $('.auto').html(text)
  })
  $('.download').click(() => {
    let name = $('.arcitle-title').html() + '(' + mySwiper.activeIndex + ').jpg';
    download($('.swiper-slide-active img').attr('src'), name);
  })
  downloadsAll.forEach(item => {
    item.onclick = function () {
      if (item.innerText == '下载中...') {
        return
      }
      let imgs = document.querySelectorAll('.my-slide');
      let title = document.querySelector('.arcitle-title');
      let imgName = [];
      let imgUrl = [];
      imgs.forEach((item, index) => {
        let img = item.querySelector('img');
        let name = title.innerText + '(' + (index + 1) + ')';
        imgName.push(name);
        imgUrl.push(img.src);
      })
      // 更改文案
      downloadsAll.forEach(titem => {
        titem.innerText = '下载中...';
        showMessage("图片正在批量压缩中,哥哥不要着急哦~么么哒", 6000, 9)
      })
      packageImages(imgUrl, imgName, title.innerText);
    }
  })
  $('.big-img').click(() => {
    let imgSrc = $('.swiper-slide-active img').attr("src")
    let h = $('.swiper-slide-active').height() + 'px'
    let wrap = document.documentElement
    let imgWrap = document.createElement('div')
    imgWrap.className = "big-img-wrap"
    imgWrap.innerHTML = "<div class='big-close'>×</div><iframe src=" + "'http://192.168.0.105/360img/index.html'" + "class='big' style=" +('height:' + h) +"></iframe>"
    localStorage.setItem('bigImg', imgSrc)
    document.documentElement.appendChild(imgWrap)
    $(".big-close").click(() => {
      localStorage.removeItem("bigImg")
      document.documentElement.removeChild(imgWrap)
    })
  })
 
  // 美女游戏
  let gameImgUrl = '';
  // 拼图游戏
  var list = "";
  var listW = "";
  var listH = "";
  var imgW = "";
  var imgH = "";
  var origArr = "";
  var randArr = "";
  var key = "";
  var imgCell;
  var num = "";
  var seleBox = "";
  var seleLi = "";
  var seleBtn = "";
  game.forEach(item => {
    item.onclick = function () {
      gameInit()
    }
  })
  // 初始化游戏
  function gameInit(img) {
    var wrap = document.documentElement
    var game = document.createElement('div')
    game.className = "game-container"
    // game.innerHTML = "<div class='game-grap1'><div class='btnBbox'><button class='btn' type='button'>开始</button><div class='selectbox'><button class='text'>简单</button><ul class='box'><li>简单</li><li>入门</li><li>中等难度</li><li>高难</li><li>外星人</li></ul><div class='picBox'><ul class='list'></ul></div></div><button class='btn' type='button'>自定义上传</button><div class='btnBbox'><button class='game-close' type='button'>关闭游戏</button></div></div>"
    game.innerHTML = `
    <div class="game-container" style="display: flex;">
      <div class="btn-container">
        <button class="btn" type="button">开始</button>
        <div class="selectbox">
          <button class="text">简单</button>
          <ul class="box" style="display: none;">
            <li>简单</li>
            <li>入门</li>
            <li>中等难度</li>
            <li>高难</li>
            <li>外星人</li>
          </ul>
        </div>
        <div class="load-box"><input type="file" /><button class="upload" type="button">自定义上传</button></div>
        <button class="master">查看原图</button>
        <div class="btnBbox"><button class="game-close" type="button">关闭游戏</button></div>
      </div>
      <div class="picBox">
        <ul class="list">
        </ul>
      </div>
    </div>
    `
    wrap.appendChild(game)
    setTimeout(() => {
      list = $('.picBox .list');
      listW = list.width();
      listH = list.height();
      imgW = listW / 3;
      imgH = listH / 3;
      origArr = [];
      randArr = [];
      key = true;
      imgCell;
      num = 3;
      seleBox = $('.selectbox');
      seleLi = seleBox.find('li');
      seleBtn = seleBox.find('.text');
      let wraps = document.querySelector('.game-container');
      let closeGame = wraps.querySelector('.game-close');
      let isFile = wraps.querySelector('.load-box input')
      if (img) {
        gameImgUrl = img
      } else {
        gameImgUrl = document.querySelector('.swiper-slide-active img').src;
      }
      init();
      wraps.style.display = 'flex';
      closeGame.addEventListener("click", () => {
        console.log(111)
        wrap.removeChild($(".game-container")[0])
      })
      isFile.addEventListener('change', function(e) {
        wrap.removeChild($(".game-container")[0])
        var reader=new FileReader();
        reader.onload=function(e){
          gameInit(reader.result)
        }  
        reader.readAsDataURL(this.files[0])
      })
    }, 20)
  }
  // 键盘操作
  document.onkeydown = function (e) {
    // 左
    if (e.keyCode == 37) {
      mySwiper.slidePrev();
    } else if (e.keyCode == 39) {
      mySwiper.slideNext();
    } else if (e.keyCode == 123) {
      e.returnValue = false;
      return (false);
    }
  }
  document.oncontextmenu = () => false;

  function download(url, name) {
    // 发送http请求，将文件链接转换成文件流
    fileAjax(url, function(xhr) {
        downloadFile(xhr.response, name);
    }, {
        responseType: 'blob'
    })
  }

  function fileAjax(url, callback, options) {
    let xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    if (options.responseType) {
        xhr.responseType = options.responseType;
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            callback(xhr);
        }
    }
    xhr.send();
  }

  function downloadFile(content, filename) {
    window.URL = window.URL || window.webkitURL;
    let a = document.createElement('a');
    let blob = new Blob([content]);
// 通过二进制文件创建url
    let url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = filename;
    a.click();
// 销毁创建的url
    window.URL.revokeObjectURL(url);
    showMessage("恭喜哥哥下载图片成功了哦~么么哒", 6000, 9)
  }

  // 批量打包
  function packageImages(imgUrl, imgName, title){
    var imgBase64 = [];
    var imageSuffix = [];//图片后缀
    var zip = new JSZip();
    zip.file("readme.txt", "案件详情资料\n");
    var img = zip.folder("images");
    for(var i=0;i<imgUrl.length;i++){
      var src = imgUrl[i];
      var suffix = src.substring(src.lastIndexOf("."));
      imageSuffix.push(suffix);
      getBase64(src).then(function(base64){
          imgBase64.push(base64.substring(22));
      },function(err){
          console.log(err);//打印异常信息
      });
    }
    function tt(){
      setTimeout(function(){
          if(imgUrl.length == imgBase64.length){
            for(var i=0;i<imgUrl.length;i++){
                img.file(imgName[i] + imageSuffix[i], imgBase64[i], {base64: true});
            }
            zip.generateAsync({type:"blob"}).then(function(content) {
                // see FileSaver.js
                status = saveAs(content, title + ".zip");
                // 更改文案
                let downloadsAll = document.querySelectorAll('.downloadAll')
                downloadsAll.forEach(titem => {
                  titem.innerText = '下载全套'
                  showMessage("恭喜哥哥已经下载全套图集,赶快打开欣赏吧~么么哒", 6000, 9)
                })
            });
          }else{
            tt();
          }
      },100);
    }
    tt();
  }
  //传入图片路径，返回base64
  function getBase64(img) {
    function getBase64Image(img, width, height) {
      //width、height调用时传入具体像素值，控制大小 ,不传则默认图像大小
      var canvas = document.createElement("canvas");
      canvas.width = width ? width : img.width;
      canvas.height = height ? height : img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      var dataURL = canvas.toDataURL();
      return dataURL;
    }
    var image = new Image();
    image.crossOrigin = 'Anonymous';
    image.src = img;
    var deferred=$.Deferred();
    if(img){
      image.onload =function (){
          deferred.resolve(getBase64Image(image));//将base64传给done上传处理
      }
      return deferred.promise();//问题要让onload完成后再return sessionStorage['imgTest']
    }
  }
  function init() {
      render(num)
      gameState()
      select()
  }


function render(n) {
    list.html('');
    imgW = listW / n;
    imgH = listH / n;
    origArr = [];
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
            origArr.push(i * n + j);
            var li = $('<li>');
            li.css({
                backgroundImage: 'url(' + gameImgUrl + ')',
                left: j * imgW + 'px',
                top: i * imgH + 'px',
                backgroundPosition: -j * imgW + 'px ' + -i * imgH + 'px',
                width: imgW + 'px',
                height: imgH + 'px'
            })
            list.append(li);
            imgCell = list.find('li');
        }
    }
} //生成9个li


function select() {
    seleBtn.on('click', function () {
        $(this).siblings('.box').slideToggle();
        seleBox.toggleClass('active');
    })
    seleLi.on('click', function () {
        var index = $(this).index();
        var text = $(this).text();
        seleBtn.text(text);
        seleBox.find('.box').slideUp();
        seleBox.removeClass('active');
        if(index == seleLi.length-1){
            num = 12;
            return 
        }else if(index == seleLi.length-2){
            num = 8;
            return 
        }
        num = Math.floor(index*1.5) + 3;
    })
}

function gameState() {
    $('.btn').on('click', function () {
        if (key) {
            key = false;
            $(this).text('复原');
            render(num);
            randomArr();
            cellOrder(randArr, num);
            drag();
            seleBtn.attr('disabled','disabled');
            $(imgCell).css('cursor','move');
            seleBox.find('.box').slideUp();
            seleBox.removeClass('active');
        } else {
            key = true;
            $(this).text('开始');
            cellOrder(origArr,num);
            imgCell.off('mousemove mouseup mousedown mouseover mouseout');
            seleBtn.attr('disabled',false);
            $(imgCell).css('cursor','pointer');
        }
    })
} //游戏状态改变
function randomArr() {
    randArr = [];
    var len = origArr.length;
    var order;
    var temp = {};
    for (var i = 0; i < len; i++) {
        order = Math.floor(Math.random() * len);
        if (randArr.length > 0) {
            while ($.inArray(order, randArr) > -1) {
                order = Math.floor(Math.random() * len);
            }
        }
        randArr.push(order);
    }
    return
} //乱序数组
function cellOrder(arr, n) {
    var len = arr.length;
    for (var a = 0; a < len; a++) {
        var j = arr[a] % n;
        var i = Math.floor(arr[a] / n);
        animateFn(a, j, i,n);
    }
} //改变图片位置
function drag() {
    var disX, disY;
    var initL = list.offset().left;
    var initT = list.offset().top;
    imgCell.on('mousedown', function (e) {
        var e = e || window.e;
        disX = e.pageX - $(this).offset().left;
        disY = e.pageY - $(this).offset().top;
        var self = this;
        var index1 = $(this).index();
        $(document).on('mousemove', function (e) {
            e.preventDefault();
            var e = e || window.e;
            var l = e.pageX - disX - initL;
            var t = e.pageY - disY - initT;
            $(self).css({
                left: l + 'px',
                top: t + 'px',
                zIndex: 1000,
                opacity: '0.6'
            })
        }).on('mouseup', function (e) {
            var e = e || window.e;
            var l = e.pageX - initL;
            var t = e.pageY - initT;
            var index2 = changeIndex(l, t, index1, num);
            if (index1 == index2) {
                cellReturn(index1, num);
            } else {
                cellChange(index1, index2, num);
            }
            $(this).off('mousemove').off('mouseup');
        })
    }).on('mouseover', function () {
        $(this).css({
            opacity: '0.8'
        })
    }).on('mouseout', function () {
        $(this).css({
            opacity: '1'
        })
    })
} //拖拽图片
function changeIndex(x, y, index, n) {
    if (x < 0 || x > listW || y < 0 || y > listH) {
        return index;
    }
    var row = Math.floor(y / imgH);
    var col = Math.floor(x / imgW);
    var l = row * n + col;
    var i = 0; len = randArr.length;
    while ((i < len) && (randArr[i] !== l)) {
        i++;
    }
    return i;
} //改变index值

function cellReturn(index, n) {
    var i = Math.floor(randArr[index] / n);
    var j = randArr[index] % n;
    animateFn(index, j, i,num);
} //飞回原来位置
function cellChange(from, to,n) {
    var fromI = Math.floor(randArr[from] / n);
    var fromJ = randArr[from] % n;
    var toI = Math.floor(randArr[to] / n);
    var toJ = randArr[to] % n;
    var temp = randArr[from];
    animateFn(from, toJ, toI,num);
    animateFn(to, fromJ, fromI,num, function () {
        randArr[from] = randArr[to]
        randArr[to] = temp
        check()
    })
} //图片交换位置

function check() {
    if (origArr.toString() == randArr.toString()) {
        alert('厉害了老铁')
    }
} //检查是否正确

function animateFn(index, j, i,n, callBack) {
    imgW = listW / n;
    imgH = listH / n;
    imgCell.eq(index).animate({
        left: j * imgW + 'px',
        top: i * imgH + 'px'
    }, function () {
        $(this).css({
            zIndex: '0',
            opacity: '1'
        })
        typeof callBack == 'function' ? callBack.call(this, arguments) : '';
    })
} //动画执行

}
var messageTimer = ''
function showMessage(text, timeout, priority) {
  if (!text) return;
  if (!sessionStorage.getItem("waifu-text") || sessionStorage.getItem("waifu-text") <= priority) {
    if (messageTimer) {
      clearTimeout(messageTimer);
      messageTimer = null;
    }
    text = randomSelection(text);
    sessionStorage.setItem("waifu-text", priority);
    var tips = document.getElementById("waifu-tips");
    tips.innerHTML = text;
    tips.classList.add("waifu-tips-active");
    messageTimer = setTimeout(() => {
      sessionStorage.removeItem("waifu-text");
      tips.classList.remove("waifu-tips-active");
    }, timeout);
  }
}
function randomSelection(obj) {
  return Array.isArray(obj) ? obj[Math.floor(Math.random() * obj.length)] : obj;
}