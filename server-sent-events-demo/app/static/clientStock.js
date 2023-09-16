const connectStockServer = () => {
    const evtSource = new EventSource(`/stock-quotation`);
    evtSource.onmessage = (event) => {
        console.log("event=", event);
        genNewHistoryItem(event.data);
    };
}

const genNewHistoryItem = (content) => {
    const historyList = document.getElementById("history");
    const newElement = document.createElement("li");
    newElement.textContent = content;
    historyList.appendChild(newElement);
    return newElement;
}
