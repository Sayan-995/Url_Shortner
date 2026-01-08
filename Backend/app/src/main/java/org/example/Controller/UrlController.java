package org.example.Controller;

import org.example.Dto.UrlRequest;
import org.example.Entity.Url;
import org.example.Model.ClerkUser;
import org.example.Service.ShortenURLService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/url")
public class UrlController {
    @Autowired
    ShortenURLService shortenURLService;
    @PostMapping
    public ResponseEntity<String> createShortUrl(@RequestBody UrlRequest urlRequest){
        ClerkUser user=null;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof ClerkUser) {
            user=(ClerkUser) principal;
        }
        if (user==null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String shortUrl = shortenURLService.shortenURL(urlRequest.getUrl(),user.getId());

        return ResponseEntity.ok(shortUrl);
    }
    @GetMapping
    public ResponseEntity<List<Url>> getUrls(){
        ClerkUser user=null;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof ClerkUser) {
            user=(ClerkUser) principal;
        }
        if (user==null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(shortenURLService.getUrls(user.getId()));
    }
}
