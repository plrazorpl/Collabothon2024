package com.stc.collabothon.services;

import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.google.cloud.vertexai.generativeai.ChatSession;
import com.google.cloud.vertexai.generativeai.GenerativeModel;
import com.google.cloud.vertexai.generativeai.ResponseHandler;
import com.google.cloud.vertexai.api.Content;
import com.google.cloud.vertexai.api.Part;
import com.stc.collabothon.model.offer.Offer;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatBotService {

    private final String projectId = "collabothon2024-439013";
    private final String location = "europe-west3";
    private final String modelName = "gemini-1.5-pro";
    private ChatSession chatSession;

    public void startChatSession(List<Offer> offers, List<Long> ids) {
        VertexAI vertexAI = new VertexAI(projectId, location);
        GenerativeModel model = new GenerativeModel(modelName, vertexAI);
        chatSession = model.startChat();


        List<Offer> selectedOffers = offers.stream()
                .filter(offer -> ids.contains(offer.getId()))
                .toList();

        List<Offer> otherOffers = offers.stream()
                .filter(offer -> !ids.contains(offer.getId()))
                .toList();

        StringBuilder promptBuilder = new StringBuilder("These are offers provided by the bank.\n");
        promptBuilder.append("The first three 'Selected Offers' are those recommended by the bank's algorithm to the user.\n");
        promptBuilder.append("If the user asks for other recommendations during the conversation, you can use the offers in 'Other Offers'.\n");
        promptBuilder.append("You cannot invent offers; you can only use the offers available from the bank.\n\n");
        promptBuilder.append("In response don't use special characters and markdown syntax, be aware that your response will be displayed to the user.\n\n");

        promptBuilder.append("Selected Offers:\n");
        for (Offer offer : selectedOffers) {
            promptBuilder.append("Title: ").append(offer.getTitle()).append("\n")
                    .append("Long Description: ").append(offer.getLongDescription()).append("\n\n");
        }

        promptBuilder.append("Other Offers:\n");
        for (Offer offer : otherOffers) {
            promptBuilder.append("Title: ").append(offer.getTitle()).append("\n")
                    .append("Long Description: ").append(offer.getLongDescription()).append("\n\n");
        }

        String prompt = promptBuilder.toString();
        System.out.println("PROMPT: " + prompt); //TODO delete


        Content initialContext = Content.newBuilder()
                .setRole("user")
                .addParts(Part.newBuilder().setText(prompt).build())
                .build();
        chatSession.setHistory(List.of(initialContext));
    }

    public String sendMessage(String message) throws IOException {
        Content userMessage = Content.newBuilder()
                .setRole("user")
                .addParts(Part.newBuilder().setText(message).build())
                .build();
        GenerateContentResponse response = chatSession.sendMessage(userMessage);


        return ResponseHandler.getText(response);
    }

}