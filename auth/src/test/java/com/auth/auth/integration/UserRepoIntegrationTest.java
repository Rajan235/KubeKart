package com.auth.auth.dao;

import com.auth.auth.model.Role;
import com.auth.auth.model.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.DataIntegrityViolationException;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class UserRepoIntegrationTest {

    @Autowired
    private UserRepo userRepo;

    @Test
    void testUsernameMustBeUnique() {
        User u1 = new User(0, "sameuser", "pass1", "u1@example.com", Role.USER);
        User u2 = new User(0, "sameuser", "pass2", "u2@example.com", Role.USER);

        userRepo.save(u1);
        assertThrows(DataIntegrityViolationException.class, () -> userRepo.saveAndFlush(u2));
    }
}
