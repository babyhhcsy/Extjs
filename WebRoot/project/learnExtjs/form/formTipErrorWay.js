Ext.onReady(function(){
	Ext.QuickTips.init();
	var form = new Ext.form.Panel({
		title:'��',
		height:90,
		width:200,
		frame:true,
		renderTo:'toolbar',
		defaults:{
			autoFitErrors:false,//չʾ������Ϣ��ʱ���Ƿ��Զ������ֶ�������
			labelSeparator:':',//�ָ���
			labelWidth:50,
			width:150,
			allowBlank:false,
			blankText:'������Ϊ��',
			labelAlign:'left',
			//msgTarget:'qtip'//��ʾһ����������ʾ��Ϣ
			//msgTarget:'title'
			msgTarget:'under'
			//msgTarget:'side'
			//msgTarget:'none'
			//msgTarget:'errorMsg'
		},
		items:[{
			xtype:'textfield',
			fieldLabel:'����'
		},{
			xtype:'numberfield',
			fieldLabel:'����'
		}]
	})
});





