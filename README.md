![logo](logo2.png)
# 🐮 Moo SSG

Um Static Site Generator minimalista, pensado em developer experience, construído com Node.js. Transforme simples arquivos YAML em sites completos com templates EJS.

## Características

- **🚀 Super Rápido**: Gera sites estáticos em milissegundos
- **🎨 Flexível**: Use qualquer estrutura de dados YAML + templates EJS
- **⚙️ Fácil Configuração**: Sistema simples de layouts e templates
- **🔧 Live Reload**: Servidor de desenvolvimento com atualização automática
- **📁 Organizado**: estrutura de pastas lógica e intuitiva

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/jpmaciel22/moo.git

# Entre na pasta
cd moo-ssg

# Instale as dependências
npm install

# Instale globalmente para usar o comando `moo` em qualquer lugar
npm install -g .
```

## 🚀 Começando Rápido

### 1. Estrutura de Pastas

Crie esta estrutura na pasta do seu projeto:

```
meu-site/
├── content/           # 📝 Seus arquivos .yaml
├── templates/         # 🎨 Templates de páginas
├── layouts/         # 🖼️  Layouts base
├── styles/           # 🎨 Arquivos CSS
├── images/           # 🖼️  Imagens
└── config.yaml      # ⚙️  Configurações globais
```

### 2. Configuração Global

Crie um `config.yaml` na raiz:

```yaml
site_title: "Meu Blog Incrível"
theme: light
description: "Um blog feito com Moo SSG"

navigation:
  - label: Home
    href: index.html
  - label: Sobre
    href: sobre.html
  - label: GitHub
    href: https://github.com/seu-usuario
```

### 3. Seu Primeiro Conteúdo

Crie `content/index.yaml`:

```yaml
template: blog
title: "Meu Primeiro Post"
autor: "Seu Nome"
data: 2024-03-08
tags: [tecnologia, web, javascript]

conteudo: |
  Bem-vindo ao **meu blog** feito com Moo SSG!

  - Funciona com Markdown
  - Templates personalizáveis
  - Fácil de usar

  ## Recursos Incríveis

  ✅ Geração estática rápida  
  ✅ Live reload automático  
  ✅ Totalmente personalizável
```

### 4. Template de Página

Crie `templates/blog.ejs`:

```ejs
<%# layout = 'default' %>

<article class="post">
  <h1><%= page.title %></h1>
  
  <div class="meta">
    <span>Por <%= page.autor %></span>
    <span>Em <%= page.data %></span>
  </div>

  <div class="content">
    <%= page.conteudo %>
  </div>

  <% if(page.tags) { %>
    <div class="tags">
      <% page.tags.forEach(tag => { %>
        <span class="tag"><%= tag %></span>
      <% }) %>
    </div>
  <% } %>
</article>
```

### 5. Layout Base

Crie `layouts/default.ejs`:

```ejs
<!DOCTYPE html>
<html lang="pt-BR" data-theme="<%= page.theme || site.theme %>">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= page.title %> | <%= site.site_title %></title>
  <link rel="stylesheet" href="/styles/style.css">
</head>
<body>
  <header>
    <nav class="navigation">
      <% site.navigation.forEach(link => { %>
        <a href="<%= link.href %>" class="nav-link"><%= link.label %></a>
      <% }) %>
    </nav>
  </header>

  <main class="container">
    <%- content %> 
  </main>

  <footer class="footer">
    <p>Construído usando Moo SSG</p>
  </footer>
</body>
</html>
```

### 6. Estilos Básicos

Crie `styles/style.css`:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--bg-color, #fff);
  color: var(--text-color, #333);
}

.navigation {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #eee;
}

.nav-link {
  text-decoration: none;
  color: #007bff;
  font-weight: 500;
}

.nav-link:hover {
  color: #0056b3;
}

.post {
  margin-bottom: 40px;
}

.post .meta {
  color: #666;
  font-size: 0.9em;
  margin-bottom: 20px;
}

.tags {
  display: flex;
  gap: 8px;
  margin-top: 20px;
}

.tag {
  background: #007bff;
  color: white;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8em;
}

.footer {
  margin-top: 50px;
  padding-top: 20px;
  border-top: 2px solid #eee;
  text-align: center;
  color: #666;
}
```

## 💻 Uso

### Gerar Site Estático

```bash
# Renderiza TODOS os arquivos .yaml da pasta content/
moo render
```

Os arquivos HTML serão gerados na pasta `public/`.

### Servidor de Desenvolvimento

```bash
# Inicia servidor com live reload para um arquivo específico
moo serve index.yaml

# Ou renderiza tudo primeiro e depois serve
moo render && moo serve index.yaml
```

Acesse: `http://localhost:3000`

## 🎯 Exemplos de Uso

### Blog Pessoal

```yaml
# content/blog.yaml
template: blog
title: "Como usar Moo SSG"
autor: "Seu Nome"
data: 2024-03-08
categoria: tutorial
destaque: true
conteudo: Neste post vou ensinar como usar...
```

### Portfólio

```yaml
# content/portfolio.yaml
template: portfolio
title: "Meu Portfólio"
destaque: true

projetos:
  - nome: "Moo SSG"
    descricao: "Static Site Generator"
    tecnologias: [Node.js, EJS, YAML]
    link: "https://github.com/seu-usuario/moo"
  - nome: "Projeto React"
    descricao: "App moderno com React"
    tecnologias: [React, Node.js, MongoDB]
    link: "https://meu-app.com"
```

### Página Sobre

```yaml
# content/sobre.yaml
template: sobre
title: "Sobre Mim"
foto: "minha-foto.jpg"
biografia: Olá sou...
habilidades:
  - JavaScript
  - Node.js
  - React
  - Python

contato:
  email: eu@email.com
  github: seu-usuario
```

## 🛠️ Comandos Disponíveis

| Comando | Descrição |
|---------|-----------|
| `moo render` | Renderiza todos os arquivos .yaml |
| `moo serve <arquivo>` | Inicia servidor para um arquivo |
| `moo help` | Mostra ajuda dos comandos |


## 🐛 Reportar Bugs

Encontrou um bug? [Abra uma issue](https://github.com/jpmaciel22/moo/issues) no GitHub.
*Se este projeto te ajudou, deixe uma ⭐ no repositório!*
