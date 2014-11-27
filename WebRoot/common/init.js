/**
 * 初始化
 */

Ext.BLANK_IMAGE_URL = "ui/js/extjs/resources/images/default/s.gif";
Ext.QuickTips.init();
//Ext.form.Field.prototype.msgTarget = "size"; // 统一指定错误信息提示方式
var centerPanel;
/**
* @author Zhang Hao(Leo) 
* @date : Nov 23, 2011 4:46:22 PM
* 修改了原来的系统提示.
* 新增了关闭按钮,与设置是否自动隐藏,及自动隐藏时间
* eg:xx.msgWindow.msg('xx',false,0);不自动隐藏
* eg:xx.msgWindow.msg('xx',true,10);10秒后隐藏
*/
var msgWindow = function(msg,autoHide,pauseTime) {
	//Ext.example.msg('系统提示', msg);
	//如果没有输入是否自动隐藏.与时间参数.则默认,10秒自动隐藏
	if(autoHide && pauseTime){
		MsgTip.msg('系统提示', msg,autoHide,pauseTime);
	}else{
		MsgTip.msg('系统提示', msg,true,10);
	}
}
var errorMsg = function(){
	MsgTip.msg('系统提示', '服务器出现错误,请稍后再试!',true,5);
	//Ext.example.msg('系统提示', "服务器出现错误,请稍后再试!");
}

//js获取项目根路径，如： http://localhost:8083/uimcardprjfunction 
function getRootPath(){    
	//获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp    
	var curWwwPath=window.document.location.href;    
	//获取主机地址之后的目录，如： uimcardprj/share/meun.jsp    
	var pathName=window.document.location.pathname;    
	var pos=curWwwPath.indexOf(pathName);    
	//获取主机地址，如： http://localhost:8083    
	var localhostPaht=curWwwPath.substring(0,pos);    
	//获取带"/"的项目名，如：/uimcardprj    
	var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);  
	//console.log('项目路径：'+localhostPaht+projectName);
	return(localhostPaht+projectName);
}

//表格快速提示信息
/**
 * 
 * @param {} grid 需要提示信息的表格
 * @param {} callback 回调函数：参数tip tip.body.dom.innerHTML设置html内容，参数data 表格的当前record
 */
function gridQuickTips(grid,callback){
	var store = grid.getStore();
	var view = grid.getView();
	grid.tip = new Ext.ToolTip({
		 target: view.mainBody,
		 delegate: '.x-grid3-row',
		 trackMouse: true,
		 renderTo: document.body,
		 listeners: {
		 	beforeshow: function updateTipBody(tip) {
		 		var rowIndex = view.findRowIndex(tip.triggerElement);
		 		var data = store.getAt(rowIndex);
//		 		var html = tip.body.dom.innerHTML;
		 		callback(tip,data)
		 	}
		 }
	})
}