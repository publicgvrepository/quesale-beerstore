import React, { Component } from 'react'
import { connect } from 'react-redux'

import { borrarMarkers } from '../../actions/markersActions.js'
import { setUrl, abreMenuSidebar } from '../../actions/menuActions.js'



@connect((store) => {
    return {
        browser: store.browser,
        menu: store.menu,
        openMenu: store.menu.menu_sidebar,
    }
})
export default class LeftMenu404 extends Component {

  componentWillMount(){
    this.props.dispatch(setUrl(this.props.route.path))
  }

  componentDidMount(){
    this.props.dispatch(borrarMarkers());
    this.props.dispatch(abreMenuSidebar());    
  }
  
  render (){
    return(
      <div>
          <div class="tab-pane clearfix active">
            <div class="row">
              <h4 class="text-center font-weight-bold h4-blanco"><b>404</b> Page not found</h4>
            </div>
            <div class="row row-menu">
              <div class="col-md-12">
                  <img style={{width:"300px", height: "400px" }} src={"/dist/img/generic/gifs/no_events_confused_travolta.gif"} ></img>
              </div>
            </div>
          </div>
      </div>
    );
  }
}
