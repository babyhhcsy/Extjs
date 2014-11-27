/**
 * @description -客户端请求进入锁区并成功进入锁区后,通知服务器正式锁定该区;
 * @param String fnPoint -功能点;
 * @param String lockFields -锁定的字段;
 * @return -Boolean 是否锁定成功;
 */
EAI.lock.lockFn = function(fnPoint,lockFields){
	var flag = true;
	Ext.Ajax.request({
		url : 'lock.do',
		async : false,
		params : {
			handler : 'lock',
			fnPoint : fnPoint,
			lockFields : lockFields
		},
		success : function(response,options){
			var data = Ext.decode(response.responseText);
			if(data && data.success){
				var entity = new EAI.lock.LockEntity({
					fnPoint : fnPoint,
					token : data.token,
					lockFields : lockFields
				});
				EAI.lock.lockMap.set(fnPoint,entity);
			}else{
				msgWindow(data.lockMsg);
				flag = false;
			}
		},
		failure : function(response,options){
			msgWindow('锁定失败');
			flag = false;
		}
	});
	return flag;
}

/**
 * @description -客户端操作成功提交,通知服务器解除锁定;
 * @param xhr对象 -提交操作Ajax请求的返回信息;
 * @param String fnPoint -通知服务器客户端完成操作,通知服务器解锁的请求(eg: lock/unlock+功能点)
 * @param String tips -解锁失败是否提示,true提示,false不提示;
 */
EAI.lock.unlockFn = function (fnPoint,tips){
	var flag = true;
	if(fnPoint && EAI.lock.lockMap.get(fnPoint)){
		Ext.Ajax.request({
			url : 'lock.do',
			params : {
				handler : 'unlock',
				fnPoint : fnPoint,
				token : EAI.lock.lockMap.get(fnPoint).token,
				lockFields : EAI.lock.lockMap.get(fnPoint).lockFields
			},
			async : false,
			success : function(response,options){
				var data = Ext.decode(response.responseText);
				if(data && data.success){
					EAI.lock.lockMap.remove(fnPoint);
				}else {
					flag = false;
//					if(tips){
//						msgWindow(data.lockMsg);
//					}
				}
			},
			failure : function(response,options){
				flag = false;
//				if(tips){
//					msgWindow(data.lockMsg);
//				}
			}
		});
	}
	return flag;
}

/**
 * 客户端将锁实体的数组转化成json格式数据;
 */
EAI.lock.lockEntitys2Json = function(){
	var result = '[';
	var arr = EAI.lock.lockMap.getValueArray();
	for(var i=0;i<arr.length;i++){
		result +=Ext.encode(arr[i])+',';
	}
	result = result.substr(0,result.length-1)+']';
	return result;
}

/**
 * 锁实体,
 * 当上锁成功后存储服务器返回的令牌token以及功能点和锁字段,用于解锁;
 * 同时,也用于客户端验证是否在该功能点有锁定操作,没有就不需解锁;
 */
EAI.lock.LockEntity = function(config){
	this.fnPoint = config.fnPoint;
	this.token = config.token;
	this.lockFields = config.lockFields;
}

EAI.lock.lockMap = new EAI.Map();
/**
 * 主要用于ui\js\EAI\eai-main.js中,
 * 当功能树节点对应的TabPanel页关闭,需要的解锁操作,其为解锁提供功能节点id对应的功能;
 * 登记功能点和对应功能节点映射;
 * 有新功能需要同步锁,需要此处添加配置;
 * eg: 功能节点:供应商修改-功能点supplierUpdate;
 */
EAI.lock.fnPoint2Node = new EAI.Map();
EAI.lock.fnPoint2Node.set('SUPPLIER_UPDATE','supplierUpdate');
EAI.lock.fnPoint2Node.set('VD02','custUpdate');
EAI.lock.fnPoint2Node.set('SUPPLIER_EXTEND','supplierExtend');
EAI.lock.fnPoint2Node.set('VD01_1','custExtend');
EAI.lock.fnPoint2Node.set('MM01','matCreate');
EAI.lock.fnPoint2Node.set('MM02','matUpdate');
EAI.lock.fnPoint2Node.set('MM01_1','matExtend');
EAI.lock.fnPoint2Node.set('VD52','custMatUpdate');
EAI.lock.fnPoint2Node.set('MD50','mrp');
EAI.lock.fnPoint2Node.set('VK12','pricingUpdate');
EAI.lock.fnPoint2Node.set('FLOW','flowMaintenance');
EAI.lock.fnPoint2Node.set('USER','userMaintenance');
EAI.lock.fnPoint2Node.set('VA22','quotationUpdate');
EAI.lock.fnPoint2Node.set('VA02','saleOrderUpdate');
EAI.lock.fnPoint2Node.set('ME01','goodsSourceMaintenance');
EAI.lock.fnPoint2Node.set('COTRUE','coTrue');