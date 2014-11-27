Ext.namespace('xunCloud');
xunCloud.jsonUtil = function(){
	return {
		/**
		 * @description
		 *	 �����ӵ�json����ת��Ϊ�򵥵�json����ȥ�����еĲ�������
		 *		�罫[{"name":"chen","age":"12","li":"23"},{"name":"zhang","age":"12","li":"23"}]ת��Ϊ��[{"name":"chen"},{"name":"zhang"}]
		 *@params
		 *	String json  Ҫת���ĳ�ʼjson
		 *	String properties ��Ҫ�������ֶθ�ʽΪname-age-li
		 *	function callBackSetValue(orgain,entity) 
		 *		@param  
		 *			Object ograin ԭʼ��json����
		 *			Object entity ת����Ķ���
		 *@return
		 *	String json ת������properties�����Ե�json
		 *@author 
		 *
		 * */
		//�����ӵ�json����ת��Ϊ�򵥵�json����ȥ�����еĲ�������callBackSetValue(orgain,person);�ص����������Զ����Խ����趨�����ֶ���ֵ
		complex2SimpleJson:function(json,properties,callBackSetValue){
			//1����jsonת��Ϊ����
			json = "[{id:'00fd01475bdb61b90004',text:'̷��ʦ',organCname:'������Ա����',userEname:'jizhang',userPosition:'����',personInfoOid:'00fd01475bdb61b90003',createDate:'2014-07-22',modifyDate:'2014-07-22',invalidDate:'',invalidFlag:'1',userCode:'123',operator:'admin',organizationInfoId:'00fd01475bda5c1f0001',leaf:true,expanded:false,iconCls:'add16',orgOrDeptOrPerson : 'person'},{id:'00fd01475bdb61b90005',text:'����ʦ',organCname:'������Ա����',userEname:'jizhang',userPosition:'����',personInfoOid:'00fd01475bdb61b90004',createDate:'2014-07-22',modifyDate:'2014-07-22',invalidDate:'',invalidFlag:'1',userCode:'123',operator:'admin',organizationInfoId:'00fd01475bda5c1f0001',leaf:true,expanded:false,iconCls:'add16',orgOrDeptOrPerson : 'person'}]"
			//������ʱ������ģ�ͣ�����ת��jsonʹ��
			var jsonObj = Ext.decode(json);
			//����û����ѵĶ��󣬲�ת��Ϊʵ�����
			Ext.Entity =  xunCloud.beanUtil.string2Obj(properties);
			var personArr = new Array();
			for(var i = 0 ;i < jsonObj.length;i++){
				 var person = new Ext.Entity();
				 var orgain = jsonObj[i];//�����֪��json����
				 callBackSetValue(orgain,person);
				 personArr.push(person)
			}
			return Ext.encode(personArr)
		}
	}
}();