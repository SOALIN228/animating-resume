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
 
 /* 添加一些3d效果 */
 #code-wrapper {
   perspective: 1000px;
 }
 #code {
   transition: none;
   transform: rotateY(10deg) translateZ(-100px);
 }
 
 /* 于是我就可以在白纸上写字了，请看右边 */
 
 
 `

let result2 =
  `/* 
 * 接下来用一个优秀的库 marked.js
 * 把 Markdown 变成 HTML
 */
 
 `

let result3 =
  `/*
 * 这就是我的会动的简历
 * 谢谢观看
 */`

let md = `
# 自我介绍
我叫 李明林

21 岁

浙江万里学院 大三学生

自学前端一年

希望应聘前端实习生

# 技能介绍
- Vue

  熟悉 Vue 常用功能，如组件、Vue-Router、双向绑定等

- jQuery

  熟悉 jQuery 的常用 API、AJAX，能使用 jQuery 制作网站、轮播等

- 移动端页面

  会使用 viewport REM、vw/vh、FastClick 等技术制作适配手机设备的页面

- 原生 JavaScript

  熟悉原生 JS，可以使用原生 JS 开发

  熟悉 this、闭包、原型链、异步、DOM API

- HTML5 & CSS3

  能独立制作精美网页，掌握 CSS 3 动画、过渡效果、响应式等常用技术

- webpack

  了解常用 Loader 和 Plugins，可以独立搭建一个 webpack 开发和生成环境

- 微信小程序制作

  了解小程序开发，了解小程序生命周期、API

- 其他

  了解 MVC 设计模式，可以使用 MVC 编写代码

  了解ES6 解构赋值、Promise等

  了解 Sass 基本语法和代码复用

  了解HTTP协议，可以完成与后端的合作，完成项目

# 项目介绍
canvas画板

[预览](https://soalin228.github.io/mycanvas/index.html) [源码](https://github.com/SOALIN228/mycanvas)

关键字：canvas、JS、SVG

描述：该项目使用原生JS实现，支持移动端访问，主要调用 Canvas API，实现了划线、调色、橡皮擦、保存等功能

网站导航

[预览](https://soalin228.github.io/nav-demo/index.html) [源码](https://github.com/SOALIN228/nav-demo)

关键字：localstorage、JS

描述：用户按下按键即可访问到图标显示的对应网站、用户可以自己设置跳转对应的网站，使用localstorage进行存储

画一个皮卡丘

[预览](https://soalin228.github.io/Pikachu/index.html) [源码](https://github.com/SOALIN228/Pikachu)

关键字：CSS、JS、prism

描述：纯CSS实现皮卡丘的绘制，支持移动端访问，使用 prism 添加代码高亮

# 联系方式
- Email soalin228@163.com
- 手机 17606874115
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
  }, 40)
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

writeCode('', result, () => {
  createPaper(() => { // 接收call过来的函数
    writeMarkdown(md, () => {
      writeCode(result, result2, () => {
        convertMarkdownToHtml(() => {
          writeCode(result + result2, result3, () => {
            console.log('完成')
          })
        })
      })
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

function convertMarkdownToHtml(fn){
  let div = document.createElement('div')
  div.className = 'html markdown-body'
  div.innerHTML = marked(md)
  let markdownContainer = document.querySelector('#paper > .content')
  markdownContainer.replaceWith(div)
  fn && fn.call()
}
