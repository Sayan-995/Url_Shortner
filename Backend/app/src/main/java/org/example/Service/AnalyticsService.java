package org.example.Service;

import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.example.Entity.Analytics;
import org.example.Entity.Url;
import org.example.Model.StatsCount;
import org.example.Repository.AnalyticsRepository;
import org.example.Repository.UrlRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Repository
@RequiredArgsConstructor
public class AnalyticsService {
    @Autowired
    RestTemplate restTemplate;
    @Autowired
    AnalyticsRepository analyticsRepository;
    @Autowired
    UrlRepository urlRepository;

    public void processAnalytics(Analytics analytics) {
        analyticsRepository.save(analytics);
    }
    private final EntityManager em;

    public List<Object[]> findCountsByField(String fieldName, String shortCode) {
        String jpql = String.format(
                "SELECT a.%s AS stat, COUNT(a) AS count FROM Analytics a WHERE a.shortCode = :shortCode GROUP BY a.%s",
                fieldName, fieldName
        );
        return em.createQuery(jpql, Object[].class)
                .setParameter("shortCode", shortCode)
                .getResultList();
    }
    public long getClickCount(String shortCode){
        return analyticsRepository.countByShortCode(shortCode);
    }
    public long getUniqueClickCount(String shortCode){
        return analyticsRepository.countDistinctIpByShortcode(shortCode);
    }
    public List<StatsCount> getStats(String field,String shortCode){
        return findCountsByField(field,shortCode).stream()
                .map(arr ->new StatsCount(String.valueOf(arr[0]),((Number)arr[1]).longValue()))
                .collect(Collectors.toList());
    }
    public boolean checkValidShortCode(String shortCode,String userId){
        Optional<Url> obj= urlRepository.getUrlByCode(shortCode);
        return obj.isPresent() && obj.get().getUserId().equals(userId);
    }
}
