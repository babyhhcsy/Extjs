package util;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import net.sf.json.JSONException;
import net.sf.json.processors.DefaultDefaultValueProcessor;
import net.sf.json.processors.DefaultValueProcessor;
import net.sf.json.processors.DefaultValueProcessorMatcher;
import net.sf.json.processors.JsonBeanProcessor;
import net.sf.json.processors.JsonBeanProcessorMatcher;
import net.sf.json.processors.JsonValueProcessor;
import net.sf.json.processors.JsonValueProcessorMatcher;
import net.sf.json.processors.PropertyNameProcessor;
import net.sf.json.processors.PropertyNameProcessorMatcher;
import net.sf.json.util.CycleDetectionStrategy;
import net.sf.json.util.JavaIdentifierTransformer;
import net.sf.json.util.JsonEventListener;
import net.sf.json.util.NewBeanInstanceStrategy;
import net.sf.json.util.PropertyExclusionClassMatcher;
import net.sf.json.util.PropertyFilter;
import net.sf.json.util.PropertySetStrategy;
import org.apache.commons.collections.map.MultiKeyMap;
import org.apache.commons.lang.StringUtils;

public class JsonConfig {
	public static final DefaultValueProcessorMatcher DEFAULT_DEFAULT_VALUE_PROCESSOR_MATCHER = DefaultValueProcessorMatcher.DEFAULT;
	public static final JsonBeanProcessorMatcher DEFAULT_JSON_BEAN_PROCESSOR_MATCHER = JsonBeanProcessorMatcher.DEFAULT;
	public static final JsonValueProcessorMatcher DEFAULT_JSON_VALUE_PROCESSOR_MATCHER = JsonValueProcessorMatcher.DEFAULT;
	public static final NewBeanInstanceStrategy DEFAULT_NEW_BEAN_INSTANCE_STRATEGY = NewBeanInstanceStrategy.DEFAULT;
	public static final PropertyExclusionClassMatcher DEFAULT_PROPERTY_EXCLUSION_CLASS_MATCHER = PropertyExclusionClassMatcher.DEFAULT;
	public static final PropertyNameProcessorMatcher DEFAULT_PROPERTY_NAME_PROCESSOR_MATCHER = PropertyNameProcessorMatcher.DEFAULT;
	public static final int MODE_LIST = 1;
	public static final int MODE_OBJECT_ARRAY = 2;
	public static final int MODE_SET = 2;
	private static final Class DEFAULT_COLLECTION_TYPE = List.class;
	private static final CycleDetectionStrategy DEFAULT_CYCLE_DETECTION_STRATEGY = CycleDetectionStrategy.STRICT;
	private static final String[] DEFAULT_EXCLUDES = { "class",
			"declaringClass", "metaClass" };
	private static final JavaIdentifierTransformer DEFAULT_JAVA_IDENTIFIER_TRANSFORMER = JavaIdentifierTransformer.NOOP;
	private static final DefaultValueProcessor DEFAULT_VALUE_PROCESSOR = new DefaultDefaultValueProcessor();
	private static final String[] EMPTY_EXCLUDES = new String[0];

	private int arrayMode = 1;
	private MultiKeyMap beanKeyMap = new MultiKeyMap();
	private Map beanProcessorMap = new HashMap();
	private MultiKeyMap beanTypeMap = new MultiKeyMap();
	private Map classMap;
	private Class collectionType = DEFAULT_COLLECTION_TYPE;
	private CycleDetectionStrategy cycleDetectionStrategy = DEFAULT_CYCLE_DETECTION_STRATEGY;
	private Map defaultValueMap = new HashMap();
	private DefaultValueProcessorMatcher defaultValueProcessorMatcher = DEFAULT_DEFAULT_VALUE_PROCESSOR_MATCHER;
	private Class enclosedType;
	private List eventListeners = new ArrayList();
	private String[] excludes = EMPTY_EXCLUDES;
	private Map exclusionMap = new HashMap();
	private boolean handleJettisonEmptyElement;
	private boolean handleJettisonSingleElementArray;
	private boolean ignoreDefaultExcludes;
	private boolean ignoreJPATransient;
	private boolean ignoreTransientFields;
	private JavaIdentifierTransformer javaIdentifierTransformer = DEFAULT_JAVA_IDENTIFIER_TRANSFORMER;
	private PropertyFilter javaPropertyFilter;
	private Map javaPropertyNameProcessorMap = new HashMap();
	private PropertyNameProcessorMatcher javaPropertyNameProcessorMatcher = DEFAULT_PROPERTY_NAME_PROCESSOR_MATCHER;
	private JsonBeanProcessorMatcher jsonBeanProcessorMatcher = DEFAULT_JSON_BEAN_PROCESSOR_MATCHER;
	private PropertyFilter jsonPropertyFilter;
	private Map jsonPropertyNameProcessorMap = new HashMap();
	private PropertyNameProcessorMatcher jsonPropertyNameProcessorMatcher = DEFAULT_PROPERTY_NAME_PROCESSOR_MATCHER;
	private JsonValueProcessorMatcher jsonValueProcessorMatcher = DEFAULT_JSON_VALUE_PROCESSOR_MATCHER;
	private Map keyMap = new HashMap();
	private NewBeanInstanceStrategy newBeanInstanceStrategy = DEFAULT_NEW_BEAN_INSTANCE_STRATEGY;
	private PropertyExclusionClassMatcher propertyExclusionClassMatcher = DEFAULT_PROPERTY_EXCLUSION_CLASS_MATCHER;
	private PropertySetStrategy propertySetStrategy;
	private Class rootClass;
	private boolean skipJavaIdentifierTransformationInMapKeys;
	private boolean triggerEvents;
	private Map typeMap = new HashMap();

	public synchronized void addJsonEventListener(JsonEventListener listener) {
		if (!(this.eventListeners.contains(listener)))
			this.eventListeners.add(listener);
	}

	public void clearJavaPropertyNameProcessors() {
		this.javaPropertyNameProcessorMap.clear();
	}

	public void clearJsonBeanProcessors() {
		this.beanProcessorMap.clear();
	}

	public synchronized void clearJsonEventListeners() {
		this.eventListeners.clear();
	}

	public void clearJsonPropertyNameProcessors() {
		this.jsonPropertyNameProcessorMap.clear();
	}

	public void clearJsonValueProcessors() {
		this.beanKeyMap.clear();
		this.beanTypeMap.clear();
		this.keyMap.clear();
		this.typeMap.clear();
	}

	public void clearPropertyExclusions() {
		this.exclusionMap.clear();
	}

	/** @deprecated */
	public void clearPropertyNameProcessors() {
		clearJavaPropertyNameProcessors();
	}

	public JsonConfig copy() {
		JsonConfig jsc = new JsonConfig();
		jsc.beanKeyMap.putAll(this.beanKeyMap);
		jsc.beanTypeMap.putAll(this.beanTypeMap);
		jsc.classMap = new HashMap();
		if (this.classMap != null) {
			jsc.classMap.putAll(this.classMap);
		}
		jsc.cycleDetectionStrategy = this.cycleDetectionStrategy;
		if (this.eventListeners != null) {
			jsc.eventListeners.addAll(this.eventListeners);
		}
		if (this.excludes != null) {
			jsc.excludes = new String[this.excludes.length];
			System.arraycopy(this.excludes, 0, jsc.excludes, 0,
					this.excludes.length);
		}
		jsc.handleJettisonEmptyElement = this.handleJettisonEmptyElement;
		jsc.handleJettisonSingleElementArray = this.handleJettisonSingleElementArray;
		jsc.ignoreDefaultExcludes = this.ignoreDefaultExcludes;
		jsc.ignoreTransientFields = this.ignoreTransientFields;
		jsc.javaIdentifierTransformer = this.javaIdentifierTransformer;
		jsc.keyMap.putAll(this.keyMap);
		jsc.beanProcessorMap.putAll(this.beanProcessorMap);
		jsc.rootClass = this.rootClass;
		jsc.skipJavaIdentifierTransformationInMapKeys = this.skipJavaIdentifierTransformationInMapKeys;
		jsc.triggerEvents = this.triggerEvents;
		jsc.typeMap.putAll(this.typeMap);
		jsc.jsonPropertyFilter = this.jsonPropertyFilter;
		jsc.javaPropertyFilter = this.javaPropertyFilter;
		jsc.jsonBeanProcessorMatcher = this.jsonBeanProcessorMatcher;
		jsc.newBeanInstanceStrategy = this.newBeanInstanceStrategy;
		jsc.defaultValueProcessorMatcher = this.defaultValueProcessorMatcher;
		jsc.defaultValueMap.putAll(this.defaultValueMap);
		jsc.propertySetStrategy = this.propertySetStrategy;
		jsc.ignoreJPATransient = this.ignoreJPATransient;
		jsc.collectionType = this.collectionType;
		jsc.enclosedType = this.enclosedType;
		jsc.jsonValueProcessorMatcher = this.jsonValueProcessorMatcher;
		jsc.javaPropertyNameProcessorMatcher = this.javaPropertyNameProcessorMatcher;
		jsc.javaPropertyNameProcessorMap
				.putAll(this.javaPropertyNameProcessorMap);
		jsc.jsonPropertyNameProcessorMatcher = this.jsonPropertyNameProcessorMatcher;
		jsc.jsonPropertyNameProcessorMap
				.putAll(this.jsonPropertyNameProcessorMap);
		jsc.propertyExclusionClassMatcher = this.propertyExclusionClassMatcher;
		jsc.exclusionMap.putAll(this.exclusionMap);
		return jsc;
	}

	public void disableEventTriggering() {
		this.triggerEvents = false;
	}

	public void enableEventTriggering() {
		this.triggerEvents = true;
	}

	public DefaultValueProcessor findDefaultValueProcessor(Class target) {
		if (!(this.defaultValueMap.isEmpty())) {
			Object key = this.defaultValueProcessorMatcher.getMatch(target,
					this.defaultValueMap.keySet());
			DefaultValueProcessor processor = (DefaultValueProcessor) this.defaultValueMap
					.get(key);
			if (processor != null) {
				return processor;
			}
		}
		return DEFAULT_VALUE_PROCESSOR;
	}

	public PropertyNameProcessor findJavaPropertyNameProcessor(Class beanClass) {
		if (!(this.javaPropertyNameProcessorMap.isEmpty())) {
			Object key = this.javaPropertyNameProcessorMatcher.getMatch(
					beanClass, this.javaPropertyNameProcessorMap.keySet());
			return ((PropertyNameProcessor) this.javaPropertyNameProcessorMap
					.get(key));
		}

		return null;
	}

	public JsonBeanProcessor findJsonBeanProcessor(Class target) {
		if (!(this.beanProcessorMap.isEmpty())) {
			Object key = this.jsonBeanProcessorMatcher.getMatch(target,
					this.beanProcessorMap.keySet());
			return ((JsonBeanProcessor) this.beanProcessorMap.get(key));
		}
		return null;
	}

	public PropertyNameProcessor findJsonPropertyNameProcessor(Class beanClass) {
		if (!(this.jsonPropertyNameProcessorMap.isEmpty())) {
			Object key = this.jsonPropertyNameProcessorMatcher.getMatch(
					beanClass, this.jsonPropertyNameProcessorMap.keySet());
			return ((PropertyNameProcessor) this.jsonPropertyNameProcessorMap
					.get(key));
		}

		return null;
	}

	public JsonValueProcessor findJsonValueProcessor(Class propertyType) {
		if (!(this.typeMap.isEmpty())) {
			Object key = this.jsonValueProcessorMatcher.getMatch(propertyType,
					this.typeMap.keySet());
			return ((JsonValueProcessor) this.typeMap.get(key));
		}

		return null;
	}

	public JsonValueProcessor findJsonValueProcessor(Class beanClass,
			Class propertyType, String key) {
		JsonValueProcessor jsonValueProcessor = null;
		jsonValueProcessor = (JsonValueProcessor) this.beanKeyMap.get(
				beanClass, key);
		if (jsonValueProcessor != null) {
			return jsonValueProcessor;
		}

		jsonValueProcessor = (JsonValueProcessor) this.beanTypeMap.get(
				beanClass, propertyType);
		if (jsonValueProcessor != null) {
			return jsonValueProcessor;
		}

		jsonValueProcessor = (JsonValueProcessor) this.keyMap.get(key);
		if (jsonValueProcessor != null) {
			return jsonValueProcessor;
		}

		Object tkey = this.jsonValueProcessorMatcher.getMatch(propertyType,
				this.typeMap.keySet());
		jsonValueProcessor = (JsonValueProcessor) this.typeMap.get(tkey);
		if (jsonValueProcessor != null) {
			return jsonValueProcessor;
		}

		return null;
	}

	public JsonValueProcessor findJsonValueProcessor(Class propertyType,
			String key) {
		JsonValueProcessor jsonValueProcessor = null;
		jsonValueProcessor = (JsonValueProcessor) this.keyMap.get(key);
		if (jsonValueProcessor != null) {
			return jsonValueProcessor;
		}

		Object tkey = this.jsonValueProcessorMatcher.getMatch(propertyType,
				this.typeMap.keySet());
		jsonValueProcessor = (JsonValueProcessor) this.typeMap.get(tkey);
		if (jsonValueProcessor != null) {
			return jsonValueProcessor;
		}

		return null;
	}

	/** @deprecated */
	public PropertyNameProcessor findPropertyNameProcessor(Class beanClass) {
		return findJavaPropertyNameProcessor(beanClass);
	}

	public int getArrayMode() {
		return this.arrayMode;
	}

	public Map getClassMap() {
		return this.classMap;
	}

	public Class getCollectionType() {
		return this.collectionType;
	}

	public CycleDetectionStrategy getCycleDetectionStrategy() {
		return this.cycleDetectionStrategy;
	}

	public DefaultValueProcessorMatcher getDefaultValueProcessorMatcher() {
		return this.defaultValueProcessorMatcher;
	}

	public Class getEnclosedType() {
		return this.enclosedType;
	}

	public String[] getExcludes() {
		return this.excludes;
	}

	public JavaIdentifierTransformer getJavaIdentifierTransformer() {
		return this.javaIdentifierTransformer;
	}

	public PropertyFilter getJavaPropertyFilter() {
		return this.javaPropertyFilter;
	}

	public PropertyNameProcessorMatcher getJavaPropertyNameProcessorMatcher() {
		return this.javaPropertyNameProcessorMatcher;
	}

	public JsonBeanProcessorMatcher getJsonBeanProcessorMatcher() {
		return this.jsonBeanProcessorMatcher;
	}

	public synchronized List getJsonEventListeners() {
		return this.eventListeners;
	}

	public PropertyFilter getJsonPropertyFilter() {
		return this.jsonPropertyFilter;
	}

	public PropertyNameProcessorMatcher getJsonPropertyNameProcessorMatcher() {
		return this.javaPropertyNameProcessorMatcher;
	}

	public JsonValueProcessorMatcher getJsonValueProcessorMatcher() {
		return this.jsonValueProcessorMatcher;
	}

	public Collection getMergedExcludes() {
		Collection exclusions = new HashSet();
		for (int i = 0; i < this.excludes.length; ++i) {
			String exclusion = this.excludes[i];
			if (!(StringUtils.isBlank(this.excludes[i]))) {
				exclusions.add(exclusion.trim());
			}
		}

		if (!(this.ignoreDefaultExcludes)) {
			for (int i = 0; i < DEFAULT_EXCLUDES.length; ++i) {
				if (!(exclusions.contains(DEFAULT_EXCLUDES[i]))) {
					exclusions.add(DEFAULT_EXCLUDES[i]);
				}
			}
		}

		return exclusions;
	}

	public Collection getMergedExcludes(Class target) {
		if (target == null) {
			return getMergedExcludes();
		}

		Collection exclusionSet = getMergedExcludes();
		Iterator i;
		if (!(this.exclusionMap.isEmpty())) {
			Object key = this.propertyExclusionClassMatcher.getMatch(target,
					this.exclusionMap.keySet());
			Set set = (Set) this.exclusionMap.get(key);
			if ((set != null) && (!(set.isEmpty()))) {
				for (i = set.iterator(); i.hasNext();) {
					Object e = i.next();
					if (!(exclusionSet.contains(e))) {
						exclusionSet.add(e);
					}
				}
			}
		}

		return exclusionSet;
	}

	public NewBeanInstanceStrategy getNewBeanInstanceStrategy() {
		return this.newBeanInstanceStrategy;
	}

	public PropertyExclusionClassMatcher getPropertyExclusionClassMatcher() {
		return this.propertyExclusionClassMatcher;
	}

	/** @deprecated */
	public PropertyNameProcessorMatcher getPropertyNameProcessorMatcher() {
		return getJavaPropertyNameProcessorMatcher();
	}

	public PropertySetStrategy getPropertySetStrategy() {
		return this.propertySetStrategy;
	}

	public Class getRootClass() {
		return this.rootClass;
	}

	public boolean isEventTriggeringEnabled() {
		return this.triggerEvents;
	}

	public boolean isHandleJettisonEmptyElement() {
		return this.handleJettisonEmptyElement;
	}

	public boolean isHandleJettisonSingleElementArray() {
		return this.handleJettisonSingleElementArray;
	}

	public boolean isIgnoreDefaultExcludes() {
		return this.ignoreDefaultExcludes;
	}

	public boolean isIgnoreJPATransient() {
		return this.ignoreJPATransient;
	}

	public boolean isIgnoreTransientFields() {
		return this.ignoreTransientFields;
	}

	public boolean isSkipJavaIdentifierTransformationInMapKeys() {
		return this.skipJavaIdentifierTransformationInMapKeys;
	}

	public void registerDefaultValueProcessor(Class target,
			DefaultValueProcessor defaultValueProcessor) {
		if ((target != null) && (defaultValueProcessor != null))
			this.defaultValueMap.put(target, defaultValueProcessor);
	}

	public void registerJavaPropertyNameProcessor(Class target,
			PropertyNameProcessor propertyNameProcessor) {
		if ((target != null) && (propertyNameProcessor != null))
			this.javaPropertyNameProcessorMap
					.put(target, propertyNameProcessor);
	}

	public void registerJsonBeanProcessor(Class target,
			JsonBeanProcessor jsonBeanProcessor) {
		if ((target != null) && (jsonBeanProcessor != null))
			this.beanProcessorMap.put(target, jsonBeanProcessor);
	}

	public void registerJsonPropertyNameProcessor(Class target,
			PropertyNameProcessor propertyNameProcessor) {
		if ((target != null) && (propertyNameProcessor != null))
			this.jsonPropertyNameProcessorMap
					.put(target, propertyNameProcessor);
	}

	public void registerJsonValueProcessor(Class beanClass, Class propertyType,
			JsonValueProcessor jsonValueProcessor) {
		if ((beanClass != null) && (propertyType != null)
				&& (jsonValueProcessor != null))
			this.beanTypeMap.put(beanClass, propertyType, jsonValueProcessor);
	}

	public void registerJsonValueProcessor(Class propertyType,
			JsonValueProcessor jsonValueProcessor) {
		if ((propertyType != null) && (jsonValueProcessor != null))
			this.typeMap.put(propertyType, jsonValueProcessor);
	}

	public void registerJsonValueProcessor(Class beanClass, String key,
			JsonValueProcessor jsonValueProcessor) {
		if ((beanClass != null) && (key != null)
				&& (jsonValueProcessor != null))
			this.beanKeyMap.put(beanClass, key, jsonValueProcessor);
	}

	public void registerJsonValueProcessor(String key,
			JsonValueProcessor jsonValueProcessor) {
		if ((key != null) && (jsonValueProcessor != null))
			this.keyMap.put(key, jsonValueProcessor);
	}

	public void registerPropertyExclusion(Class target, String propertyName) {
		if ((target != null) && (propertyName != null)) {
			Set set = (Set) this.exclusionMap.get(target);
			if (set == null) {
				set = new HashSet();
				this.exclusionMap.put(target, set);
			}
			if (!(set.contains(propertyName)))
				set.add(propertyName);
		}
	}

	public void registerPropertyExclusions(Class target, String[] properties) {
		if ((target != null) && (properties != null) && (properties.length > 0)) {
			Set set = (Set) this.exclusionMap.get(target);
			if (set == null) {
				set = new HashSet();
				this.exclusionMap.put(target, set);
			}
			for (int i = 0; i < properties.length; ++i)
				if (!(set.contains(properties[i])))
					set.add(properties[i]);
		}
	}

	/** @deprecated */
	public void registerPropertyNameProcessor(Class target,
			PropertyNameProcessor propertyNameProcessor) {
		registerJavaPropertyNameProcessor(target, propertyNameProcessor);
	}

	public synchronized void removeJsonEventListener(JsonEventListener listener) {
		this.eventListeners.remove(listener);
	}

	public void reset() {
		this.excludes = EMPTY_EXCLUDES;
		this.ignoreDefaultExcludes = false;
		this.ignoreTransientFields = false;
		this.javaIdentifierTransformer = DEFAULT_JAVA_IDENTIFIER_TRANSFORMER;
		this.cycleDetectionStrategy = DEFAULT_CYCLE_DETECTION_STRATEGY;
		this.skipJavaIdentifierTransformationInMapKeys = false;
		this.triggerEvents = false;
		this.handleJettisonEmptyElement = false;
		this.handleJettisonSingleElementArray = false;
		this.arrayMode = 1;
		this.rootClass = null;
		this.classMap = null;
		this.keyMap.clear();
		this.typeMap.clear();
		this.beanKeyMap.clear();
		this.beanTypeMap.clear();
		this.jsonPropertyFilter = null;
		this.javaPropertyFilter = null;
		this.jsonBeanProcessorMatcher = DEFAULT_JSON_BEAN_PROCESSOR_MATCHER;
		this.newBeanInstanceStrategy = DEFAULT_NEW_BEAN_INSTANCE_STRATEGY;
		this.defaultValueProcessorMatcher = DEFAULT_DEFAULT_VALUE_PROCESSOR_MATCHER;
		this.defaultValueMap.clear();
		this.propertySetStrategy = null;
		this.ignoreJPATransient = false;
		this.collectionType = DEFAULT_COLLECTION_TYPE;
		this.enclosedType = null;
		this.jsonValueProcessorMatcher = DEFAULT_JSON_VALUE_PROCESSOR_MATCHER;
		this.javaPropertyNameProcessorMap.clear();
		this.javaPropertyNameProcessorMatcher = DEFAULT_PROPERTY_NAME_PROCESSOR_MATCHER;
		this.jsonPropertyNameProcessorMap.clear();
		this.jsonPropertyNameProcessorMatcher = DEFAULT_PROPERTY_NAME_PROCESSOR_MATCHER;
		this.beanProcessorMap.clear();
		this.propertyExclusionClassMatcher = DEFAULT_PROPERTY_EXCLUSION_CLASS_MATCHER;
		this.exclusionMap.clear();
	}

	public void setArrayMode(int arrayMode) {
		if (arrayMode == 2) {
			this.arrayMode = arrayMode;
		} else if (arrayMode == 2) {
			this.arrayMode = arrayMode;
			this.collectionType = Set.class;
		} else {
			this.arrayMode = 1;
			this.enclosedType = DEFAULT_COLLECTION_TYPE;
		}
	}

	public void setClassMap(Map classMap) {
		this.classMap = classMap;
	}

	public void setCollectionType(Class collectionType) {
		if (collectionType != null) {
			if (!(Collection.class.isAssignableFrom(collectionType))) {
				throw new JSONException(
						"The configured collectionType is not a Collection: "
								+ collectionType.getName());
			}
			this.collectionType = collectionType;
		} else {
			collectionType = DEFAULT_COLLECTION_TYPE;
		}
	}

	public void setCycleDetectionStrategy(
			CycleDetectionStrategy cycleDetectionStrategy) {
		this.cycleDetectionStrategy = ((cycleDetectionStrategy == null) ? DEFAULT_CYCLE_DETECTION_STRATEGY
				: cycleDetectionStrategy);
	}

	public void setDefaultValueProcessorMatcher(
			DefaultValueProcessorMatcher defaultValueProcessorMatcher) {
		this.defaultValueProcessorMatcher = ((defaultValueProcessorMatcher == null) ? DEFAULT_DEFAULT_VALUE_PROCESSOR_MATCHER
				: defaultValueProcessorMatcher);
	}

	public void setEnclosedType(Class enclosedType) {
		this.enclosedType = enclosedType;
	}

	public void setExcludes(String[] excludes) {
		this.excludes = ((excludes == null) ? EMPTY_EXCLUDES : excludes);
	}

	public void setHandleJettisonEmptyElement(boolean handleJettisonEmptyElement) {
		this.handleJettisonEmptyElement = handleJettisonEmptyElement;
	}

	public void setHandleJettisonSingleElementArray(
			boolean handleJettisonSingleElementArray) {
		this.handleJettisonSingleElementArray = handleJettisonSingleElementArray;
	}

	public void setIgnoreDefaultExcludes(boolean ignoreDefaultExcludes) {
		this.ignoreDefaultExcludes = ignoreDefaultExcludes;
	}

	public void setIgnoreJPATransient(boolean ignoreJPATransient) {
		this.ignoreJPATransient = ignoreJPATransient;
	}

	public void setIgnoreTransientFields(boolean ignoreTransientFields) {
		this.ignoreTransientFields = ignoreTransientFields;
	}

	public void setJavaIdentifierTransformer(
			JavaIdentifierTransformer javaIdentifierTransformer) {
		this.javaIdentifierTransformer = ((javaIdentifierTransformer == null) ? DEFAULT_JAVA_IDENTIFIER_TRANSFORMER
				: javaIdentifierTransformer);
	}

	public void setJavaPropertyFilter(PropertyFilter javaPropertyFilter) {
		this.javaPropertyFilter = javaPropertyFilter;
	}

	public void setJavaPropertyNameProcessorMatcher(
			PropertyNameProcessorMatcher propertyNameProcessorMatcher) {
		this.javaPropertyNameProcessorMatcher = ((propertyNameProcessorMatcher == null) ? DEFAULT_PROPERTY_NAME_PROCESSOR_MATCHER
				: propertyNameProcessorMatcher);
	}

	public void setJsonBeanProcessorMatcher(
			JsonBeanProcessorMatcher jsonBeanProcessorMatcher) {
		this.jsonBeanProcessorMatcher = ((jsonBeanProcessorMatcher == null) ? DEFAULT_JSON_BEAN_PROCESSOR_MATCHER
				: jsonBeanProcessorMatcher);
	}

	public void setJsonPropertyFilter(PropertyFilter jsonPropertyFilter) {
		this.jsonPropertyFilter = jsonPropertyFilter;
	}

	public void setJsonPropertyNameProcessorMatcher(
			PropertyNameProcessorMatcher propertyNameProcessorMatcher) {
		this.jsonPropertyNameProcessorMatcher = ((propertyNameProcessorMatcher == null) ? DEFAULT_PROPERTY_NAME_PROCESSOR_MATCHER
				: propertyNameProcessorMatcher);
	}

	public void setJsonValueProcessorMatcher(
			JsonValueProcessorMatcher jsonValueProcessorMatcher) {
		this.jsonValueProcessorMatcher = ((jsonValueProcessorMatcher == null) ? DEFAULT_JSON_VALUE_PROCESSOR_MATCHER
				: jsonValueProcessorMatcher);
	}

	public void setNewBeanInstanceStrategy(
			NewBeanInstanceStrategy newBeanInstanceStrategy) {
		this.newBeanInstanceStrategy = ((newBeanInstanceStrategy == null) ? DEFAULT_NEW_BEAN_INSTANCE_STRATEGY
				: newBeanInstanceStrategy);
	}

	public void setPropertyExclusionClassMatcher(
			PropertyExclusionClassMatcher propertyExclusionClassMatcher) {
		this.propertyExclusionClassMatcher = ((propertyExclusionClassMatcher == null) ? DEFAULT_PROPERTY_EXCLUSION_CLASS_MATCHER
				: propertyExclusionClassMatcher);
	}

	/** @deprecated */
	public void setPropertyNameProcessorMatcher(
			PropertyNameProcessorMatcher propertyNameProcessorMatcher) {
		setJavaPropertyNameProcessorMatcher(propertyNameProcessorMatcher);
	}

	public void setPropertySetStrategy(PropertySetStrategy propertySetStrategy) {
		this.propertySetStrategy = propertySetStrategy;
	}

	public void setRootClass(Class rootClass) {
		this.rootClass = rootClass;
	}

	public void setSkipJavaIdentifierTransformationInMapKeys(
			boolean skipJavaIdentifierTransformationInMapKeys) {
		this.skipJavaIdentifierTransformationInMapKeys = skipJavaIdentifierTransformationInMapKeys;
	}

	public void unregisterDefaultValueProcessor(Class target) {
		if (target != null)
			this.defaultValueMap.remove(target);
	}

	public void unregisterJavaPropertyNameProcessor(Class target) {
		if (target != null)
			this.javaPropertyNameProcessorMap.remove(target);
	}

	public void unregisterJsonBeanProcessor(Class target) {
		if (target != null)
			this.beanProcessorMap.remove(target);
	}

	public void unregisterJsonPropertyNameProcessor(Class target) {
		if (target != null)
			this.jsonPropertyNameProcessorMap.remove(target);
	}

	public void unregisterJsonValueProcessor(Class propertyType) {
		if (propertyType != null)
			this.typeMap.remove(propertyType);
	}

	public void unregisterJsonValueProcessor(Class beanClass, Class propertyType) {
		if ((beanClass != null) && (propertyType != null))
			this.beanTypeMap.remove(beanClass, propertyType);
	}

	public void unregisterJsonValueProcessor(Class beanClass, String key) {
		if ((beanClass != null) && (key != null))
			this.beanKeyMap.remove(beanClass, key);
	}

	public void unregisterJsonValueProcessor(String key) {
		if (key != null)
			this.keyMap.remove(key);
	}

	public void unregisterPropertyExclusion(Class target, String propertyName) {
		if ((target != null) && (propertyName != null)) {
			Set set = (Set) this.exclusionMap.get(target);
			if (set == null) {
				set = new HashSet();
				this.exclusionMap.put(target, set);
			}
			set.remove(propertyName);
		}
	}

	public void unregisterPropertyExclusions(Class target) {
		if (target != null) {
			Set set = (Set) this.exclusionMap.get(target);
			if (set != null)
				set.clear();
		}
	}

	/** @deprecated */
	public void unregisterPropertyNameProcessor(Class target) {
		unregisterJavaPropertyNameProcessor(target);
	}
}