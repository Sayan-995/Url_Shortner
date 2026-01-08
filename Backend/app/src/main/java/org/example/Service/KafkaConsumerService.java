package org.example.Service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.example.Dto.IpApiResponse;
import org.example.Entity.Analytics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import ua_parser.Client;
import ua_parser.Parser;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Service
public class KafkaConsumerService {

    @Autowired
    RestTemplate restTemplate;
    @Autowired
    private final AnalyticsService analyticsService;

    Parser uaParser = new Parser();
    private String ipApiQuery="http://ip-api.com/json/%s?fields=country,region,city";

    public KafkaConsumerService(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @KafkaListener(id = "myConsumer", topics = "analytics-event", groupId = "springboot-group-1")
    public void consume(Analytics analytics) {
        IpApiResponse response = restTemplate.getForObject(String.format(ipApiQuery, analytics.getIp()), IpApiResponse.class);
        String ua=analytics.getBrowser();
        Client c = uaParser.parse(ua);
        LocalDateTime now = LocalDateTime.now();
        analytics.setDate(LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        analytics.setTime(now.getHour());
        analytics.setCountry(response.getCountry());
        analytics.setRegion(response.getRegion());
        analytics.setCity(response.getCity());
        analytics.setBrowser(c.userAgent.family);
        analytics.setOs(c.os.family);
        analytics.setDevice(c.device.family);
        analyticsService.processAnalytics(analytics);
    }
}
