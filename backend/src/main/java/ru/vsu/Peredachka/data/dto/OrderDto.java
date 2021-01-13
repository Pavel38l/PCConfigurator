package ru.vsu.Peredachka.data.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class OrderDto {
    private Long id;
    private Integer orderValue;
    private String description;
}
