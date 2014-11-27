Ext.onReady(function(){
	var toolbar = new Ext.toolbar.Toolbar({
		renderTo:'toolbar',
		width:500,
		items:[{
			text:'�½�',
			handler:onButtonClick
		},{
			text:'��',
			handler:onButtonClick
		},{
			text:'����',
			handler:onButtonClick
		}]
	});
	function onButtonClick(btn){
		Ext.MessageBox.show({
			title:'��ʾ',
			msg:'������İ�ťΪ��'+ btn.text,
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