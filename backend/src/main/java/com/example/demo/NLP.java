package com.example.demo;


import edu.stanford.nlp.ling.CoreAnnotations;
import edu.stanford.nlp.pipeline.Annotation;
import edu.stanford.nlp.pipeline.StanfordCoreNLP;
import edu.stanford.nlp.semgraph.SemanticGraph;
import edu.stanford.nlp.semgraph.SemanticGraphCoreAnnotations;
import edu.stanford.nlp.semgraph.SemanticGraphEdge;
import edu.stanford.nlp.util.CoreMap;

import java.util.*;

public class NLP {

    private static NLP nlp = null;

    private static StanfordCoreNLP pipeline;

    private NLP() {
        Properties props = new Properties();
        props.put("annotators", "tokenize, ssplit, pos, lemma, ner, depparse, parse, dcoref");
        props.put("enforceRequirements", false);
        props.setProperty("ner.useSUTime", "false");  // this is required for JAVA 11
        pipeline = new StanfordCoreNLP(props);
    }

    public static NLP getInstance() {
        if (nlp == null) {
            nlp = new NLP();
        }

        return nlp;
    }

    private Annotation runPipeline(String text) {

        Annotation document = new Annotation(text);

        pipeline.annotate(document);

        return document;
    }

    public Set<KnowledgeGraph> getSemanticGraph(String text) {

        Annotation document = runPipeline(text);
        List<CoreMap> sentences = document.get(CoreAnnotations.SentencesAnnotation.class);
        Set<KnowledgeGraph> depGraphs = new HashSet<>();
        for (CoreMap sentence : sentences) {
            SemanticGraph depGraph = sentence.get(SemanticGraphCoreAnnotations.CollapsedCCProcessedDependenciesAnnotation.class);
            Iterable<SemanticGraphEdge> edges = depGraph.edgeIterable();
            for (SemanticGraphEdge edge : edges) {
                String srcToken = edge.getSource().lemma();
                String dstToken = edge.getTarget().lemma();
                String srcPos = edge.getSource().tag();
                String dstPos = edge.getTarget().tag();
                String reln = edge.getRelation().getShortName();

                if (srcPos.matches("(NN|VB|JJ|RB).*") && dstPos.matches("(NN|VB|JJ|RB).*")) {
                    depGraphs.add(new KnowledgeGraph(srcToken + "(" + srcPos + ")", dstToken + "(" + dstPos + ")", reln));
                }
            }
        }
        return depGraphs;
    }

}