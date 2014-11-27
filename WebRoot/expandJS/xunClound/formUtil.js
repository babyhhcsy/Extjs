/**
 * bean对象工具包
 * */
Ext.namespace("xunCloud");
xunCloud.formUtil = function(){
	return {
	   /**
	    * @description
	    * 	比较两个日期的大小,同时可以操作表单的错误显示信息
	    * @params
	    *    Object startDateObj 第一个日期表单对象
	    * 	 Object endDateObj   第二个日期表单对象
	    * @returns
	    * 	true表示开始日期大于了结束日期
	    * 	false表示开始日期小于结束日期
	    */
		compare2Date:function(startDateObj,endDateObj){
			if ( startDateObj.getRawValue() && endDateObj.getRawValue() ){
				  if ( startDateObj.getRawValue() > endDateObj.getRawValue() ){
					startDateObj.markInvalid( "不能大于"+ endDateObj.fieldLabel );
					endDateObj.markInvalid( "不能小于"+  startDateObj.fieldLabel );
				  	return true;  	
				  }else{
			   		 return false;
				  }
			 }else{
			 	return false;
			 }
  	 	}
	}
}();