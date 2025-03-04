# IatecTask

Esse projeto foi gerado usando [Angular CLI](https://github.com/angular/angular-cli) version 17.3.12.

O Iatec Task é um sistema de gerenciamento de tarefas a serem feitas pelo o usuário.  
As tarefas podem ter dois status *Pedente* ou *Concluída*  
O usuário terá acesso a:

* Lista de tarefas
* Indentifacadas por cores e ícones distintos
* Data e hora das atividades concluídas
* Possibilidade de criar quantas tarefas precisar
* Filtra as tarefas por pendentes ou concluídas
* Editar título ou descrição das tarefas
* Excluir tarefas
* Reabrir tarefas anteriormente já finalizadas

## Lista de tarefas
Todas as tarefas, podendo filtrar por *Todas* | *Concluídas* | *Pendentes* :mag_right:   
Endpoint http://localhost:4200/tasks

![Image](https://github.com/user-attachments/assets/9833e843-2860-4e43-be09-0fc9300ca49d)

*Clicando no botão (+ tarefa)* será direcionado para a criação de uma nova tarefa :point_down:

## Criar tarefa
Crie uma nova tarefa informando o título e descrição

![Image](https://github.com/user-attachments/assets/f7c70dfc-f28c-4d14-a2ba-2021ff4df12e)

## Atualize a tarefa
Poderá ser editado o título, descrição ou status da tarefa.  
*Caso a tarefa já tenha sido concluída, poderá ainda ser reaberta.* :arrows_counterclockwise:  
*Também poderá ser deletada.* :x:

![Image](https://github.com/user-attachments/assets/bdec2591-84ab-4b01-9382-13692e907d37)


## Executando o app localmente

Certifique de ter instalado;  
* Angular cli 17.3.12
* Node 22.14.0
* NPM 11.1.0

Abra um terminal na pasta raiz '\' do projeto;  
Execulte `ng serve` para rodar um serviço que irá disponibilar o app. Acesse `http://localhost:4200/`.

Essa aplicação para funcionar perfeitamente espera um serviço de back-end apontando para outro serviço que precisa esta sendo execultado em `http://localhost:5217/`
Você poderá encontrar o back-end neste link :point_down:  
[.NET back task](https://github.com/FernandesJr/task-back)

