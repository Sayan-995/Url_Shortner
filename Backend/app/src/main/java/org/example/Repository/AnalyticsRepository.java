package org.example.Repository;

import org.example.Entity.Analytics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AnalyticsRepository extends JpaRepository<Analytics, Long> {
    long countByShortCode(String shortCode);
    @Query("SELECT COUNT(DISTINCT a.ip) FROM Analytics a WHERE a.shortCode = :shortCode")
    long countDistinctIpByShortcode(String shortCode);
}
