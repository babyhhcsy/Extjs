package com.xunyun.filter;
import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
/**
 * @ClassName: SetEncodeFilter
 * @Description: TODO(设置登录的编码模式)
 * @author babyhhcsy
 */
public class SetEncodeFilter implements Filter {
    /** (非 Javadoc)
     * <p>Title: destroy</p>
     * <p>Description: </p>
     * @see javax.servlet.Filter#destroy()
     * 
     */
    public void destroy() {
    }
    /** (非 Javadoc)
     * <p>Title: doFilter</p>
     * <p>Description: </p>
     * @param request request对象
     * @param response response对象
     * @param chain 责任链
     * @throws IOException io异常
     * @throws ServletException 服务器异常
     * @see javax.servlet.Filter#doFilter
     * (javax.servlet.ServletRequest, javax.servlet.ServletResponse, javax.servlet.FilterChain)
     */
    public void doFilter(ServletRequest request, ServletResponse response,
            FilterChain chain) throws IOException, ServletException {
	    String encoding = "UTF-8";
        request.setCharacterEncoding(encoding);
        chain.doFilter(request, response);
    }
    /** (非 Javadoc)
     * <p>Title: init</p>
     * <p>Description: </p>
     * @param arg0 初始化参数
     * @throws ServletException 服务器异常
     * @see javax.servlet.Filter#init(javax.servlet.FilterConfig)
     *
     */
    public void init(FilterConfig arg0) throws ServletException {
    }
}