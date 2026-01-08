package org.example.Service;

import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.example.Dto.IpApiResponse;
import org.example.Entity.Analytics;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import ua_parser.Parser;
import ua_parser.Client;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

@Service
public class KafkaProducerService {

    private final KafkaTemplate<String,Analytics> kafkaTemplate;

    public KafkaProducerService(KafkaTemplate<String, Analytics> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    @Async
    public void sendEvent(Analytics analytics) {
        kafkaTemplate.send("analytics-event", analytics);
    }
}
