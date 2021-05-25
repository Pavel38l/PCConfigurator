package ru.vsu.Peredachka.service;

import javassist.NotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.vsu.Peredachka.data.entity.User;
import ru.vsu.Peredachka.data.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private static final Logger logger = LoggerFactory.getLogger(
            UserService.class);

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User findById(Long id) throws NotFoundException {
        return userRepository.findById(id).orElseThrow(() -> new NotFoundException("User not found!"));
    }

    public Optional<User> findByLoginAndPassword(String email, String password) {
        logger.debug("method findByLoginAndPassword started. Params: {}, {}", email, password);
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }

    public User findByEmail(String email) throws NotFoundException {
        return userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("User not found!"));
    }

    public boolean isUserExist(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }
    public User update(User user){
        Optional<User> user1 = userRepository.findById(user.getId());
        user.setPassword(user1.get().getPassword());
        return userRepository.save(user);
    }

    public void deleteUserById(Long id) throws NotFoundException {
        var user = findById(id);
        userRepository.delete(user);
    }


    public List<User> getAllUsers() {
        var result = new ArrayList<User>();
        userRepository.findAll().forEach(result::add);
        return result;
    }

    public void updateRating(Long id, Integer rate) throws NotFoundException {
        User user = findById(id);
        user.setRating(rate);
        userRepository.save(user);
    }
}
