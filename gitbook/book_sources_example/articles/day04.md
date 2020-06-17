# 你不可不知的 JavaScript 二三事#Day4：動態型別加弱型別不是罪——怎麼 JavaScript 一摔就變成個印度阿三？

前兩篇文章介紹了什麼是動態型別、靜態型別、強型別、弱型別，也知道了幾個常見語言分屬哪種類別。 

懶人包複習一下：
> * 靜態語言/動態語言：變數和型別的綁定方法。
> * 弱型別/強型別：語言型別系統(Type System)對型別檢查的嚴格程度，也就是型別安全的程度。

其中**動態型別加弱型別**是最不安全的組合，也是我認為 JavaScript 撰寫上鬆散不安全的源頭之一。

但怪了，動態型別加弱型別的語言又不是只有 JavaScript，同樣使用者眾多的 PHP 也是屬於動態型別加弱型別，為何 PHP 不像 JavaScript 這麼讓人詬病？

套句港片「賭俠」裡星爺的台詞：我摔你也摔，怎麼你一摔就變成個印度阿三啦？

![](https://i.imgur.com/TBWgV4I.png)  
(Source: [網路](https://gss0.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/b8389b504fc2d562a46680a3e71190ef76c66c15.jpg))

**動態型別加弱型別不是罪，動態型別加超級弱型別就是一場夢魘，更別說攪和了 JavaScript 自身型別系統(Type System)的混亂**。

很多問題是相對性的，需要經過比較才會凸顯出來，因此前兩篇文章刻意都以其他語言做舉例，本篇文章將把目光拉回 JavaScript，用實例來檢視 JavaScript 在型別處理上的各種特性，透過和其他語言的比較，將更能體會 JavaScript 在型別安全上的脆弱。

究竟～是動態型別加弱型別的原罪使然，還是型別系統的命運糾葛，讓我們繼續看下去～

![](http://v1c.im.tv/beta/2014/04/ART1404281738-86793-Icon.jpg)  
(Source: [網路](http://v1c.im.tv/beta/2014/04/ART1404281738-86793-Icon.jpg))

## 動態型別

前面介紹過動態型別和靜態型別的差別，現在我們可以很清楚判斷 JavaScript 屬於動態語言：
* 宣告變數時不需指定型別。
* 過程可以任意更換變數的型別。

```js
var x = 123;
console.log(x);
x = 'Hello';
console.log(x);
```

執行結果：

```
123
Hello
```

## 弱型別

Day3 文章介紹到，弱型別常導致 Bug 的一個情境就是**允許不同型別間的比對**。

這部分 JavaScript 和 PHP 一樣，提供了兩種嚴格程度不同的比較運算子：`==`、`===`

```js
console.log( "111" == 111 ? "Yes" : "No" );     // "Yes"
console.log( "111" === 111 ? "Yes" : "No" );    // "No"
```

另一個情境是如果在數字運算過程混進一個字串，會發生什麼事？

強型別的 Java 會發生編譯錯誤；弱型別的 PHP 會企圖將字串轉成數字，以完成算術運算的任務。

那 JavaScript 呢？

```js
var x = 123 + "456";
console.log(x);
```

執行結果：

```
123456
```

同樣是弱型別的 JavaScript，執行時一樣不會發生錯誤，會自動做一些轉型動作以讓程式繼續運行下去。

不同的是，JavaScript 不會去將字串轉成數字，反而是將前面的數字結果轉成字串，再和後面的字串作串接，所以得到 `"123456"` 的結果。

幾乎一模一樣的語法情境，為什麼 JavaScript 的處理邏輯和 PHP 截然不同？

## 數學運算？字串串接？

用另一個例子來看，差異會更明顯。

如果是 PHP，以下寫法會得到單純的數字運算結果，也就是一個整數型態的 `999`：

```php
<?php
$x = 111 + 222 + "333" + 111 + 222;
echo $x;
?>
```

執行結果：

```
999
```

如果是 JavaScript 呢？

```js
var x = 111 + 222 + "333" + 111 + 222;
console.log(x);
```

執行結果：

```
333333111222
```

![](https://i.imgur.com/Xx9HKan.png)  
(Source: [網路](https://vignette.wikia.nocookie.net/evchk/images/e/ec/2471912.jpg/revision/latest?cb=20171012125530))

是一個讓人黑人問號的答案呢。

程式不是魔術師，其實有跡可循。前面的 `111 + 222` 被視為算術運算做相加，得到數字 `333` ；繼續和中間的字串 `"333"` 相加，被視為字串的串連，得到 `"333333"`；而最後的 `111` 和 `222` 雖然是數字型態，都被以字串相接的方式處理，以至於得到 `"333333111222"` 這麼滑稽的答案。

為什麼一樣都是整數型態的 `111`、`222`，JavaScript 連自己前後處理的方式都不一樣？

在 JavaScript 裡，如果我們想對兩個變數的值做**數學相加**，語法表現方式如下：

```js
var v1 = 111;
var v2 = 222;
var x = v1 + v2;    // 333
```

如果想對兩個變數的值做**字串串接**，語法表現方式如下：

```js
var v1 = "111";
var v2 = "222";
var x = v1 + v2;    // "111222"
```

發現問題了嗎？無論是**數學相加**，還是**字串串接**，用的都是同一個符號 `+` 來表達，事實上他們是不同的運算子：
* 用在數學相加時：Arithmetic Operators (算數運算子)
* 用在串連字串時：Concatenation Operators (串接運算子)

那 JavaScript 怎麼決定它要把眼前的 `+` 視為**算數運算子**還是**串接運算子**？

JavaScript 的做法是：如果 `+` 左右兩邊的運算元有任何一個型別是字串，就會被當作**串接運算子**，否則就是**算數運算子**。

不幸的，由於 JavaScript 是**動態型別**，單從 `var x = v1 + v2;` 這行程式本身，我們無法判斷 JavaScript 會將 `+` 當成算數運算子還是串接運算子，因為變數 `v1`、`v2` 有可能是任何型別。

這就是為什麼 JavaScript 常常容易出現一些意想不到的相加結果。

可能會有疑問：為什麼 PHP 沒這個問題？

很簡單，因為 PHP 的算數運算子和串接運算子是不同符號，PHP 的串接運算子是 `.`：

```php
<?php
$v1 = 111;
$v2 = 222;
$x = $v1 + $v2; // 333
$x = $v1 . $v2; // "111222"
?>
```

另一個動態型別加弱型別的語言 Perl 也有同樣的設計，讓數學運算和字串串接可以被清楚區隔。

## 超級弱型別

Day3 的文章提到一點：**強型別和弱型別不是 1 或 0 二元論，而有「程度」的差別**。

例如 PHP 是弱型別，但還是有個容忍的限度，例如將數字和陣列做算術運算就會發生 Error：

```php
$x = 123 + array("Apple", "Banana");
echo $x;
```
```
PHP Fatal error:  Unsupported operand types in /home/cg/root/6938116/main.php on line 3
```

JavaScript 要命在於它是**超級弱型別**！

幾乎什麼都能相加、什麼都能比較、什麼都不奇怪，一堆毫無邏輯的寫法在 JavaScript 通通都可以執行！

```js
console.log( [] + [] );                     // ""
console.log( [] + {} );                     // "[object Object]"
console.log( [] == {} );                    // false
console.log( [] == false );                 // true
console.log( [] == 0 );                     // true
console.log( ['Apple', 'Banana'] == 2 );    // false
console.log( ['Apple', 'Banana'] == true ); // false
console.log( 123 + ['Apple', 'Banana'] );   // "123Apple,Banana"
console.log( true + true + true );          // 3
console.log( false + false + false );       // 0
```

![](https://i.imgur.com/BmP9xAt.png)  
(Source: [臭跩貓愛嗆人7-白爛貓超級胖](https://store.line.me/stickershop/product/1382681/zh-Hant?from=sticker))

**動態型別加弱型別**不是問題，**動態型別加超級弱型別**就變成一場夢魘。


## 令人混淆的型別系統

JavaScript 自身型別系統的設計也讓人感覺不夠嚴謹，或是令人困惑。

### null 都不 null 了

最具代表性的型別問題應該就是「`null` 是個 object」的弔詭現象。

`null` 的概念在各種程式語言很普遍，代表「nothing」，也就是這個變數裡面沒有值。

但在 JavaScript 裡如果用 `typeof` 去取得其型別，卻會回傳 `"object"` 的結果。

[W3Schools](https://www.w3schools.com/js/js_datatypes.asp) 也稱呼這是一個 JavaScript 的 Bug：

> You can consider it a bug in JavaScript that typeof null is an object. It should be null.


### 獨特的 undefined 型別

JavaScript 除了常見的 `null` 型別，還有另一個特別的型別：`undefined`。

`undefined` 在概念上和使用上都非常類似 `null`，但在 JavaScript 的型別系統中他們又確確實實屬於不同的型別。

事實上，在 JavaScript 程式，比起 `null` 型別，`undefined` 更接近其他語言對 `NULL` 的習慣。

(例如去印一個沒有初始化的變數，會得到 `undefined` 而不是 `null`)

```js
var x;
console.log(x); // "undefined"
```

相形之下，`null` 就顯得很雞肋(而且是有 Bug 的雞肋...)，徒增混淆。

## JavaScript 的型別夢魘真的沒救了嗎？

當然不。

JavaScript 終究是動態網頁不可缺少的角色，為了降低開發 JavaScript 程式的風險、提升程式穩定性，許多轉譯語言被發明出來，例如 [TypeScript](https://www.typescriptlang.org/) 是近年竄起的代表。

這些轉譯語言試圖在語法上引入一些特性，例如強型別、物件導向，讓 JavaScript 的程式撰寫更容易、更安全、更易於管控。

短期來說，學習這些轉譯語言需要增加額外的時間成本；但長期而言，當專案規模越來越大，轉譯語言有助於提升 JavaScript 程式開發和維護上的穩定性。

各家轉譯語言各有不同特性，是否應該導入轉譯語言、導入哪一種，沒有絕對答案，視乎各團隊的技能狀況和專案性質，權衡其中的成本效益和風險。


## References:
* [W3Schools - JavaScript Data Types](https://www.w3schools.com/js/js_datatypes.asp)
* [TypeScript 官方網站](https://www.typescriptlang.org/)
