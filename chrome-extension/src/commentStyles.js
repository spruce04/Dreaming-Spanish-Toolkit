const styleContent = `
  .comment-user-name,
  .comment-content .comment-content-inner,
  .comment-meta {
    color: white !important;
  }
`;

document.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver((mutations) => {
    const hyvorTalk = document.querySelector('.ds-hyvor-talk--loaded');
    
    if (hyvorTalk && !hyvorTalk.querySelector('style[data-injected]')) {
      // First find the hyvor-talk-comments element
      const commentsElement = hyvorTalk.querySelector('hyvor-talk-comments');
      
      if (commentsElement?.shadowRoot) {
        console.log('Found comments shadow root!');
        const style = document.createElement('style');
        style.setAttribute('data-injected', 'true');
        style.textContent = styleContent;
        commentsElement.shadowRoot.appendChild(style);
      } else {
        console.log('Comments element or shadow root not found yet');
      }
    }
  });

  observer.observe(document.body, { 
    childList: true, 
    subtree: true
  });
});