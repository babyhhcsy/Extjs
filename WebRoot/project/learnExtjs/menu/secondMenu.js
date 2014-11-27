Ext.onReady(function(){
	var toolbar = new Ext.toolbar.Toolbar({
		renderTo:'toolbar',
		width:300
	});
	var infoMenu = new Ext.menu.Menu({
		ignoreParentClicks:true,
		plain:true,
		items:[{
			text:'个人信息',
			menu:new Ext.menu.Menu({
				ignoreParentClicks:true,
				items:[{
					text:'基本信息',
					menu:new Ext.menu.Menu({
						ignoreParentClicks:true,
						items:[{
							text:'身高',
							handler:onMenuItem
						},{
							text:'体重',
							handler:onMenuItem
						}]
					})
				}]
			})
		},{
			text:'公司信息'
		}]
	});
	toolbar.add({
		text:'设置',
		menu:infoMenu
	});
	function onMenuItem(item){
		alert(item.text);
	}
});



