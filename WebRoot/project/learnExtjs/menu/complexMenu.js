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
			text:'��ɫѡ��',
			menu:new Ext.menu.ColorPicker()
		},{
			xtype:'datepicker'
		},{
			xtype:'buttongroup',
			columns:3,
			title:'��ť��',
			items:[{
				text:'�û�����',
				scale:'large',
				colspan:3,
				width:170,
				iconCls:'userManager',
				iconAlign:'top'
			},{
				text:'�½�',
				iconCls:'newIcon'
			},{
				text:'�½�',
				iconCls:'openIcon'
			},{
				text:'����',
				iconCls:'saveIcon'
			},{
				text:'����',
				scale:'large',
				iconCls:'saveIcon',
				colspan:3,
				iconAlign:'top'
			},{
				text:'����',
				iconCls:'saveIcon'
			}]
		}]
	});
	toolbar.add({
		text:'�ļ�',
		menu:fileMenu
	})
});



