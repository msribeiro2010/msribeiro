# Configuração do EmailJS

Para ativar o envio de emails, siga estes passos:

## 1. Criar conta no EmailJS
1. Acesse: https://www.emailjs.com/
2. Clique em "Sign Up" e crie sua conta
3. Confirme seu email

## 2. Configurar Serviço de Email
1. No dashboard, clique em "Email Services"
2. Clique "Add New Service"
3. Escolha seu provedor (Gmail, Outlook, Yahoo, etc.)
4. Siga as instruções para conectar sua conta
5. Anote o **Service ID** gerado

## 3. Criar Template de Email
1. Vá em "Email Templates"
2. Clique "Create New Template"
3. Configure o template:
   ```
   Subject: Nova mensagem do site - {{from_name}}
   
   Content:
   Nome: {{from_name}}
   Email: {{from_email}}
   
   Mensagem:
   {{message}}
   ```
4. Salve e anote o **Template ID**

## 4. Obter Chaves
1. Vá em "Account" > "General"
2. Copie sua **Public Key**

## 5. Atualizar o Código
No arquivo `script.js`, substitua:

```javascript
// Linha 115: Sua chave pública
emailjs.init("YOUR_PUBLIC_KEY");

// Linha 127: Seus IDs
emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
```

**Exemplo:**
```javascript
emailjs.init("user_abc123def456");
emailjs.sendForm('service_gmail', 'template_contact', this)
```

## 6. Testar
1. Abra o site
2. Preencha o formulário de contato
3. Verifique se o email chegou

## Limitações Gratuitas
- 200 emails/mês
- 1 usuário
- Para mais: planos pagos disponíveis

## Segurança
- Chaves são públicas (seguro)
- Validação no lado do EmailJS
- Rate limiting automático