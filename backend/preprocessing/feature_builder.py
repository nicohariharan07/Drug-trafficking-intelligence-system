def build_features(t):
    return {
        "token_count": len(t),
        "unique_tokens": len(set(t))
    }

