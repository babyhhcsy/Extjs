Ext.onReady(function(){
	Ext.MessageBox.show({
		title:'��ʾ',
		msg:'����3����ť����1�������ı�����',
		modal:true,
		prompt:true,
		value:'������',
		fn:callBack,
		buttons:Ext.Msg.YESNOCANCEL,
		icon:Ext.Msg.QUESTION
	})	;
	function callBack(id,msg){
		alert('�����İ�ťID�ǣ�'+id+'\n'+'�����������'+msg);
	}
})