import React from "react";
import ControlPanel from "./ControlPanel";
import PDFBrowswer from "./PDFBrowser";

export default class Home extends React.Component {
  
  public render() {
    return (
      <>
        <ControlPanel />
        <PDFBrowswer/>
      </>
    )
  }
}