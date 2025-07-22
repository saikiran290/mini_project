import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, classification_report
import pickle  # For saving the model

# Step 1: Load the dataset
dataset_path = "C:/Users/rakes/Downloads/combined_data.csv"  # Update this path to your dataset file
data = pd.read_csv(dataset_path)

# Step 2: Preprocess the data
X = data['text']  # Replace 'text' with the name of your feature column
y = data['label']  # Replace 'label' with the name of your target column

# Convert text data to numeric using TF-IDF Vectorizer
vectorizer = TfidfVectorizer(stop_words='english', max_features=5000)  # Removes common words & limits features
X_vectorized = vectorizer.fit_transform(X)

# Step 3: Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_vectorized, y, test_size=0.2, random_state=42)

# Step 4: Train the Naive Bayes classifier
model = MultinomialNB()
model.fit(X_train, y_train)

# Step 5: Save the model and vectorizer to disk
with open('spam_classifier.pkl', 'wb') as model_file:
    pickle.dump(model, model_file)

with open('vectorizer.pkl', 'wb') as vectorizer_file:
    pickle.dump(vectorizer, vectorizer_file)

# Step 6: Test the model
y_pred = model.predict(X_test)

# Step 7: Evaluate the model
print("\nAccuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:")
print(classification_report(y_test, y_pred))






# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.feature_extraction.text import CountVectorizer
# from sklearn.naive_bayes import MultinomialNB
# from sklearn.metrics import accuracy_score, classification_report
# import pickle  # For saving the model

# # Step 1: Load the dataset
# dataset_path = "D:/MiniProject/Backend/public/uploads/spam_ham_dataset.csv"  # Update this path to your dataset file
# data = pd.read_csv(dataset_path)

# # Step 2: Preprocess the data
# X = data['text']  # Replace 'text' with the name of your feature column
# y = data['label']  # Replace 'label' with the name of your target column

# # Convert text data to numeric using CountVectorizer
# vectorizer = CountVectorizer()
# X_vectorized = vectorizer.fit_transform(X)

# # Step 3: Split the data into training and testing sets
# X_train, X_test, y_train, y_test = train_test_split(X_vectorized, y, test_size=0.2, random_state=42)

# # Step 4: Train the Naive Bayes classifier
# model = MultinomialNB()
# model.fit(X_train, y_train)

# # Step 5: Save the model and vectorizer to disk
# with open('spam_classifier.pkl', 'wb') as model_file:
#     pickle.dump(model, model_file)

# with open('vectorizer.pkl', 'wb') as vectorizer_file:
#     pickle.dump(vectorizer, vectorizer_file)

# # Step 6: Test the model
# y_pred = model.predict(X_test)

# # Step 7: Evaluate the model
# print("\nAccuracy:", accuracy_score(y_test, y_pred))
# print("\nClassification Report:")
# print(classification_report(y_test, y_pred))
