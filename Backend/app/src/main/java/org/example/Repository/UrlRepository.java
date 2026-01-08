package org.example.Repository;

import org.example.Entity.Url;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UrlRepository extends JpaRepository<Url,String> {
    Optional<Url> getUrlByCode(String shortCode);
    Optional<List<Url>> findByUserId(String userId);
}
