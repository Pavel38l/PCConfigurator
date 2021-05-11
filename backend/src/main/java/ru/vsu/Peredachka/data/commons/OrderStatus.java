package ru.vsu.Peredachka.data.commons;

/**
 * @author Burdyug Pavel
 */
public enum OrderStatus {
    OFFERED(1),
    DEFINED(2),
    COMPLETED(3),
    ;

    private final Integer id;

    OrderStatus(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    /**
     * Tries to parse given id into {@link OrderStatus} instance.
     *
     * @param id id to find matching type
     * @return {@link OrderStatus} with matching id or {@literal null}
     */
    public static OrderStatus fromId(final Integer id) {
        if (id == null) {
            return null;
        }
        for (final var value : values()) {
            if (value.id.equals(id)) {
                return value;
            }
        }
        return null;
    }


    @Override
    public String toString() {
        return super.toString();
    }
}
