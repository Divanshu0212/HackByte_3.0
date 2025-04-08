import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import joblib

# Read the noisy dataset
noisy_data = pd.read_csv(r'C:\Users\divan\Desktop\compe\HackByte_3.0\models\monitor\plant_data.csv')

# Prepare features and target
X = noisy_data.drop(['Timestamp', 'Plant_ID', 'Plant_Health_Status'], axis=1)
y = noisy_data['Plant_Health_Status']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize and train the Random Forest
rf_classifier = RandomForestClassifier(
    n_estimators=100,
    max_depth=10,
    random_state=42
)

# Train the model
rf_classifier.fit(X_train, y_train)

# Make predictions on test set
y_pred = rf_classifier.predict(X_test)

# Evaluate the model
accuracy = accuracy_score(y_test, y_pred)
print(f"Accuracy: {accuracy:.2f}")
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# Feature importance
feature_importance = pd.DataFrame({
    'feature': X.columns,
    'importance': rf_classifier.feature_importances_
})
feature_importance = feature_importance.sort_values('importance', ascending=False)
print("\nFeature Importance:")
print(feature_importance)

# Save the trained model
joblib.dump(rf_classifier, 'rf_plant_health_model.pkl')
print("\nModel saved as 'rf_plant_health_model.pkl'")