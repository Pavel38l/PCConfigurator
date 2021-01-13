package ru.vsu.Peredachka.data.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class CreateOrUpdateTravelPointDto {
    private String comment;
    private Double x, y;
}
