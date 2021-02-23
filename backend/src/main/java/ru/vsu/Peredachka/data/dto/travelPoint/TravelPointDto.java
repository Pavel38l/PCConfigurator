package ru.vsu.Peredachka.data.dto.travelPoint;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class TravelPointDto {
    private Long id;
    private String comment;
    private Double x, y;
    private LocalDate dispatchDate;
    private LocalDate arrivalDate;
}
