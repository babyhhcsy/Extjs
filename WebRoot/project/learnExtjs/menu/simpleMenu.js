Ext.onReady(function(){
	var toolbar = new Ext.toolbar.Toolbar({
		renderTo:'toolbar',
		width:300
	})
	var fileMenu = new Ext.menu.Menu({
		shadow:'frame',//���������Ƿ�����Ӱ
		allowOtherMenus:true,
		items:[
			new Ext.menu.Item({
				text:'�½�',
				handler:onMenuItem
			}),
			{text:'��',handler:onMenuItem},
			{text:'�ر�',handler:onMenuItem}
		]
	});
	var editMenu = new Ext.menu.Menu({
		shadow:'drop',//���ò˵���������������Ӱ
		allowOtherMenus:true,
		items:[{
			text:'����',
			handler:onMenuItem
		},{
			text:'ճ��',
			handler:onMenuItem
		},{
			text:'����',
			handler:onMenuItem
		}]
	});
	toolbar.add({
		text:'�ļ�',
		menu:fileMenu
	},{
		text:'�༭',
		menu:editMenu
	});
	function onMenuItem(item){
		alert(item.text);	
	}
	
});