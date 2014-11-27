(function(){
	Ext.onReady(function(){
		new Ext.form.Panel({
			title:'Ext.form.fiel.spinner示例',
			bodyStyle:'padding 5 5 5 5',
			frame:true,
			height:70,
			width:250,
			renderTo:'form',
			defaults:{
				labelSeparator:':',
				labelWidth:70,
				width:200,
				labelAlign:'left'
			},
			items:[{
				xtype:'spinnerfield',
				fieldLabel:'微调字段',
				id:'salary',
				value:100,
				onSpinUp:function(){//向上的箭头
					var salaryCmp = Ext.getCmp('salary');
					salaryCmp.setValue(Number(salaryCmp.getValue())+1);
				},
				onSpinDown:function(){//向下的箭头
					var salaryCmp = Ext.getCmp('salary');
					salaryCmp.setValue(Number(salaryCmp.getValue())-1);
				}
			}]
		});		
	});
})();