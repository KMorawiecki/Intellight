import React from 'react';
import room_11_source from './Assets/11_room.svg';
import room_12_source from './Assets/12_room.svg';
import room_13_source from './Assets/13_room.svg';
import room_14_source from './Assets/14_room.svg';
import room_21_source from './Assets/21_room.svg';
import room_22_source from './Assets/22_room.svg';
import room_23_source from './Assets/23_room.svg';
import room_24_source from './Assets/24_room.svg';
import room_31_source from './Assets/31_room.svg';
import room_32_source from './Assets/32_room.svg';
import room_33_source from './Assets/33_room.svg';
import room_34_source from './Assets/34_room.svg';
import room_35_source from './Assets/35_room.svg';
import './MainImage.css';

class MainImage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            room_11 : room_11_source,
            room_12 : room_12_source,
            room_13 : room_13_source,
            room_14 : room_14_source,
            room_21 : room_21_source,
            room_22 : room_22_source,
            room_23 : room_23_source,
            room_24 : room_24_source,
            room_31 : room_31_source,
            room_32 : room_32_source,
            room_33 : room_33_source,
            room_34 : room_34_source,
            room_35 : room_35_source,
        }
    }

    changeState(newRoom) {
        this.setState((state, props) => ({
            currentRoom: newRoom
        }));
        this.props.onChange(newRoom);
    }

    renderFloor(floorNumber) {

        let i;
        const core_str_f = "floor_room";
        const core_str_r = "room_";
        const items = [];

        for(i = 0; i < 4 + Math.max(0, floorNumber - 2); i++) {
            let id = core_str_f.concat(floorNumber.toString().concat(i+1));
            let source = core_str_r.concat(floorNumber.toString().concat(i+1));

            // eslint-disable-next-line no-eval
            items.push(<img className={id} id={id} src={eval("this.state." + source)} alt="room_image"
                            onMouseUp={() => this.changeState(id)}/>)
        }

        return (
            <div className="container1">
                {items}
            </div>
        );
    }

    hideFloor(floorNum){

        let i;

        for(i = 0; i < 4 + Math.max(0, floorNum - 2); i++) {
            let element = document.getElementById("floor_room" + floorNum.toString() + i.toString());
            element.style.display = "none";
        }
    }

    render() {
        return (
            this.renderFloor(1)
        );
    }
}

export default MainImage;