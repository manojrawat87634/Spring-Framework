package com.example.demo.helpers;

import jakarta.servlet.http.HttpServletRequest;

public class RequestUtils {

    public static String getClientIp(HttpServletRequest request) {

        String xfHeader = request.getHeader("X-Forwarded-For");

        if (xfHeader != null && !xfHeader.isEmpty()) {
            return xfHeader.split(",")[0];
        }

        return request.getRemoteAddr();
    }

    public static String getUserAgent(HttpServletRequest request) {
        return request.getHeader("User-Agent");
    }

    public static String parseDevice(String userAgent) {

        if (userAgent == null) return "UNKNOWN";

        userAgent = userAgent.toLowerCase();

        if (userAgent.contains("android")) return "ANDROID";
        if (userAgent.contains("iphone")) return "IPHONE";
        if (userAgent.contains("windows")) return "WINDOWS";
        if (userAgent.contains("mac")) return "MAC";

        return "OTHER";
    }
}