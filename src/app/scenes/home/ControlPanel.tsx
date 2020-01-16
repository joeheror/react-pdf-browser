import React, { createRef } from "react"
import IconLogo from "../../assets/images/logo.png"
import DocumentIconSmall from "../../assets/images/document_icon_sm.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import Dropzone from 'react-dropzone'
import { DropzoneRef } from 'react-dropzone'
import { ACCEPT_TYPES, KILO_BYTE, MEGA_BYTE } from "../../constants"
import { addDocument, openDocument } from "./store/actions"
import { DOCUMENT_DATA, NormalizedObjects } from "../../types"
import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { APP_STATE } from "../../reducers"
import { connect } from "react-redux"

const dropzoneRef = createRef<DropzoneRef>()

export interface ControlPanelProps {
  documents: NormalizedObjects<DOCUMENT_DATA>
  openedDocumentId: number
  addDocument: ( document: DOCUMENT_DATA) => void
  openDocument: ( documentId: number) => void
}

class ControlPanel extends React.Component<ControlPanelProps> {

  generateFileSizeString( fileSize: number) {
    if ( fileSize < KILO_BYTE) return fileSize + " bytes"
    if ( fileSize < MEGA_BYTE) return ( fileSize / KILO_BYTE).toFixed( 2) + " kilo bytes"
    return ( fileSize / MEGA_BYTE).toFixed( 2) + " mega bytes"
  }
  
  onClickSelectFiles = () => {
    if ( dropzoneRef.current)
      dropzoneRef.current.open()
  }

  onFilesSelected = (acceptedFiles: File[]) => {
    let { addDocument } = this.props

    acceptedFiles.forEach( file => {
      ACCEPT_TYPES.forEach( (ext, idx) => {
        if ( file.name.endsWith( ext)) {
          let newDocument: DOCUMENT_DATA = { title: file.name.substring( 0, file.name.length - ext.length),
                                             type: idx,
                                             description: this.generateFileSizeString( file.size),
                                             data: '',}
          
          let fileReader = new FileReader()
          fileReader.onloadend = () => {
            newDocument.data = fileReader.result as string
            addDocument( newDocument)
          }

          fileReader.readAsBinaryString( file)
        }
      })
    })
  }

  onClickDocument = (documentId: number) => {
    let { openDocument } = this.props
    openDocument( 0)
    setTimeout(() => {
      openDocument( documentId)
    }, 100)
  }

  public render() {
    let { documents, openedDocumentId } = this.props
    return (
      <div className="control-panel">
        <div className="logo-box">
          <img src={IconLogo} alt="Logo"/>
        </div>
        <p className="list-title">files</p>
        <div className="document-list">
        {
          Object.keys( documents.byId).map(Number).map( docId => (
            <div className={ "document" + ( openedDocumentId === docId ? " active" : "")} key={docId} onClick={ e => this.onClickDocument( docId)}>
              <div className="document-icon">
                <img src={DocumentIconSmall} alt="Small Doc Icon"/>
              </div>
              <div className="document-info">
                <p className="document-title">{documents.byId[docId].title}</p>
                <p className="document-description">{documents.byId[docId].description}</p>
              </div>
            </div>
          ))
        }
        </div>
        <Dropzone 
          ref={dropzoneRef}
          accept={ACCEPT_TYPES.join(',')}
          multiple
          onDrop={this.onFilesSelected}>

          { ( {getRootProps, getInputProps}) => (
            <>
              <input {...getInputProps()} />
              <button className="upload" onClick={ (e) => { this.onClickSelectFiles()}}>
                <FontAwesomeIcon
                  icon={faCloudUploadAlt}
                />
                <span className="upload-title">Upload Files</span>
              </button>
            </>
          )}
        </Dropzone>
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
    addDocument: ( document: DOCUMENT_DATA) => dispatch( addDocument( document)),
    openDocument: ( documentId: number) => dispatch( openDocument( documentId)),
  }
}

export default connect( mapStateToProps, mapDispatchToProps)( ControlPanel)