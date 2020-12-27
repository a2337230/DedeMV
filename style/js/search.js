if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
	(function(designWidth, maxWidth) {
    var doc = document,
      win = window,
      docEl = doc.documentElement,
      remStyle = document.createElement("style"),
      tid;
  
    function refreshRem() {
      var width = docEl.getBoundingClientRect().width;
      maxWidth = maxWidth || 540;
      width > maxWidth && (width = maxWidth);
      var rem = width * 100 / designWidth;
      remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
    }
  
    if (docEl.firstElementChild) {
      docEl.firstElementChild.appendChild(remStyle);
    } else {
      var wrap = doc.createElement("div");
      wrap.appendChild(remStyle);
      doc.write(wrap.innerHTML);
      wrap = null;
    }
    //要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
    refreshRem();
  
    win.addEventListener("resize", function() {
      clearTimeout(tid); //防止执行两次
      tid = setTimeout(refreshRem, 300);
    }, false);
  
    win.addEventListener("pageshow", function(e) {
      if (e.persisted) { // 浏览器后退的时候重新计算
        clearTimeout(tid);
        tid = setTimeout(refreshRem, 300);
      }
    }, false);
  
    if (doc.readyState === "complete") {
      doc.body.style.fontSize = "16px";
    } else {
      doc.addEventListener("DOMContentLoaded", function(e) {
        doc.body.style.fontSize = "16px";
      }, false);
    }
  })(750, 750)
}
var url = window.location.href.split('&PageNo=')[0]
var page = window.location.href.split('&PageNo=')[1]
window.onload = function () {
  getUA()
  window.onresize = function () {
    getUA()
  }
  // 获取设备类型
  function getUA() {
    if ((navigator.userAgent.match(/(phone|baipad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
      console.log("手机")
    }
    else {
      console.log("电脑")
    }
    var os = function() {
      var ua = navigator.userAgent,
          isWindowsPhone = /(?:Windows Phone)/.test(ua),
          isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
          isAndroid = /(?:Android)/.test(ua),
          isFireFox = /(?:Firefox)/.test(ua),
          isChrome = /(?:Chrome|CriOS)/.test(ua),
          isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
          isPhone = /(?:iPhone)/.test(ua) && !isTablet,
          isPc = !isPhone && !isAndroid && !isSymbian;
      return {
          isTablet: isTablet,
          isPhone: isPhone,
          isAndroid: isAndroid,
          isPc: isPc
      };
    }();
    let head = document.getElementsByTagName('head')[0]
    let linkTag = document.createElement('link')
    linkTag.setAttribute('rel','stylesheet')
    linkTag.setAttribute('type','text/css')
    if(os.isAndroid || os.isPhone) {
      linkTag.href = 'http://127.0.0.1/style/css/style-m.css'
      if(window.orientation==90||window.orientation==-90){
        // linkTag.href = 'http://127.0.0.1/style/css/style-m-h.css'
      }
      head.appendChild(linkTag)
      setTimeout(() => {
        // 更新swiper
        mySwiper.update()
      }, 20)
    } else if(os.isTablet) {
        alert("平板")
    } else if(os.isPc) {
      // 是否需要渲染看板娘
      let isload = true
      let _script =  document.querySelectorAll('script')
      _script.forEach((item, index) => {
        if (item.src.includes('/live2d/')) {
          isload = false
        }
      })
      console.log('加载')
      if (isload) {
        let script = document.createElement('script')
        script.src = 'http://127.0.0.1/live2d/js/autoload.js'
        head.appendChild(script)
      }
    }
  }
  // 键盘操作
  document.onkeydown = function (e) {
    if (e.keyCode == 123) {
      e.returnValue = false;
      return (false);
    }
  }
  document.oncontextmenu = () => false;
  // 获取是否需要分页
  let totalPage = $('.totalsize').html()
  let el = document.querySelector('.mainPage ul')
  if (Number(totalPage)) {
    let li = document.createElement('li')
    let select = '前往第<select class="select" style="min-width:36px;" onchange="gopages(this.options[this.options.selectedIndex].value)">'
    for(let i = 1; i <= totalPage; i++) {
      if (i == page) {
        select += ("<option selected>"+ i +"</option>")
      } else {
        select += ("<option>"+ i +"</option>")
      }
      console.log(i)
    }
    select += '</select>页'
    li.innerHTML = select
    el.appendChild(li)
  }
  
  console.log(url, page, totalPage)
}
function gopages(current) {
  if (current != page) {
    window.location.href = url + '&PageNo=' + current
  }
}