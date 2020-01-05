package com.example.demo;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Objects;

@Data
@AllArgsConstructor
public class KnowledgeGraph {
    String source ;
    String target ;
    String label;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        KnowledgeGraph that = (KnowledgeGraph) o;
        return source.equals(that.source) &&
                target.equals(that.target);
    }

    @Override
    public int hashCode() {
        return Objects.hash(source, target);
    }
}
