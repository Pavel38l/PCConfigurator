package ru.vsu.Peredachka.data.dto.journey;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class JourneyDto {
    private Long id;
    private LocalDate dispatchDate;
    private LocalDate arrivalDate;
    private Double cost;
}
