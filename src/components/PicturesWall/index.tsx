import * as React from 'react'
import { PureComponent } from 'react'
import { Upload, Icon, Modal } from 'antd'

interface Props {
  setFileList?: (fileList: any[]) => void
  value?: any[]
}

interface State {
  previewVisible: boolean,
  previewImage: string,
  fileList: any[]
}

class PicturesWall extends PureComponent<Props, State> {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  }

  constructor(props: Props) {
    super(props)
    const { value } = this.props
    if (value) this.state.fileList = value.map(file => ({ uid:file.filename,status: 'done', name: file.filename, url: file.url})) as any
  }

  handleCancel = () => this.setState(() => ({ previewVisible: false }))

  handlePreview = (file: any) => {
    this.setState(() => ({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    }))
  }

  handleChange = ({ fileList }: any) => {
    const { setFileList } = this.props
    if (setFileList && typeof setFileList === 'function') setFileList(fileList)
    this.setState(() => ({ fileList: fileList.slice() }))
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action='/upload'
          accept='.png,.jpg,.jpeg,.gif'
          listType="picture-card"
          fileList={fileList}
          name='project_images'
          multiple={true}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="project-images-preview" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall