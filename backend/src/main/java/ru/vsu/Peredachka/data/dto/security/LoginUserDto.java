package ru.vsu.Peredachka.data.dto.security;

import lombok.Data;

@Data
public class LoginUserDto {

    private String email;
    private String password;

}
