let result =
`/*
 * 面试官你好，我是李明林
 * 只用文字作做我介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 */
 *{
   transition: all 1s;
 }
 html{
   background: #eee;
   font-size: 16px;
 }
 #code{
   border: 1px solid #aaa;
   padding: 16px;
 }
 `
let n = 0
let id = setInterval(() => {
  n += 1
  code.innerHTML = result.substring(0, n)
  styleTag.innerHTML = result.substring(0, n)
  if (n >= result.length) {
    window.clearInterval(id)
  }
}, 10)
