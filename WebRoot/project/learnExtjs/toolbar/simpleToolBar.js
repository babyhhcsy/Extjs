Ext.onReady(function(){
	var toolbar = new Ext.toolbar.Toolbar({
		renderTo : 'toolbar',
		width:300
	});
	toolbar.add([{
		text:'�½�',
		idFlag:'new',
		handler:onButtonClick,
		iconCls:'newIcon'
	},{
		text:'��',
		handler:onButtonClick,
		iconCls:'openIcon'
	},{
		text:'����',
		handler:onButtonClick,
		iconCls:'saveIcon'
	}]);
	function onButtonClick(btn){
		Ext.MessageBox.buttonText.yes = 'ȷ��'
		Ext.MessageBox.show({
			title:'��ʾ',
			msg:'�����İ�ť�ǣ�'+ btn.idFlag,
			buttons:Ext.Msg.YES
		});
	}
});
/*		
 * ��button�ж���һЩ���ԣ���Щ���Ի��Զ�����Ӷ�Ӧ��button�����У����������������û��������һ����ť
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