chrome.runtime.onMessage.addListener(
    function(request, message, sendResponse) {
        if(request.message == "get monthly stats") {
            console.log('did the thing')
            sendResponse({ response: 'content script response'});

        }
    }
)