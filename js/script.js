// Função para destacar o item de menu ativo
document.addEventListener('DOMContentLoaded', function() {
    // Obtém o caminho atual da URL
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    // Encontra todos os links do menu
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Percorre os links e adiciona a classe 'active' ao link correspondente
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
    
    // Adiciona efeito de hover nos cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        });
    });
});

// Função para o formulário de contato
function handleContactFormSubmit(event) {
    event.preventDefault();
    
    // Simulação de envio - em uma aplicação real, aqui seria uma chamada AJAX
    const name = document.getElementById('name').value;
    alert(`Obrigado, ${name}! Sua mensagem foi enviada com sucesso.`);
    
    // Limpa o formulário
    event.target.reset();
}

// Adiciona o event listener se o formulário existir na página
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', handleContactFormSubmit);
}