# 🔍 **TESTE: Verificar URLs dos PDFs**

## 🎯 **Objetivo:**
Identificar se o problema está nas URLs geradas pelo Firebase Storage ou em outro lugar.

## 📋 **Passo a Passo para Testar:**

### **Passo 1: Verificar URLs no Console do Firebase**
1. **Acesse:** [console.firebase.google.com](https://console.firebase.google.com)
2. **Vá para:** Firestore Database
3. **Clique:** Na aba "Data"
4. **Procure:** Coleção "reports"
5. **Encontre:** Um relatório com anexos PDF
6. **Copie:** A URL completa do anexo (campo downloadURL)

### **Passo 2: Testar URL Diretamente**
1. **Cole a URL** em uma nova aba do navegador
2. **Pressione Enter**
3. **Observe:** Se o PDF abre ou dá erro

### **Passo 3: Verificar Formato da URL**
A URL deve ter este formato:
```
https://firebasestorage.googleapis.com/v0/b/projeto-alex-aaadf.firebasestorage.app/o/assessoramento%2F[timestamp]_[nome-arquivo]?alt=media&token=[token]
```

### **Passo 4: Testar no Console do Navegador**
1. **Abra:** F12 (Ferramentas do Desenvolvedor)
2. **Vá para:** Aba "Console"
3. **Cole este código:**
```javascript
// Testar acesso a uma URL do Firebase Storage
fetch('COLE_AQUI_A_URL_DO_PDF')
  .then(response => {
    console.log('Status:', response.status);
    console.log('Headers:', response.headers);
    return response.blob();
  })
  .then(blob => {
    console.log('Arquivo carregado:', blob.size, 'bytes');
    console.log('Tipo:', blob.type);
  })
  .catch(error => {
    console.error('Erro:', error);
  });
```

## 🔧 **Possíveis Problemas Identificados:**

### **Problema 1: URLs Expiradas**
- **Sintoma:** URL retorna erro 403 ou 404
- **Causa:** Tokens de acesso expiraram
- **Solução:** Regenerar URLs

### **Problema 2: URLs Malformadas**
- **Sintoma:** URL não é válida
- **Causa:** Erro na geração da URL
- **Solução:** Verificar código de upload

### **Problema 3: Arquivo Não Existe**
- **Sintoma:** Erro 404
- **Causa:** Arquivo foi deletado ou não foi enviado
- **Solução:** Verificar no Firebase Storage

### **Problema 4: Permissões**
- **Sintoma:** Erro 403
- **Causa:** Regras de segurança bloqueando
- **Solução:** Verificar regras do Storage

## 📊 **Resultados Esperados:**

| Teste | Resultado Bom | Resultado Ruim |
|-------|---------------|----------------|
| URL direta | PDF abre | Erro de conexão |
| Console fetch | Status 200 | Status 403/404 |
| Formato URL | URL válida | URL malformada |
| Arquivo existe | Encontrado | Não encontrado |

## 🎯 **Próximos Passos:**

1. **Execute os testes** acima
2. **Relate os resultados** de cada teste
3. **Identifique** qual é o problema específico
4. **Aplique** a solução correspondente

## 🆘 **Se Todos os Testes Falharem:**

### **Solução de Emergência:**
1. **Fazer upload** de um novo arquivo PDF
2. **Verificar** se a nova URL funciona
3. **Comparar** com as URLs antigas
4. **Identificar** a diferença

### **Informações para Diagnóstico:**
- **URLs que funcionam** vs **URLs que não funcionam**
- **Diferenças** no formato das URLs
- **Timestamps** dos arquivos
- **Tamanhos** dos arquivos

---

**🎯 Objetivo: Identificar exatamente onde está o problema nas URLs dos PDFs.**
