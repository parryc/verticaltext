(function(root){
	var options = {
				selector: "[lang=lzh]",
				lineLength: 20,
				noOutsideWrap: true
			},
		rawHtml = document.querySelectorAll(options.selector)[0].innerHTML.trim();

	String.prototype.reverse=function(){return this.split("").reverse().join("");};

	function verticalizer(){
		return {
			options: options,
			rawHtml: rawHtml,
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
					build = "",
					tempLine = [],
					rowSplit;

				split.reverse();

				for(var i = 0; i < split.length; i++){
					split[i] = split[i].trim();
					rowSplit = split[i].split("");
					if(rowSplit.length > this.options.lineLength) {
						for (var j = 0; j < rowSplit.length; j += this.options.lineLength) {
							tempLine.push(rowSplit.slice(j,j+this.options.lineLength));
						}
						for (var k = tempLine.length - 1; k >= 0; k--) {
							build += "<div class='line'"+this._difference(tempLine[k])+">" + tempLine[k].join("").replace(/(.)/g,"<div class='elem'>$1</div>") + "</div>";
						}
					} else {
						build += "<div class='line'"+this._difference(split[i].trim().split(""))+">" + split[i].replace(/(.)/g,"<div class='elem'>$1</div>") + "</div>";
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