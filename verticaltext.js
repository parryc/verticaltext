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
			_difference: function(array){
				if(this.options.noOutsideWrap)
					return " style='margin-bottom: "+(this.options.lineLength-array.length)+"em' ";
				else
					return "";
			},
			setVertical: function(){
				var split = this.rawHtml.split(/<br\/?>/),
					children = this.children,
					build = "",
					tempLine = [],
					tempChild = "",
					rowSplit;

				split.reverse();


				for (var i = children.length - 1; i >= 0; i--) {
					tempChild = children[i].textContent.trim();
					if(tempChild !== null && !children[i].hasChildNodes()){
						rowSplit = tempChild.split("");
						if(rowSplit.length > this.options.lineLength) {
							for (var j = 0; j < rowSplit.length; j += this.options.lineLength) {
								tempLine.push(rowSplit.slice(j,j+this.options.lineLength));
							}
							for (var k = tempLine.length - 1; k >= 0; k--) {
								build += "<div class='line'"+this._difference(tempLine[k])+">" + tempLine[k].join("").replace(/(.)/g,"<div class='elem'>$1</div>") + "</div>";
							}
						} else {
							build += "<div class='line'"+this._difference(tempChild.trim().split(""))+">" + tempChild.replace(/(.)/g,"<div class='elem'>$1</div>") + "</div>";
						}
					} else {
						build += "<div class='line'>"+tempChild+"</div>";
					}
				}
				build = build.replace(/「/g,"﹁");
				build = build.replace(/」/g,"﹂");
				document.querySelectorAll(options.selector)[0].innerHTML = build;

			}
		};
	}
	root.verticalizer = verticalizer();
	root.verticalizer.setVertical();
})(this);