Ext.onReady(function(){
	var toolbar = new Ext.toolbar.Toolbar({
		renderTo: 'toolbar',
		width:300
	});
	var fileMenu = new Ext.menu.Menu({
		items:[{
			xtype:'textfield',
			hideLabel:true,
			width:100
		},{
			text:'颜色选择',
			menu:new Ext.menu.ColorPicker()
		},{
			xtype:'datepicker'
		},{
			xtype:'buttongroup',
			columns:3,
			title:'按钮组',
			items:[{
				text:'用户管理',
				scale:'large',
				colspan:3,
				width:170,
				iconCls:'userManager',
				iconAlign:'top'
			},{
				text:'新建',
				iconCls:'newIcon'
			},{
				text:'新建',
				iconCls:'openIcon'
			},{
				text:'保存',
				iconCls:'saveIcon'
			},{
				text:'保存',
				scale:'large',
				iconCls:'saveIcon',
				colspan:3,
				iconAlign:'top'
			},{
				text:'保存',
				iconCls:'saveIcon'
			}]
		}]
	});
	toolbar.add({
		text:'文件',
		menu:fileMenu
	})
});



