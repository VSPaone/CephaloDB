# **Usage Examples for CephaloDB**

This document provides comprehensive usage examples for CephaloDB, demonstrating how to interact with the database system using both **Axios** (JavaScript/Node.js) and **CURL** commands. It covers CRUD operations, relationships, global state management, fuzzy logic, and real-time synchronization.

## **Table of Contents**

1. [Documents](#1-documents)
    - [Creating a Document](#11-creating-a-document)
    - [Retrieving Documents](#12-retrieving-documents)
    - [Updating a Document](#13-updating-a-document)
    - [Deleting a Document](#14-deleting-a-document)
    - [Sorting and Filtering Documents](#15-sorting-and-filtering-documents)
2. [Node Relationships](#2-node-relationships)
    - [Creating Relationships](#21-creating-relationships)
    - [Deleting Relationships](#22-deleting-relationships)
3. [Global State Management](#3-global-state-management)
4. [Fuzzy Logic Engine](#4-fuzzy-logic-engine)
5. [Real-time Synchronization](#5-real-time-synchronization)

---

## **1. Documents**

### **1.1 Creating a Document**

**Description:** Adds a new document containing nodes.

#### **Axios Example**

```javascript
const axios = require('axios');

const newDocument = {
    title: "Employee Data",
    description: "Contains employee information and relationships",
    nodes: [
        { name: "Alice", role: "Developer" },
        { name: "Bob", role: "Manager" }
    ]
};

axios.post('http://localhost:3000/api/documents', newDocument, {
    headers: { Authorization: 'Bearer <your-token>' }
})
    .then(response => console.log('Document Created:', response.data))
    .catch(error => console.error('Error:', error));
```

#### **CURL Example**

```bash
curl -X POST http://localhost:3000/api/documents \
-H "Authorization: Bearer <your-token>" \
-H "Content-Type: application/json" \
-d '{
    "title": "Employee Data",
    "description": "Contains employee information and relationships",
    "nodes": [
        { "name": "Alice", "role": "Developer" },
        { "name": "Bob", "role": "Manager" }
    ]
}'
```

### **1.2 Retrieving Documents**

**Description:** Retrieves all documents stored in CephaloDB.

#### **Axios Example**

```javascript
axios.get('http://localhost:3000/api/documents', {
    headers: { Authorization: 'Bearer <your-token>' }
})
    .then(response => console.log('Documents:', response.data))
    .catch(error => console.error('Error:', error));
```

#### **CURL Example**

```bash
curl -X GET http://localhost:3000/api/documents \
-H "Authorization: Bearer <your-token>"
```

### **1.3 Updating a Document**

**Description:** Updates an existing document by ID.

#### **Axios Example**

```javascript
const updatedDocument = {
    title: "Updated Employee Data",
    nodes: [{ name: "Alice", role: "Senior Developer" }]
};

axios.put('http://localhost:3000/api/documents/<document-id>', updatedDocument, {
    headers: { Authorization: 'Bearer <your-token>' }
})
    .then(response => console.log('Document Updated:', response.data))
    .catch(error => console.error('Error:', error));
```

#### **CURL Example**

```bash
curl -X PUT http://localhost:3000/api/documents/<document-id> \
-H "Authorization: Bearer <your-token>" \
-H "Content-Type: application/json" \
-d '{
    "title": "Updated Employee Data",
    "nodes": [{ "name": "Alice", "role": "Senior Developer" }]
}'
```

### **1.4 Deleting a Document**

**Description:** Deletes a document based on its ID.

#### **Axios Example**

```javascript
axios.delete('http://localhost:3000/api/documents/<document-id>', {
    headers: { Authorization: 'Bearer <your-token>' }
})
    .then(response => console.log('Document Deleted:', response.data))
    .catch(error => console.error('Error:', error));
```

#### **CURL Example**

```bash
curl -X DELETE http://localhost:3000/api/documents/<document-id> \
-H "Authorization: Bearer <your-token>"
```

### **1.5 Sorting and Filtering Documents**

**Description:** Retrieves documents with sorting and filtering options.

#### **Axios Example**

```javascript
axios.get('http://localhost:3000/api/documents?sort=title:asc&filter=role:Developer', {
    headers: { Authorization: 'Bearer <your-token>' }
})
    .then(response => console.log('Sorted and Filtered Documents:', response.data))
    .catch(error => console.error('Error:', error));
```

#### **CURL Example**

```bash
curl -X GET "http://localhost:3000/api/documents?sort=title:asc&filter=role:Developer" \
-H "Authorization: Bearer <your-token>"
```

---

## **2. Node Relationships**

### **2.1 Creating Relationships**

**Description:** Establishes relationships between nodes based on IDs.

#### **Axios Example**

```javascript
const relationship = {
    sourceNodeId: 'node1_id',
    targetNodeId: 'node2_id',
    relationshipType: 'reportsTo'
};

axios.post('http://localhost:3000/api/relations', relationship, {
    headers: { Authorization: 'Bearer <your-token>' }
})
    .then(response => console.log('Relationship Created:', response.data))
    .catch(error => console.error('Error:', error));
```

#### **CURL Example**

```bash
curl -X POST http://localhost:3000/api/relations \
-H "Authorization: Bearer <your-token>" \
-H "Content-Type: application/json" \
-d '{
    "sourceNodeId": "node1_id",
    "targetNodeId": "node2_id",
    "relationshipType": "reportsTo"
}'
```

### **2.2 Deleting Relationships**

**Description:** Removes a relationship by its ID.

#### **Axios Example**

```javascript
axios.delete('http://localhost:3000/api/relations/<relationship-id>', {
    headers: { Authorization: 'Bearer <your-token>' }
})
    .then(response => console.log('Relationship Deleted:', response.data))
    .catch(error => console.error('Error:', error));
```

#### **CURL Example**

```bash
curl -X DELETE http://localhost:3000/api/relations/<relationship-id> \
-H "Authorization: Bearer <your-token>"
```

---

## **3. Global State Management**

**Description:** Retrieve and update the global state for CephaloDB.

### **3.1 Retrieving Global State**

#### **Axios Example**

```javascript
axios.get('http://localhost:3000/api/state', {
    headers: { Authorization: 'Bearer <your-token>' }
})
    .then(response => console.log('Global State:', response.data))
    .catch(error => console.error('Error:', error));
```

#### **CURL Example**

```bash
curl -X GET http://localhost:3000/api/state \
-H "Authorization: Bearer <your-token>"
```

### **3.2 Updating Global State**

#### **Axios Example**

```javascript
const updatedState = {
    maintenanceMode: true,
    updatedBy: "admin_user"
};

axios.put('http://localhost:3000/api/state', updatedState, {
    headers: { Authorization: 'Bearer <your-token>' }
})
    .then(response => console.log('Global State Updated:', response.data))
    .catch(error => console.error('Error:', error));
```

#### **CURL Example**

```bash
curl -X PUT http://localhost:3000/api/state \
-H "Authorization: Bearer <your-token>" \
-H "Content-Type: application/json" \
-d '{
    "maintenanceMode": true,
    "updatedBy": "admin_user"
}'
```

---

## **4. Fuzzy Logic Engine**

**Description:** Use the fuzzy logic engine to establish dynamic relationships.

### **4.1 Applying Fuzzy Logic to a Document**

#### **Axios Example**

```javascript
axios.post('http://localhost:3000/api/relations/fuzzy', { documentId: '<document-id>' }, {
    headers: { Authorization: 'Bearer <your-token>' }
})
    .then(response => console.log('Fuzzy Logic Applied:', response.data))
    .catch(error => console.error('Error:', error));
```

#### **CURL Example**

```bash
curl -X POST http://localhost:3000/api/relations/fuzzy \
-H "Authorization: Bearer <your-token>" \
-H "Content-Type: application/json" \
-d '{"documentId": "<document-id>"}'
```

---

## **5. Real-time Synchronization**

**Description:** Listen for real-time updates using WebSocket.

### **5.1 Client-side WebSocket Integration**

#### **JavaScript Example**

```javascript
const io = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('Connected to CephaloDB');
});

socket.on('documentUpdate', (data) => {
    console.log('Document Updated:', data);
});
```

### **Conclusion**

This document provides a comprehensive guide to using CephaloDB’s features with both Axios and CURL. For further details or assistance, feel free to reach out or consult the main documentation.