(function(){
    const q = (selector) => document.querySelector(selector);

    const gCanvasElement = q('#unity-canvas');
    const gameContainer = q('body')    

    const initialDimensions = {width: parseInt(gCanvasElement.style.width, 10), height: parseInt(gCanvasElement.style.height, 10)};

    gameContainer.style.width = '100vw';
    gameContainer.style.height = '100vh';

    const getCanvasFromMutationsList = (mutationsList) => {
        for (let mutationItem of mutationsList){
            for (let addedNode of mutationItem.addedNodes){
                if (addedNode.id === '#canvas'){
                    return addedNode;
                }
            }
        }
        return null;
    }

    const setDimensions = () => {
        gCanvasElement.style.width = '100vw';
        gCanvasElement.style.height = '100vh';
    }

    window.setDimensions = setDimensions;

    const registerCanvasWatcher = () => {
        let debounceTimeout = null;
        const debouncedSetDimensions = () => {
            if (debounceTimeout !== null) {
                clearTimeout(debounceTimeout);
            }
            debounceTimeout = setTimeout(setDimensions, 200);
        }
        window.addEventListener('resize', debouncedSetDimensions, false);
        setDimensions();
    }

    const i = 0;
    registerCanvasWatcher();

    new MutationObserver(function (attributesMutation) {
        this.disconnect();
        setTimeout(setDimensions, 1)                
    }).observe(gameContainer, {attributes:true});
})();
