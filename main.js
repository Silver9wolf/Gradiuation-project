class AnimatedSearch {
  constructor(container) {
    this.container = container;
    this.input = container.querySelector('.search-input');
    this.suggestions = container.querySelector('.search-suggestions');
    this.suggestionItems = container.querySelectorAll('.suggestion-item');
    
    this.init();
  }
  
  init() {
    // Handle input focus
    this.input.addEventListener('focus', () => {
      this.container.classList.add('focused');
    });
    
    this.input.addEventListener('blur', () => {
      // Delay hiding suggestions to allow clicking them
      setTimeout(() => {
        this.container.classList.remove('focused');
      }, 200);
    });
    
    // Handle input changes
    this.input.addEventListener('input', (e) => {
      this.handleInput(e.target.value);
    });
    
    // Handle suggestion clicks
    this.suggestionItems.forEach(item => {
      item.addEventListener('click', () => {
        this.input.value = item.textContent;
        this.container.classList.remove('focused');
        // Trigger custom event for search
        this.container.dispatchEvent(new CustomEvent('search', {
          detail: { query: item.textContent }
        }));
      });
    });
    
    // Handle keyboard navigation
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        this.handleKeyboardNavigation(e.key);
      } else if (e.key === 'Enter') {
        const activeItem = this.suggestions.querySelector('.active');
        if (activeItem) {
          activeItem.click();
        }
      } else if (e.key === 'Escape') {
        this.container.classList.remove('focused');
      }
    });
  }
  
  handleInput(value) {
    // Filter suggestions based on input
    const query = value.toLowerCase();
    this.suggestionItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(query)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
    
    // Show/hide suggestions container
    const hasVisibleSuggestions = Array.from(this.suggestionItems)
      .some(item => item.style.display !== 'none');
    this.suggestions.style.display = hasVisibleSuggestions ? 'block' : 'none';
  }
  
  handleKeyboardNavigation(key) {
    const items = Array.from(this.suggestionItems).filter(item => 
      item.style.display !== 'none'
    );
    
    if (items.length === 0) return;
    
    const currentIndex = items.findIndex(item => item.classList.contains('active'));
    let nextIndex;
    
    if (key === 'ArrowDown') {
      nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
    } else {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
    }
    
    // Remove active class from current item
    if (currentIndex !== -1) {
      items[currentIndex].classList.remove('active');
    }
    
    // Add active class to next item
    items[nextIndex].classList.add('active');
    items[nextIndex].scrollIntoView({ block: 'nearest' });
  }
}

// Initialize the search
document.addEventListener('DOMContentLoaded', () => {
  const searchContainer = document.querySelector('.animated-search .search-container');
  if (searchContainer) {
    new AnimatedSearch(searchContainer);
  }
});