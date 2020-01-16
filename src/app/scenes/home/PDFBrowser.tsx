import React from "react";
import DocumentIconBig from "../../assets/images/document_icon_bg.png"
import { DOCUMENT_DATA, NormalizedObjects } from "../../types";
import { APP_STATE } from "../../reducers";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from 'redux';
import { connect } from "react-redux";
import { PDFReader } from 'react-read-pdf';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft, faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

export interface PDFBrowserProps {
  documents: NormalizedObjects<DOCUMENT_DATA>
  openedDocumentId: number
}

interface PDFBrowserState {
  totalPage: number
  currentPage: number
}

class PDFBrowswer extends React.Component<PDFBrowserProps, PDFBrowserState> {

  constructor( props: PDFBrowserProps) {
    super( props)

    this.state = {
      totalPage: 0,
      currentPage: 1
    }
  }

  componentDidUpdate( prevProps: PDFBrowserProps, prevState: PDFBrowserState) {
    
    if ( this.props.openedDocumentId !== prevProps.openedDocumentId)
      this.setState( { currentPage: 1})
  }

  public onNewPDF = ( numPages: number) => {
    if ( 0 === numPages) return 

    this.setState( { totalPage: numPages})
  }

  public onClickPrev = () => {
    if ( this.state.currentPage > 1)
      this.setState( { currentPage: this.state.currentPage - 1})
  }

  public onClickNext = () => {
    if ( this.state.currentPage < this.state.totalPage)
      this.setState( { currentPage: this.state.currentPage + 1})
  }

  public onChangePage = (e) => {
    let currentPage = parseInt( e.target.value)

    if ( currentPage < 1) currentPage = 1
    else if ( currentPage > this.state.totalPage) currentPage = this.state.totalPage

    this.setState( { currentPage})
  }

  public render() {
    let { openedDocumentId, documents } = this.props
    let { totalPage, currentPage } = this.state

    return ( 0 !== openedDocumentId &&
      <div className='pdf-browser-container'>
        <div className="title-bar">
          <div>
            <img src={DocumentIconBig} alt="Big Document Icon"/>
          </div>
          <p className="title">{documents.byId[openedDocumentId].title}</p>
        </div>
        <div className="pdf-browser">
          <PDFReader
            data={documents.byId[openedDocumentId].data}
            page={currentPage}
            width={634}
            onDocumentComplete={this.onNewPDF}
          />
        </div>
        <div className="pdf-browser-controller">
          <span className="cursor-pointer" onClick={e => this.onClickPrev()}>
            <FontAwesomeIcon
              icon={faAngleDoubleLeft}
            />
            <span className="title-prev">Prev</span>
          </span>
          <span>
            <input
              className="page-select"
              type="number"
              min={1}
              max={totalPage}
              value={currentPage}
              onChange={this.onChangePage}
            />
             / {totalPage}</span>
          <span className="cursor-pointer" onClick={e => this.onClickNext()}>
            <span className="title-next">Next</span>
            <FontAwesomeIcon
              icon={faAngleDoubleRight}
            />
          </span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ( store: APP_STATE) => {
  return {
    documents: store.home.documents,
    openedDocumentId: store.home.openedDocumentId,
  }
}

const mapDispatchToProps = ( dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
  return {
  }
}


export default connect( mapStateToProps, mapDispatchToProps)(PDFBrowswer)