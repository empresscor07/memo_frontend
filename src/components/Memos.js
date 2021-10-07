import {Button, Row, Col, Card, Placeholder, Modal, Form, Badge} from 'react-bootstrap'
import {useState} from "react";

function Memos({handleLogoutRequest, handleCreateMemo, handleDeleteMemo, memos}) {

    const [show, setShow] = useState(false);
    const [content, setContent] = useState('');
    const [memoTags, setTags] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleSubmit(event) {
        event.preventDefault();
        console.log({content, memoTags});
        const tags = memoTags.split(',');
        handleCreateMemo({content, tags});
        handleClose();
    }

    function handleTextChange(event) {
        setContent(event.target.value)
    }

    function handleTagChange(event) {
        setTags(event.target.value)
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Memo</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your memo's text" onChange={handleTextChange} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Tags</Form.Label>
                            <Form.Control type="text" placeholder="Tag1, Tag2" onChange={handleTagChange}/>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

        <Row className='mt-3'>
            <Col><h1>Welcome!</h1></Col>
            <Col xs='auto'><Button onClick={handleShow}>New</Button></Col>
            <Col xs='auto'>
                <Button variant='outline-primary' onClick={handleLogoutRequest}>Logout</Button>
            </Col>
        </Row>
        <Row>
            {
                memos.map(memo => {
                    return (
                        <Card style={{ width: '18rem' }}>
                            <Card.Header>
                                <Button variant="danger" onClick={() => handleDeleteMemo(memo)}>Delete</Button>
                            </Card.Header>
                            <Card.Body>
                                <Card.Subtitle>
                                    {memo.created_timestamp}
                                </Card.Subtitle>
                                {memo.content}
                            </Card.Body>
                            <Card.Footer>
                                {memo.tags ? memo.tags.map(tag => {
                                    return (<Badge>{tag}</Badge>)}) :
                                    console.log('No tags')}
                            </Card.Footer>
                        </Card>
                    )
                })
            }
        </Row>
        </>
    );
}

export default Memos;