Ext.namespace('xunCloud');
xunCloud.jsonUtil = function(){
	return {
		/**
		 * @description
		 *	 将复杂的json内容转换为简单的json可以去除其中的部分属性
		 *		如将[{"name":"chen","age":"12","li":"23"},{"name":"zhang","age":"12","li":"23"}]转换为：[{"name":"chen"},{"name":"zhang"}]
		 *@params
		 *	String json  要转换的初始json
		 *	String properties 需要的属性字段格式为name-age-li
		 *	function callBackSetValue(orgain,entity) 
		 *		@param  
		 *			Object ograin 原始的json对象
		 *			Object entity 转换后的对象
		 *@return
		 *	String json 转换后含有properties的属性的json
		 *@author 
		 *
		 * */
		//将复杂的json内容转换为简单的json可以去除其中的部分属性callBackSetValue(orgain,person);回调函数，可以对属性进行设定属性手动赋值
		complex2SimpleJson:function(json,properties,callBackSetValue){
			//1、将json转换为对象
			json = "[{id:'00fd01475bdb61b90004',text:'谭老师',organCname:'记账人员管理',userEname:'jizhang',userPosition:'记账',personInfoOid:'00fd01475bdb61b90003',createDate:'2014-07-22',modifyDate:'2014-07-22',invalidDate:'',invalidFlag:'1',userCode:'123',operator:'admin',organizationInfoId:'00fd01475bda5c1f0001',leaf:true,expanded:false,iconCls:'add16',orgOrDeptOrPerson : 'person'},{id:'00fd01475bdb61b90005',text:'李老师',organCname:'记账人员管理',userEname:'jizhang',userPosition:'记账',personInfoOid:'00fd01475bdb61b90004',createDate:'2014-07-22',modifyDate:'2014-07-22',invalidDate:'',invalidFlag:'1',userCode:'123',operator:'admin',organizationInfoId:'00fd01475bda5c1f0001',leaf:true,expanded:false,iconCls:'add16',orgOrDeptOrPerson : 'person'}]"
			//创建临时的数据模型，用来转换json使用
			var jsonObj = Ext.decode(json);
			//获得用户定已的对象，并转换为实体对象
			Ext.Entity =  xunCloud.beanUtil.string2Obj(properties);
			var personArr = new Array();
			for(var i = 0 ;i < jsonObj.length;i++){
				 var person = new Ext.Entity();
				 var orgain = jsonObj[i];//获得已知的json对象
				 callBackSetValue(orgain,person);
				 personArr.push(person)
			}
			return Ext.encode(personArr)
		}
	}
}();