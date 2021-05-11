package ru.vsu.Peredachka.data.dto;

import lombok.Builder;
import lombok.Data;
import ru.vsu.Peredachka.data.commons.Status;

/**
 * @author Burdyug Pavel
 */

@Data
@Builder
public class StatusDto {
    private Status status;
}
