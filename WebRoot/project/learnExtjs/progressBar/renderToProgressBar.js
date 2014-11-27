Ext.onReady(function(){
	var progressBar = new Ext.ProgressBar({
		text:'使用renderTo的进度条进行定位',
		//进度条上的文字
		width:300,//设定进度条的宽度
		//以页面中的id作为RenderTo的对象；
		renderTo:'progressBar1'
	});
	var progressBar1 = new Ext.ProgressBar({
		text:'使用renderTo的进度条进行定位',
		//进度条上的文字
		width:300,//设定进度条的宽度
		//以页面中的id作为RenderTo的对象；
		renderTo:'progressBar2'
	});
	var progressBar3 = new Ext.ProgressBar({
		text:'使用renderTo的进度条进行定位',
		//进度条上的文字
		width:300,//设定进度条的宽度
		//以页面中的id作为RenderTo的对象；
		renderTo:'progressBar3'
	});
	var progressBar4 = new Ext.ProgressBar({
		text:'使用renderTo的进度条进行定位',
		//进度条上的文字
		width:300,//设定进度条的宽度
		//以页面中的id作为RenderTo的对象；
		renderTo:'progressBar4'
	});
	var progressBar5 = new Ext.ProgressBar({
		text:'使用renderTo的进度条进行定位',
		//进度条上的文字
		width:300,//设定进度条的宽度
		//以页面中的id作为RenderTo的对象；
		renderTo:'progressBar5'
	});
/*	<body>
  	<div id='progressBar1'>divprogress</div>
  	<table id='progressBar2'  >
		  <tr><th id='progressBar3'>Header</th></tr>
		  <tr><td id='progressBar4'>Data</td></tr>
	  </table>
	  <table id='progressBar5'  ></table>
  <div id="show">12</div>
  	<button id="myButton">点击我</button>
  </body>
 */
});


