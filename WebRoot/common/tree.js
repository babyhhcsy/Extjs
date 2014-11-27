
/**
 * @author shangwu
 * @version 1.1 2010-3-13 9:31:41
 * @description EAI树形菜单
 */

//树形节点
var navigateTree = new Ext.tree.TreeNode({
	id:'navigateTree',
	text:'EAI系统'
});

var eai_master_data_maintenance = new Ext.tree.TreeNode({
	id:'eai_master_data_maintenance',
	text:'主数据管理'
});


var materialNode = new Ext.tree.TreeNode({
	id:'materialNode',
	text:'物料主数据',
	listeners:{
		click:function(node,event){
			addTabPanelByPage(node,event);
		}
	}
});

var material_add = new Ext.tree.TreeNode({
	id:'material_add',
	text:'创建物料',
	listeners:{
		click:function(node,event){
			addTabPanelByPage(node,event,"material.do?op=add");
		}
	}
});
var material_modify = new Ext.tree.TreeNode({
	id:'material_modify',
	text:'修改物料',
	listeners:{
		click:function(node,event){
			addTabPanelByPage(node,event,"material.do?op=modify");
		}
	}
});
var material_query = new Ext.tree.TreeNode({
	id:'material_query',
	text:'查询物料',
	listeners:{
		click:function(node,event){
			addTabPanelByPage(node,event,"material.do?op=query");
		}
	}
});
var material_other = new Ext.tree.TreeNode({
	id:'material_other',
	text:'拓展',
	listeners:{
		click:function(node,event){
			addTabPanelByPage(node,event,"material.do?op=other");
		}
	}
});

//客户
var cust = new Ext.tree.TreeNode({
	id:'cust',
	text:'客户'
});

//客户添、删、改、查
var cust_add = new Ext.tree.TreeNode({
	id:'cust_add',
	text:'添加',
	listeners:{
		click:function(node,event){
			addTabPanelByPage(node,event,"cust.do?action=add");
		}
	}
});

var cust_modify = new Ext.tree.TreeNode({
	id:'cust_modify',
	text:'修改',
	listeners:{
		click:function(node,event){
			addTabPanelByPage(node,event,"cust.do?action=modify");
		}
	}
});

var cust_query = new Ext.tree.TreeNode({
	id:'cust_query',
	text:'查询',
	listeners:{
		click:function(node,event){
			addTabPanelByPage(node,event,"cust.do?action=query");
		}
	}
});

//客户物料
var custMat = new Ext.tree.TreeNode({
	id:'custMat',
	text:'客户物料'
});

//客户物料添、删、改、查
var custMat_add = new Ext.tree.TreeNode({
	id:'custMat_add',
	text:'添加',
	listeners:{
		click:function(node,event){
			//addTabPanelByPage(node,event,"ui/jsp/custMat/custMat_add.jsp");
			addTabPanelByPage(node,event,"custMat.do?action=add");
		}
	}
});

var custMat_modify = new Ext.tree.TreeNode({
	id:'custMat_modify',
	text:'修改',
	listeners:{
		click:function(node,event){
			addTabPanelByPage(node,event,"custMat.do?action=modify");
		}
	}
});

var custMat_query = new Ext.tree.TreeNode({
	id:'custMat_query',
	text:'查询',
	listeners:{
		click:function(node,event){
			addTabPanelByPage(node,event,"custMat.do?action=query");
		}
	}
});

//定价
var princing = new Ext.tree.TreeNode({
	id:'princing',
	text:'定价'
});

//定价添、删、改、查
var princing_add = new Ext.tree.TreeNode({
	id:'princing_add',
	text:'添加',
	listeners:{
		click:function(node,event){
			addTabPanelByPage(node,event,"princing.do?action=addType");
		}
	}
});

var princing_modify = new Ext.tree.TreeNode({
	id:'princing_modify',
	text:'修改',
	listeners:{
		click:function(node,event){
			addTabPanelByPage(node,event,"princing.do?action=modifyType");
		}
	}
});


var eai_qutationNode = new Ext.tree.TreeNode({
	id:'eai_qutationNode',
	text:'报价单'
}); 
var qutation_add = new Ext.tree.TreeNode({
	id:'qutation_add',
	text:'创建报价单',
	listeners:{
		click:function(node,event){
			addTabPanelByPage(node,event,"va21.do?action=save");
		}
	}
});
var qutation_modify = new Ext.tree.TreeNode({
	id:'qutation_modify',
	text:'更改报价单',
	listeners:{
		click:function(node,event){
			addTabPanelByPage(node,event,"va21.do?action=modify");
		}
	}
});
var qutation_query = new Ext.tree.TreeNode({
	id:'qutation_query',
	text:'报价单查询',
	listeners:{
		click:function(node,event){
			addTabPanelByPage(node,event,"va21.do?action=query");
		}
	}
});


navigateTree.appendChild(eai_master_data_maintenance);

navigateTree.appendChild(eai_qutationNode);

//报价单
eai_qutationNode.appendChild(qutation_add)
eai_qutationNode.appendChild(qutation_modify)
eai_qutationNode.appendChild(qutation_query)

//物料主数据
eai_master_data_maintenance.appendChild(materialNode);
materialNode.appendChild(material_add);
materialNode.appendChild(material_modify);
materialNode.appendChild(material_query);
materialNode.appendChild(material_other);

//客户
eai_master_data_maintenance.appendChild(cust);
cust.appendChild(cust_add);
cust.appendChild(cust_modify);
cust.appendChild(cust_query);

//客户物料
eai_master_data_maintenance.appendChild(custMat);
custMat.appendChild(custMat_add);
custMat.appendChild(custMat_modify);
custMat.appendChild(custMat_query);

//定价
eai_master_data_maintenance.appendChild(princing);
princing.appendChild(princing_add);
princing.appendChild(princing_modify);



/* ----------相关方法---------- */
function addTabPanelByPage(node,event,pageName){
	event.stopEvent();
	var n = centerPanel.getComponent(node.id);
	if(!n){
		n = centerPanel.add({
			id:node.id,
			title:node.parentNode.text+" - "+node.text,
			closable:true,
			html:'<iframe name="mainFrame" scrolling="auto" frameborder="0" width="100%" height="100%" src="'+pageName+'"></iframe>'
		});
	}
	centerPanel.setActiveTab(n);
};


