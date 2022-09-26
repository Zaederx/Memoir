package com.Memoir.Memoir.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.Memoir.Memoir.domain.UserProfile;
/**
 * Interface for spring respository.
 * Allows querying of the database.
 * @author Zachary Ishmael
 * @version 1.0.0
 * Note: see like Queries Spring Data JPA (https://www.baeldung.com/spring-jpa-like-queries) for understanding of LIKE queries
 */
public interface UserProfileRepository extends CrudRepository<UserProfile, Integer> {
    UserProfile findByUsername(String username);
    UserProfile findByEmail(String email);
    List<UserProfile> findByNameLike(String name);
}
