package ru.vsu.Peredachka.data.dto.travelPoint;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateTravelPointDto {
    private String comment;
    private Double x, y;
    private String address;
    private Date dispatchDate;
    private Date arrivalDate;

    private Integer pointIndex;
}
