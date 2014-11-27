/**
 * @author babyhhcsy
 * panel的主框架viewpanel
 * */
Ext.define('app.view.MainFrameWork',{
	extend:'Ext.container.Viewport',
	layout:'border',
	initComponent : function() {
		this.items=[{
	        region: 'north',
	        html: '<h1 class="x-panel-header">Page Title</h1>',
	        border: false,
	        margins: '0 0 5 0'
	    }, {
	        region: 'west',
	        collapsible: true,
	        title: 'Navigation',
	        width: 150
	        // could use a TreePanel or AccordionLayout for navigational items
	    }, 'LeftPanel', {
	        region: 'east',
	        title: 'East Panel',
	        collapsible: true,
	        split: true,
	        width: 150
	    }, {
	        region: 'center',
	        xtype: 'tabpanel', // TabPanel itself has no title
	        activeTab: 0,      // First tab active by default
	        items: {
	            title: 'Default Tab',
	            html: 'The first tab\'s content. Others may be added dynamically'
	        }
	    }],
		this.callParent(arguments);
	},
	
});