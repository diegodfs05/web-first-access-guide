if (sessionStorage.getItem('closedPres') == undefined) {
    sessionStorage.setItem('closedPres', false);
}

function startPres() {
    createOverlay();
    createMessage(0);
}
function closePres() {
    sessionStorage.setItem('closedPres', true);
    (document.querySelector('.screen-overlay')).remove();
    try {
        (document.querySelector('.highlight-ele')).classList.remove('highlight-ele');
    } catch (e) { console.log(e) }
    (document.querySelectorAll('.message-element')).forEach(ele => ele.remove());

}
function createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = "screen-overlay d-flex justify-content-center align-items-center";
    document.body.appendChild(overlay);
}
function highlightElement(queryIdentifier) {
    const elementToHighlight = document.querySelector(`${queryIdentifier}`);
    elementToHighlight.scrollIntoView(false);
    elementToHighlight.classList.add('highlight-ele');
}
function createMessage(index) {
    //Limpa mensagens anteriores
    try {
        (document.querySelectorAll('.message-element')).forEach(ele => ele.remove());
    } catch (e) { console.log(e) }
    //Limpa hightlights anteriores
    try {
        (document.querySelectorAll('.highlight-ele')).forEach(ele => ele.classList.remove('highlight-ele'));
    } catch (e) { console.log(e) }
    //Aciona highlight
    if (messages[index].queryIdentifier != '') {
        highlightElement(messages[index].queryIdentifier);
    }
    //Roda JS se houver
    if (messages[index].javascript != '') {
        try {eval(messages[index].javascript)} catch (e) {console.log(e)}
    }
    //Cria nova mensagem
    let messageElement = document.createElement('div');
    messageElement.className = 'message-element card bg-branco p-2 border-2 border-radius-2 border-turq';
    messageElement.innerHTML = `
        <div class="card-header bg-branco w-100 p-2 d-flex justify-content-between">
            <p class="c-turq fw-700 mb-0">${messages[index].title}<p>
            <p class="mb-0">
                <a onclick="closePres()" class="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path fill="003641" d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>
                </a>
            </p>
        </div>
        <div class="card-body bg-branco p-2">
            <p class="text-balance">${messages[index].text}</p>
        </div>
        <div class="card-footer bg-branco p-2 d-flex align-items-center justify-content-between gap-2">
            <a class="btn btn-secondary" onclick=${messages[index].btn1.action}>${messages[index].btn1.text}</a>
            <a class="btn btn-secondary" onclick=${messages[index].btn2.action}>${messages[index].btn2.text}</a>
        </div>
    `;
    //Posiciona a mensagem criada
    if (index == 0) {
        (document.querySelector('.screen-overlay').append(messageElement));
    } else {
        //(document.querySelector(`${messages[index].queryIdentifier}`)).append(messageElement);
        const rect = (document.querySelector(`${messages[index].queryIdentifier}`)).getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        document.body.append(messageElement);
        // Posicionamento inicial
        let newElementLeft = rect.right + 10;
        let newElementTop = rect.top + window.scrollY;
        // Se estiver perto da margem direita
        if (rect.right + messageElement.offsetWidth > viewportWidth) {
            newElementLeft = rect.left - messageElement.offsetWidth - 20;
            console.log('corrected left: ' + newElementLeft);
        }
        // Se estiver perto da borda inferior
        if (rect.bottom + messageElement.offsetHeight > viewportHeight) {
            newElementTop = rect.top - messageElement.offsetHeight + window.scrollY;
            console.log('corrected top: ' + newElementTop);
        }
        messageElement.style.left = `${newElementLeft}px`;
        messageElement.style.top = `${newElementTop}px`;
    }
}

//Liferay.on('allPortletsReady', () => {
    if ((sessionStorage.getItem('closedPres') == 'false') && (window.innerWidth > 990)) {
        startPres();
    }
//});
