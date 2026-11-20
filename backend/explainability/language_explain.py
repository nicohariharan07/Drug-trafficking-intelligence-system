KEYWORDS = ["powder", "delivery", "stuff", "dm", "snow"]

def explain_language(text: str):
    hits = [k for k in KEYWORDS if k in text.lower()]
    return hits

