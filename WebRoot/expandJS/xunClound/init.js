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
//����ģʽ����һ������
var xunCloud  = (function(){
	var instance;
	function init(){
		return {
			description:function(){
				console.log("���������˳�ʼ��");
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