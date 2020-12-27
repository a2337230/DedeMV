window.onload = function () {
  let tags = document.querySelectorAll('.right a')
  tags.forEach(item => {
    let r = Math.floor(255*Math.random())
    let g = Math.floor(255*Math.random())
    let b = Math.floor(255*Math.random())
    item.style.background = 'rgb(' + r + ',' + g + ',' + b + ')'
  })
  console.log(tags)
}