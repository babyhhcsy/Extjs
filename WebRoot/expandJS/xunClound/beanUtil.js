/**
 * bean���󹤾߰�
 * */
Ext.namespace("xunCloud");
xunCloud.beanUtil = function(my){
	return {
		/**
		 * @description
		 * 		��ָ�����ַ���ת��Ϊ����
		 * @params
		 * 		String properties Ҫ������ַ�����ʽ  �磺id-name-age
		 * @return	
		 * 		Object entityһ��ʾ���Ķ���
		 * ʹ�÷�ʽ
		 * 		var util = xunCloud.beanUtil.string2Obj("id-name-age");
		 *		console.log(new util());
		 * */
		string2Obj : function(properties){
			var tempJson = properties.replaceAll("-","\":\"\",\"");
			var reslutObj = Ext.decode("{\""+tempJson+"\":\"\"}");
			xunCloud.Entity = Ext.emptyFn;
			//����û����ѵĶ��󣬲�ת��Ϊʵ�����
			Ext.apply(xunCloud.Entity.prototype,reslutObj);
			return xunCloud.Entity;
		}
	}
}();