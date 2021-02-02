package ru.vsu.Peredachka.data.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class CreateOrUpdateTravelPointDto {
    private String comment;
    private Double x, y;
    private LocalDate dispatchDate;
    private LocalDate arrivalDate;
}
