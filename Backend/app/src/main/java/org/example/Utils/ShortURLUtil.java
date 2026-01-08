package org.example.Utils;

import lombok.Getter;
import org.example.Entity.Ticket;
import org.example.Entity.Url;
import org.example.Repository.TicketRepository;
import org.example.Repository.UrlRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Component
@Getter
public class ShortURLUtil {
    ArrayList<Character>charMapping;
    private final TicketRepository ticketRepository;
    private final UrlRepository urlRepository;
    @Value("${app.baseUrl}")
    private String baseUrl;
    ShortURLUtil(TicketRepository ticketRepository, UrlRepository urlRepository){
        this.ticketRepository = ticketRepository;
        this.urlRepository = urlRepository;
        charMapping = new ArrayList<>();
        for(char c='a';c<='z';c++){
            charMapping.add(c);
        }
        for(char c='A';c<='Z';c++){
            charMapping.add(c);
        }
        for(char c='0';c<='9';c++){
            charMapping.add(c);
        }
        charMapping.add('$');
        charMapping.add('%');
        Collections.shuffle(charMapping);
    }

    @Transactional
    public long getValue(){
        long totalRows = ticketRepository.count();
        if(totalRows==0){
            throw new RuntimeException("All Tickets Exhausted");
        }
        long randomIndex= ThreadLocalRandom.current().nextLong(0,totalRows);
        Pageable pageable= PageRequest.of((int)randomIndex,1);
        Ticket t = ticketRepository.findAll(pageable).getContent().get(0);
        long value = t.getCurrentValue();
        if(t.getCurrentValue()+1==t.getUpperValue()){
            ticketRepository.delete(t);
        }else{
            t.setCurrentValue(value+1);
            ticketRepository.save(t);
        }
        return value;
    }

    public String encode(long value){
        StringBuilder encodedValue = new StringBuilder();
        while(value>0){
            long mask = (1<<6)-1;
            long index = value & mask;
            encodedValue.append(charMapping.get((int)index));
            value>>=6;
        }
        return encodedValue.toString();
    }
    @Transactional
    public Url addUrlToDB(String originalUrl, String code,String userId){
        String finalUrl=baseUrl+"/"+code;
        Url urlObj= new Url();
        urlObj.setOriginalurl(originalUrl);
        urlObj.setShorturl(finalUrl);
        urlObj.setCode(code);
        urlObj.setCreatedAt(Instant.now());
        urlObj.setUserId(userId);
        urlRepository.save(urlObj);
        return urlObj;
    }

    public Optional<Url> getUrlFromCode(String shortCode){
        return urlRepository.getUrlByCode(shortCode);
    }
    public Optional<List<Url>>getUrlsFromId(String id){
        return urlRepository.findByUserId(id);
    }
}
