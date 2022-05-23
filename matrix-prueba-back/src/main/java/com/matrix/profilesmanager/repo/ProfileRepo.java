package com.matrix.profilesmanager.repo;

import com.matrix.profilesmanager.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepo extends JpaRepository<Profile, Long> {
    void deleteProfileById(Long id);

    Optional<Profile> findProfileById(Long id);
}
