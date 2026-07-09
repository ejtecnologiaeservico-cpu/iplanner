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

1. **Faça o upload de toda a pasta raiz para seu servidor web (Apache, Nginx, etc.)
2. Acesse o arquivo `index.html` pelo navegador
3. **Credenciais padrão do administrador**:
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
