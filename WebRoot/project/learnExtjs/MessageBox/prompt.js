Ext.onReady(function(){
	Ext.MessageBox.prompt('提示','请输入内容',callBack,this,true,'我是默认值');	
	function callBack(id,msg){
		alert('单击的按钮ID是：'+id+'\n'+"输入的内容是："+msg);
	}
});