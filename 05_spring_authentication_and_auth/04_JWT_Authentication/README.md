# 04 JWT Authentication
- Understand JWT structure: header, payload, signature
- Create JwtUtil.java to generate and validate tokens
- Create JwtFilter.java to intercept requests and validate JWT
- Update SecurityConfig to use JwtFilter instead of default login
- Create AuthController for login endpoint (returns JWT)
- Protect endpoints using JWT (stateless authentication)
- Test token in Postman with Authorization: Bearer <token>
