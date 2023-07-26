import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import { useRecoilState } from 'recoil';
import { roomFurnitureState } from '../../store/furniture';
import axios from 'axios';

const emptyRoomImage = new window.Image();
emptyRoomImage.src = "/images/emptyRoom.png";

const RoomCanvas = ({ roomId, draggable }) => {
    const [{ list: roomFurnitureList }, setRoomFurnitureState] = useRecoilState(roomFurnitureState);
    const stage = useRef(null);
    const [size, setSize] = useState({
        width: 0,
        height: 0
    });
    const onDragStart = (id) => (e) => {
        const list = roomFurnitureList.slice();
        const item = list.find((item) => item.id === id);
        console.log(item);
        const index = list.indexOf(item);
        list.splice(index, 1);
        list.push(item);
        setRoomFurnitureState((state) => ({
            ...state,
            list
        }));
    }
    const onDragEnd = (id) => (e) => {
        const list = roomFurnitureList.slice();
        const item = list.find((i) => i.id === id);
        const index = list.indexOf(item);
        // update item position
        list[index] = {
          ...item,
          x: e.target.x(),
          y: e.target.y(),
        };
        setRoomFurnitureState((state) => ({
            ...state,
            list
        }))
    }
    const onDoubleClick = (id) => (e) => {
        setRoomFurnitureState((state) => ({
            ...state,
            list: state.list.filter((item) => item.id !== id),
        }))
    }
    useEffect(() => {
        const canvas = document.querySelector(".room-canvas-wrapper");
        if (canvas === null) return;
        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
              const { width, height } = entry.contentRect;
              setSize({
                width,
                height
               })
            }
          });
        observer.observe(canvas)
        return () => {
            observer.unobserve(canvas)
        }
    }, []);
    useEffect(() => {
        if (roomId !== null) {
            axios.post("/api/furniture/getFurniturePosition", {
                roomId
            }).then(({ data }) => {
                setRoomFurnitureState({
                    nextId: 1,
                    list: data.map((item) => ({
                        ...item,
                        id: item.roomFurnitureId
                    })),
                    initialList: data.map((item) => ({
                        ...item,
                        id: item.roomFurnitureId
                    }))
                })
            }).catch((e) => {
                console.log(e);
            })
        }
    }, [roomId])
    return (
        <Stage width={size.width} height={size.height} id='myCanvas' ref={stage}>
            <Layer>
                <Image image={emptyRoomImage} draggable={false} x={size.width / 2 - 200} y={size.height / 2 - 200}  />
                {roomFurnitureList.map(furniture => {
                    const image = new window.Image();
                    image.src = furniture.imagePath;
                    return (
                        <Image
                            key={furniture.id}
                            draggable={draggable}
                            image={image} 
                            x={furniture.x} 
                            y={furniture.y}
                            onDragStart={onDragStart(furniture.id)}
                            onDragEnd={onDragEnd(furniture.id)}
                            onDblClick={draggable ? onDoubleClick(furniture.id) : undefined}
                        />
                    )
                })}
            </Layer>
      </Stage>
    )
}

RoomCanvas.defaultProps = {
    draggable: true
}

export default RoomCanvas;