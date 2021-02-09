package ru.vsu.Peredachka.data.mapper;

import ru.vsu.Peredachka.data.dto.AbstractDto;
import ru.vsu.Peredachka.data.entity.AbstractEntity;

public interface Mapper<E extends AbstractEntity, D extends AbstractDto> {

    E toEntity(D dto);

    D toDto(E entity);
}
