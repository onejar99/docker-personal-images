from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.staticfiles import StaticFiles
import random
import time
from datetime import datetime
from pathlib import Path

def fetch_stock_quotation():
    stock_lst = [
        {"name": "AAA", "price": 100},
        {"name": "BBB", "price": 50},
        {"name": "CCC", "price": 220}
    ]
    while True:
        stock = random.choice(stock_lst)
        mock_quoted_price = int(stock['price'] * random.uniform(0.8, 1.2))
        mock_quoted_unit = random.randint(1, 3)
        now_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        data = f"data: {now_time} 股票 {stock['name']} 成交價：${mock_quoted_price} 張數：{mock_quoted_unit}"
        print("[push]", data)
        yield f"{str(data)}\n\n"
        time.sleep(random.randint(1, 2))


def generate_bot_reply(q: str):
    mock_reply_chucks = ["你好", "，", "很", "高興", "認識你", "，", "我是", "一個", "聊天機器人", "，",
                    "正在示範", "Server-sent events 的應用", "。", "你提到", q, "，",
                    "但", "很抱歉", "，", "因為", "我", "只是", "模擬", "的", "機器人", "，",
                    "所以", "無法", "回答你", "。"]
    for chuck in mock_reply_chucks:
        time.sleep(0.3)
        yield chuck


def ask_chat_bot(q: str):
    reply_generator = generate_bot_reply(q)
    for reply_chuck in reply_generator:
        data = f"data: {str(reply_chuck)}\n\n"
        yield data
    print("[ask_chat_bot] reply end")
    yield "event: close\ndata: Connection closed\n\n"



@asynccontextmanager
async def lifespan(app: FastAPI):
    # initial resources if need
    yield
    # clean up and release the resources if need


app = FastAPI(lifespan=lifespan)
Path("static").mkdir(parents=True, exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/")
async def healthCheck():
    return {"status": "OK"}

@app.get("/stock-quotation")
async def get_stock_quotation():
    return StreamingResponse(fetch_stock_quotation(), media_type="text/event-stream")

@app.get("/chat-bot")
async def chat_bot(q: str):
    return StreamingResponse(ask_chat_bot(q), media_type="text/event-stream")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="127.0.0.1", port=5000, reload=True, access_log=True)
