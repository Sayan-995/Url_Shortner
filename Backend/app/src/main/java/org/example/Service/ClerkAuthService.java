package org.example.Service;

import com.auth0.jwk.Jwk;
import com.auth0.jwk.JwkProvider;
import com.auth0.jwt.JWTVerifier;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.*;
import org.example.Model.ClerkUser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.auth0.jwk.JwkProviderBuilder;
import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.algorithms.Algorithm;


import java.net.URL;
import java.security.interfaces.RSAPublicKey;
import java.util.concurrent.TimeUnit;

import java.io.IOException;

@Service
public class ClerkAuthService {
    @Value("${clerk.api-key}")
    private String clerkApiKey;

    public ClerkUser verifyToken(String token) throws Exception {
        DecodedJWT jwt = JWT.decode(token);

        String jwksUrl = "https://settling-starling-7.clerk.accounts.dev/.well-known/jwks.json"; // or your specific frontend API URL + "/.well-known/jwks.json"
        JwkProvider provider = new JwkProviderBuilder(new URL(jwksUrl))
                .cached(10, 24, TimeUnit.HOURS)
                .build();

        Jwk jwk = provider.get(jwt.getKeyId());
        Algorithm algorithm = Algorithm.RSA256((RSAPublicKey) jwk.getPublicKey(), null);

        JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer("https://settling-starling-7.clerk.accounts.dev")
                .build();

        DecodedJWT verified = verifier.verify(token);

        String userId = verified.getClaim("user_id").asString();
        String email = verified.getClaim("email").asString();

        return new ClerkUser(userId, email);
    }

}
