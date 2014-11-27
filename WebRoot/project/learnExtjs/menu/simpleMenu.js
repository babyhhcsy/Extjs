Ext.onReady(function(){
	var toolbar = new Ext.toolbar.Toolbar({
		renderTo:'toolbar',
		width:300
	})
	var fileMenu = new Ext.menu.Menu({
		shadow:'frame',//设置四周是否有阴影
		allowOtherMenus:true,
		items:[
			new Ext.menu.Item({
				text:'新建',
				handler:onMenuItem
			}),
			{text:'打开',handler:onMenuItem},
			{text:'关闭',handler:onMenuItem}
		]
	});
	var editMenu = new Ext.menu.Menu({
		shadow:'drop',//设置菜单在左、下两条有阴影
		allowOtherMenus:true,
		items:[{
			text:'复制',
			handler:onMenuItem
		},{
			text:'粘贴',
			handler:onMenuItem
		},{
			text:'剪切',
			handler:onMenuItem
		}]
	});
	toolbar.add({
		text:'文件',
		menu:fileMenu
	},{
		text:'编辑',
		menu:editMenu
	});
	function onMenuItem(item){
		alert(item.text);	
	}
	
});