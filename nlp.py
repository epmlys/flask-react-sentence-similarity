"""Module for NLP related functionality."""

import spacy


nlp = spacy.load("en_core_web_lg")
all_sents = {}

def pre_process_text(text):
    """Preproces sentence text to remove meaningless tokens."""
    doc = nlp(text.lower())
    result = []
    for token in doc:
        if token.text in nlp.Defaults.stop_words:
            continue
        if token.is_punct:
            continue
        if token.lemma_ == '-PRON-':
            continue
        result.append(token.lemma_)
    return " ".join(result)


def calculate_similarity(text1, text2):
    """Compare 2 spacy sentences for similarity."""
    base = nlp(pre_process_text(text1))
    compare = nlp(pre_process_text(text2))

    return base.similarity(compare)
