package ru.vsu.Peredachka.data.dto.security;

import lombok.Data;
import ru.vsu.Peredachka.data.dto.AbstractDto;

import java.time.LocalDate;

@Data
public class RegisterUserDto extends AbstractDto {

    private String email;
    private String firstName;
    private String lastName;
    private String password;
    private LocalDate dateOfBirth;
    private String sex;
}
