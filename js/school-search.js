// Lista completa de escolas
const SCHOOLS_LIST = [
    "CENTRO DE ENSINO MEDIO ARY RIBEIRO VALADAO FILHO",
    "CENTRO DE ENSINO MEDIO BOM JESUS",
    "CENTRO DE ENSINO MEDIO DE GURUPI",    
    "COL DE TECELAGEM ART NSA SENHORA AUXILIADORA",
    "COL EST ALAIR SENA CONCEICAO",
    "COLÉGIO AGRICOLA DOM BOSCO",
    "COLÉGIO ESTADUAL ADELAIDE FRANCISCO SOARES",
    "COLÉGIO ESTADUAL ANITA CASSIMIRO MORENO",
    "COLÉGIO ESTADUAL BENEDITO PEREIRA BANDEIRA",
    "COLÉGIO ESTADUAL CANDIDO FIGUEIRA",
    "COLÉGIO ESTADUAL DE ALVORADA",
    "COLÉGIO ESTADUAL DE TALISMA",
    "COLÉGIO ESTADUAL DOM ALANO",
    "COLÉGIO ESTADUAL ELSEBAO LIMA",
    "COLÉGIO ESTADUAL FAMILIA AGRICOLA JOSE PORFIRIO DE SOUZA",
    "COLÉGIO ESTADUAL GIRASSOL DE TEMPO INTEGRAL JOSE SEABRA LEMOS",
    "COLÉGIO ESTADUAL JOAO TAVARES MARTINS",
    "COLÉGIO ESTADUAL NOSSA SENHORA APARECIDA",
    "COLÉGIO ESTADUAL OLAVO BILAC",
    "COLÉGIO ESTADUAL PORTO DO RIO MARANHAO",
    "COLÉGIO ESTADUAL POSITIVO DE GURUPI",
    "COLÉGIO ESTADUAL PROFESSORA ONEIDES ROSA DE MOURA",
    "COLÉGIO ESTADUAL REGINA SIQUEIRA CAMPOS",
    "COLÉGIO ESTADUAL TARSO DUTRA",
    "COLÉGIO ESTADUAL TIRADENTES",
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

// Função para criar campo de pesquisa de escola
function createSchoolSearchField(containerId, inputName, required = true) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Limpa o container
    container.innerHTML = '';

    // Cria o campo de input
    const input = document.createElement('input');
    input.type = 'text';
    input.name = inputName;
    input.id = inputName;
    input.placeholder = 'Digite para pesquisar a escola...';
    input.autocomplete = 'off';
    if (required) input.required = true;
    
    // Cria o container do dropdown
    const dropdownContainer = document.createElement('div');
    dropdownContainer.className = 'school-dropdown-container';
    dropdownContainer.style.display = 'none';
    
    // Cria a lista de resultados
    const resultsList = document.createElement('ul');
    resultsList.className = 'school-results-list';
    
    // Adiciona os elementos ao DOM
    dropdownContainer.appendChild(resultsList);
    container.appendChild(input);
    container.appendChild(dropdownContainer);
    
    // Adiciona estilos inline para garantir funcionamento
    container.style.position = 'relative';
    dropdownContainer.style.position = 'absolute';
    dropdownContainer.style.top = '100%';
    dropdownContainer.style.left = '0';
    dropdownContainer.style.right = '0';
    dropdownContainer.style.zIndex = '1000';
    dropdownContainer.style.backgroundColor = 'white';
    dropdownContainer.style.border = '1px solid #ddd';
    dropdownContainer.style.borderTop = 'none';
    dropdownContainer.style.borderRadius = '0 0 4px 4px';
    dropdownContainer.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    dropdownContainer.style.maxHeight = '200px';
    dropdownContainer.style.overflowY = 'auto';
    
    resultsList.style.listStyle = 'none';
    resultsList.style.margin = '0';
    resultsList.style.padding = '0';
    
    // Event listeners
    let isDropdownVisible = false;
    
    // Mostrar dropdown ao focar
    input.addEventListener('focus', () => {
        showDropdown();
    });
    
    // Pesquisar ao digitar
    input.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm.length > 0) {
            const filteredSchools = SCHOOLS_LIST.filter(school => 
                school.toLowerCase().includes(searchTerm)
            );
            showResults(filteredSchools);
        } else {
            showResults(SCHOOLS_LIST);
        }
    });
    
    // Esconder dropdown ao clicar fora
    document.addEventListener('click', (e) => {
        if (!container.contains(e.target)) {
            hideDropdown();
        }
    });
    
    // Função para mostrar dropdown
    function showDropdown() {
        dropdownContainer.style.display = 'block';
        showResults(SCHOOLS_LIST);
        isDropdownVisible = true;
    }
    
    // Função para esconder dropdown
    function hideDropdown() {
        dropdownContainer.style.display = 'none';
        isDropdownVisible = false;
    }
    
    // Função para mostrar resultados
    function showResults(schools) {
        resultsList.innerHTML = '';
        
        if (schools.length === 0) {
            const noResults = document.createElement('li');
            noResults.textContent = 'Nenhuma escola encontrada';
            noResults.style.padding = '10px';
            noResults.style.color = '#666';
            noResults.style.fontStyle = 'italic';
            resultsList.appendChild(noResults);
            return;
        }
        
        schools.forEach(school => {
            const li = document.createElement('li');
            li.textContent = school;
            li.style.padding = '10px 15px';
            li.style.cursor = 'pointer';
            li.style.borderBottom = '1px solid #f0f0f0';
            li.style.transition = 'background-color 0.2s';
            
            // Hover effect
            li.addEventListener('mouseenter', () => {
                li.style.backgroundColor = '#f8f9fa';
            });
            
            li.addEventListener('mouseleave', () => {
                li.style.backgroundColor = 'transparent';
            });
            
            // Selecionar escola
            li.addEventListener('click', () => {
                input.value = school;
                hideDropdown();
            });
            
            resultsList.appendChild(li);
        });
    }
}

// Função para inicializar todos os campos de escola na página
function initializeSchoolSearchFields() {
    // Procura por todos os campos de escola existentes
    const schoolFields = document.querySelectorAll('select[id*="school"], select[name*="school"]');
    
    schoolFields.forEach(field => {
        const container = field.parentElement;
        const fieldName = field.name || field.id;
        const isRequired = field.hasAttribute('required');
        
        // Cria um novo container se necessário
        let searchContainer = container.querySelector('.school-search-container');
        if (!searchContainer) {
            searchContainer = document.createElement('div');
            searchContainer.className = 'school-search-container';
            searchContainer.id = `school-search-${fieldName}`;
            container.appendChild(searchContainer);
        }
        
        // Cria o campo de pesquisa
        createSchoolSearchField(`school-search-${fieldName}`, fieldName, isRequired);
        
        // Esconde o campo original
        field.style.display = 'none';
    });
}

// Inicializa quando o DOM estiver carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSchoolSearchFields);
} else {
    initializeSchoolSearchFields();
}
