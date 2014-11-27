/**
 * HashMap ����
 */

/**
 * ����xunCloud�����,��Ź�����ͷ�����ȫ���Ӱ�
 */
Ext.namespace('xunCloud');

/**
 * @description
 * 		Map ����ṹ�Ľڵ���
 * @params
 * 		{} config -{String key, Object data, reference next, reference previous} 
 * @function
 * 		destroy() -���ٴ˽ڵ�
 */
xunCloud.MapNode = function(config){
	this.key = config.key;
	this.data = config.data;
	this.next = config.next;
	this.previous = config.previous;
	this.destroy = function(){
		this.key = null;
		this.data = null;
		this.previous = null;
		this.next = null;
	}
}

/**
 * @description -Map �ṹ
 * @function String getId -map��id
 * @function int size -��ȡMap��Ԫ�ص���Ŀ
 * @function boolean isEmpty -�ж�Map�Ƿ�Ϊ��
 * @function Array getKeysByRegxp -��������ʽ��ȡkey����
 * @function Array getValuesByRegxp -��������ʽ��ȡvalue����
 * @function Array getKeysByPrefix -��ȡǰ׺Ϊprefix�����м�
 * @function Array getKeysBySuffix -��ȡ��׺Ϊsuffix�����м�
 * @function Array getValuesByPrefix -��ȡ��׺Ϊprefix������ֵ
 * @function Array getValuesBySuffix -��ȡ��׺Ϊsuffix������ֵ
 * @function void removeTail -�Ƴ�����β���ڵ�
 * @function boolean remove -ɾ��ָ��key��Ԫ��
 * @function boolean set -����Ԫ��
 * @function Object/null get -��ȡ����key��Ӧ��ֵ
 * @function Array getValueArray -��ȡ����Ԫ�ص�ֵ
 * @function Array getKeysArray -��ȡ����Ԫ�ص�key
 * @function void removeAll -�Ƴ�����Ԫ��
 * @function boolean removeByRegxp -�Ƴ�����keyƥ��������ʽ��Ԫ��
 * @function boolean removeByPrefix -�Ƴ�����keyǰ׺ƥ���Ԫ��
 * @function boolean removeBySuffix -�Ƴ�����key��׺ƥ���Ԫ��
 * @function boolean hasKey -����Ƿ���ڸü�;���ڷ���true,����false;
 * @function boolean hasValue -����Ƿ���ڸ�ֵ;���ڷ���true,����false;
 * @notice -(key/prefix/suffix/regxp)����Ϊ��(null undefined ''),��ֻ����String;��Ȼ��ֱ�ӷ���false;
 */
xunCloud.Map = function(){
	var ME = this;
	/**
	 * map��id -Ӧ��д��js��id������,Ŀǰ��д���ڶ�ʱ���ڴ��ģʵ����Map���ܻ��ͻ,����һ�㲢����Ҫ��id;
	 */
	var id = 'map_'+Date.parse(new Date())+'_'+Math.round(Math.random(0-1)*100);
	/**
	 * Map��Ԫ�ص���Ŀ
	 */
	var length = 0;
	/**
	 * ����ͷ���ڵ�
	 */
	var headNode = new xunCloud.MapNode({key : '', data : id+'_����ͷ��', next : null, previous : null});
	/**
	 * ����ָ��
	 */
	var p = new xunCloud.MapNode({data : id+'_ָ��', next : headNode, previous : headNode});
	/**
	 * @description
	 * 		��֤key�ĺϷ��� -key ����Ϊ��(null undefined ''),��ֻ����String; ���ַ�������ͷռ��;
	 */
	var keyValid = function(key){
		return (key === null || key === undefined || typeof key !== 'string' || key === '') ? false : true;
	}
	/**
	 * @description
	 * 		������β�����һ���ڵ�
	 * @params
	 * 		xunCloud.MapNode node -Ҫ����Ľڵ�
	 */
	var add = function(node){
		p.previous = p.next;
		p.next.next = node;
		node.previous = p.next;
		p.next = node;
		length++;
	}
	/**
	 * @description
	 * 		����keyΪָ��ֵ�Ľڵ�
	 * 		��key������,���ҵ��ڵ��key�Ͳ���key��ͬ,�򷵻ظýڵ�;������������βҲû���ҵ�ƥ��Ľڵ�,�򷵻�null;
	 * @params
	 * 		String key -�ڵ��Key
	 * @return
	 * 		xunCloud.MapNode node -ָ��key�Ľڵ�
	 */ 
	var findByKey = function(key){
		var tp = new xunCloud.MapNode({next : headNode.next, previous : headNode});
		while(tp.next){
			if(tp.next.key == key){
				return tp.next;
			}else {
				tp.next = tp.next.next;
			}
		}
		return null;
	}
	/**
	 * @description
	 * 		����keyƥ��������ʽ�Ľڵ�
	 * @params
	 * 		Regxp regxp -������ʽ
	 * @return 
	 * 		Array arr -keyƥ��������ʽ�Ľڵ���ɵ�����
	 */
	var findByRegxp = function(regxp){
		var arr = new Array();
		var tp = new xunCloud.MapNode({next : headNode.next, previous : headNode});
		while(tp.next){
			if(regxp.test(tp.next.key)){
				arr.push(tp.next);
			}
			tp.next = tp.next.next;
		}
		return arr;
	}
	/**
	 * @description
	 * 		�Ƴ�ָ���ڵ�
	 * @params
	 * 		xunCloud.MapNode node -Ҫ�Ƴ��Ľڵ�
	 * @returns
	 * 		Boolean �ɹ�����true,����false
	 */
	var removeNode = function(node){
		if(node){
			if(node.next){
				node.next.previous = node.previous;
				if(p.next == node){
					p.next = node.next;
				}
				if(p.previous == node){
					p.previous == node.previous;
				}
			}else {
				p.next = node.previous;
				if(node.previous != headNode){
					if(p.previous != null){
						p.previous = p.previous.previous;
					}
				}
			}
			node.previous.next = node.next;
			node.destroy();
			length--;
			return true;
		}else {
			return false;
		}
	}
	/**
	 * @description
	 * 		ɾ���������arr�еĽڵ�
	 * @params
	 * 		Array arr -Ҫɾ���Ľڵ������
	 */
	var removeByArray = function(arr){
		for(var i=0;i<arr.length;i++){
			removeNode(arr[i]);
		}
	}
	
	/**
	 * return String id -map��id
	 */
	this.getId = function(){
		return id;
	}
	/**
	 * @description
	 * 		��ȡMap��Ԫ�ص���Ŀ
	 * @return
	 * 		int length-Map��Ԫ�ص���Ŀ
	 */
	this.size = function(){
		return length;
	}
	/**
	 * @description
	 * 		�ж�Map�Ƿ�Ϊ��
	 * @returns
	 * 		boolean -Ϊ���򷵻�true,����false
	 */
	this.isEmpty = function(){
		return length==0 ? true : false;
	}
	/**
	 * @description
	 * 		��������ʽ��ȡkey����
	 * @params
	 * 		Regxp regxp -������ʽ
	 * @return
	 * 		Array -����ƥ��������ʽ��key������
	 */
	this.getKeysByRegxp = function(regxp){
		var arr = new Array();
		var tp = new xunCloud.MapNode({next : headNode.next, previous : headNode});
		while(tp.next){
			if(regxp.test(tp.next.key)){
				arr.push(tp.next.key);
			}
			tp.next = tp.next.next;
		}
		return arr;
	}
	/**
	 * @description
	 * 		��������ʽ��ȡvalue����
	 * @params
	 * 		Regxp regxp -������ʽ
	 * @return
	 * 		Array -����ƥ��������ʽ��key�Ľڵ��value������
	 */
	this.getValuesByRegxp = function(regxp){
		var arr = new Array();
		var tp = new xunCloud.MapNode({next : headNode.next, previous : headNode});
		while(tp.next){
			if(regxp.test(tp.next.key)){
				arr.push(tp.next.data);
			}
			tp.next = tp.next.next;
		}
		return arr;
	}
	/**
	 * @description
	 * 		��ȡǰ׺Ϊprefix�����м�
	 * @param
	 * 		String prefix -ǰ׺
	 * @return
	 * 		Array -����ƥ��ļ�
	 */
	this.getKeysByPrefix = function(prefix){
		eval("var reg = /^"+prefix+"/");
		return this.getKeysByRegxp(reg);
	}
	/**
	 * @description
	 * 		��ȡ��׺Ϊsuffix�����м�
	 * @param
	 * 		String suffix -��׺
	 * @return
	 * 		Array -����ƥ��ļ�
	 */
	this.getKeysBySuffix = function(suffix){
		eval("var reg = /"+suffix+"$/");
		return this.getKeysByRegxp(reg);
	}
	/**
	 * @description
	 * 		��ȡ��׺Ϊprefix������ֵ
	 * @param
	 * 		String prefix -��׺
	 * @return
	 * 		Array -����ƥ���ֵ
	 */
	this.getValuesByPrefix = function(prefix){
		eval("var reg = /^"+prefix+"/");
		return this.getValuesByRegxp(reg);
	}
	/**
	 * @description
	 * 		��ȡ��׺Ϊsuffix������ֵ
	 * @param
	 * 		String suffix -��׺
	 * @return
	 * 		Array -����ƥ���ֵ
	 */
	this.getValuesBySuffix = function(suffix){
		eval("var reg = /"+suffix+"$/");
		return this.getValuesByRegxp(reg);
	}
	/**
	 * @description
	 * 		�Ƴ�����β���ڵ�
	 */
	this.removeTail = function(){
		p.next.previous = null;
		p.previous.next = null;
		p.next.destroy();
		p.next = p.previous;
		if(p.previous != headNode){
			p.previous = p.previous.previous;
		}
		length--;
	}
	/**
	 * @description
	 * 		ɾ��ָ��key��Ԫ��
	 * @param
	 * 		String key -Ҫ�Ƴ�Ԫ�صļ�
	 * @return
	 * 		boolean -��key�ǺϷ���,��ɾ����key��Ӧ�ڵ�,������true;����ֱ�ӷ���false;
	 */
	this.remove = function(key){
		if(!keyValid(key)){
			return false;
		}
		var node = findByKey(key);
		removeNode(node);
		return true;
	}
	/**
	 * @description
	 * 		����Ԫ��
	 * 		��key���Ϸ���,ֱ�ӷ���false;���Ϸ�,���ѯ��key��Ӧ�ڵ��Ƿ����,����������data����ԭ��Ԫ�ص�ֵ,������key��data�´���Ԫ�ز�����,������true;
	 * @param
	 * 		String key -����Ԫ�ص�key
	 * 		Object data -����Ԫ�ص�ֵ,����Ϊ��������
	 * @return
	 * 		boolean -�Ƿ����ɹ�
	 */
	this.set = function(key,data){
		if(!keyValid(key)){
			return false;
		}
		var node = findByKey(key);
		if(node){
			node.data = data;
		}else {
			add(new xunCloud.MapNode({key : key, data : data}));
		}
		return true;
	}
	/**
	 * @description
	 * 		��ȡ����key��Ӧ��ֵ
	 * 		��key���Ϸ���,ֱ�ӷ���null;���Ϸ�,���ѯ��key��Ӧ�ڵ��Ƿ����,���ڷ��ظýڵ��ֵ,���򷵻�null;
	 * @param
	 * 		String key -��
	 * @return
	 * 		Object/null -ֵ
	 */
	this.get = function(key){
		if(!keyValid(key)){
			return null;
		}
		var node = findByKey(key);
		if(node){
			return node.data;
		}
		return null;
	}
	/**
	 * @deprecated
	 * 		��ȡ����Ԫ�ص�ֵ
	 * @return
	 * 		Array -����Ԫ�ص�ֵ
	 */
	this.getValueArray = function(){
		var arr = new Array();
		var tp = new xunCloud.MapNode({next : headNode.next, previous : headNode});
		while(tp.next){
			arr.push(tp.next.data);
			tp.next = tp.next.next;
		}
		return arr;
	}
	/**
	 * @description
	 * 		��ȡ����Ԫ�ص�key
	 * @return
	 * 		Array -����Ԫ�ص�key
	 */
	this.getKeysArray = function(){
		var arr = new Array();
		var tp = new xunCloud.MapNode({next : headNode.next, previous : headNode});
		while(tp.next){
			arr.push(tp.next.key);
			tp.next = tp.next.next;
		}
		return arr;
	}
	/**
	 * �Ƴ�����Ԫ��
	 */
	this.removeAll = function(){
		while(!this.isEmpty()){
			this.removeTail();
		}
	}
	/**
	 * @description
	 * 		�Ƴ�����keyƥ��������ʽ��Ԫ��
	 * 		��������ʽ���Ϸ���ֱ�ӷ���false;�����Ƴ�ƥ���Ԫ��,������true;(��֤key�ĺϷ��� -key ����Ϊ��(null undefined ''),��ֻ����String)
	 * @param
	 * 		String suffix -������ʽ
	 * @return
	 * 		boolean -ɾ���Ƿ�ɹ�
	 */
	this.removeByRegxp = function(regxp){
		if(!keyValid(regxp)){
			return false;
		}
		var arr = findByRegxp(regxp);
		removeByArray(arr);
		return true;
	}
	/**
	 * @description
	 * 		�Ƴ�����keyǰ׺ƥ���Ԫ��
	 * 		��ǰ׺���Ϸ���ֱ�ӷ���false;�����Ƴ�ƥ���Ԫ��,������true;(��֤key�ĺϷ��� -key ����Ϊ��(null undefined ''),��ֻ����String)
	 * @param
	 * 		String prefix -ǰ׺
	 * @return
	 * 		boolean -ɾ���Ƿ�ɹ�
	 */
	this.removeByPrefix = function(prefix){
		if(!keyValid(prefix)){
			return false;
		}
		eval("var reg = /^"+prefix+"/");
		var arr = findByRegxp(reg);
		removeByArray(arr);
		return true;
	}
	/**
	 * @description
	 * 		�Ƴ�����key��׺ƥ���Ԫ��
	 * 		����׺���Ϸ���ֱ�ӷ���false;�����Ƴ�ƥ���Ԫ��,������true;(��֤key�ĺϷ��� -key ����Ϊ��(null undefined ''),��ֻ����String)
	 * @param
	 * 		String suffix -��׺
	 * @return
	 * 		boolean -ɾ���Ƿ�ɹ�
	 */
	this.removeBySuffix = function(suffix){
		if(!keyValid(suffix)){
			return false;
		}
		eval("var reg = /"+suffix+"$/");
		var arr = findByRegxp(reg);
		removeByArray(arr);
		return true;
	}
	/**
	 * @description -����Ƿ���ڸü�;
	 * @param String key -��;
	 * @return Boolean -���ڷ���true,����false;
	 */
	this.hasKey = function(key){
		var tp = new xunCloud.MapNode({next : headNode.next, previous : headNode});
		while(tp.next){
			if(tp.next.key === key){
				return true;
			}else{
				tp.next = tp.next.next;
			}
		}
		return false;
	}
	/**
	 * @description -����Ƿ���ڸ�ֵ;
	 * @param String value -ֵ;
	 * @return Boolean -���ڷ���true,����false;
	 */
	this.hasValue = function(value){
		var tp = new xunCloud.MapNode({next : headNode.next, previous : headNode});
		while(tp.next){
			if(tp.next.data === value){
				return true;
			}else{
				tp.next = tp.next.next;
			}
		}
		return false;
	}
}