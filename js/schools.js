// Lista de escolas do sistema
const SCHOOLS_LIST = [
    "CENTRO DE ENSINO MEDIO ARY RIBEIRO VALADAO FILHO",
    "CENTRO DE ENSINO MEDIO BOM JESUS",
    "CENTRO DE ENSINO MEDIO DE GURUPI",    
    "COL DE TECELAGEM ART NSA SENHORA AUXILIADORA",
    "COL EST ALAIR SENA CONCEICAO",
    "COLEGIO AGRICOLA DOM BOSCO",
    "COLÉGIO ESTADUAL ADELAIDE FRANCISCO SOARES",
    "COLEGIO ESTADUAL ANITA CASSIMIRO MORENO",
    "COLEGIO ESTADUAL BENEDITO PEREIRA BANDEIRA",
    "COLEGIO ESTADUAL CANDIDO FIGUEIRA",
    "COLEGIO ESTADUAL DE ALVORADA",
    "COLEGIO ESTADUAL DE TALISMA",
    "COLEGIO ESTADUAL DOM ALANO",
    "COLEGIO ESTADUAL ELSEBAO LIMA",
    "COLEGIO ESTADUAL FAMILIA AGRICOLA JOSE PORFIRIO DE SOUZA",
    "COLEGIO ESTADUAL GIRASSOL DE TEMPO INTEGRAL JOSE SEABRA LEMOS",
    "COLEGIO ESTADUAL JOAO TAVARES MARTINS",
    "COLEGIO ESTADUAL NOSSA SENHORA APARECIDA",
    "COLEGIO ESTADUAL OLAVO BILAC",
    "COLEGIO ESTADUAL PORTO DO RIO MARANHAO",
    "COLEGIO ESTADUAL POSITIVO DE GURUPI",
    "COLEGIO ESTADUAL PROFESSORA ONEIDES ROSA DE MOURA",
    "COLEGIO ESTADUAL REGINA SIQUEIRA CAMPOS",
    "COLEGIO ESTADUAL TARSO DUTRA",
    "COLEGIO ESTADUAL TIRADENTES",
    "COLEGIO MILITAR DO ESTADO DO TOCANTINS - ADJULIO BALTHAZAR",
    "COLEGIO MILITAR DO ESTADO DO TOCANTINS - PROFESSORA MARIA",
    "COLEGIO MILITAR DO ESTADO DO TOCANTINS PRESIDENTE COSTA E SILVA",
    "ESC DE TEC ART NOSSA SRA AUXILIADORA",
    "ESC EST RETIRO",
    "ESC EST TANCREDO DE ALMEIDA NEVES",
    "ESCOLA ESTADUAL ANA MARIA DE JESUS",
    "ESCOLA ESTADUAL DR JOAQUIM PEREIRA DA COSTA",
    "ESCOLA ESTADUAL FE E ALEGRIA PAROQUIAL BERNARDO SAYAO",
    "ESCOLA ESTADUAL GERCINA BORGES TEIXEIRA",
    "ESCOLA ESTADUAL HERCILIA CARVALHO DA SILVA",
    "ESCOLA ESTADUAL NOSSA SENHORA DO CARMO",
    "ESCOLA ESTADUAL OLAVO BILAC",
    "ESCOLA ESTADUAL PADRE JOSE DE ANCHIETA",
    "ESCOLA ESTADUAL PASSO A PASSO",
    "ESCOLA ESTADUAL PRESBITERIANA ARAGUAIA",
    "ESCOLA ESTADUAL PRESBITERIANA EDUCACIONAL",
    "ESCOLA ESTADUAL RUI BARBOSA",
    "ESCOLA ESTADUAL SALVADOR CAETANO",
    "ESCOLA ESTADUAL VALDIR LINS",
    "ESCOLA ESTADUAL VILA GUARACY",
    "ESCOLA INDIGENA BARRA DO RIO VERDE",
    "ESCOLA INDIGENA IJANARI",
    "ESCOLA INDIGENA IJAWALA",
    "ESCOLA INDIGENA SANAWE",
    "ESCOLA INDIGENA TAINA",
    "ESCOLA INDIGENA TEMANARE",
    "ESCOLA INDIGENA TEWADURE",
    "ESCOLA INDIGENA TXUIRI-HINA",
    "ESCOLA INDIGENA WAHURI",
    "ESCOLA INDIGENA WATAKURI",
    "INSTITUTO EDUCACIONAL PASSO A PASSO"
];

// Função para criar o campo de escola com busca
function createSchoolSelect(containerId, required = true) {
    const container = document.getElementById(containerId);
    
    // Criar o container do campo
    const fieldContainer = document.createElement('div');
    fieldContainer.className = 'form-group';
    
    // Criar o label
    const label = document.createElement('label');
    label.htmlFor = 'schoolName';
    label.textContent = 'Nome da Escola:';
    if (required) label.innerHTML += ' <span class="required">*</span>';
    
    // Criar o container do combobox
    const comboboxContainer = document.createElement('div');
    comboboxContainer.className = 'combobox-container';
    
    // Criar o input
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'schoolName';
    input.name = 'schoolName';
    input.placeholder = 'Digite para buscar ou selecione da lista...';
    input.autocomplete = 'off';
    if (required) input.required = true;
    
    // Criar o botão dropdown
    const dropdownBtn = document.createElement('button');
    dropdownBtn.type = 'button';
    dropdownBtn.className = 'dropdown-btn';
    dropdownBtn.innerHTML = '▼';
    
    // Criar a lista dropdown
    const dropdownList = document.createElement('ul');
    dropdownList.className = 'dropdown-list';
    dropdownList.style.display = 'none';
    
    // Preencher a lista com as escolas
    SCHOOLS_LIST.forEach(school => {
        const li = document.createElement('li');
        li.textContent = school;
        li.addEventListener('click', () => {
            input.value = school;
            dropdownList.style.display = 'none';
            input.focus();
        });
        dropdownList.appendChild(li);
    });
    
    // Event listeners
    input.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const items = dropdownList.querySelectorAll('li');
        
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
        
        if (searchTerm.length > 0) {
            dropdownList.style.display = 'block';
        } else {
            dropdownList.style.display = 'none';
        }
    });
    
    input.addEventListener('focus', () => {
        if (input.value.length > 0) {
            dropdownList.style.display = 'block';
        }
    });
    
    dropdownBtn.addEventListener('click', () => {
        dropdownList.style.display = dropdownList.style.display === 'none' ? 'block' : 'none';
        input.focus();
    });
    
    // Fechar dropdown ao clicar fora
    document.addEventListener('click', (e) => {
        if (!comboboxContainer.contains(e.target)) {
            dropdownList.style.display = 'none';
        }
    });
    
    // Montar o campo
    comboboxContainer.appendChild(input);
    comboboxContainer.appendChild(dropdownBtn);
    comboboxContainer.appendChild(dropdownList);
    
    fieldContainer.appendChild(label);
    fieldContainer.appendChild(comboboxContainer);
    
    return fieldContainer;
}

// Função para obter o valor da escola selecionada
function getSchoolValue() {
    return document.getElementById('schoolName').value;
}

// Função para definir o valor da escola
function setSchoolValue(value) {
    document.getElementById('schoolName').value = value;
}
