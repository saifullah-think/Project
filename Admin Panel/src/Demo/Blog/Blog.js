import React, { Component } from 'react'
import { Row, Col, Card, Table, Tabs, Tab, InputGroup, FormControl, Modal, Form, Button } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import {firebase} from '../../Config/Firebase'
import {connect} from 'react-redux'
import {Input,message, Upload} from 'antd'


 class Blog extends Component {

    state = {
        
        ViewModal: false,
        Imageurl:'',
        count: 1,
        BlogData: [],
        CategoryData:[],
        Title: '',
        Image: [],
        Description: '',
        Date: '',
        CategoryModal: false,
        CatName: '',
        startDate: new Date(),
        imageName:'No Image Selected',
        titleFile:null,
        editorState:EditorState.createEmpty(),
        uploadImages: [],
        blogInput:'',
        SelectedCategoryId:'Select Category...',
    }



    componentDidMount() {
        this.FetchBlogs();
    }



    FetchBlogs = () => {
        return fetch(`${this.props.BaseUrl}/readblogs`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        })
            .then((response) => response.json())
            .then((responseData) => {
                for (var key in responseData) {
                   
                    
                }

                this.setState({ BlogData: responseData[key].Blog,CategoryData:responseData})
                
            }).catch((err) => {
                alert(err.message)
            })


    }

    delete(item) {
        let body = {
            blogId: item._id

        }

        fetch(`${this.props.BaseUrl}/api/deleteBlog`,
            {
                method: "DELETE",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" }
            })
            .then(res => res.json())
            .then(response => {
                // let data = this.state.BlogData.filter((list => {
                //     return list._id !== response.data._id
                // }))
            
                // this.setState({
                //     ListingData: data
                // })
            }).catch(err => alert(err))



    }

    
    handleSelectCategory=(Id)=>{
        this.setState({SelectedCategoryId:Id})
    }
    renderBlogs() {
        const { BlogData } = this.state;
        return BlogData.map((item, i) => {
            return (

                <tr key={i}>
                    {/* <img src={item.Image} style={{ width: 50, height: 50, borderRadius: 25 }} />
                    <td >{item.Title}</td>
                    <td >{item.createdAt}</td>
                    <td>{item.date}</td>
                    <td>{item.updatedAt}</td> */}

                    <td>

                        <a href={DEMO.BLANK_LINK} className="label btn-sm bg-info text-white f-12" ><i className="icon feather icon-edit text-white" /> Edit</a>
                        <a href={DEMO.BLANK_LINK} className="label btn-sm bg-danger text-white f-12" onClick={() => this.delete(item)}><i className="icon feather icon-trash-2 text-white" /> Delete</a>
                    </td>

                </tr>

            )
        })
    }

    AddCategory = () => {
        let body =
        {
            Category: this.state.CatName
        }
        if (this.state.CatName !== '') {

            fetch(`${this.props.BaseUrl}/addblogcategory`,
                {
                    method: "POST",
                    body: JSON.stringify(body),
                    headers: { "Content-Type": "application/json" }
                })
                .then(res => res.json())
                .then(response => {
                    // this.setState({ CategoryModal: false,CategoryData: })

                }).catch(err => alert(err))
        }
        else {
            alert("Please Fill out")
        }

    }

    AddBlog = () => {
        const { blogInput,titleFile, } = this.state;
    
        if(this.state.SelectedCategoryId !== 'Select Category...' && this.state.blogInput.trim() !== '' &&  this.state.titleFile !== null)
        {
            var storageRef = firebase.storage().ref();
            var mountainImagesRef = storageRef.child(`BlogImages/${this.state.titleFile.name}`);
    
            mountainImagesRef.put(this.state.titleFile).then(()=> {
                mountainImagesRef.getDownloadURL().then((url)=>{
                    this.setState({Imageurl:url})
                    
                })
            })       

          
        }
        
        
        else
        {
            message.error("please fill all boxes..")
        }
        
        var blog={
            Id:this.state.SelectedCategoryId,
            Title:this.state.blogInput,
            Image:this.state.Imageurl,
            description:draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
            comments:[]
        }
      
        fetch(`${this.props.BaseUrl}/addnewblog`,
            {
                method: "PUT",
                body: JSON.stringify(blog),
                headers: { "Content-Type": "application/json" }
            })
            .then(res => res.json())
            .then(response => {
             
                this.setState({ Blogmodal: false })

            }).catch(err => alert(err))


       
    }

   
    addNewCategory=()=>{
        if(this.state.Category.trim() !== '')
        {
            this.props.addNewCategory({Category:this.state.Category});
            this.setState({Category:''})
        }
        else
        {
            message.error("Please Write Category")
        }
    }












    render() {
        return (
            <Aux>

                <Row>
                    <Col style={{ backgroundColor: 'white', padding: '20px 20px 5px 20px', margin: '10px 20px 30px 20px', boxShadow: '1px 1px 10px 2px #eeeeee' }} md={6} xl={6}>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend className="bg-primary">
                                <InputGroup.Text id="basic-addon1"><i className="icon feather icon-search text-white" /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl placeholder="Search here" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => this.SearchList(e)} />
                        </InputGroup>
                    </Col>
                    <Col md={12} xl={12}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Blogs</Card.Title>
                             
                                    <a href={DEMO.BLANK_LINK} style={{float:'right'}} className="label btn-sm bg-secondary text-white f-12" onClick={() => this.setState({ CategoryModal: true })}><i className="icon feather icon-plus text-white" /> Add Blog-Category</a>
                                    <a href={DEMO.BLANK_LINK} style={{float:'right'}} className="label btn-sm bg-secondary text-white f-12" onClick={() => this.setState({ Blogmodal: true })}><i className="icon feather icon-plus text-white" /> Add New Blog</a>

                            
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <thead className="bg-dark text-white">
                                        <tr>
                                            <th>Images</th>
                                            <th>Title</th>
                                            <th>createdAt</th>
                                            <th>Date</th>
                                            <th>Update At</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.renderBlogs()}


                                    </tbody>
                                    {/* <a href={DEMO.BLANK_LINK} style={{float:'right'}} className="label btn-sm bg-primary text-white f-12 " onClick={() => this.setState({count:this.state.count+1})}><i className="icon feather 2 text-white" /> Next</a> */}




                                </Table>
                            </Card.Body>
                        </Card>

                    </Col>




                    <Modal
                        show={this.state.CategoryModal}

                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header className="bg-dark text-white" closeButton onClick={() => { this.setState({ CategoryModal: false }) }}>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Add Blog Category
          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Category Name</Form.Label>
                                    <Form.Control type="text" placeholder="Name..." onChange={(e) => { this.setState({ CatName: e.target.value }) }} />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="label bg-success text-white f-12" onClick={this.AddCategory}>Add</Button>
                        </Modal.Footer>
                    </Modal>


                    {/* Blogmodal */}

                    <Modal
                        show={this.state.Blogmodal}

                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header className="bg-dark text-white" closeButton onClick={() => { this.setState({ Blogmodal: false }) }}>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Add New  Blog
          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>


                        <div className="post-blog-container">
                {/* <Navbar /> */}
                <div className="post-blog-body-container">
                    {/* <ProfileSidebar /> */}
                    <div className="post-blog-body">
                        <div style={{display:'flex',alignItems:'center'}}>
                        <Form.Label>Category</Form.Label>
                        <br/>
                                    <Form.Control as="select" onChange={(e) => {this.setState({SelectedCategoryId:e.target.value}) }}>
                                     { this.state.CategoryData.length && this.state.CategoryData.map((item,i)=>{
                                       return  <option value={item._id} >{item.Category}</option>

                                
                                     })}
    
                                    </Form.Control>

                        </div>
                    
                        <Input style={{marginBottom:20}} value={this.state.blogInput} onChange={(e)=>this.setState({blogInput:e.target.value})} placeholder="Blog Title..." size="large" /> 
                        <div style={{display:'flex',alignItems:'center'}}>
                            <Upload showUploadList={false} onChange={this.handleAddImage}>
                                <Button style={{backgroundColor:'#8b0000',color:'white'}}>
                                    Select Title Image
                                </Button>
                            </Upload>

                            <p style={{margin:0,marginLeft:10}}>{this.state.imageName}</p> 
                        </div>
                        <div style={{overflowY:'auto',height:500,border:'solid 1px #eeeeee',padding:5,marginTop:20}}>
                            <Editor                               
                                toolbar={{
                                    image: {
                                    uploadCallback:this.uploadImageCallBack,
                                    previewImage: true,
                                    alt: { present: true, mandatory: false },
                                    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                                    },
                                    blockType: {
                                        inDropdown: true,
                                        options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
                                    },
                                    textAlign: {
                                        visible: true,
                                        left: { visible: true },
                                        center: { visible: true },
                                        right: { visible: true },
                                        justify: { visible: true }
                                      },
                                    inline: {
                                        options: ['bold', 'italic','underline'],
                                    },
                                    list: {
                                        visible: true,
                                        unordered: { visible: true },
                                        ordered: { visible: true },
                                        indent: { visible: true },
                                        outdent: { visible: true }
                                      },
                                    fontSize: {
                                        className: 'bordered-option-classname',
                                    },
                                    fontFamily: {
                                        className: 'bordered-option-classname',
                                    },
                                    options: ['blockType','fontSize', 'fontFamily', 'inline', 'list','textAlign','image'],
                                }}
                                onEditorStateChange={this.onEditorStateChange}
                            />
                        </div>
                        <Button size="large" style={{width:'150px',backgroundColor:'#8b0000',color:'white',marginTop:'20px'}} onClick={this.AddBlog}>Post Blog</Button>

                    </div>
                </div>
            </div>



                              </Modal.Body>
                      
                    </Modal>













                </Row>
            </Aux>
        )
    }
}

const mapStateToProps = (state) =>
{
   
  return {

 BaseUrl:state.Baseurl,

    
  }
  

}


export default connect(mapStateToProps,null)(Blog);
