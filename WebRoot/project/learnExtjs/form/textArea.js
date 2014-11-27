Ext.onReady(function(){
	Ext.QuickTips.init();
	var testForm = new Ext.form.Panel({
		title:'Ext.form.field.TextAreaʾ��',
		bodyStyle:'padding:5 5 5 5',
		frame:true,
		height:200,
		width:400,
		renderTo:'form',
		items:[{
			xtype:'textarea',
			fieldLabel:'��ʾ',
			id:'memo',
			labelSeparator:':',
			labelWidth:60,
			width:200,
			maxLength:1000,
			tipwin : null,
			enableKeyEvents:true,
			listeners : {
				focus:function(cmp,e){
					if(!cmp.tipwin){
						cmp.tipwin = new Ext.ToolTip({ 
						  target : cmp.getContentTarget(),
						  html : '0/'+cmp.maxLength, 
						  anchor: 'left',//�趨��ʾ�Ƿ������ͷ�����һ�������
						  hideDelay :false,
						  autoHeight : true,  
						  autowidth : true,
						  dismissDelay :0,
						  trackMouse: true//�Ƿ�����������ƶ�
						}); 
					}
					cmp.tipwin.show();
				},
				blur : function (cmp){
					cmp.tipwin.hide();
				},
				keyup : function(cmp,e){
					var currentLength = cmp.getValue().length;
					if(currentLength > cmp.maxLength){
						cmp.setValue(cmp.getValue().substring(0,cmp.maxLength));
					}
					cmp.tipwin.update(cmp.getValue().length + '/' + cmp.maxLength);
				   }
	     	}
		}],
		buttons:[{
			text:'ȷ��',
			handler:showValue
		}]
		
	});
	//���form����е�����
	function showValue(){
		var meo = testForm.getForm().findField("memo");
		alert(meo.getValue());
	}
});




















