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
 /* 加一个呼吸效果 */
 #code{
   animation: breath 0.5s infinite alternate-reverse;
 }
 /* 现在正式开始 */
 
 /* 我需要一张白纸 */
 #code-wrapper{
  width: 50%; 
  left: 0; 
  position: fixed; 
  height: 100%;
}
#paper > .content {
 display: block;
}
 `

let result2 =
  `/* 接下来用一个优秀的库 marked.js
 * 把 Markdown 变成 HTML
 */
 `

let md = `
# 自我介绍
我叫 XXX
1990 年 1 月出生
XXX 学校毕业
自学前端半年
希望应聘前端开发岗位
# 技能介绍
熟悉 JavaScript CSS
# 项目介绍
1. XXX 轮播
2. XXX 简历
3. XXX 画板
# 联系方式
- QQ xxxxxxxx
- Email xxxxxxxx
- 手机 xxxxxxx
`

function writeCode (prefix, code, fn) {
  let domCode = document.querySelector('#code')
  let n = 0
  let id = setInterval(() => {
    n += 1
    // 获取前n的字符，设置css样式
    domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css)
    // 写入style文件
    styleTag.innerHTML = prefix + code.substring(0, n)
    // 向上滚动
    domCode.scrollTop = domCode.scrollHeight
    if (n >= code.length) {
      window.clearInterval(id)
      fn &&  fn.call() // call过去
    }
  }, 10)

}

writeCode('', result, () => {
  createPaper(() => { // 接收call过来的函数
    writeCode(result, result2, () => {
      writeMarkdown(md)
    })
  })
})

function createPaper (fn) {
  let paper = document.createElement('div')
  paper.id = 'paper'
  let content = document.createElement('pre')
  content.className = 'content'
  paper.appendChild(content)
  document.body.appendChild(paper)
  fn.call()
}

function writeMarkdown(markdown, fn){
  let domPaper = document.querySelector('#paper>.content')
  let n = 0
  let id = setInterval(() => {
    n += 1
    domPaper.innerHTML = markdown.substring(0, n)
    domPaper.scrollTop = domPaper.scrollHeight
    if (n >= markdown.length) {
      window.clearInterval(id)
      fn && fn.call()
    }
  }, 35)
}
