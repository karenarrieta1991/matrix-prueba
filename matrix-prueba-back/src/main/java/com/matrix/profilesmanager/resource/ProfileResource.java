package com.matrix.profilesmanager.resource;

import com.matrix.profilesmanager.model.Profile;
import com.matrix.profilesmanager.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/profile")
public class ProfileResource {

    private final ProfileService profileService;

    @Autowired
    public ProfileResource(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Profile>> getAllProfiles() {
        List<Profile> profiles = profileService.findAllProfiles();
        return new ResponseEntity<>(profiles, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Profile> getProfileById(@PathVariable("id") Long id) {
        Profile profile = profileService.findProfileById(id);
        return new ResponseEntity<>(profile, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Profile> addProfile(@RequestBody Profile profile) {
        Profile newProfile = profileService.addProfile(profile);
        return new ResponseEntity<>(newProfile, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Profile> updateProfile(@RequestBody Profile profile) {
        Profile updateProfile = profileService.updateProfile(profile);
        return new ResponseEntity<>(updateProfile, HttpStatus.OK);
    }

    @Transactional
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProfile(@PathVariable("id") Long id) {
        profileService.deleteProfile(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
