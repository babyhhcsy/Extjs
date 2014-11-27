/**
 * bean对象工具包
 * */
Ext.namespace("xunCloud");
xunCloud.beanUtil = function(my){
	return {
		/**
		 * @description
		 * 		将指定的字符串转换为对象
		 * @params
		 * 		String properties 要传入的字符串格式  如：id-name-age
		 * @return	
		 * 		Object entity一个示例的对象
		 * 使用方式
		 * 		var util = xunCloud.beanUtil.string2Obj("id-name-age");
		 *		console.log(new util());
		 * */
		string2Obj : function(properties){
			var tempJson = properties.replaceAll("-","\":\"\",\"");
			var reslutObj = Ext.decode("{\""+tempJson+"\":\"\"}");
			xunCloud.Entity = Ext.emptyFn;
			//获得用户定已的对象，并转换为实体对象
			Ext.apply(xunCloud.Entity.prototype,reslutObj);
			return xunCloud.Entity;
		}
	}
}();