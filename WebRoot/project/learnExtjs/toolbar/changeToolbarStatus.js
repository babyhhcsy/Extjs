Ext.onReady(function(){
	var toolbar = new Ext.toolbar.Toolbar({
		renderTo:'toolbar',
		width:500,
		items:[{
			text:'新建',
			handler:onButtonClick
		},{
			text:'打开',
			handler:onButtonClick
		},{
			text:'保存',
			handler:onButtonClick
		}]
	});
	function onButtonClick(btn){
		Ext.MessageBox.show({
			title:'提示',
			msg:'您点击的按钮为：'+ btn.text,
			buttons:Ext.Msg.YES
		});
	}
	Ext.get('enableBtn').on('click',function(){
		toolbar.enable();
	});
	Ext.get('disabledBtn').on('click',function(){
		toolbar.disable();
	})
});