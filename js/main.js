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
 /* 我需要一点代码高亮 */
 .token.selector{ color: #a6e22e; }
 .token.punctuation{ transition: all 0s; color: #f8f8f2;}
 .token.property{ color: #f92672; }
 #code{ 
   background: #272822;
   color: #fff;
 }
 /* 加一个呼吸效果 */
 #code{
   animation: breath 0.5s infinite alternate-reverse;
 }
 /* 现在正式开始 */
 
 /* 我需要一张白纸 */
 `
let n = 0
let id = setInterval(() => {
  n += 1
  code.innerHTML = result.substring(0, n)
  code.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.css)
  styleTag.innerHTML = result.substring(0, n)
  if (n >= result.length) {
    window.clearInterval(id)
    fn2()
    fn3(result)
  }
}, 10)

function fn2 () {
  let paper = document.createElement('div')
  paper.id = 'paper'
  document.body.appendChild(paper)
}

function fn3 (preResult) {
  let result =
  `#paper{
   width: 100px;
   height: 100px;
   background: red;
 }`
  let n = 0
  let id = setInterval(() => {
    n += 1
    code.innerHTML = preResult + result.substring(0, n)
    code.innerHTML = Prism.highlight(code.innerHTML, Prism.languages.css)
    styleTag.innerHTML = preResult + result.substring(0, n)
    if (n >= result.length) {
      window.clearInterval(id)
    }
  }, 50)
}
