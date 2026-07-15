# iRunner PLAN - Sistema de Prescrição de Treino

## Estrutura do Projeto

```
iRunner PLAN/
├── css/
│   └── style.css         # Estilos globais do sistema web
├── js/
│   └── app.js          # Lógica de negócio do sistema
├── mobile-app/          # Aplicativo React Native (para compilação APK)
│   ├── assets/
│   ├── src/
│   └── ... (arquivos do app mobile)
├── index.html           # Página de login (ponto de entrada)
├── admin-dashboard.html # Painel do treinador
├── admin-atletas.html  # Gerenciar atletas
├── admin-treinadores.html # Gerenciar treinadores
├── admin-prescription.html # Prescrição de treinos
├── admin-ai-upload.html # Transcrição de imagens com IA
└── athlete-dashboard.html # Painel do atleta
```

## Como Usar o Sistema Web (Para Deploy em Servidor)

### Opção 1: GitHub Pages (Recomendado)
1. Crie um repositório no GitHub
2. Inicialize o Git localmente (se ainda não tiver):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
   git push -u origin main
   ```
3. Vá para o repositório no GitHub > **Settings** > **Pages**
4. Em **Build and deployment**, escolha:
   - **Source**: Deploy from a branch
   - **Branch**: `main` (ou `master`), pasta `/ (root)`
5. Clique em **Save** e aguarde alguns minutos. O sistema estará acessível em:
   ```
   https://SEU-USUARIO.github.io/SEU-REPOSITORIO/
   ```

### Opção 2: Servidor Web Tradicional
1. Faça o upload de toda a pasta raiz para seu servidor web (Apache, Nginx, etc.)
2. Acesse o arquivo `index.html` pelo navegador

### Credenciais padrão do administrador
   - E-mail: `admin`
   - Senha: `ej99763463`

## Funcionalidades

### Para Treinador (Admin)
- Cadastro e gerenciamento de atletas
- Cadastro e gerenciamento de treinadores
- Prescrição de treinos personalizados
- Transcrição de planilhas e resultados via IA
- Exportar treinos em PDF

### Para Atletas
- Visualizar treinos do dia e da semana
- Marcar treinos como concluídos
- Ver histórico de evolução

---

## Aplicativo Mobile (React Native)

Os arquivos do app estão na pasta `mobile-app/`. Para compilar o APK:

1. Navegue para a pasta `mobile-app/`
2. Instale as dependências: `npm install`
3. Compile usando o APK: `eas build -p android --profile preview`
