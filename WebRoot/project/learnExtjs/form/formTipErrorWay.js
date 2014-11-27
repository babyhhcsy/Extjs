Ext.onReady(function(){
	Ext.QuickTips.init();
	var form = new Ext.form.Panel({
		title:'表单',
		height:90,
		width:200,
		frame:true,
		renderTo:'toolbar',
		defaults:{
			autoFitErrors:false,//展示错误信息的时候是否自动调整字段组件宽度
			labelSeparator:':',//分隔符
			labelWidth:50,
			width:150,
			allowBlank:false,
			blankText:'不允许为空',
			labelAlign:'left',
			//msgTarget:'qtip'//显示一个浮动的提示信息
			//msgTarget:'title'
			msgTarget:'under'
			//msgTarget:'side'
			//msgTarget:'none'
			//msgTarget:'errorMsg'
		},
		items:[{
			xtype:'textfield',
			fieldLabel:'姓名'
		},{
			xtype:'numberfield',
			fieldLabel:'年龄'
		}]
	})
});





