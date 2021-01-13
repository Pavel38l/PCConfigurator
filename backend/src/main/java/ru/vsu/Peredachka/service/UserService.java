package ru.vsu.Peredachka.service;

import javassist.NotFoundException;
import org.springframework.stereotype.Service;
import ru.vsu.Peredachka.data.entity.User;
import ru.vsu.Peredachka.data.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public User findById(Long id) throws NotFoundException {
       return userRepository.findById(id).orElseThrow(() -> new NotFoundException("User not found!"));
    }

    public User updateOrCreateUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUserById(Long id) throws NotFoundException {
        var user = findById(id);
        userRepository.delete(user);
    }


}
