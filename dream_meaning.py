# load packages
import pandas as pd
import numpy as np

# load data viz packs
import matplotlib.pyplot as plt
import seaborn as sns

# text cleaning 
import neattext.functions as nfx

df = pd.read_csv("data/dreamdata.csv")
# print(df.head())
# print(df.shape)
# print(df.dtypes)
# print(df.isnull().sum())
# print(df["Word"])


def clean_text(text):
  text = nfx.remove_userhandles(text)
  text = nfx.remove_stopwords(text)
  text = nfx.remove_punctuations(text)
  text = text.lower()
  text = text.strip()
  keywords = text.split()
  return keywords

from collections import Counter
def extract_keywords(text,num=1):
  tokens = [tok for tok in text.split()]
  most_common_tokens = Counter(tokens).most_common(num)
  return dict(most_common_tokens)


text = "The ocean is vast, i was passing by the sea and thought, What does it mean?"
cleaned_keywords = clean_text(text)
print(cleaned_keywords)
