Ext.onReady(function(){
	var progressBar = new Ext.ProgressBar({
		text:'working',
		width:300,
		renderTo:'progressBar1'
	})
	progressBar.wait({
		duration:10000,//进度条持续的时间/秒
		interval:1000,//每1秒钟更新一次
		increment:10,//更新完毕时间
		text:'waiting',//进度条上的文字
		scope:this,//回调函数的执行范围
		fn:function(){
			alert("更新完毕");
			progressBar.hide();
		}
	});
	
});