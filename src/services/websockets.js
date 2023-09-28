import { getUrl } from "../services";

export class WebSocketClient {
  constructor() {
    // We slice away the https
    this.socket = new WebSocket(`ws://${getUrl("csc/ws").slice(7)}`);
    this.setupWebSocket();
  }

  async waitForOpenSocket() {
    return new Promise((resolve) => {
      if (this.socket.readyState !== this.socket.OPEN) {
        this.socket.addEventListener("open", () => {
          resolve();
        });
      } else {
        resolve();
      }
    });
  }

  enterRoom(roomId) {
    this.waitForOpenSocket().then(() =>
      this.socket.send(
        JSON.stringify({
          type: "enter_room",
          room_id: roomId,
        })
      )
    );
  }

  closeRoom(roomId) {
    this.waitForOpenSocket().then(() => {
      this.socket.send(
        JSON.stringify({
          type: "close_room",
          room_id: roomId,
        })
      );
    });
  }

  onRoomClose(callback) {
    this.socket.addEventListener("message", (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === "close_room") {
          callback(message);
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

  setupWebSocket() {
    this.socket.addEventListener("open", (event) => {
      console.log("WebSocket connection opened:", event);
    });

    this.socket.addEventListener("message", (event) => {
      const message = event.data;
      console.log({ message });
    });

    this.socket.addEventListener("close", (event) => {
      this.handleConnectionClose(event);
    });
  }

  handleConnectionClose(event) {
    console.log("WebSocket connection closed unexpectedly:", event);
  }
}
