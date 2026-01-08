package org.example.Controller;

import jakarta.servlet.http.HttpServletRequest;
import org.example.Entity.Analytics;
import org.example.Service.KafkaConsumerService;
import org.example.Service.KafkaProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.example.Entity.Url;
import org.example.Utils.ShortURLUtil;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/")
public class LinkAccessController {
    @Autowired
    ShortURLUtil shortURLUtil;
    @Autowired
    KafkaProducerService kafkaProducerService;
    @GetMapping("{shortCode}")
    public ResponseEntity<Void> redirectToOriginal(@PathVariable String shortCode, HttpServletRequest req) {
        Optional<Url> urlObj = Optional.ofNullable(shortURLUtil.getUrlFromCode(shortCode).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No Valid Url Found Please Recheck the link")
        ));
        Analytics  analytics = new Analytics();
        analytics.setReferer(req.getHeader("Referer"));
        analytics.setShortCode(req.getRequestURI().substring(1));
        analytics.setIp(req.getHeader("X-Forwarded-For"));
        analytics.setBrowser(req.getHeader("User-Agent"));
        kafkaProducerService.sendEvent(analytics);
        return ResponseEntity
                .status(HttpStatus.FOUND)
                .location(URI.create(urlObj.get().getOriginalurl()))
                .build();
    }
}
