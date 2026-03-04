# 02 Database Authentication
- Create User entity in models/
- Add fields: username, password, role
- Create UserRepository (JpaRepository)
- Implement CustomUserDetailsService implementing UserDetailsService
- Use BCryptPasswordEncoder for password encryption
- Connect Spring Security login to database users
- Test login with DB credentials
