Ext.onReady(function(){
	Ext.MessageBox.prompt('��ʾ','����������',callBack,this,true,'����Ĭ��ֵ');	
	function callBack(id,msg){
		alert('�����İ�ťID�ǣ�'+id+'\n'+"����������ǣ�"+msg);
	}
});