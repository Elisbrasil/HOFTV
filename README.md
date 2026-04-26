# HOFOFOCA — Manda o Seu!
Formulário de envio de fofocas e denúncias da HOFTV

---

## 📁 Estrutura de Arquivos

```
hofofoca/
├── index.html       ← Estrutura HTML do formulário
├── style.css        ← Estilos, cores, animações, parallax
├── script.js        ← Lógica JS, parallax, validação, envio
├── README.md        ← Este arquivo
└── assets/
    ├── fundo.png    ← Imagem de fundo (parallax)
    ├── avatar.png   ← Léia Dias
    ├── mic-dark.png ← Microfone fundo escuro (hero)
    └── mic-blue.png ← Microfone fundo azul (seções)
```

---

## ⚙️ Configuração do Formspree

1. Acesse https://formspree.io e crie uma conta gratuita
2. Crie um novo formulário
3. Copie o ID gerado (ex: `xpwzabcd`)
4. Abra `index.html` e substitua:

```html
action="https://formspree.io/f/SEU_ID_AQUI"
```
por:
```html
action="https://formspree.io/f/xpwzabcd"
```

---

## 🚀 Como hospedar no cPanel

1. Faça login no seu cPanel
2. Abra o **Gerenciador de Arquivos**
3. Navegue até `public_html` (ou a pasta do seu domínio)
4. Crie uma pasta `hofofoca` (ou suba direto na raiz)
5. Faça upload de **todos os arquivos** desta pasta:
   - `index.html`
   - `style.css`
   - `script.js`
   - Pasta `assets/` com todas as imagens dentro
6. Acesse pelo seu domínio: `seudominio.com/hofofoca`

**IMPORTANTE:** Mantenha a estrutura de pastas igual.  
O `assets/` deve estar na mesma pasta do `index.html`.

---

## 🎨 Cores da HOFTV

| Nome            | Hex       |
|-----------------|-----------|
| Azul Frequência | `#2c2977` |
| Laranja Holofote| `#ff7830` |
| Magenta Sangue  | `#b51f4d` |
| Ciano Reflexo   | `#00c2e8` |
| Roxo Blecaute   | `#a047b5` |
| Preto Zero      | `#17141c` |
| Cinza Estático  | `#e8e8e8` |

---

## 🖋 Fontes

- **Barlow Condensed** (substituta da Moldin) — títulos
- **Big Shoulders Display** (substituta da Niceplan) — display
- **Onest** — corpo de texto (fonte oficial do manual)

Todas carregadas via Google Fonts. Nenhuma instalação necessária.

---

## 📋 Campos do Formulário

| # | Campo              | Tipo             | Obrig. |
|---|--------------------|------------------|--------|
| 1 | Tipo de conteúdo   | Checkbox múltiplo| Sim    |
| 2 | Conte tudo         | Textarea longa   | Sim    |
| 3 | Provas             | Upload arquivo   | Não    |
| 4 | Nível de urgência  | Slider 1–5       | Não    |
| 5 | Investigar?        | Sim/Não          | Não    |
| 6 | Apelido            | Texto curto      | Não    |
| 7 | Email anônimo      | Email            | Não    |

---

## 🔧 Próximos passos sugeridos

- [ ] Configurar o Formspree com seu email
- [ ] Testar o envio em modo local (Live Server ou similar)
- [ ] Fazer upload no cPanel
- [ ] Testar em mobile
- [ ] Configurar resposta automática no Formspree (opcional)
