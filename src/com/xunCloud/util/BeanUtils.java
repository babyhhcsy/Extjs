package com.xunCloud.util;

import java.io.PrintStream;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.security.AccessController;
import java.security.PrivilegedAction;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.util.Assert;
import org.springframework.util.ReflectionUtils;

public class BeanUtils extends org.apache.commons.beanutils.BeanUtils {
	private static Log logger = LogFactory.getLog(BeanUtils.class);

	public static Field getDeclaredField(Object object, String propertyName)
			throws NoSuchFieldException {
		Assert.notNull(object);
		Assert.hasText(propertyName);

		return getDeclaredField(object.getClass(), propertyName);
	}

	public static Field getDeclaredField(Class clazz, String propertyName)
			throws NoSuchFieldException {
		Assert.notNull(clazz);
		Assert.hasText(propertyName);

		for (Class superClass = clazz; superClass != Object.class; superClass = superClass
				.getSuperclass()) {
			try {
				return superClass.getDeclaredField(propertyName);
			} catch (NoSuchFieldException ex) {
				System.err.println(ex);
			}
		}

		throw new NoSuchFieldException("No such field: " + clazz.getName()
				+ '.' + propertyName);
	}

	public static Object forceGetProperty(Object object, String propertyName)
			throws NoSuchFieldException {
		Assert.notNull(object);
		Assert.hasText(propertyName);

		Field field = getDeclaredField(object, propertyName);

		return AccessController
				.doPrivileged(new PrivilegedAction(field, object) {
					public Object run() {
						boolean accessible = BeanUtils.this.isAccessible();
						BeanUtils.this.setAccessible(true);

						Object result = null;
						try {
							result = BeanUtils.this.get(this.val$object);
						} catch (IllegalAccessException e) {
							BeanUtils.logger.info("error wont' happen");
						}

						BeanUtils.this.setAccessible(accessible);

						return result;
					}
				});
	}

	public static void forceSetProperty(Object object, String propertyName,
			Object newValue) throws NoSuchFieldException {
		Assert.notNull(object);
		Assert.hasText(propertyName);

		Field field = getDeclaredField(object, propertyName);

		AccessController.doPrivileged(new PrivilegedAction(field, object,
				newValue) {
			public Object run() {
				boolean accessible = BeanUtils.this.isAccessible();
				BeanUtils.this.setAccessible(true);
				try {
					BeanUtils.this.set(this.val$object, this.val$newValue);
				} catch (IllegalAccessException e) {
					BeanUtils.logger.info("Error won't happen");
				}

				BeanUtils.this.setAccessible(accessible);

				return null;
			}
		});
	}

	public static Object invokePrivateMethod(Object object, String methodName,
			Object[] params) throws NoSuchMethodException {
		Assert.notNull(object);
		Assert.hasText(methodName);

		Class[] types = new Class[params.length];

		for (int i = 0; i < params.length; ++i) {
			types[i] = params[i].getClass();
		}

		Class clazz = object.getClass();
		Method method = null;

		for (Class superClass = clazz; superClass != Object.class; superClass = superClass
				.getSuperclass()) {
			try {
				method = superClass.getDeclaredMethod(methodName, types);
			} catch (NoSuchMethodException ex) {
				System.err.println(ex);
			}
		}

		if (method == null) {
			throw new NoSuchMethodException("No Such Method:"
					+ clazz.getSimpleName() + methodName);
		}

		Method m = method;

		return AccessController.doPrivileged(new PrivilegedAction(m, object,
				params) {
			public Object run() {
				boolean accessible = BeanUtils.this.isAccessible();
				BeanUtils.this.setAccessible(true);

				Object result = null;
				try {
					result = BeanUtils.this.invoke(this.val$object,
							this.val$params);
				} catch (Exception e) {
					ReflectionUtils.handleReflectionException(e);
				}

				BeanUtils.this.setAccessible(accessible);

				return result;
			}
		});
	}

	public static List<Field> getFieldsByType(Object object, Class type) {
		List list = new ArrayList();
		Field[] fields = object.getClass().getDeclaredFields();

		for (Field field : fields) {
			if (field.getType().isAssignableFrom(type)) {
				list.add(field);
			}
		}

		return list;
	}

	public static Class getPropertyType(Class type, String name)
			throws NoSuchFieldException {
		return getDeclaredField(type, name).getType();
	}

	public static String getGetterName(Class type, String fieldName)
			throws NoSuchFieldException {
		Assert.notNull(type, "Type required");
		Assert.hasText(fieldName, "FieldName required");

		Class fieldType = getDeclaredField(type, fieldName).getType();

		if ((fieldType == Boolean.TYPE) || (fieldType == Boolean.class)) {
			return "is" + StringUtils.capitalize(fieldName);
		}
		return "get" + StringUtils.capitalize(fieldName);
	}

	public static Method getGetterMethod(Class type, String fieldName) {
		try {
			return type.getMethod(getGetterName(type, fieldName), new Class[0]);
		} catch (NoSuchMethodException ex) {
			logger.error(ex.getMessage(), ex);
		} catch (NoSuchFieldException ex) {
			logger.error(ex.getMessage(), ex);
		}

		return null;
	}

	public static Map<String, String> getSearchProperty(Object model)
			throws NoSuchMethodException, IllegalAccessException,
			IllegalArgumentException, InvocationTargetException {
		Map resultMap = new TreeMap();

		Field[] field = model.getClass().getDeclaredFields();
		for (int i = 0; i < field.length; ++i) {
			String name = field[i].getName();

			String type = field[i].getGenericType().toString();
			if (!(type.equals("class java.lang.String")))
				continue;
			Method m = model.getClass().getMethod("get" + UpperCaseField(name),
					new Class[0]);
			String value = (String) m.invoke(model, new Object[0]);
			if (value != null) {
				resultMap.put(name, value);
			}
		}

		return resultMap;
	}

	private static String UpperCaseField(String fieldName) {
		fieldName = fieldName.replaceFirst(fieldName.substring(0, 1), fieldName
				.substring(0, 1).toUpperCase());
		return fieldName;
	}
}