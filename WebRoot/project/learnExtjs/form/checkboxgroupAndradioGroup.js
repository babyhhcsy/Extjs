Ext.onReady(function(){
	new Ext.form.FormPanel({
		title:'CheckboxGroup和RadioGroup组件示例',
		bodyStyle:'padding 5 5 5 5 ',
		frame:true,
		height:130,
		width:270,
		renderTo:'form',
		defaults:{
			labelSeparator:':',
			labelWidth:50,
			width:200,
			labelAlign:'left'
		},
		items:[{
			xtype:'radiogroup',
			fieldLabel:'性别',
			columns:2,
			items:[
				{boxLabel:'男',name:'sex',inputValue:'male'},
				{boxLabel:'女',name:'sex',inputValue:'female'}
			]
		},{
			xtype:'checkboxgroup',
			fieldLabel:'爱好',
			columns:3,
			items:[{
				boxLabel:'游泳',
				name:'swim'
			},{
				boxLabel:'散步',
				name:'walk'
			},{
				boxLabel:'阅读',
				name:'read'
			},{
				boxLabel:'游戏',
				name:'game'
			},{
				boxLabel:'电影',
				name:'movie'
			}]
		}]
	});
	
});