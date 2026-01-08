package org.example.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;

@Entity
@Data
public class Url {
    @Id
    private  String code;
    private String userId;
    private String Shorturl;
    private String Originalurl;
    private Instant createdAt;
}
