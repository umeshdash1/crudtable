// import '../public/sort.png'
import React, { useState } from 'react';
import { Table as BootstrapTable, Button, Modal, Form } from 'react-bootstrap';
import './sort.css';

const Data = [
  { id: 1, name: 'John', age: 25, email: 'john@example.com' },
  { id: 3, name: 'Umesh', age: 27, email: 'umesh@example.com' },
  {id:4, name: 'Sonu', age:32, email:'sonu@outlook.com'},
  { id: 12, name: 'Bandan', age: 40, email: 'bandan@example.com' },
  { id: 8, name: 'Naniu', age: 28, email: 'naiu@example.com' },
  { id: 9, name: 'Khitish', age: 33, email: 'khitis@example.com' },
  { id: 7, name: 'Patna', age: 31, email: 'patna@example.com' },
  { id: 6, name: 'Gopi', age: 28, email: 'gopi@example.com' }
  // Add more sample data as needed
];



const Table = () => {
    const [data, setData] = useState(Data);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newRecord, setNewRecord] = useState({});
    const [editingRecord, setEditingRecord] = useState(null);
  
    const handleSearch = (query) => {
      // Update the data variable with the filtered results
      const filteredData = Data.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(query.toLowerCase())
        )
      );
      setData(filteredData);
    };
  
    const handleSort = (columnName) => {
      // Implement sorting 
      // Update the data variable with the sorted results
      const sortedData = [...data].sort((a, b) => {
        if (a[columnName] < b[columnName]) return -1;
        if (a[columnName] > b[columnName]) return 1;
        return 0;
      });
      setData(sortedData);
    };
  
    const handleEdit = (id) => {
      // Implement edit logic (open a modal or popup for editing)
      const recordToEdit = data.find((item) => item.id === id);
      setEditingRecord(recordToEdit);
      setShowAddModal(true);
    };
  
    const handleDelete = (id) => {
      // Implement delete logic (prompt for confirmation and delete the record)
      if (window.confirm('Are you sure you want to delete this record?')) {
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
      }
    };
  
    const handleAdd = () => {
      // Implement add logic (open the add modal)
      setNewRecord({});
      setEditingRecord(null);
      setShowAddModal(true);
    };
  
    const handleSave = () => {
      // Implement save logic (add the new record to the table)
      if (editingRecord) {
        // Editing existing record
        const updatedData = data.map((item) =>
          item.id === editingRecord.id ? { ...item, ...newRecord } : item
        );
        setData(updatedData);
      } else {
        // Adding new record
        const updatedData = [...data, { id: data.length + 1, ...newRecord }];
        setData(updatedData);
      }
  
      // Close the modal
      setShowAddModal(false);
    };

  return (
    <div>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => handleSearch(e.target.value)}
      /><br/>

      {/* Add Button */}
      <Button variant="success" onClick={handleAdd}>
        Add
      </Button>

      {/* Table */}
      <BootstrapTable striped bordered hover responsive>
        {/* Table Headers */}
        <thead>
          <tr>
            <th className='sortable' onClick={() => handleSort('id')}>ID</th>
            <th className='sortable' onClick={() => handleSort('name')}>Name</th>
            <th className='sortable' onClick={() => handleSort('age')}>Age</th>
            <th className='sortable' onClick={() => handleSort('email')}>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.email}</td>
              <td>
                <Button variant="info" onClick={() => handleEdit(item.id)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </BootstrapTable>

      {/* Add Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Add input fields for each column */}
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
              />
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter age"
                onChange={(e) => setNewRecord({ ...newRecord, age: e.target.value })}
              />
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                onChange={(e) => setNewRecord({ ...newRecord, email: e.target.value })}
              />
            </Form.Group>

            {/* Add more input fields for other columns */}

            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Table;
