Ext.onReady(function(){
	var toolbar = new Ext.toolbar.Toolbar({
		renderTo:'toolbar',
		width:300
	});
	var infoMenu = new Ext.menu.Menu({
		ignoreParentClicks:true,
		plain:true,
		items:[{
			text:'������Ϣ',
			menu:new Ext.menu.Menu({
				ignoreParentClicks:true,
				items:[{
					text:'������Ϣ',
					menu:new Ext.menu.Menu({
						ignoreParentClicks:true,
						items:[{
							text:'���',
							handler:onMenuItem
						},{
							text:'����',
							handler:onMenuItem
						}]
					})
				}]
			})
		},{
			text:'��˾��Ϣ'
		}]
	});
	toolbar.add({
		text:'����',
		menu:infoMenu
	});
	function onMenuItem(item){
		alert(item.text);
	}
});



