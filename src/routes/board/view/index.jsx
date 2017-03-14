import React, { Component } from 'react';
import Board from '../../../components/board';

class BoardViewRoute extends Component {
  render() {
    return (
      <div>
        <Board boardId={this.props.router.params.boardId}/>
      </div>
    );
  }
}

export default BoardViewRoute;