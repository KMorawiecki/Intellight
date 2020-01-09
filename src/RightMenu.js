import React from 'react';
import FloorLogo from './FloorLogo.js'
import full_floor_1 from './Assets/1full_floor.svg'
import full_floor_2 from './Assets/2full_floor.svg'
import full_floor_3 from './Assets/3full_floor.svg'
import './RightMenu.css';
import MutationObserver from "react-mutation-observer";


class RightMenu extends React.Component {

    constructor(props){
        super(props);
    }

    changeThisFloor = () => {
        this.props.changeCurrentFloor()
    }

    renderLogo(position, source) {
        return <FloorLogo position={position}
                          source={source}
                          currentFloor={this.props.currentFloor}/>;
    }

    render() {
        return (
            <MutationObserver onAttributeChange={this.changeThisFloor.bind(null)}>
              <div className="menu" id="1">
                  <div className="logo-instance" id="1"> {this.renderLogo(1, full_floor_1)} </div>
                  <div className="logo-instance" id="2"> {this.renderLogo(2, full_floor_2)} </div>
                  <div className="logo-instance" id="3"> {this.renderLogo(3, full_floor_3)} </div>
              </div>
            </MutationObserver>
        );
    }
}

export default RightMenu;