import React,{useState,useEffect, Fragment} from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "bootstrap/dist/css/bootstrap.css"
import axios from "axios";

const CRUD=()=>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const[Title, setTitle]=useState("")
    const[Author, setAuthor]=useState("")
    const[Year, setYear]=useState("")
    const[Description, setDescription]=useState("")
    const[InStock, setInStock]=useState("")

    const[editTitle, setEditTitle]=useState("")
    const[editAuthor, setEditAuthor]=useState("")
    const[editYear, setEditYear]=useState("")
    const[editDescription, setEditDescription]=useState("")
    const[editInStock, setEditInStock]=useState("")
    const[editId, setEditId]=useState("")

    const[detailTitle, setDetailsTitle]=useState("")
    const[detailAuthor, setDetailsAuthor]=useState("")
    const[detailYear, setDetailsYear]=useState("")
    const[detailDescription, setDetailsDescription]=useState("")
    const[detailInStock, setDetailsInStock]=useState("")
    const[detailId, setDetailsId]=useState("")

    const bookData=[{
        Id:1,
        Title:"Emil",
        Author:"J R R Tolkien",
        Year:1997,
        Description:"A Tall tale",
        InStock:5
    }]

    const[data,setData]=useState([]);

    useEffect(()=>{
        getData()
    },[])

    const getData=()=>{
        axios.get("https://localhost:7009/api/books")
        .then((result)=>{
            setData(result.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const handleEdit=(id)=>{
        handleShow();
        axios.get(`https://localhost:7009/api/books/${id}`)
        .then((result)=>{
            setEditTitle(result.data.title)
            setEditAuthor(result.data.author)
            setEditYear(result.data.year)
            setEditDescription(result.data.description)
            setEditInStock(result.data.inStock)
            setEditId(id)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const handleDelete=(id)=>{
        if(window.confirm("Delete Book?")==true)
        {
            axios.delete(`https://localhost:7009/api/books/${id}`)
            .then((result)=>{
                if(result.status===200){
                    getData();
                }
            })
            .catch((error)=>{
                console.log("A error with deleting book")
            })
        }
    }

    const handleUpdate=()=>{
        const url=`https://localhost:7009/api/books/${editId}`
        const data={
            "title": editTitle,
            "author": editAuthor,
            "year": editYear,
            "description": editDescription,
            "inStock": editInStock
        }
        axios.put(url,data)
        .then((result)=>{
            handleClose();
            getData();
            clear();
        })
        .catch((error)=>{
            console.log("A error with updating book")
        })
    }

    const handleAdd=()=>{
        const url="https://localhost:7009/api/book";
        const data={
            "title": Title,
            "author": Author,
            "year": Year,
            "description": Description,
            "inStock": InStock
        }
        axios.post(url,data)
        .then((result)=>{
            getData();
            clear();
        })
        .catch((error)=>{
            console.log("A error with adding book")
        })
    }

    const handleDetails=(id)=>{
        handleShow2();
        axios.get(`https://localhost:7009/api/books/${id}`)
        .then((result)=>{
            setDetailsTitle(result.data.title)
            setDetailsAuthor(result.data.author)
            setDetailsYear(result.data.year)
            setDetailsDescription(result.data.description)
            setDetailsInStock(result.data.inStock)
            setDetailsId(id)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const clear = () =>{
        setTitle("");
        setAuthor("");
        setYear("");
        setDescription("");
        setInStock("")
        setEditTitle("");
        setEditAuthor("");
        setEditYear("");
        setEditDescription("");
        setEditInStock("")
        setDetailsTitle("")
        setDetailsAuthor("")
        setDetailsYear("")
        setDetailsDescription("")
        setDetailsInStock("")
        setDetailsId("")
    }

    return(
        <Fragment>
            <Container>
                <Row>
                    <Col>
                        <input type="text" className="form-control" placeholder="Enter Title" value={Title} onChange={(x)=> setTitle(x.target.value)}/>
                    </Col>
                    <Col>
                        <input type="text" className="form-control" placeholder="Enter Author" value={Author} onChange={(x)=> setAuthor(x.target.value)}/>
                    </Col>
                    <Col>
                        <input type="number" className="form-control" placeholder="Enter Year" value={Year} onChange={(x)=> setYear(x.target.value)}/>
                    </Col>
                    <Col>
                        <input type="text" className="form-control" placeholder="Enter Description" value={Description} onChange={(x)=> setDescription(x.target.value)}/>
                    </Col>
                    <Col>
                        <input type="number" className="form-control" placeholder="Enter InStock" value={InStock} onChange={(x)=> setInStock(x.target.value)}/>
                    </Col>
                    <Col>
                        <button className="btn btn-primary" onClick={()=>handleAdd()}>Submit</button>
                    </Col>
                </Row>
            </Container>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Year</th>
                        <th>Description</th>
                        <th>InStock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length>0 ? data.map((item, index)=>{
                            return(
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.author}</td>
                                    <td>{item.year}</td>
                                    <td>{item.description}</td>
                                    <td>{item.inStock}</td>
                                    <td colSpan={2}>
                                        <button className="btn btn-warning" onClick={()=>handleDetails(item.id)}>Details</button>
                                        <button className="btn btn-primary" onClick={()=>handleEdit(item.id)}>Edit</button>
                                        <button className="btn btn-danger" onClick={()=>handleDelete(item.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                        :
                        "Loading..."
                    }
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <input type="text" className="form-control" placeholder="Title" value={editTitle} onChange={(x)=>setEditTitle(x.target.value)}/>
                        </Col>
                        <Col>
                            <input type="text" className="form-control" placeholder="Author" value={editAuthor} onChange={(x)=>setEditAuthor(x.target.value)}/>
                        </Col>
                        <Col>
                            <input type="text" className="form-control" placeholder="Year" value={editYear} onChange={(x)=>setEditYear(x.target.value)}/>
                        </Col>
                        <Col>
                            <input type="text" className="form-control" placeholder="Description" value={editDescription} onChange={(x)=>setEditDescription(x.target.value)}/>
                        </Col>
                        <Col>
                            <input type="text" className="form-control" placeholder="InStock" value={editInStock} onChange={(x)=>setEditInStock(x.target.value)}/>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpdate}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>Details Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <td className="text-justify"><span className="fs-5">ID: </span>{detailId}</td>
                        <td className="text-justify"><span className="fs-5">Title: </span>{detailTitle}</td>
                        <td className="text-justify"><span className="fs-5">AUTHOR: </span>{detailAuthor}</td>
                        <td className="text-justify"><span className="fs-5">YEAR: </span>{detailYear}</td>
                        <td className="text-justify"><span className="fs-5">DESCRIPTION: </span>{detailDescription}</td>
                        <td className="text-justify"><span className="fs-5">INSTOCK: </span>{detailInStock}</td>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose2}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default CRUD;