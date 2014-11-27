Ext.onReady(function(){
	Ext.MessageBox.show({
		title:'提示',
		msg:'我有3个按钮，和1个多行文本区。',
		modal:true,
		prompt:true,
		value:'请输入',
		fn:callBack,
		buttons:Ext.Msg.YESNOCANCEL,
		icon:Ext.Msg.QUESTION
	})	;
	function callBack(id,msg){
		alert('单击的按钮ID是：'+id+'\n'+'输入的内容是'+msg);
	}
})