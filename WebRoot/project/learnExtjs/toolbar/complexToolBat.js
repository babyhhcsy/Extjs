Ext.onReady(function(){
	var toolbar = new Ext.toolbar.Toolbar({
		renderTo:'toolbar',
		width:500
	});
	toolbar.add({
		text:'�༭'
	},{
		text:'��'
	},'-',{
		xtype:'textfield',
		hideLabel:true,
		width:150
	},'->','<a href = #>������</a>',{
		xtype:'tbspacer',
		width:50
	},'��̬�ı�');
})