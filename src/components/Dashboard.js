import React, { useState, useEffect } from 'react';
import { Col, Container, Image, Modal, Row, Table, Button, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UserAuth } from '../components/Context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';

export default function Dashboard() {
    const [api, setAPI] = useState([]);
    const baseURL = `https://670c68177e5a228ec1d03b5e.mockapi.io/Lab`;
    const [show, setShow] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedOrchid, setSelectedOrchid] = useState(null);
    const navigate = useNavigate();
    const { user, isAdmin } = UserAuth();
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required").min(2, "Name must be at least 2 characters"),
        rating: Yup.number().required("Rating is required").min(1, "Rating must be at least 1").max(5, "Rating cannot be more than 5"),
        image: Yup.string().url("Image must be a valid URL").required("Image URL is required"),
        color: Yup.string().required("Color is required"),
        category: Yup.string().required("Category is required"),
        origin: Yup.string().required("Origin is required")
    });

    useEffect(() => {
        if (!user || !isAdmin()) {
            navigate('/');
        }
    }, []);

    const handleClose = () => setShow(false);
    const handleShow = () => {
            setIsEditing(false);
            setSelectedOrchid();
            formik.resetForm();
            setShow(true);
    };

    const handleShowEdit = (orchid) => {
            setSelectedOrchid(orchid);
            setIsEditing(true);
            formik.setValues({
                name: orchid.name,
                rating: orchid.rating,
                isSpecial: orchid.isSpecial,
                image: orchid.image,
                color: orchid.color,
                origin: orchid.origin,
                category: orchid.category,
            });
            setShow(true);
    }

    const categories = [
        { id: 'Dendrobium', name: 'Dendrobium' },
        { id: 'Cattleya', name: 'Cattleya' },
        { id: 'Cymbidium', name: 'Cymbidium' },
        { id: 'Catasetum', name: 'Catasetum' },
        { id: 'Miniature', name: 'Miniature' },
    ];

    const fetchAPI = () => {
        fetch(baseURL)
            .then(resp => resp.json())
            .then(data => setAPI(data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchAPI();
    }, []);

    const handleDelete = (id) => {
            fetch(`${baseURL}/${id}`, { method: 'DELETE' })
                .then(() => {
                    fetchAPI();
                    toast.success('Delete successfully!');
                });
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            rating: '',
            isSpecial: false,
            image: '',
            color: '',
            origin: '',
            category: '',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            console.log("Values to be submitted:", values);
            const method = isEditing ? 'PUT' : 'POST';
            const url = isEditing ? `${baseURL}/${selectedOrchid.id}` : baseURL;

            fetch(url, {
                method,
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(() => {
                    fetchAPI();
                    handleClose();
                    toast.success(isEditing ? 'Update successfully' : 'Create successfully');
                })

        },
    });

    return (
        <Container>
            <Row className='py-5'>
                <ToastContainer />
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{isEditing ? 'Edit Orchid' : 'Add Orchid'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Group className="mb-3" controlId="formOrchidName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Orchid name"
                                    name='name'
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    isInvalid={!!formik.errors.name}
                                />
                                <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formRating">
                                <Form.Label>Rating</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Rating"
                                    name='rating'
                                    value={formik.values.rating}
                                    onChange={formik.handleChange}
                                    isInvalid={!!formik.errors.rating}
                                />
                                <Form.Control.Feedback type="invalid">{formik.errors.rating}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formImage">
                                <Form.Label>Image</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Image URL"
                                    name='image'
                                    value={formik.values.image}
                                    onChange={formik.handleChange}
                                    isInvalid={!!formik.errors.image}
                                />
                            </Form.Group>
                            <Form.Control.Feedback type="invalid">{formik.errors.image}</Form.Control.Feedback>
                            <Form.Group className="mb-3" controlId="formColor">
                                <Form.Label>Color</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Color"
                                    name='color'
                                    value={formik.values.color}
                                    onChange={formik.handleChange}
                                    isInvalid={!!formik.errors.color}
                                />
                                <Form.Control.Feedback type="invalid">{formik.errors.color}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formOrigin">
                                <Form.Label>Origin</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Origin"
                                    name='origin'
                                    value={formik.values.origin}
                                    onChange={formik.handleChange}
                                    isInvalid={!!formik.errors.origin}
                                />
                                <Form.Control.Feedback type="invalid">{formik.errors.origin}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label="Special"
                                    name='isSpecial'
                                    checked={formik.values.isSpecial}
                                    onChange={formik.handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Select aria-label="Default select example" name='category'
                                    value={formik.values.category}
                                    onChange={formik.handleChange}
                                    isInvalid={!!formik.errors.category}
                                >
                                    {categories.map((c) => (
                                        <option value={c.id} key={c.id}>{c.name}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">{formik.errors.category}</Form.Control.Feedback>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type='submit' onClick={formik.handleSubmit}>
                            {isEditing ? 'Save change' : 'Create'}
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Col>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Rating</th>
                                <th>Special</th>
                                <th>Color</th>
                                <th>Category</th>
                                <th>Origin</th>
                                <th>Actions | <i onClick={handleShow} className="bi bi-plus-circle-fill"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            {api.map((a) => (
                                <tr key={a.id} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    <td><Image src={a.image} thumbnail style={{ width: 50 }} /></td>
                                    <td style={{ textAlign: "center" }}>{a.name}</td>
                                    <td>{a.rating}</td>
                                    <td>{a.isSpecial ? <i className="bi bi-check-lg"></i> : <i className="bi bi-x-lg"></i>}</td>
                                    <td>{a.color}</td>
                                    <td>{a.category}</td>
                                    <td>{a.origin}</td>
                                    <td>
                                        <i className="bi bi-pencil-square" onClick={() => handleShowEdit(a)}></i> |
                                        <i className="bi bi-trash" onClick={() => handleDelete(a.id)}></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}
