import React, { Component } from "react"
import './App.css';
import $ from "jquery";
class home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          apiResponse: [],
          header: [],
          rows:[] 
       };

    }
  BindTableHeader(jsondata, tableid) {/*Function used to get all column names from JSON and bind the html table header*/
      var columnSet = [];
      //debugger
      var headerTr$ = $('<tr/>');
      for (var i = 0; i < jsondata.length; i++) {
          var rowHash = jsondata[i];
          for (var key in rowHash) {
              if (rowHash.hasOwnProperty(key)) {
                  if ($.inArray(key, columnSet) === -1) {/*Adding each unique column names to a variable array*/
                      columnSet.push(key);
                      headerTr$.append($('<th/>').html(key));
                  }
              }
          }
      }
      $(tableid).append(headerTr$);
      return columnSet;
  };
 BindTable(jsondata, tableid) {/*Function used to convert the JSON array to Html Table*/
      var columns = this.BindTableHeader(jsondata, tableid); /*Gets all the column headings of Excel*/
      console.log(columns);
      for (var i = 0; i < jsondata.length; i++) {
          var row$ = $('<tr/>');
          for (var colIndex = 0; colIndex < columns.length; colIndex++) {
             
              var cellValue = jsondata[i][columns[colIndex]];
              if(colIndex === 7)
              {
                cellValue = cellValue.toFixed(2);
                cellValue = Number(cellValue)
              }
              if (cellValue == null)
                  cellValue = "";
              row$.append($('<td/>').html(cellValue));
          }
          $(tableid).append(row$);
      }
  };

    callAPI() {
        fetch("http://localhost:9000/testAPI")
        .then((res) => res.text())
        .then((data) => {
          //console.log('data:', data);
          let datas = JSON.parse(data);
          console.log(typeof datas)
          this.setState({ apiResponse: datas }) 
          if (data.length > 0) {
            console.log(typeof this.state.apiResponse);
            this.BindTable(this.state.apiResponse, '#exceltable');
    }
        })
            .catch(err => err);
            
      

      //document.getElementById("comment").innerHTML = comment;
      
     
    }
  
    componentWillMount() {
        this.callAPI();
        //$('#exceltable').show();
    }
    
    render(){
    return (
      
      <div className="App">
        
        <p id= "comment"> </p>
        <table id ="exceltable"> </table>
      
    
      </div>
    );
  }
  }
export default home;
