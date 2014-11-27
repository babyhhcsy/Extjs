Ext.onReady(function(){
	var msgBox = Ext.MessageBox.show({
		title:'提示',
		msg:'动态更新的进度条和信息文字',
		modal:true,
		width:300,
		progress:true
	});	
	var count = 0; //滚动条被刷新的次数；
	var percentage = 0 ; //进度百分比
	var progressText = ''//进度条信息；
	var task = {
		run:function(){
			count++;
			percentage = count/10;
			progressText =  '当前完成'+ percentage*100 + "%";
			//更新提示框中的对话框
			msgBox.updateProgress(percentage,progressText,'当前时间：'+
			Ext.util.Format.date(new Date(),'Y-m-d H:i:s'));
			//刷新10次后关闭提示对话框
			if(count > 10 ){
				Ext.TaskManager.stop(task);
				msgBox.hide();
			}
		},
		interval:1000
	}
	Ext.TaskManager.start(task);
});