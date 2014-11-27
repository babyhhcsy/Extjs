/**
 * HashMap 类型
 */

/**
 * 引入xunCloud顶层包,存放公共类和方法和全部子包
 */
Ext.namespace('xunCloud');

/**
 * @description
 * 		Map 链表结构的节点类
 * @params
 * 		{} config -{String key, Object data, reference next, reference previous} 
 * @function
 * 		destroy() -销毁此节点
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
 * @description -Map 结构
 * @function String getId -map的id
 * @function int size -获取Map中元素的数目
 * @function boolean isEmpty -判断Map是否为空
 * @function Array getKeysByRegxp -按正则表达式获取key数组
 * @function Array getValuesByRegxp -按正则表达式获取value数组
 * @function Array getKeysByPrefix -获取前缀为prefix的所有键
 * @function Array getKeysBySuffix -获取后缀为suffix的所有键
 * @function Array getValuesByPrefix -获取后缀为prefix的所有值
 * @function Array getValuesBySuffix -获取后缀为suffix的所有值
 * @function void removeTail -移除链的尾部节点
 * @function boolean remove -删除指定key的元素
 * @function boolean set -插入元素
 * @function Object/null get -获取参数key对应的值
 * @function Array getValueArray -获取所有元素的值
 * @function Array getKeysArray -获取所有元素的key
 * @function void removeAll -移除所有元素
 * @function boolean removeByRegxp -移除所有key匹配正则表达式的元素
 * @function boolean removeByPrefix -移除所有key前缀匹配的元素
 * @function boolean removeBySuffix -移除所有key后缀匹配的元素
 * @function boolean hasKey -检查是否存在该键;存在返回true,否则false;
 * @function boolean hasValue -检查是否存在该值;存在返回true,否则false;
 * @notice -(key/prefix/suffix/regxp)不能为空(null undefined ''),且只能是String;不然将直接返回false;
 */
xunCloud.Map = function(){
	var ME = this;
	/**
	 * map的id -应该写个js的id生成器,目前的写法在短时间内大规模实例化Map可能会冲突,不过一般并不需要其id;
	 */
	var id = 'map_'+Date.parse(new Date())+'_'+Math.round(Math.random(0-1)*100);
	/**
	 * Map中元素的数目
	 */
	var length = 0;
	/**
	 * 链表头部节点
	 */
	var headNode = new xunCloud.MapNode({key : '', data : id+'_链表头部', next : null, previous : null});
	/**
	 * 链表指针
	 */
	var p = new xunCloud.MapNode({data : id+'_指针', next : headNode, previous : headNode});
	/**
	 * @description
	 * 		验证key的合法性 -key 不能为空(null undefined ''),且只能是String; 空字符串被表头占据;
	 */
	var keyValid = function(key){
		return (key === null || key === undefined || typeof key !== 'string' || key === '') ? false : true;
	}
	/**
	 * @description
	 * 		在链的尾部添加一个节点
	 * @params
	 * 		xunCloud.MapNode node -要插入的节点
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
	 * 		查找key为指定值的节点
	 * 		按key遍历链,当找到节点的key和参数key相同,则返回该节点;若遍历到链结尾也没有找到匹配的节点,则返回null;
	 * @params
	 * 		String key -节点的Key
	 * @return
	 * 		xunCloud.MapNode node -指定key的节点
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
	 * 		查找key匹配正则表达式的节点
	 * @params
	 * 		Regxp regxp -正则表达式
	 * @return 
	 * 		Array arr -key匹配正则表达式的节点组成的数组
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
	 * 		移除指定节点
	 * @params
	 * 		xunCloud.MapNode node -要移除的节点
	 * @returns
	 * 		Boolean 成功返回true,否则false
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
	 * 		删除数组参数arr中的节点
	 * @params
	 * 		Array arr -要删除的节点的数组
	 */
	var removeByArray = function(arr){
		for(var i=0;i<arr.length;i++){
			removeNode(arr[i]);
		}
	}
	
	/**
	 * return String id -map的id
	 */
	this.getId = function(){
		return id;
	}
	/**
	 * @description
	 * 		获取Map中元素的数目
	 * @return
	 * 		int length-Map中元素的数目
	 */
	this.size = function(){
		return length;
	}
	/**
	 * @description
	 * 		判断Map是否为空
	 * @returns
	 * 		boolean -为空则返回true,否则false
	 */
	this.isEmpty = function(){
		return length==0 ? true : false;
	}
	/**
	 * @description
	 * 		按正则表达式获取key数组
	 * @params
	 * 		Regxp regxp -正则表达式
	 * @return
	 * 		Array -所有匹配正则表达式的key的数组
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
	 * 		按正则表达式获取value数组
	 * @params
	 * 		Regxp regxp -正则表达式
	 * @return
	 * 		Array -所有匹配正则表达式的key的节点的value的数组
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
	 * 		获取前缀为prefix的所有键
	 * @param
	 * 		String prefix -前缀
	 * @return
	 * 		Array -所有匹配的键
	 */
	this.getKeysByPrefix = function(prefix){
		eval("var reg = /^"+prefix+"/");
		return this.getKeysByRegxp(reg);
	}
	/**
	 * @description
	 * 		获取后缀为suffix的所有键
	 * @param
	 * 		String suffix -后缀
	 * @return
	 * 		Array -所有匹配的键
	 */
	this.getKeysBySuffix = function(suffix){
		eval("var reg = /"+suffix+"$/");
		return this.getKeysByRegxp(reg);
	}
	/**
	 * @description
	 * 		获取后缀为prefix的所有值
	 * @param
	 * 		String prefix -后缀
	 * @return
	 * 		Array -所有匹配的值
	 */
	this.getValuesByPrefix = function(prefix){
		eval("var reg = /^"+prefix+"/");
		return this.getValuesByRegxp(reg);
	}
	/**
	 * @description
	 * 		获取后缀为suffix的所有值
	 * @param
	 * 		String suffix -后缀
	 * @return
	 * 		Array -所有匹配的值
	 */
	this.getValuesBySuffix = function(suffix){
		eval("var reg = /"+suffix+"$/");
		return this.getValuesByRegxp(reg);
	}
	/**
	 * @description
	 * 		移除链的尾部节点
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
	 * 		删除指定key的元素
	 * @param
	 * 		String key -要移除元素的键
	 * @return
	 * 		boolean -若key是合法的,则删除该key对应节点,并返回true;否则直接返回false;
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
	 * 		插入元素
	 * 		若key不合法的,直接返回false;若合法,则查询该key对应节点是否存在,若存在则用data覆盖原来元素的值,否则以key和data新创建元素并插入,并返回true;
	 * @param
	 * 		String key -插入元素的key
	 * 		Object data -插入元素的值,可以为任意类型
	 * @return
	 * 		boolean -是否插入成功
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
	 * 		获取参数key对应的值
	 * 		若key不合法的,直接返回null;若合法,则查询该key对应节点是否存在,存在返回该节点的值,否则返回null;
	 * @param
	 * 		String key -键
	 * @return
	 * 		Object/null -值
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
	 * 		获取所有元素的值
	 * @return
	 * 		Array -所有元素的值
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
	 * 		获取所有元素的key
	 * @return
	 * 		Array -所有元素的key
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
	 * 移除所有元素
	 */
	this.removeAll = function(){
		while(!this.isEmpty()){
			this.removeTail();
		}
	}
	/**
	 * @description
	 * 		移除所有key匹配正则表达式的元素
	 * 		若正则表达式不合法则直接返回false;否则移除匹配的元素,并返回true;(验证key的合法性 -key 不能为空(null undefined ''),且只能是String)
	 * @param
	 * 		String suffix -正则表达式
	 * @return
	 * 		boolean -删除是否成功
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
	 * 		移除所有key前缀匹配的元素
	 * 		若前缀不合法则直接返回false;否则移除匹配的元素,并返回true;(验证key的合法性 -key 不能为空(null undefined ''),且只能是String)
	 * @param
	 * 		String prefix -前缀
	 * @return
	 * 		boolean -删除是否成功
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
	 * 		移除所有key后缀匹配的元素
	 * 		若后缀不合法则直接返回false;否则移除匹配的元素,并返回true;(验证key的合法性 -key 不能为空(null undefined ''),且只能是String)
	 * @param
	 * 		String suffix -后缀
	 * @return
	 * 		boolean -删除是否成功
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
	 * @description -检查是否存在该键;
	 * @param String key -键;
	 * @return Boolean -存在返回true,否则false;
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
	 * @description -检查是否存在该值;
	 * @param String value -值;
	 * @return Boolean -存在返回true,否则false;
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