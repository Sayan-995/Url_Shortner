package org.example.Config;

import org.example.Entity.Ticket;
import org.example.Repository.TicketRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TicketInitializer {

    @Bean
    public CommandLineRunner initTicketDB(TicketRepository ticketRepository) {
        final long rangeDifference=119928821;
        final int numberOfRanges=573;
        return args -> {
            if(ticketRepository.count()==0){
                long prev=0;
                for(int i=0;i<numberOfRanges;i++){
                    Ticket t=new Ticket();
                    t.setId((long)i);
                    t.setLowerValue(prev);
                    t.setUpperValue(prev+rangeDifference-1);
                    t.setCurrentValue(prev);
                    ticketRepository.save(t);
                    prev+=rangeDifference;
                }
            }
            System.out.println("Number of tickets in the database is "+ticketRepository.count());
        };
    }

}

