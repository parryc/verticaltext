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
				for (var i = 0; i < children.length; i++) {
					if(children[i].localName === "br") {
						text.push(section);
						section = [];
					} else {
						stub = children[i].textContent.trim();
						if(stub !== null && !children[i].hasChildNodes())
							section.push({text: stub, isSub: false });
						else
							section.push({text: stub, isSub: true});
						console.log(i + " " + stub);
					}
				}
				if(section)
					text.push(section);
				return text.reverse();
			},
			setVertical: function(){
				var processed = this._preprocess(),
					build = "",
					tempLine = [],
					tempChild = "",
					rowSplit;

				processed.forEach(function(el,ind,array){
					build += "<div class='line'>";
					for (var i = 0; i < el.length; i++) {
						if(el[i].isSub)
							build += "<div class='other'>"+el[i].text+"</div>";
						else
							build += el[i].text.replace(/(.)/g,"<div class='elem'>$1</div>");
					}
					build += "</div>";
				});
				console.log(build);
				/*for (var i = children.length - 1; i >= 0; i--) {
					tempChild = children[i].textContent.trim();

					if(children[i].localName !== "br")
						if(tempChild !== null && !children[i].hasChildNodes()){
							rowSplit = tempChild.split("");
							if(rowSplit.length > this.options.lineLength) {
								for (var j = 0; j < rowSplit.length; j += this.options.lineLength) {
									tempLine.push(rowSplit.slice(j,j+this.options.lineLength));
								}
								for (var k = tempLine.length - 1; k >= 0; k--) {
									build += "<div class='line'>" + tempLine[k].join("").replace(/(.)/g,"<div class='elem'>$1</div>")+"</div>";
								}
							} else {
								build += "<div class='line'>" + tempChild.replace(/(.)/g,"<div class='elem'>$1</div>")+"<div class='other'>parry</div></div>";
							}
						} else {
							build += "<div class='other'>"+tempChild+"</div>";
						}
				}*/
				build = build.replace(/「/g,"﹁");
				build = build.replace(/」/g,"﹂");
				document.querySelectorAll(options.selector)[0].innerHTML = build;

			}
		};
	}

	root.verticalizer = verticalizer();
	root.verticalizer.setVertical();
})(this);