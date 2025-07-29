# moo
## the minimalistic YAML based SSG

## 🐄 Features
- **EJS Templating** - Flexible and easy to use template engine in JavaScript
- **YAML Content** - Write your website quickly in YAML
- **Live reload and Local Hosting** - Preview changes automatically and its self-hosted.

## Installation
1. Clone the repository
2. ```bash
npm i # add -g if you want it to be globally installed
```
3. Build your website
```
moo render <yaml-file>
```

4. Serve it locally

```
npm run dev
```

5. Project Structure

```
moo/
├── content/         # YAML content files (e.g., index.yaml)
├── public/          # HTML/CSS/assets
├── templates/       # EJS template
├── bin/             # CLI scripts
└── ...              # Config files
```

