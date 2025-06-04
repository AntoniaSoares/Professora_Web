


// Funções gerais do painel de administração

// Simulação de dados - em produção, isso viria de uma API
let messages = [
    { id: 1, name: "João Silva", email: "joao@email.com", subject: "Consulta sobre orientação", date: "2023-05-10", read: false, content: "Mensagem completa..." },
    { id: 2, name: "Maria Oliveira", email: "maria@email.com", subject: "Parceria em pesquisa", date: "2023-05-08", read: true, content: "Mensagem completa..." }
];

// Inicialização do painel
document.addEventListener('DOMContentLoaded', function() {
    // Ativar tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Verificar autenticação (simplificado)
    if(!localStorage.getItem('adminLoggedIn') && !window.location.href.includes('login.html')) {
        window.location.href = '../../login.html';
    }

    // Simular carregamento de dados
    if(document.getElementById('messagesTable')) {
        loadMessages();
    }
});

// Carregar mensagens na tabela
function loadMessages() {
    const tbody = document.querySelector('#messagesTable tbody');
    tbody.innerHTML = '';
    
    messages.forEach(msg => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input type="checkbox" class="form-check-input"></td>
            <td>${msg.name}</td>
            <td>${msg.subject}</td>
            <td>${formatDate(msg.date)}</td>
            <td>
                <button class="btn btn-sm btn-primary view-btn" data-id="${msg.id}">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn btn-sm btn-danger delete-btn" data-id="${msg.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        if(!msg.read) row.classList.add('table-primary');
        tbody.appendChild(row);
    });

    // Adicionar eventos aos botões
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const msgId = parseInt(this.getAttribute('data-id'));
            viewMessage(msgId);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const msgId = parseInt(this.getAttribute('data-id'));
            deleteMessage(msgId);
        });
    });
}

// Visualizar mensagem
function viewMessage(id) {
    const message = messages.find(msg => msg.id === id);
    if(message) {
        // Marcar como lida
        message.read = true;
        
        // Preencher modal
        document.getElementById('messageSender').textContent = message.name;
        document.getElementById('messageEmail').textContent = message.email;
        document.getElementById('messageDate').textContent = formatDate(message.date, true);
        document.getElementById('messageSubject').textContent = message.subject;
        document.getElementById('messageContent').innerHTML = message.content.replace(/\n/g, '<br>');
        
        // Mostrar modal
        const modal = new bootstrap.Modal(document.getElementById('messageModal'));
        modal.show();
    }
}

// Excluir mensagem
function deleteMessage(id) {
    if(confirm('Tem certeza que deseja excluir esta mensagem?')) {
        messages = messages.filter(msg => msg.id !== id);
        loadMessages();
    }
}

// Formatar data
function formatDate(dateString, withTime = false) {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    if(withTime) {
        options.hour = '2-digit';
        options.minute = '2-digit';
    }
    return date.toLocaleDateString('pt-BR', options);
}

// Simular login (apenas para demonstração)
function adminLogin(username, password) {
    if(username === 'admin' && password === 'prof123') {
        localStorage.setItem('adminLoggedIn', 'true');
        return true;
    }
    return false;
}

// Adicionar estas funções ao arquivo admin.js existente

// Responder mensagem
function setupReplyForm() {
    const replyForm = document.getElementById('replyForm');
    if(replyForm) {
        replyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const subject = document.getElementById('replySubject').value;
            const message = document.getElementById('replyMessage').value;
            
            // Simular envio de email
            alert(`Resposta enviada com sucesso!\n\nAssunto: ${subject}\nMensagem: ${message}`);
            
            // Fechar seção de resposta e limpar formulário
            const collapse = new bootstrap.Collapse(document.getElementById('replySection'));
            collapse.hide();
            replyForm.reset();
        });
    }
}

// Carregar informações institucionais
function loadInstitutionalInfo() {
    // Simular carregamento de dados do servidor
    if(document.getElementById('contactInfoForm')) {
        // Em produção, aqui seria uma chamada AJAX para obter os dados atuais
        console.log('Carregando informações institucionais...');
    }
}

// Adicionar ao evento DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    // ... código existente ...
    
    setupReplyForm();
    loadInstitutionalInfo();
    
    // Verificar se há mensagem específica na URL (para resposta)
    if(window.location.hash.startsWith('#reply=')) {
        const msgId = parseInt(window.location.hash.replace('#reply=', ''));
        viewMessage(msgId);
        const replyBtn = document.querySelector('[data-bs-target="#replySection"]');
        if(replyBtn) replyBtn.click();
    }
});