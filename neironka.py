import pandas as pd
import numpy as np
import random
from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer
from sklearn.metrics import precision_score, recall_score, f1_score, roc_auc_score, accuracy_score
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, Dataset

#датасет для нейронки
df = pd.read_csv("dataset.csv")

# разделение на признаки и метки
X = df.drop(columns=["перелом", "вывих", "травма мышц и сухожилий", "здоров"])
y = df[["перелом", "вывих", "травма мышц и сухожилий", "здоров"]]

# обработка пропущенных значений
imputer = SimpleImputer(strategy="most_frequent")  # мода
X_imputed = imputer.fit_transform(X)


X = pd.DataFrame(X_imputed, columns=X.columns)

# разделение данных
X_train, X_temp, y_train, y_temp = train_test_split(X, y, test_size=0.3, random_state=42)
X_val, X_test, y_val, y_test = train_test_split(X_temp, y_temp, test_size=0.5, random_state=42)

print(f"Обучающая выборка: {X_train.shape}, {y_train.shape}")
print(f"Валидационная выборка: {X_val.shape}, {y_val.shape}")
print(f"Тестовая выборка: {X_test.shape}, {y_test.shape}")


# класс датасета
class InjuryDataset(Dataset):
    def __init__(self, X, y):
        self.X = torch.tensor(X.values, dtype=torch.float32)
        self.y = torch.tensor(y.values, dtype=torch.float32)

    def __len__(self):
        return len(self.X)

    def __getitem__(self, idx):
        return self.X[idx], self.y[idx]


# создание датасетов и загрузчиков
train_dataset = InjuryDataset(X_train, y_train)
val_dataset = InjuryDataset(X_val, y_val)
test_dataset = InjuryDataset(X_test, y_test)
train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=32)
test_loader = DataLoader(test_dataset, batch_size=32)


# модель
class MLP(nn.Module):
    def __init__(self, input_size, hidden_sizes, num_classes):
        super(MLP, self).__init__()
        layers = []
        prev_size = input_size
        for size in hidden_sizes:
            layers.append(nn.Linear(prev_size, size))
            layers.append(nn.ReLU())
            prev_size = size
        layers.append(nn.Linear(prev_size, num_classes))
        layers.append(nn.Sigmoid())
        self.network = nn.Sequential(*layers)

    def forward(self, x):
        return self.network(x)


# гиперпараметры
input_size = X_train.shape[1]  # Количество признаков
hidden_sizes = [64, 32]  # Размеры скрытых слоев
num_classes = y_train.shape[1]  # Количество заболеваний
learning_rate = 0.001
num_epochs = 20

# Инициализация модели, оптимизатора и функции потерь
model = MLP(input_size, hidden_sizes, num_classes)
criterion = nn.BCELoss()  # Бинарная кросс-энтропия
optimizer = optim.Adam(model.parameters(), lr=learning_rate)

# обучение модели
for epoch in range(num_epochs):
    model.train()
    train_loss = 0.0
    for inputs, targets in train_loader:
        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, targets)
        loss.backward()
        optimizer.step()
        train_loss += loss.item()

    print(f"Эпоха [{epoch + 1}/{num_epochs}], Средняя потеря: {train_loss / len(train_loader):.4f}")

# оценка модели
model.eval()
all_preds = []
all_targets = []

with torch.no_grad():
    for inputs, targets in test_loader:
        outputs = model(inputs)
        preds = (outputs > 0.4).float()
        all_preds.append(preds.numpy())
        all_targets.append(targets.numpy())


all_preds = np.vstack(all_preds)
all_targets = np.vstack(all_targets)

# вычисление метрик
precision = precision_score(all_targets, all_preds, average='macro')
recall = recall_score(all_targets, all_preds, average='macro')
f1 = f1_score(all_targets, all_preds, average='macro')
roc_auc = roc_auc_score(all_targets, all_preds, average='macro')
accuracy = accuracy_score(all_targets, all_preds)


print(f"Precision: {precision:.4f}")
print(f"Recall: {recall:.4f}")
print(f"F1-score: {f1:.4f}")
print(f"AUC-ROC: {roc_auc:.4f}")
print(f"Accuracy: {accuracy:.4f}")

# сохранение модели
torch.save(model.state_dict(), "mlp_model.pth")
print("Модель успешно сохранена.")