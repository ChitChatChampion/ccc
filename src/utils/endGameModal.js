import axios from "axios";
import { getUrl, getHeader } from "../services";

// TODO: change confirm button to red
export const fireEndGameModal = (swal, router, route) =>
  swal
    .fire({
      icon: "info",
      title: "Are you sure you want to end the game?",
      text: "All participants will no longer be able to access the room if you do so. If you want to start another game, press back and create a new room for another game mode.",
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      showCancelButton: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        const roomId = route.params.id;
        const url = getUrl(`room/unpublish`);
        const headers = getHeader();
        axios
          .post(url, { room_id: roomId }, { headers })
          .then((response) => {
            switch (response.status) {
              case 200:
              case 201:
                return response.data;
            }
          })
          .then(() => {
            swal
              .fire({
                icon: "success",
                title: "Game Ended!",
                text: "We closed the game! All participants will no longer be able to access the room.",
              })
              .then(() => {
                router.push(`/`);
              });
          })
          .catch((err) => {
            swal.fire({
              icon: "error",
              title: "Oops...",
              text: `Something went wrong! ${
                err?.response?.data?.message ?? ""
              }`,
            });
          });
      }
    });
