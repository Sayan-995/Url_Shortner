package org.example.Service;


import lombok.AllArgsConstructor;
import org.example.Entity.Url;
import org.example.Utils.ShortURLUtil;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ShortenURLService {

    private final ShortURLUtil util;
    public String shortenURL(String Originalurl, String id) {
        long value = util.getValue();
        String code= util.encode(value);
        Url urlObj = util.addUrlToDB(Originalurl,code,id);
        return urlObj.getShorturl();
    }
    public List<Url> getUrls(String id){
        Optional<List<Url>>Urls=util.getUrlsFromId(id);
        return Urls.orElse(null);
    }
}
