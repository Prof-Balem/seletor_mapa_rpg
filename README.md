# 🎲 RPG Map Viewer

Sistema leve para visualização e organização de mapas de RPG, com filtros por categorias e tags.

---

## 📌 Objetivo

Este projeto foi desenvolvido para auxiliar mestres de RPG a:

- 🔍 Buscar mapas rapidamente por tema
- 🗂️ Filtrar por categorias (cidade, dungeon, natureza, etc.)
- 🖼️ Visualizar mapas de forma organizada
- ⚡ Utilizar o sistema offline em sala ou mesa de jogo

---

## 🚀 Funcionalidades

- ✅ Filtro por categorias
- ✅ Busca por texto (nome ou tag)
- ✅ Visualização em grid (miniaturas)
- ✅ Visualização ampliada (modal)
- ✅ Lazy loading (carregamento progressivo)
- ✅ Sistema de tags automático
- ✅ Detecção de imagens sem categoria (`untagged`)

---

## 📁 Estrutura do Projeto
rpg-maps/
    ├── generate_tags.py
    ├── index.html
    ├── script.js
    ├── style.css
    ├── data.json
    └── images/


---

## ⚙️ Como usar

### 1. Baixar o projeto

Você pode clonar ou baixar o ZIP:
git clone 'link projeto github'

ou clique em **Download ZIP** no GitHub.

---

### 2. Baixar as imagens

As imagens não estão no repositório por questão de tamanho.

👉 Baixe aqui:  
**[COLE AQUI O LINK DO GOOGLE DRIVE]**

---

### 3. Organizar as imagens

Após baixar, coloque a pasta `images` dentro do projeto:


---

### 4. Executar o sistema

No terminal:
python3 -m http.server

Abra no navegador:
http://localhost:8000


---

## 🎮 Como usar o sistema

- 🔎 Digite no campo de busca para encontrar mapas
- 🧭 Use a sidebar para filtrar por categoria
- 🖱️ Clique em uma imagem para ampliar
- ❌ Clique fora ou pressione **ESC** para fechar

---

## 🧠 Sistema de Tags

As imagens são organizadas automaticamente com base em:

- Nome do arquivo
- Palavras-chave
- Categorias definidas no sistema

---

### 🧩 Imagens sem categoria

Caso uma imagem tenha tags que não pertencem a nenhuma categoria:

👉 Ela será exibida como:
untagged


---

## 🛠️ Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- Python (geração de dados)
- WebP (otimização de imagens)

---

## 🎓 Uso educacional

Este projeto pode ser utilizado para:

- Ensino de lógica de programação
- Organização de dados (tags/categorias)
- Introdução ao desenvolvimento web
- Projetos práticos em grupo

---

## 🚧 Melhorias futuras

- ⭐ Sistema de favoritos
- 🎮 Navegação por teclado
- 🔍 Zoom e movimentação do mapa
- 🧠 Sugestão automática de categorias
- ☁️ Versão online

---

## 👨‍🏫 Autor
Professor Felipe Balem
Projeto desenvolvido para uso livre.

---

## 📄 Licença

Uso livre para fins educacionais.
