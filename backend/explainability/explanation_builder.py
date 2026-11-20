from explainability.language_explain import explain_language

def build_explanation(text: str):
    return {
        "keywords": explain_language(text)
    }
