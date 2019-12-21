import React from 'react';
import FloorLogo from './FloorLogo.js'
import full_floor_1 from './Assets/1full_floor.svg'
import full_floor_2 from './Assets/2full_floor.svg'
import full_floor_3 from './Assets/3full_floor.svg'
import './RightMenu.css';


class RightMenu extends React.Component {
    renderLogo(position, source) {
        return <FloorLogo position={position}
                          source={source}
                          currentFloor={this.props.currentFloor}
                          onChange={this.props.onChange}/>;
    }

    render() {
        return (
          <div className="menu">
              <div className="logo-instance"> {this.renderLogo(1, full_floor_1)} </div>
              <div className="logo-instance"> {this.renderLogo(2, full_floor_2)} </div>
              <div className="logo-instance"> {this.renderLogo(3, full_floor_3)} </div>
          </div>
        );
    }
}

export default RightMenu;