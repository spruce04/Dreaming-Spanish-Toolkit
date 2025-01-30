const styleContent = `
  .comment-user-name,
  .comment-content .comment-content-inner,
  .comment-meta {
    color: white !important;
  }
`;

//make sure the comments only change colour if the user is in dark mode
let inDark = false;
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.display === "dark" || message.reload === "dark") {
    inDark = true;
  } else if (message.display === "light" || message.reload === "light") {
    inDark = false;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver((mutations) => {
    
    //if we are in dark mode, change the comments colours
    if (inDark) {
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
    }
  });

  observer.observe(document.body, { 
    childList: true, 
    subtree: true 
  });
});
