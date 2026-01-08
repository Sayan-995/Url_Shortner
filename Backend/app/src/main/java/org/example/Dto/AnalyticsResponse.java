package org.example.Dto;

import lombok.*;
import org.example.Model.StatsCount;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class AnalyticsResponse {
    private long clickCount;
    private long uniqueClickCount;
    private List<StatsCount> countryCounts;
    private List<StatsCount> regionCounts;
    private List<StatsCount> cityCounts;
    private List<StatsCount> timeCounts;
    private List<StatsCount> dateCounts;
    private List<StatsCount> refererCounts;
    private List<StatsCount> browserCounts;
    private List<StatsCount> osCounts;
    private List<StatsCount> deviceCounts;

}

