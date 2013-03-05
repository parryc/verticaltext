(function(root){
	var options = {
				selector: "[lang=lzh]",
				lineLength: 20,
				noOutsideWrap: true
			},
		selected = document.querySelectorAll(options.selector)[0],
		rawHtml = selected.innerHTML.trim(),
		children = selected.childNodes;

	String.prototype.reverse=function(){return this.split("").reverse().join("");};

	function verticalizer(){
		return {
			options: options,
			rawHtml: rawHtml,
			children: children,
			configure: function(opts){
				for(var prop in opts){
					if(opts.hasOwnProperty(prop))
						this.options[prop] = opts[prop];
				}
				this.setVertical();
			},
			_preprocess: function(){
				var children = this.children,
					section = [],
					text = [],
					isSub, stub;
					console.log(children);
				for (var i = 0; i < children.length; i++) {

					if(children[i].localName === "br") {
						text.push(section);
						section = [];
					} else {
						stub = children[i].textContent.trim();
						if(stub !== null && !children[i].hasChildNodes())
							section.push({text: stub, isSub: false });
						else {
							console.log(children[i]);
							section.push({text: stub, isSub: true, width: children[i].width});
							console.log(window.getComputedStyle(children[i],null).getPropertyValue("width"));
						}
					}
				}
				if(section)
					text.push(section);
				return text.reverse();
			},
			setVertical: function(){
				var processed = this._preprocess(),
					limit = this.options.lineLength,
					build = "",
					tempLine = [],
					tempChild = "",
					rowSplit, otherEls;

				processed.forEach(function(el,ind,array){
					build += "<div class='line'>";
					for (var i = 0; i < el.length; i++) {
						if(el[i].isSub) {
							build += "<div class='other' lang='en'>"+el[i].text+"</div>";
						} else {
							rowSplit = el[i].text.split("");
							if(rowSplit.length > limit) {
								for (var j = 0; j < rowSplit.length; j += limit) {
									tempLine.push(rowSplit.slice(j,j+limit));
								}
								for (var k = tempLine.length - 1; k >= 0; k--) {
									build += tempLine[k].join("").replace(/(.)/g,"<div class='elem'>$1</div>");
									build += "</div><div class='line'>";
								}
							} else
								build += el[i].text.replace(/(.)/g,"<div class='elem'>$1</div>");
						}
					}
					build += "</div>";
				});

				build = build.replace(/「/g,"﹁");
				build = build.replace(/」/g,"﹂");
				document.querySelectorAll(options.selector)[0].innerHTML = build;
				otherEls = document.querySelectorAll('.other');
				for (var i = otherEls.length - 1; i >= 0; i--) {
					//console.log(otherEls[i].offsetWidth);
					otherEls[i].style.margin = getEm(otherEls[i]);
				}
			}
		};
	}

	var getEm = function(elem) {
		var parentFontSize = parseInt(window.getComputedStyle(elem.parentNode, null).fontSize, 10),
			elemFontSize = parseInt(window.getComputedStyle(elem, "").getPropertyValue("width"), 10),
			emsRaw = Math.floor(Math.floor((elemFontSize / parentFontSize) * 100) / 100 ),
			ems = Math.floor(emsRaw/2.0);
		if(elemFontSize < 20)
			return (ems+0.5)+"em -"+(ems+0.5)+"em -"+(1-elem.textContent.length*0.2)+"em -"+(ems+0.5)+"em";
		else
			return (ems+0.5)+"em -"+(ems+0.5)+"em "+(ems+0.5)+"em -"+(ems+0.5)+"em";

	};

	root.verticalizer = verticalizer();
	root.verticalizer.setVertical();
})(this);