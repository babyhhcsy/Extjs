Ext.onReady(function(){
	var msgBox = Ext.MessageBox.show({
		title:'��ʾ',
		msg:'��̬���µ���Ϣ����',
		modal:true,
		buttons:Ext.Msg.OK,
		fu:function(){
			//ֹͣ��ʱ����
			Ext.TaskManager.stop(task);
		}
		//Ext.TaskManager��һ�������࣬������ʱִ�г���
	});
	//��̬����ʾʱ��
	var task = {
		run:function(){
			msgBox.updateText('�ᶯ��ʱ��'+Ext.util.Format.date(new Date(),'Y-m-d H:i:s'));
		},
		interval:1000
	}
	Ext.TaskManager.start(task);
});