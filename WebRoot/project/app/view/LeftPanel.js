Ext.define('app.view.LeftPanel',{
	extend:'Ext.panel.Panel',
	layout:'fit',
	title:'导航栏',
	region: 'west',
	collappsible:true,
	width:175,
	layout:'accordion',
	initComponent : function() {
	   this.items = [{
	        title: 'Panel 1',
	        html: 'Panel content!'
	    },{
	        title: 'Panel 2',
	        html: 'Panel content!'
	    },{
	        title: 'Panel 3',
	        html: 'Panel content!'
	    }],
	    this.callParent(arguments);
	}
	
});