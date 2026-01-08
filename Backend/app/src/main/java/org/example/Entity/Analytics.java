package org.example.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.security.Timestamp;
import java.sql.Time;
import java.time.LocalTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Data
@Entity
public class Analytics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String shortCode;
    private String country;
    private String region;
    private String city;
    private String ip;
    private int time;
    private String date;
    private String referer;
    private String browser;
    private String os;
    private String device;
}
