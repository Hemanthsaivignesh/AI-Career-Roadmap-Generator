from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from backend.services.realtime import realtime_hub

router = APIRouter(tags=["Realtime"])


@router.websocket("/ws/roadmaps")
async def roadmap_socket(websocket: WebSocket) -> None:
    await realtime_hub.connect(websocket)
    try:
        while True:
            message = await websocket.receive_text()
            await websocket.send_json({"type": "heartbeat", "message": message})
    except WebSocketDisconnect:
        realtime_hub.disconnect(websocket)
