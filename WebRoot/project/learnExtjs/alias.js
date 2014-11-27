(function(){
	Ext.onReady(function(){
		var obj = {
			say:function(){
				return "i can speak";
			}
		}
		/**
		 * 为obj对象中的say方法添加一个别名；
		 *  Ext.Function.alias 
		 *  	obj 对象；
		 *  	say 方法
		 * */
		var fn = Ext.Function.alias(obj,"say");
		alert(fn());
	});
	
})();