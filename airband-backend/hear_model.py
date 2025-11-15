import os
import numpy as np
import librosa
from dotenv import load_dotenv
from huggingface_hub import from_pretrained_keras, login

# ---------------------------
# LOAD ENVIRONMENT VARIABLES
# ---------------------------
load_dotenv()
HF_TOKEN = os.getenv("HF_TOKEN")

if HF_TOKEN is None:
    raise Exception(" ERROR: HF_TOKEN not found! Add it to your .env file.")

# ---------------------------
# AUTHENTICATE WITH HUGGINGFACE
# ---------------------------
login(token=HF_TOKEN)

print("🔵 Loading Google HEAR model (requires HF token)…")

model = from_pretrained_keras(
    "google/hear",
    token=HF_TOKEN  # very important for gated models
)

serving = model.signatures["serving_default"]

print("🟢 HEAR model loaded successfully.")


# ---------------------------
# PREPROCESSING: 2-second audio
# ---------------------------
def preprocess_audio_to_2s(path):
    audio, _ = librosa.load(path, sr=16000)

    audio = audio[:32000]
    audio = np.pad(audio, (0, max(0, 32000 - len(audio))), "constant")

    return np.expand_dims(audio, axis=0)


# ---------------------------
# GET 512-DIM HEAR EMBEDDING
# ---------------------------
def get_hear_embedding(path):
    batch = preprocess_audio_to_2s(path)
    output = serving(x=batch)
    emb = output["output_0"].numpy()[0]   # shape: (512,)
    return emb
