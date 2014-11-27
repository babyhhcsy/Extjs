Ext.onReady(function(){
	Ext.MessageBox.alert('提示','请点击我，确定',callBack);
	function callBack(id){
		alert('单击我的按钮ID是：'+id);
	}
});