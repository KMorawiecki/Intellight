import React from 'react';
import './FloorLogo.css'


class FloorLogo extends React.Component {
    render() {
        return (
            <img className = 'logo' id = {"logo" + this.props.source.toString()}
                 src={this.props.source} alt="floor_icon"
                 onClick={() => this.changeActive()}/>
        )
    }

    changeActive() {
        this.props.onChange(this.props.position);
    }

    changeSize(over) {

        const image = document.getElementById("logo" + this.props.source.toString());

        switch(over){
            case 0:
                image.style.width = '60%';
                break;
            case 1:
                image.style.width = '50%';
                break;
            default:
                break;
        }
    }
}


export default FloorLogo;
