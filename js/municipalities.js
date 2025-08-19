// Lista de municípios do sistema
const MUNICIPALITIES_LIST = [
    "Aliança do Tocantins",
    "Alvorada",
    "Araguaçu",
    "Cariri do Tocantins",
    "Crixás do Tocantins",
    "Dueré",
    "Figueirópolis",
    "Formoso do Araguaia",
    "Gurupi",
    "Jaú do Tocantins",
    "Palmeirópolis",
    "Peixe",
    "Sandolândia",
    "São Salvador do Tocantins",
    "São Valério",
    "Sucupira",
    "Talismã"
];

// Função para criar o campo de município com busca
function createMunicipalitySelect(containerId, required = true) {
    const container = document.getElementById(containerId);
    
    // Criar o container do campo
    const fieldContainer = document.createElement('div');
    fieldContainer.className = 'form-group';
    
    // Criar o label
    const label = document.createElement('label');
    label.htmlFor = 'municipality';
    label.textContent = 'Município:';
    if (required) label.innerHTML += ' <span class="required">*</span>';
    
    // Criar o container do combobox
    const comboboxContainer = document.createElement('div');
    comboboxContainer.className = 'combobox-container';
    
    // Criar o input
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'municipality';
    input.name = 'municipality';
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
    
    // Preencher a lista com os municípios
    MUNICIPALITIES_LIST.forEach(municipality => {
        const li = document.createElement('li');
        li.textContent = municipality;
        li.addEventListener('click', () => {
            input.value = municipality;
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

// Função para obter o valor do município selecionado
function getMunicipalityValue() {
    return document.getElementById('municipality').value;
}

// Função para definir o valor do município
function setMunicipalityValue(value) {
    document.getElementById('municipality').value = value;
}
