Ext.onReady(function(){
	var msgBox = Ext.MessageBox.show({
		title:'��ʾ',
		msg:'��̬���µĽ���������Ϣ����',
		modal:true,
		width:300,
		progress:true
	});	
	var count = 0; //��������ˢ�µĴ�����
	var percentage = 0 ; //���Ȱٷֱ�
	var progressText = ''//��������Ϣ��
	var task = {
		run:function(){
			count++;
			percentage = count/10;
			progressText =  '��ǰ���'+ percentage*100 + "%";
			//������ʾ���еĶԻ���
			msgBox.updateProgress(percentage,progressText,'��ǰʱ�䣺'+
			Ext.util.Format.date(new Date(),'Y-m-d H:i:s'));
			//ˢ��10�κ�ر���ʾ�Ի���
			if(count > 10 ){
				Ext.TaskManager.stop(task);
				msgBox.hide();
			}
		},
		interval:1000
	}
	Ext.TaskManager.start(task);
});