package com.payment.payment.security;

import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Component
public class UserContextHolder {

    public UserContext getCurrentUser() {
        ServletRequestAttributes attributes =
                (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();

        if (attributes == null) return null;

        return (UserContext) attributes.getAttribute("userContext", ServletRequestAttributes.SCOPE_REQUEST);
    }
}
