/**
 * 增加String的方法支持
 * @author babyhhcsy
 * */
/**
 * 判断字符串以什么开头
 * */
String.prototype.startsWith=function(str){
    if(str==null||str==""||this.length==0||str.length>this.length)
    	return false;
    if(this.substr(0,str.length)==str)
    	return true;
    else
    	return false;
    return true;
};
/**
 * Array增强方法
 */
Array.prototype.contains = function (item) {
	return RegExp("\\b"+item+"\\b").test(this);
};