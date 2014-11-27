Ext.onReady(function(){
	var progressBar = new Ext.ProgressBar({
		width:300,
		renderTo:'progressBar1',
		cls:'custom'
	});
	progressBar.wait({
		duration:10000,
		interval:1000,
		increment:10
	})
});
/*
 * 自定已的pagebar中的滚动条 
 *<style type="text/css" media="screen">
		.custom .x-progress-inner{
			height:17px;
			background: #ffffff;
		}
		.custom .x-progress-bar{
			height: 15px;
			background: transparent url(progressBar/images/custom-bar-green.gif) repeat-x 0 0;
			border-top: 1px solid #BEBEBE;
			border-bottom: 1px solid #EFEFEF;
			border-right: 0;
		}
	</style>
	*/