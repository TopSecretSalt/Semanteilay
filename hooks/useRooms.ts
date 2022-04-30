import {useReducer } from "react"
import { State, Action, Room } from "../models";

function reducer(state: State, action: Action): State {
    switch (action.type) {
      case "add":
        return [...state, action.payload];
      default:
        throw new Error();
    }
  }


type useRoomsReturnValue = [State, (roomToAdd: Room) => void];

export const useRooms = (initialRooms: Room[]): useRoomsReturnValue => {
    const [rooms, dispatch] = useReducer(reducer, initialRooms);

    const addRoom = (room: Room) => {
        dispatch({type: 'add', payload: room})
    }

    return [rooms, addRoom];
}