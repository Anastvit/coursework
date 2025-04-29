import torch
import torch.nn as nn


# определение модели
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
        layers.append(nn.Sigmoid())  # сигмоида для вероятностей
        self.network = nn.Sequential(*layers)

    def forward(self, x):
        return self.network(x)


# гиперпараметры
input_size = 14  # Количество признаков (симптомов)
hidden_sizes = [64, 32]  # Размеры скрытых слоев
num_classes = 4  # Количество классов (перелом, вывих, травма мышц и сухожилий, здоров)


# загрузка модели
def load_model(model_path="mlp_model.pth"):

    # экземпляр модели
    model = MLP(input_size, hidden_sizes, num_classes)

    # веса модели
    model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))

    #  модель в режим оценки
    model.eval()

    return model