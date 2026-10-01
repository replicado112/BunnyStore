# Bunny Store — protótipo frontend (somente cliente)
Tudo é simulado (localStorage + dados mockados em `src/data/`). Sem backend, pagamento real ou admin.
```
npm install && npm run dev
npm run build        # produção; use VITE_BASE=/repo/ se preferir caminho absoluto
```
Deploy: push na branch `main` → `.github/workflows/deploy.yml` (ative Pages → Source: GitHub Actions). Usa HashRouter, então funciona sem configuração de rotas.
Cupons: BUNNY10, WELCOME, PINK.
