package ru.vsu.Peredachka.data.dto.travelPoint;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class TravelPointDto {
    private Long id;
    private String comment;
    private Double x, y;
    private String address;
    private Date dispatchDate;
    private Date arrivalDate;
}
