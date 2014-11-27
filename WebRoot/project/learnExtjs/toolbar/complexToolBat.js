Ext.onReady(function(){
	var toolbar = new Ext.toolbar.Toolbar({
		renderTo:'toolbar',
		width:500
	});
	toolbar.add({
		text:'编辑'
	},{
		text:'打开'
	},'-',{
		xtype:'textfield',
		hideLabel:true,
		width:150
	},'->','<a href = #>超链接</a>',{
		xtype:'tbspacer',
		width:50
	},'静态文本');
})