package ru.vsu.Peredachka.data.dto.user;

import lombok.*;
import ru.vsu.Peredachka.data.dto.UserRoleDto;
import ru.vsu.Peredachka.data.dto.journey.JourneyDto;
import ru.vsu.Peredachka.data.dto.order.OrderDto;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class UserWithDependenciesDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private Integer rating;
    private LocalDate dateOfBirth;
    private String sex;

    private UserRoleDto userRole;

    private List<JourneyDto> journeys;

    private List<OrderDto> orders;
}
