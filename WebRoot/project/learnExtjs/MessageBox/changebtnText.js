Ext.onReady(function(){
	//�����ð�ť֮ǰ���ð�ť����������
	Ext.MessageBox.buttonText.yes = '���ĺ������'
	Ext.MessageBox.show({
		title:'��ʾ',
		msg:'�Զ��尴ť�ϵ�����',
		modal:true,
		buttons:Ext.Msg.YESNOCANCEL
	});
	//ok
	Ext.MessageBox.msgButtons[0].setText('ȷ��');
	//yes
	Ext.MessageBox.msgButtons[1].setText("��");
	//no
	Ext.MessageBox.msgButtons[2].setText("��");
	//cancel
	Ext.MessageBox.msgButtons[3].setText("ȡ��");
	
	
});