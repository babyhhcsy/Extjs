Ext.onReady(function(){
	var msgBox = Ext.MessageBox.show({
		title:'提示',
		msg:'动态更新的信息文字',
		modal:true,
		buttons:Ext.Msg.OK,
		fu:function(){
			//停止定时任务
			Ext.TaskManager.stop(task);
		}
		//Ext.TaskManager是一个功能类，用来定时执行程序；
	});
	//动态的显示时间
	var task = {
		run:function(){
			msgBox.updateText('会动的时间'+Ext.util.Format.date(new Date(),'Y-m-d H:i:s'));
		},
		interval:1000
	}
	Ext.TaskManager.start(task);
});