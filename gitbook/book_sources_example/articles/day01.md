# 你不可不知的 JavaScript 二三事#Day1：前言

近年 JavaScript 像個炙手可熱的大明星。

印象中，八、九年前的 JavaScript 並沒有那麼引人注目。當然，要寫網頁，HTML、CSS、JavaScript 仍是不可或缺的三劍客，但那還是個 Adobe Flash 稱霸網頁互動元件的風光年代，無論是網頁動畫、互動特效、桌面小遊戲，只要是多媒體互動的應用，Flash 與 ActionScript 幾乎是第一選擇。也有很多人選擇 Java Applet 作為網頁上的互動應用。相較之下，JavaScript 就像個跑龍套，只是傳統網頁實現簡單互動事件的工具，例如點點按鈕、跳出視窗，一點也不時尚。

![](https://fossbytes.com/wp-content/uploads/2017/07/rip-adobe-flash.jpg)  
(Source: [Dec 31, 2020: Adobe Flash Death Date Announced By Adobe](https://fossbytes.com/rip-adobe-flash-death-date-31-dec-2020/))

HTML5 的面世是個轉捩點，逐漸改變了一切。HTML5 增加了許多新語法元素，讓它可以做到許多傳統只能靠 Flash 或 Applet 才能實現的互動效果。尤其在[賈伯斯支持 HTML5 抵制 Adobe Flash ]( https://www.apple.com/hotnews/thoughts-on-flash/)的論調公開後，越來越多開發者投入 HTML5，許多有趣的 HTML5 小遊戲如雨後春筍冒出來，讓人看到並驚嘆 HTML5 的無限潛力。而 HTML5 能實現各種豐富動態互動的背後功臣，就是 JavaScript。

到了近年，兩個重要因素更讓 JavaScript 的光芒推上高峰。

一個是 Node.js 的面世，讓 JavaScript 得以將「魔爪」伸入後端，一個語言前後端通吃，多麼有吸引力的優勢啊！讓眾多開發者趨之若鶩，紛紛投入 JavaScript 陣營。另一個是前端技術的爆炸性發展，堪稱是一日千里，眾家前端框架百花齊放，身為前端最重要的程式語言，JavaScript 自然前景一片看俏，社群蓬勃發展，每年都有新特性釋出，各種轉譯語言也百家爭鳴。

無論你使用哪一派前端框架、或是使用哪一個轉譯語言，對原生 JavaScript (ECMAScript) 都應該有一定的了解。

![](http://devhumor.com/content/uploads/images/October2018/baba-ji.png)  
(Source: [Where is JS Man?](http://devhumor.com/tags/javascript))

「JavaScript 很簡單」是許多人對它的印象。

確實，和 Java、C# 等嚴謹性高、規範多的語言比起來，JavaScript 是一個入門門檻相對容易許多的程式語言，可以歸功於它的許多特性：語法寬容、弱型別加動態型別、型別判斷籠統、非強制物件導向等等。但這些特性同時也使這個語言讓人又愛又恨——愛它容易起步上手，恨它藏著各種魔鬼的細節。JavaScript 的容易入門，常讓人輕忽了它的特性和陷阱，在開發過程大吃苦頭。

網路上很多人都看過這張嘲諷滿點的圖片「Thanks Brendan for giving us the Javascript」。我第一次看到的心得是：這是什麼神經病語言。在 Java 或 C# 開發者眼中，應該很容易有類似感想。(看 Brendan 那燦爛的笑容，笑得你心裡發寒啊~)

![](https://i.redd.it/rz3o1yibnc511.png)  
(Source: [Thanks Brendan for giving us the Javascript : ProgrammerHumor - Reddit](https://www.reddit.com/r/ProgrammerHumor/comments/8srix1/thanks_brendan_for_giving_us_the_javascript/))

這個系列的目標是以清晰易懂的方式，探討原生 JavaScript 一些容易讓人混淆、造成編程失誤、或不那麼確切熟悉的特性，或是將一些觀念進行整理。預計也會探討部分 ES6、ES7、ES8 的新特性。

期待這個過程能像 2019 iT 邦幫忙鐵人賽的形象——「勇者鬥惡龍」，斬破 JavaScript 惡魔般的迷霧！

## References
* [Thoughts on Flash - Apple](https://www.apple.com/hotnews/thoughts-on-flash/)
* [Steve Jobs "Thoughts on Flash" 全文翻譯 | T客邦](https://www.techbang.com/posts/2405-steve-jobs-thoughts-on-flash-full-translation)
* [為什麼 Jobs 永遠不會讓 Flash 上 iPhone？ | MR JAMIE](http://mrjamie.cc/2010/04/30/why-jobs-will-never-allow-flash-on-iphone/)
