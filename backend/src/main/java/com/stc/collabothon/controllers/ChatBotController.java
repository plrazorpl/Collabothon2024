package com.stc.collabothon.controllers;

import com.stc.collabothon.DTO.OffersIdsDto;
import com.stc.collabothon.model.offer.Offer;
import com.stc.collabothon.services.ChatBotService;
import com.stc.collabothon.services.OfferService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/chatbot")
public class ChatBotController {

    @Autowired
    private ChatBotService chatBotService;

    @Autowired
    private OfferService offerService;

    @PostMapping("/start-chat")
    public void startChat(@RequestBody OffersIdsDto offersIds) {

        List<Long> ids = offersIds.getIds();
        List<Offer> offers = offerService.getAllOffers();

        chatBotService.startChatSession(offers, ids);
    }

    @PostMapping("/send-message")
    public Map<String, String> sendMessage(@RequestBody Map<String, String> request) throws IOException {
//        String message = request.get("message");
//        String response = chatBotService.sendMessage(message);
        return Map.of("response", "dummy data for now");
    }
}