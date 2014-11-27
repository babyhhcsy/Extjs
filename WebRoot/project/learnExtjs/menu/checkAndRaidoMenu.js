Ext.onReady(function(){
	var toolbar = new Ext.toolbar.Toolbar({
		renderTo:'toolbar',
		width:300
	});
	var themeMenu = new Ext.menu.Menu({
		items:[{
			text:'主题颜色',
			menu:new Ext.menu.Menu({
				items:[{
					text:'红色主题',
					checked:true,
					group:'theme',
					checkHandler:onItemCheck
				},{
					text:'蓝色主题',
					checked:false,
					group:'theme',
					checkHandler:onItemCheck
				},{
					text:'黑色主题',
					checked:false,
					group:'theme',
					checkHandler:onItemCheck
				}]			
			})
		},{
			text:'是否启用',
			checked:false
		}]
	});
	toolbar.add({
		text:'风格选择',
		menu:themeMenu
	})
	function onItemCheck(item){
		alert(item.text);
	}
});





