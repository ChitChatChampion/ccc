import { getUrl } from "../services";

// TODO: separate out different ws into different files
export class WebSocketClient {
  constructor(path) {
    // We slice away the https
    this.socket = new WebSocket(`ws://${getUrl(path).slice(7)}`);
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

  bingoEnterRoom(roomId, isOwner) {
    this.waitForOpenSocket().then(() =>
      this.socket.send(
        JSON.stringify({
          is_owner: isOwner,
          type: "enter_room",
          room_id: roomId,
        })
      )
    );
  }

  onPlayerJoin(callback) {
    this.socket.addEventListener("message", (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === "player_join") {
          callback(message);
        }
      } catch (err) {
        console.error(err);
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
