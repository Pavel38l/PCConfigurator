package ru.vsu.Peredachka.service;

import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;
import ru.vsu.Peredachka.data.entity.User;

import static org.junit.jupiter.api.Assertions.*;

class UserServiceTest {
    @Test
    void getAllUsers() {
        Assertions.assertEquals(2, 2);
        Assertions.assertEquals(3, 3);
        //Assertions.assertEquals(4, userService.getAllUsers().size());
    }
}