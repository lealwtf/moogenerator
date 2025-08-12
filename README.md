# moo
## the minimalistic YAML based SSG

## 🐄 Features
- **EJS Templating** - Flexible and easy to use template engine in JavaScript
- **YAML Content** - Write your website quickly in YAML
- **Live reload and Local Hosting** - Preview changes automatically and its self-hosted.

## Installation
1. Clone the repository

2. Install the dependencies
```bash
npm i # add -g if you want it to be globally installed
```
3. Build your website

```bash
moo render
```

4. Serve it locally

```bash
moo serve <yaml-file>
```

5. Project Structure

```text
moo/
├── content/         # YAML content files (e.g., index.yaml)
├── public/          # HTML/CSS/assets ( there is already an example file in there.)
├── templates/       # EJS template
├── bin/             # CLI scripts
└── ...              # Config files
```

