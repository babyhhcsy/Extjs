package com.xunCloud.util;

import java.util.UUID;

/**
 * UUID生成器
 */
public class UUIDGenerator {
	public static String generate36() {
		return UUID.randomUUID().toString();
	}
	public static String generate32() {
		return generate36().replace("-", "");
	}
	/**
	 * 可能重复
	 */
	public static String generate20() {
		return generate32().substring(0,20);
	}
}
