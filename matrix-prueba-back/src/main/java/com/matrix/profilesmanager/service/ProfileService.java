package com.matrix.profilesmanager.service;

import com.matrix.profilesmanager.exception.UserNotFoundException;
import com.matrix.profilesmanager.model.Profile;
import com.matrix.profilesmanager.repo.ProfileRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProfileService {
    private final ProfileRepo profileRepo;

    @Autowired
    public ProfileService(ProfileRepo profileRepo) {
        this.profileRepo = profileRepo;
    }

    public Profile addProfile(Profile profile) {
        return profileRepo.save(profile);
    }

    public List<Profile> findAllProfiles() {
        return profileRepo.findAll();
    }

    public Profile updateProfile(Profile profile) {
        return profileRepo.save(profile);
    }

    public Profile findProfileById(Long id) {
        return profileRepo.findProfileById(id).orElseThrow(() -> new UserNotFoundException("User by id " + id + " was not found"));
    }

    @Transactional
    public void deleteProfile(Long id) {
        profileRepo.deleteProfileById(id);
    }
}
