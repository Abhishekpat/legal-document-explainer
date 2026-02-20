# Legal Document Explainer Bot

A web application that transforms complex legal documents into plain language summaries. Paste any legal text and instantly get simplified explanations, key points, and highlighted obligations and penalties.

**Live Demo:** [https://legal-document-explainer.netlify.app](https://legal-document-explainer.netlify.app)

---

## Features

- **Plain Language Summaries** — Converts complex legal text into easy-to-understand overviews
- **Key Points Extraction** — Automatically identifies and lists the most important points
- **Obligations & Penalties Detection** — Highlights specific obligations and consequences for non-compliance
- **Legal Terms Dictionary** — Replaces 40+ complex legal terms with simple equivalents (e.g., "pursuant to" → "according to")
- **Word Count Tracking** — Shows both original and simplified word counts
- **Input Validation** — Prevents empty submissions with clear error messages
- **Responsive Design** — Works seamlessly on desktop, tablet, and mobile

## Screenshots

| Input View | Output View |
|---|---|
| Paste legal text and click "Simplify Document" | Get summary, key points, obligations & simplified text |

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Semantic structure |
| CSS3 | Modern styling with gradients, responsive layout |
| Vanilla JavaScript (ES6+) | Client-side document processing |

> No frameworks, no APIs, no backend required — runs entirely in the browser.

## Getting Started

### Run Locally

```bash
# Clone the repository
git clone https://github.com/Abhishekpat/legal-document-explainer.git
cd legal-document-explainer

# Open directly in browser (no build step needed)
# Simply open index.html in your browser
```

Or just double-click `index.html` — that's it!

### Deploy Your Own

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Abhishekpat/legal-document-explainer)

## How It Works

1. **Text Analysis** — Scans the document for important legal keywords and phrases
2. **Term Replacement** — Substitutes complex legal jargon with plain language equivalents
3. **Sentence Extraction** — Identifies sentences containing critical legal terms
4. **Summary Generation** — Creates a concise overview based on document content
5. **Classification** — Separates obligations from penalties for clarity
6. **Highlighting** — Visually distinguishes different types of important information

## Detected Keywords

| Category | Keywords |
|---|---|
| Obligations | shall, must, required, obligated, duty, responsible |
| Penalties | penalty, fine, damages, breach, violation, liable, terminate |
| General | agreement, contract, rights, warranty, confidential, arbitration |

## Use Cases

- Understanding employment contracts
- Reviewing rental agreements
- Analyzing terms of service
- Studying legal documents for education
- Quick overview of legal paperwork

## Disclaimer

This tool provides informational summaries only and is **not legal advice**. Please consult with a qualified legal professional for legal matters.

## License

Open source and free to use.
