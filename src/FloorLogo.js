import React from 'react';
import './FloorLogo.css'


class FloorLogo extends React.Component {

    drag(ev) {
        ev.dataTransfer.setData("text", ev.target.id);
    }

    render() {
        return (
            <img className = 'logo'
                 id = {"http://localhost:3000" + this.props.source}
                 src={this.props.source}
                 alt="floor_icon"
                 draggable={true}
                 onDrag = {this.drag}
            />
        )
    }
}


export default FloorLogo;
