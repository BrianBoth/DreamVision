import pandas as pd
from sklearn.model_selection import train_test_split
from datasets import Dataset
from transformers import AutoTokenizer, AutoModelForSequenceClassification, TrainingArguments, Trainer
import numpy as np

# load csv into proper format and preprocess
# df = pd.read_csv("/Users/brianboth/Desktop/DreamVision/api/data/dream_dataset.csv")
# df = df[['description', 'label']]

# train_texts, val_texts, train_labels, val_labels = train_test_split(
#     df["description"].tolist(), df["label"].tolist(), test_size=0.2, random_state=42
# )

# train_data = Dataset.from_dict({"text": train_texts, "label": train_labels})
# val_data = Dataset.from_dict({"text": val_texts, "label": val_labels})

# tokenize text
# BEST_CHECKPOINT = "bert-base-uncased"
# BEST_CHECKPOINT = "./results/checkpoint-114"

# for training 
# tokenizer = AutoTokenizer.from_pretrained(BEST_CHECKPOINT)
# model = AutoModelForSequenceClassification.from_pretrained(BEST_CHECKPOINT)
# def tokenize_function(examples):
#   return tokenizer(examples["text"], padding="max_length", truncation=True)

# train_data = train_data.map(tokenize_function, batched=True)
# val_data = val_data.map(tokenize_function, batched=True)

# # load BERT model
# model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME, num_labels=2)

# training_args = TrainingArguments(
#     output_dir="./results",
#     evaluation_strategy="epoch",
#     save_strategy="epoch",
#     logging_dir="./logs",
#     per_device_train_batch_size=8,
#     per_device_eval_batch_size=8,
#     num_train_epochs=4,  # Adjust based on performance
#     learning_rate=2e-5,
#     weight_decay=0.01,
#     logging_steps=10,
#     load_best_model_at_end=True
# )

# trainer = Trainer(
#     model=model,
#     args=training_args,
#     train_dataset=train_data,
#     eval_dataset=val_data,
#     tokenizer=tokenizer
# )

# trainer.train()

# # model evaluation
# metrics = trainer.evaluate()
# print(metrics)

# test check what type of dream it is (make a route)
def dream_classifier(dream):
  BEST_CHECKPOINT = "../results/checkpoint-114"
  tokenizer = AutoTokenizer.from_pretrained(BEST_CHECKPOINT)
  model = AutoModelForSequenceClassification.from_pretrained(BEST_CHECKPOINT)

  inputs = tokenizer(dream, return_tensors="pt", padding="max_length", truncation=True)
  outputs = model(**inputs)
  prediction = outputs.logits.argmax().item()
  # store nightmare or positive into db
  print("Nightmare" if prediction == 0 else "Positive/Neutral")
  return prediction
