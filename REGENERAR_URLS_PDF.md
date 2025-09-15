# 🔧 **SOLUÇÃO: Regenerar URLs dos PDFs**

## ❌ **Problema Confirmado:**
- Arquivos existem no Firebase Storage
- Regras estão corretas
- URLs não funcionam (tokens expirados/malformados)

## ✅ **Solução: Regenerar URLs no Código**

### **Passo 1: Modificar o Código de Upload**

Vou atualizar o arquivo `forms/assessoramento-report.html` para gerar URLs mais robustas:

```javascript
// Função melhorada para upload de anexos
async function uploadAttachments() {
    if (selectedFiles.length === 0) return [];
    
    const uploadPromises = selectedFiles.map(async (file) => {
        try {
            const timestamp = Date.now();
            const fileName = `${timestamp}_${file.name}`;
            const storageRef = ref(storage, `assessoramento/${fileName}`);
            
            // Upload do arquivo
            const snapshot = await uploadBytes(storageRef, file);
            
            // Gerar URL com parâmetros específicos
            const downloadURL = await getDownloadURL(snapshot.ref);
            
            // Log para debug
            console.log('✅ Upload concluído:', {
                fileName: fileName,
                downloadURL: downloadURL,
                size: file.size,
                type: file.type
            });
            
            return {
                name: file.name,
                type: file.type,
                size: file.size,
                downloadURL: downloadURL,
                uploadedAt: new Date().toISOString(),
                storagePath: `assessoramento/${fileName}`
            };
        } catch (error) {
            console.error(`❌ Erro no upload de ${file.name}:`, error);
            throw error;
        }
    });
    
    return await Promise.all(uploadPromises);
}
```

### **Passo 2: Adicionar Função para Regenerar URLs**

```javascript
// Função para regenerar URLs de anexos existentes
async function regenerateAttachmentURLs(attachments) {
    if (!attachments || attachments.length === 0) return [];
    
    const regeneratedAttachments = await Promise.all(
        attachments.map(async (attachment) => {
            try {
                // Se já tem storagePath, usar ela
                if (attachment.storagePath) {
                    const storageRef = ref(storage, attachment.storagePath);
                    const newURL = await getDownloadURL(storageRef);
                    
                    return {
                        ...attachment,
                        downloadURL: newURL,
                        regeneratedAt: new Date().toISOString()
                    };
                }
                
                // Se não tem storagePath, tentar extrair do downloadURL
                const urlParts = attachment.downloadURL.split('/');
                const fileName = urlParts[urlParts.length - 1].split('?')[0];
                const storagePath = `assessoramento/${fileName}`;
                
                const storageRef = ref(storage, storagePath);
                const newURL = await getDownloadURL(storageRef);
                
                return {
                    ...attachment,
                    downloadURL: newURL,
                    storagePath: storagePath,
                    regeneratedAt: new Date().toISOString()
                };
            } catch (error) {
                console.error('❌ Erro ao regenerar URL:', attachment.name, error);
                return attachment; // Retorna original se falhar
            }
        })
    );
    
    return regeneratedAttachments;
}
```

### **Passo 3: Atualizar Função de Carregamento**

```javascript
// Função melhorada para carregar relatórios
async function loadReports() {
    try {
        const reportsList = document.getElementById('reportsList');
        reportsList.innerHTML = '<p style="text-align: center; color: #666; font-style: italic;">Carregando relatórios...</p>';

        const q = query(collection(db, 'reports'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            reportsList.innerHTML = '<p style="text-align: center; color: #666; font-style: italic;">Nenhum relatório encontrado.</p>';
            return;
        }

        let html = '';
        querySnapshot.forEach((doc) => {
            const report = doc.data();
            
            const date = report.createdAt ? 
                (report.createdAt.toDate ? new Date(report.createdAt.toDate()).toLocaleDateString('pt-BR') : 
                 new Date(report.createdAt).toLocaleDateString('pt-BR')) : 'Data não disponível';
            
            html += `
                <div class="report-item" style="border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; margin-bottom: 20px; background-color: #fafafa;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px;">
                        <div>
                            <h4 style="margin: 0 0 5px 0; color: #333;">${report.school || 'Escola não informada'}</h4>
                            <p style="margin: 0; color: #666; font-size: 14px;">${report.municipality || 'Município não informado'} • ${date}</p>
                        </div>
                        <button onclick="deleteReport('${doc.id}')" style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">Excluir</button>
                    </div>
                    
                    <div style="margin-bottom: 10px;">
                        <strong>Técnico:</strong> ${report.technician || 'Não informado'}<br>
                        <strong>Departamento:</strong> ${report.department || 'Não informado'}
                    </div>
                    
                    ${report.attachments && report.attachments.length > 0 ? `
                        <div style="margin-top: 15px;">
                            <h5 style="margin: 0 0 10px 0; color: #555;">📎 Anexos:</h5>
                            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                                ${report.attachments.map(attachment => {
                                    const fileIcon = getFileIcon(attachment.type);
                                    return `
                                        <a href="${attachment.downloadURL}" target="_blank" class="attachment-link" style="display: inline-flex; align-items: center; padding: 8px 12px; background-color: #e9ecef; border-radius: 6px; text-decoration: none; color: #495057; font-size: 14px; transition: background-color 0.2s;" onclick="testAttachmentURL('${attachment.downloadURL}', '${attachment.name}')">
                                            <span style="margin-right: 8px; font-size: 16px;">${fileIcon}</span>
                                            ${attachment.name}
                                            <small style="margin-left: 8px; color: #6c757d;">(${(attachment.size / 1024).toFixed(1)} KB)</small>
                                        </a>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                    ` : '<p style="color: #999; font-style: italic; margin-top: 15px;">Nenhum anexo</p>'}
                </div>
            `;
        });

        reportsList.innerHTML = html;
    } catch (error) {
        console.error('❌ Erro ao carregar relatórios:', error);
        reportsList.innerHTML = '<p style="text-align: center; color: #dc3545;">Erro ao carregar relatórios. Tente novamente.</p>';
    }
}

// Função para testar URL do anexo
function testAttachmentURL(url, fileName) {
    console.log('🔗 Testando URL:', url);
    console.log('📄 Arquivo:', fileName);
    
    // Testar se a URL é válida
    fetch(url)
        .then(response => {
            if (response.ok) {
                console.log('✅ URL válida:', response.status);
            } else {
                console.log('❌ URL inválida:', response.status);
            }
        })
        .catch(error => {
            console.error('❌ Erro ao testar URL:', error);
        });
}
```

## 🎯 **Implementação:**

1. **Substitua** a função `uploadAttachments()` no arquivo
2. **Adicione** a função `regenerateAttachmentURLs()`
3. **Atualize** a função `loadReports()`
4. **Teste** fazendo upload de um novo arquivo

## 🔄 **Para Arquivos Existentes:**

Se quiser regenerar URLs de arquivos já salvos, pode criar um script de migração ou fazer upload de novos arquivos.

---

**🎯 Esta solução deve resolver o problema das URLs expiradas/malformadas!**
