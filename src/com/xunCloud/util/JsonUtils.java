package com.xunCloud.util;

import com.xunCloud.util.DateHelper;
import com.xunCloud.util.StringUtils;
import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.io.Writer;
import java.lang.reflect.Method;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import net.sf.json.JSON;
import net.sf.json.JSONArray;
import net.sf.json.JSONNull;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;
import net.sf.json.JsonConfig;
import net.sf.json.processors.DefaultValueProcessor;
import net.sf.json.util.CycleDetectionStrategy;
import net.sf.json.util.PropertyFilter;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class JsonUtils {
	private static Log logger = LogFactory.getLog(JsonUtils.class);

	public static void write(Object bean, Writer writer, String[] excludes,
			String datePattern) throws Exception {
		String pattern = null;

		if (datePattern != null)
			pattern = datePattern;
		else {
			pattern = "yyyy-MM-dd";
		}

		JsonConfig jsonConfig = configJson(excludes, pattern);

		JSON json = JSONSerializer.toJSON(bean, jsonConfig);

		json.write(writer);
	}

	public static void write(Object bean, Writer writer, String[] excludes,
			Map<Object, String[]> relationInfoFilterMap, String datePattern)
			throws Exception {
		String pattern = null;

		if (datePattern != null)
			pattern = datePattern;
		else {
			pattern = "yyyy-MM-dd";
		}

		JsonConfig jsonConfig = configJson(excludes, relationInfoFilterMap,
				pattern);

		JSON json = JSONSerializer.toJSON(bean, jsonConfig);

		json.write(writer);
	}

	public static void write(Object bean, Writer writer, String excludes,
			String datePattern) throws Exception {
		if (excludes == null)
			write(bean, writer, new String[] { "hibernateLazyInitializer" },
					datePattern);
		else
			write(bean, writer, excludes.split(","), datePattern);
	}

	public static void write(Object bean, Writer writer) throws Exception {
		write(bean, writer, new String[] { "hibernateLazyInitializer" },
				"yyyy-MM-dd");
	}

	public static JsonConfig configJson(String[] excludes, String datePattern) {
		JsonConfig jsonConfig = new JsonConfig();
		if (excludes != null)
			jsonConfig.setExcludes(excludes);
		else {
			jsonConfig.setExcludes(new String[] { "hibernateLazyInitializer" });
		}
		jsonConfig.setIgnoreDefaultExcludes(false);
		jsonConfig.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT);
		jsonConfig.registerDefaultValueProcessor(Integer.class,
				new DefaultValueProcessor() {
					public Object getDefaultValue(Class type) {
						return JSONNull.getInstance();
					}
				});
		jsonConfig.registerDefaultValueProcessor(Double.class,
				new DefaultValueProcessor() {
					public Object getDefaultValue(Class type) {
						return JSONNull.getInstance();
					}
				});
		jsonConfig.registerDefaultValueProcessor(Float.class,
				new DefaultValueProcessor() {
					public Object getDefaultValue(Class type) {
						return JSONNull.getInstance();
					}
				});
		jsonConfig.registerDefaultValueProcessor(Byte.class,
				new DefaultValueProcessor() {
					public Object getDefaultValue(Class type) {
						return JSONNull.getInstance();
					}
				});
		jsonConfig.registerDefaultValueProcessor(Long.class,
				new DefaultValueProcessor() {
					public Object getDefaultValue(Class type) {
						return JSONNull.getInstance();
					}
				});
		jsonConfig.registerJsonValueProcessor(java.sql.Date.class,
				new DateJsonValueProcessor(datePattern));
		jsonConfig.registerJsonValueProcessor(java.sql.Date.class,
				new DateJsonValueProcessor(datePattern));
		jsonConfig.registerJsonValueProcessor(Timestamp.class,
				new DateJsonValueProcessor(datePattern));

		return jsonConfig;
	}

	public static JsonConfig configJson(String[] excludes,
			Map<Object, String[]> relationInfoFilterMap, String datePattern) {
		JsonConfig jsonConfig = new JsonConfig();
		if (excludes != null)
			jsonConfig.setExcludes(excludes);
		else {
			jsonConfig.setExcludes(new String[] { "hibernateLazyInitializer" });
		}
		jsonConfig.setIgnoreDefaultExcludes(false);
		jsonConfig.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT);
		jsonConfig.registerDefaultValueProcessor(Integer.class,
				new DefaultValueProcessor() {
					public Object getDefaultValue(Class type) {
						return JSONNull.getInstance();
					}
				});
		jsonConfig.registerDefaultValueProcessor(Double.class,
				new DefaultValueProcessor() {
					public Object getDefaultValue(Class type) {
						return JSONNull.getInstance();
					}
				});
		jsonConfig.registerDefaultValueProcessor(Float.class,
				new DefaultValueProcessor() {
					public Object getDefaultValue(Class type) {
						return JSONNull.getInstance();
					}
				});
		jsonConfig.registerDefaultValueProcessor(Byte.class,
				new DefaultValueProcessor() {
					public Object getDefaultValue(Class type) {
						return JSONNull.getInstance();
					}
				});
		jsonConfig.registerDefaultValueProcessor(Long.class,
				new DefaultValueProcessor() {
					public Object getDefaultValue(Class type) {
						return JSONNull.getInstance();
					}
				});
		jsonConfig.setJsonPropertyFilter(new PropertyFilter(
				relationInfoFilterMap) {
			public boolean apply(Object source, String name, Object value) {
				if ((value != null)
						&& (JsonUtils.this != null)
						&& (!(JsonUtils.this.containsKey(source.getClass()
								.getName()))))
					return false;
				if (value == null)
					return true;
				if ((JsonUtils.this != null)
						&& (JsonUtils.this.containsKey(source.getClass()
								.getName()))) {
					return StringUtils.in(name, (String[]) JsonUtils.this
							.get(source.getClass().getName()));
				}

				return true;
			}
		});
		jsonConfig.registerJsonValueProcessor(java.sql.Date.class,
				new DateJsonValueProcessor(datePattern));
		jsonConfig.registerJsonValueProcessor(java.sql.Date.class,
				new DateJsonValueProcessor(datePattern));
		jsonConfig.registerJsonValueProcessor(Timestamp.class,
				new DateJsonValueProcessor(datePattern));

		return jsonConfig;
	}

	public static <T> T json2Bean(String data, Class<T> clazz,
			String[] excludes, String datePattern) throws Exception {
		Object entity = clazz.newInstance();

		return json2Bean(data, entity, excludes, datePattern);
	}

	public static <T> T json2Bean(String data, Class<T> clazz) throws Exception {
		return json2Bean(data, clazz, null, null);
	}

	public static <T> T json2Bean(String data, T entity, String[] excludes,
			String datePattern) throws Exception {
		JSONObject jsonObject = JSONObject.fromObject(data);

		return json2Bean(jsonObject, entity, excludes, datePattern);
	}

	public static <T> T json2Bean(String data, T entity) throws Exception {
		return json2Bean(data, entity, null, null);
	}

	public static <T> T json2Bean(JSONObject jsonObject, Class<T> clazz,
			String[] excludes, String datePattern) throws Exception {
		Object entity = clazz.newInstance();

		return (T) json2Bean(jsonObject, entity, excludes, datePattern);
	}

	public static <T> T json2Bean(JSONObject jsonObject, Class<T> clazz)
			throws Exception {
		return json2Bean(jsonObject, clazz, null, null);
	}

	public static <T> T json2Bean(JSONObject jsonObject, T entity, String[] excludes, String datePattern)
    throws Exception
  {
    Set excludeSet = createExcludeSet(excludes);

    for (Iterator localIterator = jsonObject.entrySet().iterator(); localIterator.hasNext(); ) { Object object = localIterator.next();
      Map.Entry entry = (Map.Entry)object;
      String propertyName = entry.getKey().toString();

      if (excludeSet.contains(propertyName)) {
        continue;
      }

      String propertyValue = entry.getValue().toString();
      Class clazz = null;
      try {
        if (propertyName.indexOf(".") > 0) {
          propertyName = propertyName.substring(0, 
            propertyName.indexOf("."));
          JSONObject jo = JSONObject.fromObject("{id:'" + 
            propertyValue + "'}");
          PropertyDescriptor propertyDescriptor = new PropertyDescriptor(
            propertyName, entity.getClass());
          clazz = propertyDescriptor.getPropertyType();

          Object o = JSONObject.toBean(jo, clazz);
          Method writeMethod = propertyDescriptor.getWriteMethod();

          invokeWriteMethod(entity, writeMethod, clazz, o, 
            datePattern);
          break ;
        }
        PropertyDescriptor propertyDescriptor = new PropertyDescriptor(
          propertyName, entity.getClass());
        clazz = propertyDescriptor.getPropertyType();

        Method writeMethod = propertyDescriptor.getWriteMethod();

        label284: invokeWriteMethod(entity, writeMethod, clazz, 
          propertyValue, datePattern);
      }
      catch (IntrospectionException ex) {
        logger.warn(ex);
      }
      catch (NumberFormatException ex)
      {
        logger.warn(ex);
      }
      catch (ParseException ex)
      {
        logger.warn(ex);
      }
      catch (Exception ex)
      {
        logger.warn(ex);
      }

    }

    return entity;
  }

	public static Set<String> createExcludeSet(String[] excludes) {
		Set excludeSet = new HashSet();

		if (excludes != null) {
			for (String exclude : excludes)
				excludeSet.add(exclude);
		} else {
			excludeSet.add("hibernateLazyInitializer");
		}

		return excludeSet;
	}

	public static void invokeWriteMethod(Object entity, Method writeMethod,
			Class propertyType, Object propertyValue, String datePattern)
			throws Exception {
		if (isPrimivite(propertyType)) {
			invokePrimivite(entity, writeMethod, propertyType,
					String.valueOf(propertyValue));
		} else if (propertyType == String.class) {
			writeMethod.invoke(entity, new Object[] { propertyValue });
		} else if (propertyType == java.sql.Date.class) {
			writeMethod.invoke(
					entity,
					new Object[] { DateHelper.parseSqlDate(
							String.valueOf(propertyValue), datePattern) });
		} else if ((propertyType == Timestamp.class)
				|| (propertyType == java.sql.Date.class)) {
			DateFormat dateFormat = getSqlTime(datePattern);
			writeMethod.invoke(entity, new Object[] { new Timestamp(dateFormat
					.parse(String.valueOf(propertyValue)).getTime()) });
		} else {
			writeMethod.invoke(entity, new Object[] { propertyValue });
		}
	}

	public static void invokePrimivite(Object entity, Method writeMethod,
			Class propertyType, String propertyValue) throws Exception {
		if (isByte(propertyType))
			writeMethod
					.invoke(entity, new Object[] { Byte.valueOf(Byte
							.parseByte(propertyValue)) });
		else if (isShort(propertyType))
			writeMethod.invoke(entity, new Object[] { Short.valueOf(Short
					.parseShort(propertyValue)) });
		else if (isInt(propertyType))
			writeMethod.invoke(entity, new Object[] { Integer.valueOf(Integer
					.parseInt(propertyValue)) });
		else if (isLong(propertyType))
			writeMethod
					.invoke(entity, new Object[] { Long.valueOf(Long
							.parseLong(propertyValue)) });
		else if (isFloat(propertyType))
			writeMethod.invoke(entity, new Object[] { Float.valueOf(Float
					.parseFloat(propertyValue)) });
		else if (isDouble(propertyType))
			writeMethod.invoke(entity, new Object[] { Double.valueOf(Double
					.parseDouble(propertyValue)) });
		else if (isBoolean(propertyType))
			writeMethod.invoke(entity, new Object[] { Boolean.valueOf(Boolean
					.parseBoolean(propertyValue)) });
		else if (isChar(propertyType))
			writeMethod
					.invoke(entity, new Object[] { Character
							.valueOf(propertyValue.charAt(0)) });
	}

	public static boolean isPrimivite(Class clazz) {
		if (isByte(clazz))
			return true;
		if (isShort(clazz))
			return true;
		if (isInt(clazz))
			return true;
		if (isLong(clazz))
			return true;
		if (isFloat(clazz))
			return true;
		if (isDouble(clazz))
			return true;
		if (isBoolean(clazz)) {
			return true;
		}
		return (isChar(clazz));
	}

	public static boolean isString(Class clazz) {
		return (clazz == String.class);
	}

	public static boolean isByte(Class clazz) {
		return ((clazz == Byte.class) || (clazz == Byte.TYPE));
	}

	public static boolean isShort(Class clazz) {
		return ((clazz == Short.class) || (clazz == Short.TYPE));
	}

	public static boolean isInt(Class clazz) {
		return ((clazz == Integer.class) || (clazz == Integer.TYPE));
	}

	public static boolean isLong(Class clazz) {
		return ((clazz == Long.class) || (clazz == Long.TYPE));
	}

	public static boolean isFloat(Class clazz) {
		return ((clazz == Float.class) || (clazz == Float.TYPE));
	}

	public static boolean isDouble(Class clazz) {
		return ((clazz == Double.class) || (clazz == Double.TYPE));
	}

	public static boolean isBoolean(Class clazz) {
		return ((clazz == Boolean.class) || (clazz == Boolean.TYPE));
	}

	public static boolean isChar(Class clazz) {
		return ((clazz == Character.class) || (clazz == Character.TYPE));
	}

	public static boolean isDate(Class clazz) {
		return (clazz == java.sql.Date.class);
	}

	public static boolean isTimestamp(Class clazz) {
		return (clazz == Timestamp.class);
	}

	public static SimpleDateFormat getDateFormat(String datePattern) {
		if (datePattern == null) {
			return new SimpleDateFormat("yyyy-MM-dd");
		}
		return new SimpleDateFormat(datePattern);
	}

	public static DateFormat getSqlTime(String datePattern) {
		if (datePattern == null) {
			return new SimpleDateFormat("yyyy-MM-dd");
		}
		return new SimpleDateFormat(datePattern);
	}

	public static <T> T json2Bean(JSONObject jsonObject, T entity)
			throws Exception {
		return json2Bean(jsonObject, entity, null, null);
	}

	public static <T> List<T> json2List(String data, Class<T> clazz,
			String[] excludes, String datePattern) throws Exception {
		JSONArray jsonArray = JSONArray.fromObject(data);

		return json2List(jsonArray, clazz, excludes, datePattern);
	}

	public static <T> List<T> json2List(String data, Class<T> clazz)
			throws Exception {
		return json2List(data, clazz, null, null);
	}

	public static <T> List<T> json2List(JSONArray jsonArray, Class<T> clazz,
			String[] excludes, String datePattern) throws Exception {
		List list = new ArrayList();

		for (int i = 0; i < jsonArray.size(); ++i) {
			JSONObject jsonObject = jsonArray.getJSONObject(i);
			Object node = json2Bean(jsonObject, clazz, excludes, datePattern);
			list.add(node);
		}

		return list;
	}

	public static <T> List<T> json2List(JSONArray jsonArray, Class<T> clazz)
			throws Exception {
		return json2List(jsonArray, clazz, null, null);
	}
}