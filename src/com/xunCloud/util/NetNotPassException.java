package com.xunCloud.util;

/**
 * 自定义网络异常
 * @author hjm
 *
 */
public class NetNotPassException  extends RuntimeException  {
	private static final long serialVersionUID = -4152740865181941669L;

	public NetNotPassException() {
		super();
	}

	public NetNotPassException(String message) {
		super(message);
	}

	public NetNotPassException(String message, Throwable cause) {
		super(message, cause);
	}

	public NetNotPassException(Throwable cause) {
		super(cause);
	}
}
