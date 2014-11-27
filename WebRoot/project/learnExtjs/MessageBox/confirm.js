Ext.onReady(function(){
	Ext.MessageBox.confirm("提示","请点击我，做出选择",function(id){
		alert('单击的按钮的ID是：'+id);		
	});	
});