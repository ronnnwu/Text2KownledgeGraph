package com.example.demo;


import java.util.Set;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    @RequestMapping("/kg")
    @CrossOrigin
    public Set<KnowledgeGraph> knowledgeGraphs(@RequestParam(value="text") String text) {

        NLP nlp = NLP.getInstance();
        Set<KnowledgeGraph> semanticGraphs = nlp.getSemanticGraph(text);

        return semanticGraphs;
    }
}