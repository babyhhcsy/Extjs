/**
 * bean���󹤾߰�
 * */
Ext.namespace("xunCloud");
xunCloud.formUtil = function(){
	return {
	   /**
	    * @description
	    * 	�Ƚ��������ڵĴ�С,ͬʱ���Բ������Ĵ�����ʾ��Ϣ
	    * @params
	    *    Object startDateObj ��һ�����ڱ�����
	    * 	 Object endDateObj   �ڶ������ڱ�����
	    * @returns
	    * 	true��ʾ��ʼ���ڴ����˽�������
	    * 	false��ʾ��ʼ����С�ڽ�������
	    */
		compare2Date:function(startDateObj,endDateObj){
			if ( startDateObj.getRawValue() && endDateObj.getRawValue() ){
				  if ( startDateObj.getRawValue() > endDateObj.getRawValue() ){
					startDateObj.markInvalid( "���ܴ���"+ endDateObj.fieldLabel );
					endDateObj.markInvalid( "����С��"+  startDateObj.fieldLabel );
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