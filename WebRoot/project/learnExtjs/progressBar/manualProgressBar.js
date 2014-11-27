Ext.onReady(function(){
	var progressBar = new Ext.ProgressBar({
		width:300,
		renderTo:'progressBar1'
	});
	var count = 0;
	var percentage  = 0 ;
	var progressText = '';
	Ext.TaskManager.start({
		run:function(){
			count++;
			if(count>10){
				ProgressBar.hide();
			}
			percentage = count/10;
			progressText = percentage*100 +"%";
			progressBar.updateProgress(percentage,progressText,true);
		},
		interval:1000
		
	});
});