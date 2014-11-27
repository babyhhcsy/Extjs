Ext.onReady(function(){
	//在设置按钮之前设置按钮的文字内容
	Ext.MessageBox.buttonText.yes = '更改后的内容'
	Ext.MessageBox.show({
		title:'提示',
		msg:'自定义按钮上的文字',
		modal:true,
		buttons:Ext.Msg.YESNOCANCEL
	});
	//ok
	Ext.MessageBox.msgButtons[0].setText('确定');
	//yes
	Ext.MessageBox.msgButtons[1].setText("是");
	//no
	Ext.MessageBox.msgButtons[2].setText("否");
	//cancel
	Ext.MessageBox.msgButtons[3].setText("取消");
	
	
});