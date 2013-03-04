# Vertical Text

Vertical text, for the rare person who wants to display vertical text on just a normal webpage.

## How to use

In your header add ```<link rel="stylesheet" type="text/css" href="verticaltext.css"/>``` and at the bottom of the page add ```<script type="text/javascript" src="verticaltext.js"></script>```.  This is to make sure that the document has been fully loaded before automatically formatting the text. 

If you want to call it explicitly, there is a variable ```verticalizer``` that controls everything (like jQuery). 

Within the body of your webpage it's pretty simple. Within the vertical div, include a language and make sure each line is delineated by a ```<br/>``` tag.

```html
<div lang="lzh" class="vertical">
	朱灣<br/>
	「九日登青山」<br/>
	昔人惆悵地繫馬又登臨蒨處霞煙在多時草木深水將天一色雲與我無心想見龍山會良辰亦似今
</div>
```

If you change the class name, make sure to reconfigure ```verticalizer```. 

## Options

* ```selector: [lang=lzh]``` The class selector
* ```lineLength: 20``` The length of lines

## TODO

Implement all of [the CSS3 specs](http://dev.w3.org/csswg/css3-writing-modes/)! Or... try to, at least. haha. 

Right now, only Classical Chinese (lzh) works. 

## License

[MIT](http://parryc.mit-license.org/)
