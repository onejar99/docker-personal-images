const sendQuestion = (question) => {
  genNewHistoryItem(`你: ${question}`);
  let fullAns = "機器人: ";
  let el = genNewHistoryItem(fullAns);

  const evtSource = new EventSource(`/chat-bot?q=${encodeURIComponent(question)}`);
  evtSource.onmessage = (event) => {
    console.log("event=", event);
    fullAns += event.data;
    el.textContent = fullAns;
  };

  evtSource.addEventListener('close', (event) => {
    console.log("event=", event);
    console.log('SSE connection closed by server');
    evtSource.close();
    genNewHistoryItem("(Answer End)");
  });
}

const genNewHistoryItem = (content) => {
  const historyList = document.getElementById("history");
  const newElement = document.createElement("li");
  newElement.textContent = content;
  historyList.appendChild(newElement);
  return newElement;
}