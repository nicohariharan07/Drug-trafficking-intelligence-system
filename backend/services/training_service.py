
import io, os
import pandas as pd
import joblib
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from config import MODEL_PATH

async def train_model(upload):
    content = await upload.read()
    df = pd.read_csv(io.BytesIO(content))

    if not {'text','label'}.issubset(df.columns):
        raise ValueError("CSV must contain text,label columns")

    pipe = Pipeline([
        ("tfidf", TfidfVectorizer()),
        ("clf", LogisticRegression(max_iter=1000))
    ])

    pipe.fit(df["text"], df["label"])

    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    joblib.dump(pipe, MODEL_PATH)

    return int(len(df))
