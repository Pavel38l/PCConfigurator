package ru.vsu.Peredachka.controller;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ru.vsu.Peredachka.data.dto.MsgDto;
import ru.vsu.Peredachka.data.dto.security.AuthResponseDto;
import ru.vsu.Peredachka.data.dto.security.LoginUserDto;
import ru.vsu.Peredachka.data.dto.security.RegisterUserDto;
import ru.vsu.Peredachka.data.entity.User;
import ru.vsu.Peredachka.data.entity.UserRole;
import ru.vsu.Peredachka.data.mapper.UserRegisterMapper;
import ru.vsu.Peredachka.security.CustomUserDetails;
import ru.vsu.Peredachka.security.JwtProvider;
import ru.vsu.Peredachka.service.UserRoleService;
import ru.vsu.Peredachka.service.UserService;

import java.util.Optional;

import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping("/api/v1/security")
@CrossOrigin
public class SecurityController {

    private final UserRoleService userRoleService;
    private final UserRegisterMapper mapper;
    private final UserService userService;
    private final JwtProvider jwtProvider;

    public SecurityController(UserRoleService userRoleService, UserRegisterMapper mapper, UserService userService, JwtProvider jwtProvider) {
        this.userRoleService = userRoleService;
        this.mapper = mapper;
        this.userService = userService;
        this.jwtProvider = jwtProvider;
    }

    @RequestMapping(method = GET, path = "/getCurrentUser")
    public MsgDto getAuth(Authentication auth) {
        if (auth != null) {
            var details = (CustomUserDetails) auth.getPrincipal();
            return new MsgDto(details.getEmail());
        }
        return null;
    }

    @RequestMapping(method = POST, path = "/register")
    @ResponseStatus(HttpStatus.CREATED)
    public void register(@RequestBody RegisterUserDto dto) {
        UserRole userRole = userRoleService.findByName("ROLE_USER");
        User user = mapper.toEntity(dto);
        user.setUserRole(userRole);
        userService.updateOrCreateUser(user);
    }

    @RequestMapping(method = POST, path = "/login")
    public AuthResponseDto login(@RequestBody LoginUserDto dto) {
        Optional<User> userOptional = userService.findByLoginAndPassword(dto.getEmail(), dto.getPassword());
        if (userOptional.isEmpty()) {
            throw new RuntimeException("Invalid username or password!");
        }
        User user = userOptional.get();
        String token = jwtProvider.generateToken(user.getEmail(), user.getUserRole());
        return new AuthResponseDto(token);
    }
}
