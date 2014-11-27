Ext.onReady(function(){
	var testForm = new Ext.form.Panel({
		title:'Ext.form.field.Trigger',
		bodyStyle:'padding 5 5 5 5',
		frame:true,
		width:270,
		renderTo:'form',
		defaults:{
			labelSeparator:':',
			labelWidth:70,
			width:200,
			labelAlign:'left'
		},
		items:[{
			xtype:'triggerfield',
			id:'memo',
			fieldLabel:'触发字段',
			hideTrigger:false,//不隐藏触发按钮
			onTriggerClick:function(){
				var memo = testForm.getForm().findField('memo');//取得深入的控件
				alert(memo.getValue());
				Ext.getCmp('memo').setValue('test');;
			}
		}]
	});
});