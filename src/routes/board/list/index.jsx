import React, { Component } from 'react';
import { get, post } from 'axios';
class BoardListRoute extends Component {
  constructor(props) {
    super(props);
    this.updateBoardList = this.updateBoardList.bind(this)
    this.newBoard = this.newBoard.bind(this)
    this.state={
      boards:[]
    }
  }
  async componentWillMount() {
    await this.updateBoardList()
  }
  async updateBoardList(){
    const boardsRequest = await get('/api/user/boards')
    const boards = boardsRequest.data.boards
    this.setState({boards})
  }
  async newBoard(){
    await post('/api/board',{name:"test board",description:"test board because I'm too lazy to make a form."})
    await this.updateBoardList()
  }
  render() {
    return (
      <div>
        <div><input type="button" onClick={this.newBoard} value={"New Board"}/></div>
        {
          this.state.boards.map( board => {
            return (
              <div key={board._id} onClick={e=>{this.props.router.push(`/board/${board._id}`)}}>
                <p>{board.name}</p>
                <p>{board.description}</p>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default BoardListRoute;