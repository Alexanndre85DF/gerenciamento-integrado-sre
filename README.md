# Sistema SRE GURUPI - Sistema de Gerenciamento

## Descrição
Sistema web para gerenciamento de monitoramentos educacionais por departamentos e indicadores, desenvolvido com HTML, CSS, JavaScript e Firebase.

## Funcionalidades

### 🔐 Sistema de Autenticação
- **Super Admin**: CPF `01099080150` / Senha `brasilia85`
- Login para usuários cadastrados
- Controle de acesso por níveis de usuário

### 👥 Gerenciamento de Usuários (Super Admin)
- Cadastro de novos usuários
- Listagem e exclusão de usuários
- Definição de funções e departamentos
- Associação com escolas

### 📊 Monitoramentos
- **Departamentos**: Currículo, Supervisão, Equipe Multiprofissional
- **Indicadores** (por departamento):
  - Frequência dos Estudantes
  - Frequência da Busca Ativa
  - Aulas Previstas e Aulas Dadas
  - Estudantes Abaixo da Média

### 📝 Formulários de Registro
- Preenchimento por aluno
- Organização por escola
- Estrutura flexível para diferentes indicadores
- Salvamento em banco de dados Firebase

### 📋 Registros e Relatórios
- Visualização por departamento e indicador
- Busca e filtros
- Exportação para PDF e Excel (funcionalidade futura)

### 🔔 Sistema de Avisos
- Criação de avisos por prioridade
- Direcionamento por departamento
- Gerenciamento de status (ativo/inativo)

## Estrutura de Arquivos

```
projeto alex/
├── index.html                          # Página de login
├── admin-panel.html                    # Painel de administração
├── user-dashboard.html                 # Dashboard do usuário
├── monitoring-generate.html            # Seleção de departamento
├── monitoring-curriculum.html          # Indicadores do Currículo
├── monitoring-supervision.html         # Indicadores da Supervisão
├── monitoring-multiprofessional.html   # Indicadores da Equipe Multiprofissional
├── monitoring-records.html             # Registros por departamento
├── monitoring-view-all.html            # Visualização consolidada
├── user-management.html                # Cadastro de usuários
├── user-list.html                      # Listagem de usuários
├── notice-create.html                  # Criação de avisos
├── notice-manage.html                  # Gerenciamento de avisos
├── forms/                              # Formulários específicos
│   └── student-frequency-curriculum.html
├── styles.css                          # Estilos do sistema
└── README.md                           # Este arquivo
```

## Configuração do Firebase

### 1. Configuração do Projeto
- Projeto: `projeto-alex-aaadf`
- API Key: `AIzaSyABEloTfC_nT5vfDHpeqYdDjNoPCKwE-Eo`
- Auth Domain: `projeto-alex-aaadf.firebaseapp.com`

### 2. Configuração do Firestore
O sistema utiliza as seguintes coleções:

#### `users` - Usuários do Sistema
```javascript
{
  name: "Nome do Usuário",
  cpf: "CPF do usuário",
  email: "email@exemplo.com",
  role: "admin|coordinator|teacher|supervisor",
  school: "Nome da Escola",
  department: "curriculum|supervision|multiprofessional",
  createdAt: Timestamp,
  createdBy: "CPF do super admin"
}
```

#### `records` - Registros de Monitoramento
```javascript
{
  school: "Nome da Escola",
  date: "2024-01-01",
  studentName: "Nome do Estudante",
  studentId: "Matrícula",
  grade: "Série/Ano",
  class: "Turma",
  attendanceStatus: "present|absent|justified|late",
  justification: "Justificativa",
  observations: "Observações",
  department: "curriculum|supervision|multiprofessional",
  indicator: "student-frequency|active-search|planned-given-classes|below-average-students",
  createdAt: Timestamp,
  createdBy: "CPF do usuário",
  userName: "Nome do usuário"
}
```

#### `notices` - Avisos do Sistema
```javascript
{
  title: "Título do Aviso",
  priority: "low|medium|high|urgent",
  department: "all|curriculum|supervision|multiprofessional",
  expiryDate: "2024-12-31",
  content: "Conteúdo do aviso",
  createdAt: Timestamp,
  createdBy: "CPF do super admin",
  status: "active|inactive"
}
```

### 3. Regras de Segurança do Firestore
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuários podem ler e escrever seus próprios dados
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Super admin pode acessar tudo
    match /{document=**} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'super_admin';
    }
    
    // Usuários autenticados podem ler registros
    match /records/{document} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    // Usuários autenticados podem ler avisos
    match /notices/{document} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'super_admin';
    }
  }
}
```

## Instalação e Deploy

### 1. Configuração Local
1. Clone ou baixe os arquivos do projeto
2. Abra o arquivo `index.html` em um navegador
3. Use as credenciais do super admin para primeiro acesso

### 2. Deploy no Netlify
1. Faça upload dos arquivos para o Netlify
2. Configure o domínio personalizado (opcional)
3. O sistema funcionará automaticamente com o Firebase

### 3. Configuração do Firebase
1. Acesse o [Console do Firebase](https://console.firebase.google.com)
2. Selecione o projeto `projeto-alex-aaadf`
3. Configure as regras de segurança do Firestore conforme acima
4. Habilite a autenticação por email/senha

## Uso do Sistema

### 1. Primeiro Acesso
- Use as credenciais do super admin
- Cadastre usuários para os departamentos
- Configure escolas e funções

### 2. Uso Diário
- Usuários fazem login com email e senha
- Acessam formulários por departamento e indicador
- Preenchem dados dos estudantes
- Visualizam registros salvos

### 3. Administração
- Super admin gerencia usuários e avisos
- Monitora uso do sistema
- Gera relatórios consolidados

## Personalização

### Adicionar Novos Indicadores
1. Crie novo arquivo HTML na pasta `forms/`
2. Adicione link no departamento correspondente
3. Configure campos específicos do indicador
4. Atualize a estrutura de dados no Firestore

### Modificar Estilos
- Edite o arquivo `styles.css`
- Mantenha a estrutura de classes existente
- Teste responsividade em diferentes dispositivos

### Adicionar Funcionalidades
- Implemente novas funções JavaScript
- Integre com APIs externas se necessário
- Mantenha compatibilidade com Firebase

## Suporte e Manutenção

### Logs e Debug
- Use o console do navegador para debug
- Verifique logs do Firebase Console
- Monitore regras de segurança

### Backup de Dados
- Exporte dados regularmente do Firestore
- Mantenha backup das configurações
- Documente mudanças no sistema

### Atualizações
- Mantenha SDKs do Firebase atualizados
- Teste funcionalidades após atualizações
- Mantenha compatibilidade com navegadores

## Contato e Suporte
Para suporte técnico ou dúvidas sobre o sistema, entre em contato com a equipe de desenvolvimento.

---

**Sistema SRE GURUPI** - Desenvolvido para gestão educacional eficiente e organizada.
