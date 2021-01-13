package ru.vsu.Peredachka.data.dto;


import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class UserDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private Integer rating;
    private LocalDate dateOfBirth;
    private String sex;
}
