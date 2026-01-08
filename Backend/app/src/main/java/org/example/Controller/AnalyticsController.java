package org.example.Controller;

import graphql.GraphQLException;
import org.example.Dto.AnalyticsResponse;
import org.example.Model.ClerkUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.example.Service.AnalyticsService;
@Controller
public class AnalyticsController {

    @Autowired
    AnalyticsService analyticsService;

    @QueryMapping
    public AnalyticsResponse analytics(@Argument String shortCode){
        ClerkUser user=null;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof ClerkUser) {
            user=(ClerkUser) principal;
        }
        if (user==null||!analyticsService.checkValidShortCode(shortCode, user.getId())){
            System.out.println(user.getId());
            throw new GraphQLException("Unauthorized access");
        }
        return AnalyticsResponse.builder()
                .clickCount(analyticsService.getClickCount(shortCode))
                .uniqueClickCount(analyticsService.getUniqueClickCount(shortCode))
                .countryCounts(analyticsService.getStats("country", shortCode))
                .regionCounts(analyticsService.getStats("region", shortCode))
                .cityCounts(analyticsService.getStats("city", shortCode))
                .browserCounts(analyticsService.getStats("browser", shortCode))
                .osCounts(analyticsService.getStats("os", shortCode))
                .timeCounts(analyticsService.getStats("time", shortCode))
                .dateCounts(analyticsService.getStats("date", shortCode))
                .refererCounts(analyticsService.getStats("referer", shortCode))
                .deviceCounts(analyticsService.getStats("device", shortCode))
                .build();
    }


}
