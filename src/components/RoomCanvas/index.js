import { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import { useRecoilState } from 'recoil';
import { roomFurnitureListState } from '../../store/furniture';
import axios from 'axios';

const RoomCanvas = ({ roomId, draggable }) => {
    const [{ list: roomFurnitureList }, setRoomFurnitureList] = useRecoilState(roomFurnitureListState);
    const stage = useRef(null);
    const [size, setSize] = useState({
        width: 0,
        height: 0
    })
    const resizeCanvas = (canvas) => {
        setSize({
            width: canvas.parentElement.clientWidth - 10,
            height: canvas.parentElement.clientHeight - 31
        })
    }
    const onDragStart = (id) => (e) => {
        const list = roomFurnitureList.slice();
        const item = list.find((item) => item.id === id);
        console.log(item);
        const index = list.indexOf(item);
        list.splice(index, 1);
        list.push(item);
        setRoomFurnitureList((state) => ({
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
        setRoomFurnitureList((state) => ({
            ...state,
            list
        }))
    }
    const onDoubleClick = (id) => (e) => {
        setRoomFurnitureList((state) => ({
            ...state,
            list: state.list.filter((item) => item.id !== id)
        }))
    }
    useEffect(() => {
        const canvas = document.querySelector("#myCanvas");
        if (canvas === null) return;
        resizeCanvas(canvas);
        const onResize = () => resizeCanvas(canvas);
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize)
        }
    }, []);
    useEffect(() => {
        if (roomId !== null) {
            axios.post("/api/furniture/getFurniturePosition", {
                roomId
            }).then(({ data }) => {
                console.log(data);
                setRoomFurnitureList({
                    nextId: 1,
                    list: data.map((item) => ({
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
                        onDblClick={onDoubleClick(furniture.id)}
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