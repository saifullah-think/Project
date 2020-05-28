import React, { Component } from 'react'
import { Row, Col, Card, Table, Tabs, Tab, InputGroup, FormControl, Modal, Form, FormLabel, Button, Alert } from 'react-bootstrap';
import Aux from "../../hoc/_Aux";
import DEMO from "../../store/constant";
import BaseUrl from '../Api/Api'

export default class ApprovedUsers extends Component {

    state = {
        ViewModal: false,
        mainedit: false,
        count: 1,
        clear: false,
        CategoryData: [],
        Name: '',
        SelectIcon: '',
        SetColor: '',
        iconName: '',
        flag: false,
        selectedindex: '',
        background: '#fff',
        colorpicker: false,
        SubCategory: [],
        updatemodal: false,
        editmodal: false,
        alertshow: false,
        name: '',
        iconname: '',
        icontype: '',
        color: '',
        updatealert: false,
        subaddmodal: false,
        subeditmodal: false,
        categoryId: '',
        SubCategorydata: [],
        item: null,
        SubcategoryId: ''

    }

    componentDidMount() {
        this.getAllCategories();

    }
    handleChangeComplete = (color) => {

        this.setState({ background: color.hex });
    };


    getAllCategories = () => {
        return fetch(`http://localhost:5000/api/getCategories`, {

        })
            .then((response) => response.json())
            .then((Data) => {
                this.setState({ CategoryData: Data.docs })
            }).catch((err) => {
                alert(err.message)
            })

    }

    AddCategory = () => {
        const { Name, SelectIcon, SetColor, iconName } = this.state


        let body = {
            name: Name,
            color: SetColor,
            iconType: iconName,
            iconName: SelectIcon
        }
        if (Name !== '' || SelectIcon !== '' || SetColor !== '') {

            fetch(`${BaseUrl}/api/addCategory`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)

            })
                .then((response) => response.json())
                .then((responseData) => {
                    let data = this.state.CategoryData
                    data.push(responseData.category)

                    this.setState({ alertshow: true, ViewModal: false, CategoryData: data })


                }).catch((err) => {
                    alert(err.message)
                })
        }
        else {
            alert("Please Insert All Field")
        }
    }

    delete(item) {

        let body = {
            id: item._id
        }
        fetch(`${BaseUrl}/api/deleteCategory`, { method: "DELETE", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } })
            .then(res => res.json())
            .then(response => {
                let data = this.state.CategoryData.filter(elem => {
                    return elem._id !== response.data._id;

                })
                this.setState({ CategoryData: data })


            }).catch(err => alert(err))

    }


    renderCategory() {
        const { CategoryData } = this.state;
        return CategoryData.map((item, i) => {
            return (

                <tr key={i}>
                    <td>{item.name}</td>
                    <td>{item.iconName}</td>
                    <td>{item.iconType}</td>
                    <td>{item.color}</td>

                    <td>

                        <a href={DEMO.BLANK_LINK} className="label btn-sm bg-success text-white f-12" onClick={() => this.setState({ SubCategory: item.subCategories, flag: true, categoryId: item._id })}  ><i className="icon feather icon-eye text-white" /> View Sub-Category</a>

                        <a href={DEMO.BLANK_LINK} className="label btn-sm bg-info text-white f-12" onClick={() => this.setState({ editmodal: true, name: item.name, iconname: item.iconName, icontype: item.iconType, color: item.color, categoryId: item._id, item: item })}><i className="icon feather icon-edit text-white" /> Edit</a>

                        <a href={DEMO.BLANK_LINK} className="label btn-sm bg-primary text-white f-12" onClick={() => this.setState({ updatemodal: true, categoryId: item._id })}><i className="icon feather icon-edit text-white" /> Update</a>

                        <a href={DEMO.BLANK_LINK} className="label btn-sm bg-danger text-white f-12" onClick={() => this.delete(item)}><i className="icon feather icon-trash-2 text-white" /> Delete</a>
                    </td>



                </tr>
            )
        })

    }


    renderSubCategory() {
        const { SubCategory } = this.state;
        return SubCategory.map((item, i) => {
            return (

                <tr key={i}>
                    <td>{item.name}</td>
                    <td>{item.iconName}</td>
                    <td>{item.iconType}</td>
                    <td>{item.color}</td>

                    <td>

                        <a href={DEMO.BLANK_LINK} className="label btn-sm bg-info text-white f-12" onClick={() => this.setState({ subeditmodal: true, name: item.name, iconname: item.iconName, icontype: item.iconType, color: item.color, SubcategoryId: item._id, })}     ><i className="icon feather icon-edit text-white" /> Edit</a>

                        <a href={DEMO.BLANK_LINK} className="label btn-sm bg-danger text-white f-12" onClick={() => this.deleteSubCategory(item)}><i className="icon feather icon-trash-2 text-white" /> Delete</a>
                    </td>



                </tr>
            )
        })
    }


    updateCategory = () => {
        const { Name, SelectIcon, iconName, SetColor } = this.state;
        let body = {
            id: this.state.categoryId,
            name: Name,
            color: SetColor,
            iconType: SelectIcon,
            iconName: iconName,
        }
        fetch(`${BaseUrl}/api/updateCat`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)

        })
            .then((response) => response.json())
            .then((updateData) => {
                if (updateData) {
                    this.setState({ updatealert: true, updatemodal: false })
                    this.getAllCategories();
                }


            }).catch((err) => {
                alert(err.message)
            })
    }

    EditCategory = () => {
        const { name, iconname, icontype, color, item } = this.state;
        let body = {
            id: this.state.categoryId,
            name: name,
            color: color,
            iconType: icontype,
            iconName: iconname,
            subCategories: this.state.SubCategorydata

        }


        fetch(`${BaseUrl}/api/updateCat`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)

        })
            .then((response) => response.json())
            .then((editData) => {
                if (editData) {
                    this.setState({ editmodal: false })
                    this.getAllCategories();
                }


            }).catch((err) => {
                alert(err.message)
            })
    }

    AddSubCategory = () => {

        const { Name, SelectIcon, SetColor, iconName } = this.state



        let body = {
            id: this.state.categoryId,
            name: Name,
            color: SetColor,
            iconType: iconName,
            iconName: SelectIcon
        }

        fetch(`${BaseUrl}/api/addSubCategory`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)

        })
            .then((response) => response.json())
            .then((Adddata) => {
                this.setState({ subaddmodal: false })
                this.renderSubCategory();


            }).catch((err) => {
                alert(err.message)
            })


    }


    deleteSubCategory(item) {
        let filtered = this.state.SubCategory.filter(sub => sub._id !== item._id)
        let body = {
            id: this.state.categoryId,
            subCategories: filtered
        }
        fetch(`${BaseUrl}/api/deleteSubCategory`,
            {
                method: "PUT",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" }
            })
            .then(res => res.json())
            .then(response => {
                let data = this.state.SubCategory.filter((elem => {
                    return elem._id != response._id;
                }))
                this.setState({ SubCategory: data })


            }).catch(err => alert(err))

    }

    EditSubCategory = () => {

        const { Name, SelectIcon, iconName, SetColor } = this.state;


        let updatedSub = this.state.SubCategory.map(sub => {
            if (sub._id === this.state.SubcategoryId) {
                let obj = {
                    name: Name,
                    color: SetColor,
                    iconType: SelectIcon,
                    iconName: iconName,
                    _id: this.state.SubcategoryId
                }

                return obj
            }
            else {
                return sub
            }
        })
        let body = {
            id: this.state.categoryId,
            subCategories: updatedSub
        }


        fetch(`${BaseUrl}/api/updateSubCat`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)

        })
            .then((response) => response.json())
            .then((Data) => {
                this.setState({ subeditmodal: false, CategoryData: updatedSub })


            }).catch((err) => {
                alert(err.message)
            })

    }


    render() {
        return (
            <Aux>


                {this.state.alertshow == false ? null : <Alert variant="success" onClose={() => this.setState({ alertshow: false })} dismissible>
                    <Alert.Heading>Successfully Added</Alert.Heading></Alert>}



                {this.state.updatealert == false ? null : <Alert variant="success" onClose={() => this.setState({ updatealert: false })} dismissible>
                    <Alert.Heading>Update Successfully</Alert.Heading></Alert>}

                <Row>

                    <Col md={12} xl={12}>
                        {this.state.flag == false ?
                            <Card className='Recent-Users'>
                                <Card.Header style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Card.Title as='h5'>Category</Card.Title>

                                    <a href={DEMO.BLANK_LINK} style={{ float: 'right' }} className="label btn-sm bg-info text-white f-12" onClick={() => this.setState({ ViewModal: true })}><i className="icon feather icon-plus text-white" /> Add Category</a>

                                </Card.Header>

                                <Card.Body className='px-0 py-2'>
                                    <Table responsive hover>
                                        <thead className="bg-dark text-white">
                                            <tr>
                                                <th>Category</th>
                                                <th>Icon Name</th>
                                                <th>Icon Type</th>
                                                <th>Color</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.renderCategory()}
                                        </tbody>

                                    </Table>
                                </Card.Body>
                            </Card> :
                            <Card className='Recent-Users'>
                                <Card.Header style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <i className="icon feather icon-arrow-left text-black" onClick={() => { console.log("hello") }} style={{ size: 30 }} />
                                    <Card.Title as='h5'>Sub-Category</Card.Title>
                                    <div className="text-right">
                                        <a href={DEMO.BLANK_LINK} className="label btn-sm bg-info text-white f-12" onClick={() => this.setState({ subaddmodal: true })}><i className="icon feather icon-plus text-white" />Add Sub-Category</a>
                                    </div>
                                </Card.Header>

                                <Card.Body className='px-0 py-2'>
                                    <Table responsive hover>
                                        <thead className="bg-dark text-white">
                                            <tr>
                                                <th>Sub-Category</th>
                                                <th>Icon Name</th>
                                                <th>Icon Type</th>
                                                <th>Color</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.renderSubCategory()}
                                        </tbody>

                                    </Table>
                                </Card.Body>
                            </Card>}

                    </Col>



                    {/* Add Sub Category Modal */}
                    <Modal
                        show={this.state.subaddmodal}

                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header className="bg-dark text-white" closeButton onClick={() => { this.setState({ subaddmodal: false }) }}>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Add Sub-Category
          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Name..." onChange={(e) => { this.setState({ Name: e.target.value }) }} />
                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Color</Form.Label>
                                    {!this.state.colorpicker ? <Form.Control type="text" placeholder="Pick Color..." onFocus={() => { this.setState({ colorpicker: true }) }} /> :
                                        <Form.Control type="text" placeholder="Pick Color..." onChange={(e) => { this.setState({ SetColor: e.target.value }) }} />}

                                </Form.Group>

                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Icon Types</Form.Label>
                                    <Form.Control type="text" placeholder="Pick Color..." onChange={(e) => { this.setState({ iconName: e.target.value }) }} />

                                </Form.Group>

                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label> Icon Name</Form.Label>
                                    <Form.Control as="select" onChange={(e) => { this.setState({ SelectIcon: e.target.value }) }}>
                                        <option>Select Icon</option>
                                        <option>Font Awesome</option>
                                        <option>Material</option>
                                        <option>Material Community</option>
                                        <option>Ionics</option>
                                    </Form.Control>
                                </Form.Group>

                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="label bg-success text-white f-12" onClick={this.AddSubCategory}>Add</Button>
                        </Modal.Footer>
                    </Modal>
















                    {/* Add Category Modal */}


                    <Modal
                        show={this.state.ViewModal}

                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header className="bg-dark text-white" closeButton onClick={() => { this.setState({ ViewModal: false }) }}>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Add Category
          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Name..." onChange={(e) => { this.setState({ Name: e.target.value }) }} />
                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Color</Form.Label>
                                    {!this.state.colorpicker ? <Form.Control type="text" placeholder="Pick Color..." onFocus={() => { this.setState({ colorpicker: true }) }} /> :
                                        <Form.Control type="text" placeholder="Pick Color..." onChange={(e) => { this.setState({ SetColor: e.target.value }) }} />}

                                </Form.Group>

                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Icon Types</Form.Label>
                                    <Form.Control type="text" placeholder="Pick Color..." onChange={(e) => { this.setState({ iconName: e.target.value }) }} />

                                </Form.Group>

                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label> Icon Name</Form.Label>
                                    <Form.Control as="select" onChange={(e) => { this.setState({ SelectIcon: e.target.value }) }}>
                                        <option>Select Icon</option>
                                        <option>Font Awesome</option>
                                        <option>Material</option>
                                        <option>Material Community</option>
                                        <option>Ionics</option>
                                    </Form.Control>
                                </Form.Group>

                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="label bg-success text-white f-12" onClick={this.AddCategory}>Add</Button>
                        </Modal.Footer>
                    </Modal>





                    {/* Update Category Modal */}
                    <Modal
                        show={this.state.updatemodal}

                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header className="bg-dark text-white" closeButton onClick={() => { this.setState({ updatemodal: false }) }}>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Update Category
          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Name..." onChange={(e) => { this.setState({ Name: e.target.value }) }} />
                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Color</Form.Label>
                                    {!this.state.colorpicker ? <Form.Control type="text" placeholder="Pick Color..." onFocus={() => { this.setState({ colorpicker: true }) }} /> :
                                        <Form.Control type="text" placeholder="Pick Color..." onChange={(e) => { this.setState({ SetColor: e.target.value }) }} />}

                                </Form.Group>

                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Icon Types</Form.Label>
                                    <Form.Control type="text" placeholder="Pick Color..." onChange={(e) => { this.setState({ iconName: e.target.value }) }} />

                                </Form.Group>

                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label> Icon Name</Form.Label>
                                    <Form.Control as="select" onChange={(e) => { this.setState({ SelectIcon: e.target.value }) }}>
                                        <option>Select Icon</option>
                                        <option>Font Awesome</option>
                                        <option>Material</option>
                                        <option>Material Community</option>
                                        <option>Ionics</option>
                                    </Form.Control>
                                </Form.Group>

                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="label bg-success text-white f-12" onClick={this.updateCategory}>Update</Button>
                        </Modal.Footer>
                    </Modal>






                    {/* /subeditModal */}
                    <Modal
                        show={this.state.subeditmodal}

                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header className="bg-dark text-white" closeButton onClick={() => { this.setState({ subeditmodal: false }) }}>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Edit Sub-Category
          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Name..." value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Color</Form.Label>
                                    <Form.Control type="text" placeholder="Pick Color..." value={this.state.color} onChange={(e) => { this.setState({ color: e.target.value }) }} />
                                </Form.Group>

                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Icon Types</Form.Label>
                                    <Form.Control type="text" placeholder="Pick Color..." value={this.state.icontype} onChange={(e) => { this.setState({ icontype: e.target.value }) }} />

                                </Form.Group>

                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label> Icon Name</Form.Label>
                                    <Form.Control as="select" onChange={(e) => { this.setState({ iconname: e.target.value }) }}>
                                        <option>Select Icon</option>
                                        <option>Font Awesome</option>
                                        <option>Material</option>
                                        <option>Material Community</option>
                                        <option>Ionics</option>
                                    </Form.Control>

                                </Form.Group>

                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button className="label bg-success text-white f-12" onClick={this.EditSubCategory}>Edit Sub-Category</Button>
                        </Modal.Footer>
                    </Modal>










                    {/* Edit Category Modal */}


                    <Modal
                        show={this.state.editmodal}

                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header className="bg-dark text-white" closeButton onClick={() => { this.setState({ editmodal: false }) }}>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Edit Category
          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formGroupEmail">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="Name..." value={this.state.mainedit == false ? this.state.name : this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Color</Form.Label>
                                    <Form.Control type="text" placeholder="Pick Color..." value={this.state.mainedit == false ? this.state.color : this.state.color} onChange={(e) => { this.setState({ color: e.target.value }) }} />
                                </Form.Group>

                                <Form.Group controlId="formGroupPassword">
                                    <Form.Label>Icon Types</Form.Label>
                                    <Form.Control type="text" placeholder="Pick Color..." value={this.state.mainedit == false ? this.state.icontype : this.state.icontype} onChange={(e) => { this.setState({ icontype: e.target.value }) }} />

                                </Form.Group>

                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label> Icon Name</Form.Label>
                                    <Form.Control as="select" value={this.state.mainedit == false ? this.state.iconname : this.state.iconname} onChange={(e) => { this.setState({ iconname: e.target.value }) }}>
                                        <option>Select Icon</option>
                                        <option>Font Awesome</option>
                                        <option>Material</option>
                                        <option>Material Community</option>
                                        <option>Ionics</option>
                                    </Form.Control>
                                </Form.Group>

                            </Form>
                        </Modal.Body>
                        <Modal.Footer>

                            <Button className="label bg-success text-white f-12" onClick={this.EditCategory}>Edit</Button>

                        </Modal.Footer>
                    </Modal>





                </Row>
            </Aux>
        )
    }
}

