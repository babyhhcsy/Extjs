Ext.onReady(function(){
	var toolbar = new Ext.toolbar.Toolbar({
		renderTo : 'toolbar',
		width:300
	});
	toolbar.add([{
		text:'新建',
		idFlag:'new',
		handler:onButtonClick,
		iconCls:'newIcon'
	},{
		text:'打开',
		handler:onButtonClick,
		iconCls:'openIcon'
	},{
		text:'保存',
		handler:onButtonClick,
		iconCls:'saveIcon'
	}]);
	function onButtonClick(btn){
		Ext.MessageBox.buttonText.yes = '确定'
		Ext.MessageBox.show({
			title:'提示',
			msg:'你点击的按钮是：'+ btn.idFlag,
			buttons:Ext.Msg.YES
		});
	}
});
/*		
 * 在button中定义一些属性，这些属性会自动到添加对应的button对象当中，可以用来做区分用户点击了那一个按钮
 *		.saveIcon{
			background: url(learnExtjs/images/save.gif)
		}
		.openIcon{
			background: url(learnExtjs/images/open.gif)
		}
		.newIcon{
			background: url(learnExtjs/images/new.gif)
		}
*/