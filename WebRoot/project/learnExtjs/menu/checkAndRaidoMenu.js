Ext.onReady(function(){
	var toolbar = new Ext.toolbar.Toolbar({
		renderTo:'toolbar',
		width:300
	});
	var themeMenu = new Ext.menu.Menu({
		items:[{
			text:'������ɫ',
			menu:new Ext.menu.Menu({
				items:[{
					text:'��ɫ����',
					checked:true,
					group:'theme',
					checkHandler:onItemCheck
				},{
					text:'��ɫ����',
					checked:false,
					group:'theme',
					checkHandler:onItemCheck
				},{
					text:'��ɫ����',
					checked:false,
					group:'theme',
					checkHandler:onItemCheck
				}]			
			})
		},{
			text:'�Ƿ�����',
			checked:false
		}]
	});
	toolbar.add({
		text:'���ѡ��',
		menu:themeMenu
	})
	function onItemCheck(item){
		alert(item.text);
	}
});





