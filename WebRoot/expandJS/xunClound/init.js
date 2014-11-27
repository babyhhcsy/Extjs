  Array.prototype.contains = function (item) {
	return RegExp("\\b"+item+"\\b").test(this);
};
String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {  
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {  
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi": "g")), replaceWith);  
    } else {  
        return this.replace(reallyDo, replaceWith);  
    }  
};
//单例模式，定一个对象
var xunCloud  = (function(){
	var instance;
	function init(){
		return {
			description:function(){
				console.log("方法进行了初始化");
			}
		}
	};
	return {
		getInstance:function(){
			if(instance){
				return instance
			}else{
				return init();
			}
		}
	}
})();