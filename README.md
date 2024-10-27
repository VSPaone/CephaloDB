# **CephaloDB Documentation**

## **Introduction**

CephaloDB is an intelligent, real-time, document-based database system inspired by the adaptability and intelligence of the octopus (cephalopod). It dynamically manages and builds complex relationships using fuzzy logic, automation, and role-based access control (RBAC). Designed with enterprise-level security, CephaloDB leverages AES-256 encryption to offer military-grade protection for data without compromising performance. 

Built using **Node.js**, **Socket.IO**, and **Docker**, CephaloDB is highly flexible, adaptive, and scalable, making it the perfect choice for modern applications that require interconnected, secure, and real-time data management.

---

## **Table of Contents**

1. [Features](#features)
2. [Getting Started](#getting-started)
3. [Installation](#installation)
4. [Core Concepts](#core-concepts)
    - [Document Storage](#document-storage)
    - [Node Relationships](#node-relationships)
    - [Global State Management](#global-state-management)
    - [Security & Encryption](#security--encryption)
    - [Role-Based Access Control (RBAC)](#role-based-access-control-rbac)
    - [Real-time Synchronization](#real-time-synchronization)
    - [Fuzzy Logic Engine](#fuzzy-logic-engine)
5. [API Reference](#api-reference)
    - [Document APIs](#document-apis)
    - [Relationship APIs](#relationship-apis)
    - [State APIs](#state-apis)
6. [Comprehensive Usage Examples](#comprehensive-usage-examples)
7. [Contributing](#contributing)
8. [License](#license)

---

## **Features**

CephaloDB provides a range of features designed for real-time, adaptive, and secure data management:

1. **Document-based Storage**: Store and manage documents using a flexible schema. Documents are the core data units, enabling easy storage, retrieval, sorting, and filtering.
2. **Dynamic Node Relationships**: Automatically establish and manage relationships between nodes using fuzzy logic, enhancing data interconnectivity.
3. **Global State Management**: Maintain a synchronized global state, dynamically updated based on node changes, user actions, and events.
4. **Military-grade Encryption**: Protect sensitive data with AES-256 encryption for all stored documents and nodes.
5. **Role-based Access Control (RBAC)**: Manage access permissions through robust role-based control, ensuring that only authorized users can access or modify resources.
6. **Real-time Synchronization**: Propagate changes in documents, nodes, or states across connected clients instantly using WebSocket technology (Socket.IO).
7. **Modular & Extensible**: Built with Node.js and Docker, CephaloDB can be deployed locally or in containerized environments, offering flexibility for development and production.

[Explore Features in Detail](#core-concepts)

---

## **Getting Started**

To get started with CephaloDB, follow the installation instructions below. CephaloDB can run locally or within a Docker container, allowing for flexibility depending on your development setup.

I understand now that CephaloDB is set up to run directly using the provided server and app configuration. Here's the updated installation and running process to align with the actual setup.

### **Installation**

CephaloDB can be installed and run locally or using Docker. You can also download it directly using npm and git. Follow the steps below based on your preferred method.

**Prerequisites:**
- Node.js (v14 or higher)
- npm (v6 or higher)
- Docker and Docker Compose (if using the Docker setup)

### **Installation Options**

#### **Option 1: Install via npm (Standalone Project)**

1. **Install CephaloDB Globally**:

   ```bash
   npm install -g cephalodb
   ```

2. **Set Up Environment Variables**:

   Create a `.env` file in your project root and add the necessary environment variables:

   ```env
   NODE_ENV=development
   JWT_SECRET=your-secret-key
   DATABASE_URL=http://localhost:3000
   IS_DOCKER=false
   ```

3. **Run the Application Directly**:

   CephaloDB can be run directly using its built-in server setup. Execute the command below:

   ```bash
   cephalodb
   ```

   This command will start the application using the default configuration. The application will be accessible at `http://localhost:3000`.

#### **Option 2: Clone the Repository (Git Method)**

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-repo/cephalodb.git
   cd cephalodb
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:

   Create a `.env` file in your project root:

   ```env
   NODE_ENV=development
   JWT_SECRET=your-secret-key
   DATABASE_URL=http://localhost:3000
   IS_DOCKER=false
   ```

4. **Run the Application Locally**:

   ```bash
   npm run dev
   ```

   This will start the application using **Nodemon** for hot reloading in development mode.

5. **Run the Application in Production Mode**:

   ```bash
   npm start
   ```

   This will run the application directly using Node.js.

6. **Run the Application with Docker**:

   ```bash
   docker-compose up --build
   ```

   This command will build and run CephaloDB using Docker containers. The application will be accessible at `http://localhost:3000`.

#### **Option 3: Download Directly Using Git**

1. **Download CephaloDB via Git**:

   ```bash
   git clone https://github.com/your-repo/cephalodb.git
   ```

2. **Navigate to the Directory**:

   ```bash
   cd cephalodb
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Set Up Environment Variables**:

   Create a `.env` file in your project root:

   ```env
   NODE_ENV=development
   JWT_SECRET=your-secret-key
   DATABASE_URL=http://localhost:3000
   IS_DOCKER=false
   ```

5. **Run the Application**:

   - **Locally (Development Mode)**:

     ```bash
     npm run dev
     ```

     This will start the application with **Nodemon** for development.

   - **Production Mode**:

     ```bash
     npm start
     ```

     This will run the application using the default Node.js setup.

   - **With Docker**:

     ```bash
     docker-compose up --build
     ```

     The application will be accessible at `http://localhost:3000`.

---

### **Notes:**

- Ensure that the environment variables (`JWT_SECRET`, `DATABASE_URL`, etc.) are correctly set up in your `.env` file. These are essential for the security and configuration of CephaloDB.
- If you encounter any issues, check the logs using:

   ```bash
   docker-compose logs
   ```

   or when running locally:

   ```bash
   npm run dev
   ```

## **Core Concepts**

### **Document Storage**

CephaloDB uses a document-based architecture, where each document can have a flexible schema and multiple nodes:

- **Documents**: The core units for storing data, similar to collections in MongoDB.
- **Nodes**: Elements within documents that can have relationships with nodes in the same or other documents.

#### Example: Creating, Retrieving, Updating, Deleting, Sorting, and Filtering Documents

```javascript
const axios = require('axios');

// Create a new document
const newDocument = {
    title: "Employee Data",
    description: "Contains information about employees",
    nodes: [
        { name: "John Doe", role: "Developer" },
        { name: "Jane Smith", role: "Manager" }
    ]
};

axios.post('http://localhost:3000/api/documents', newDocument, { headers: { Authorization: 'Bearer <token>' } })
    .then(response => console.log('Document Created:', response.data))
    .catch(error => console.error('Error:', error));

// Retrieve all documents
axios.get('http://localhost:3000/api/documents', { headers: { Authorization: 'Bearer <token>' } })
    .then(response => console.log('Documents:', response.data))
    .catch(error => console.error('Error:', error));

// Update a document
const updatedDocument = {
    title: "Updated Employee Data",
    nodes: [{ name: "John Doe", role: "Senior Developer" }]
};

axios.put('http://localhost:3000/api/documents/1', updatedDocument, { headers: { Authorization: 'Bearer <token>' } })
    .then(response => console.log('Document Updated:', response.data))
    .catch(error => console.error('Error:', error));

// Delete a document
axios.delete('http://localhost:3000/api/documents/1', { headers: { Authorization: 'Bearer <token>' } })
    .then(response => console.log('Document Deleted:', response.data))
    .catch(error => console.error('Error:', error));

// Sorting documents by title
axios.get('http://localhost:3000/api/documents?sort=title', { headers: { Authorization: 'Bearer <token>' } })
    .then(response => console.log('Sorted Documents:', response.data))
    .catch(error => console.error('Error:', error));

// Filtering documents by role
axios.get('http://localhost:3000/api/documents?filter=role:Developer', { headers: { Authorization: 'Bearer <token>' } })
    .then(response => console.log('Filtered Documents:', response.data))
    .catch(error => console.error('Error:', error));
```

### **Node Relationships**

Nodes within CephaloDB can form complex relationships. CephaloDB uses fuzzy logic to establish these connections dynamically, adapting based on data changes.

#### Example: Establishing and Managing Node Relationships

```javascript
// Create a relationship between nodes
const relationship = {
    sourceNodeId: 'node1_id',
    targetNodeId: 'node2_id',
    relationshipType: 'reportsTo'
};

axios.post('http://localhost:3000/api/relations', relationship, { headers: { Authorization: 'Bearer <token>' } })
    .then(response => console.log('Relationship Created:', response.data))
    .catch(error => console.error('Error:', error));

// Remove a relationship
axios.delete('http://localhost:3000/api/relations/relation_id', { headers: { Authorization: 'Bearer <token>' } })
    .then(response => console.log('Relationship Removed:', response.data))
    .catch(error => console.error('Error:', error));
```

### **Global State Management**

CephaloDB manages a synchronized global state, ensuring data consistency and synchronization across all clients and nodes.

#### Example: Retrieving and Updating Global State

```javascript
// Fetch the global state
axios.get('http://localhost:3000/api/state', { headers: { Authorization: 'Bearer <token>' } })
    .then(response => console.log('Global State:', response.data))
    .catch(error => console.error('Error:', error));

// Update the global state
const updatedState = {
    maintenanceMode: true,
    updatedBy: "admin_user"
};

axios.put('http://localhost:3000/api/state', updatedState, { headers: { Authorization: 'Bearer <token>' } })
    .then(response => console.log('Global State Updated:', response.data))
    .catch(error => console.error('Error:', error));
```

### **Security & Encryption**

CephaloDB offers AES-256 encryption for all data stored within the system, ensuring data privacy and security.

#### Example: Encrypting and Accessing Data

```javascript
// Middleware usage for encrypting documents
app.post('/api/documents', encryptionMiddleware.encryptFile('path/to/encryptedFile'), (req, res) => {
    // Document creation logic
});
```

### **Role-Based Access Control (RBAC)**

RBAC enables you to define access permissions based on roles, ensuring that only authorized users have access to specific resources.

#### Example: Applying RBAC Middleware

```javascript
app.put('/api/documents/:id', authMiddleware.authenticateToken, rbacMiddleware(['admin', 'editor']), documentController.updateDocument);
```

### **Real-time Synchronization**

CephaloDB supports real-time updates and synchronization, ensuring that all connected clients have access to the latest data.

#### Example: Using WebSocket for Real-time Updates

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

### **Fuzzy Logic Engine**

CephaloDB uses a fuzzy logic engine to establish dynamic relationships between nodes based on patterns, similarity, and predefined rules. The fuzzy logic engine analyzes documents and nodes to automatically detect and create connections that reflect real-world relationships, even when the data may not be explicitly defined.

This allows CephaloDB to adapt and evolve its data structures, enabling powerful automation and pattern recognition capabilities.

#### **Example: Using the Fuzzy Logic Engine to Establish Relationships**

Suppose you have a set of employee records, and you want CephaloDB to automatically identify relationships between employees based on their roles, projects, or departments. The fuzzy logic engine can identify these patterns and establish connections dynamically.

```javascript
const document = {
    title: "Project Team",
    description: "Details about team members and their roles",
    nodes: [
        { id: "node1", name: "Alice", role: "Developer", project: "Alpha" },
        { id: "node2", name: "Bob", role: "Manager", project: "Alpha" },
        { id: "node3", name: "Charlie", role: "Developer", project: "Beta" }
    ]
};

// Post the document to create nodes
axios.post('http://localhost:3000/api/documents', document, { headers: { Authorization: 'Bearer <token>' } })
    .then(response => {
        console.log('Document Created:', response.data);

        // Trigger fuzzy logic processing
        axios.post('http://localhost:3000/api/relations/fuzzy', { documentId: response.data.id }, { headers: { Authorization: 'Bearer <token>' } })
            .then(relResponse => console.log('Fuzzy Logic Relationships Established:', relResponse.data))
            .catch(err => console.error('Fuzzy Logic Error:', err));
    })
    .catch(error => console.error('Error:', error));
```

In this example:

- A document containing nodes for team members is created.
- The fuzzy logic engine is then triggered to process the document, automatically identifying relationships like:
  - Developers working on the same project might be linked as **colleagues**.
  - Managers and developers on the same project might be linked as **supervisors**.

### **Advanced Example: Custom Fuzzy Logic Rules**

CephaloDB allows you to define custom fuzzy logic rules to enhance its automation capabilities. These rules can be used to fine-tune how relationships are established based on specific conditions.

```javascript
const customFuzzyRules = {
    conditions: [
        { field: "role", operator: "equals", value: "Manager" },
        { field: "project", operator: "equals", value: "Alpha" }
    ],
    actions: [
        { type: "link", relationshipType: "manages", targetField: "project" }
    ]
};

// Post custom rules to the fuzzy logic engine
axios.post('http://localhost:3000/api/relations/fuzzy/rules', customFuzzyRules, { headers: { Authorization: 'Bearer <token>' } })
    .then(response => console.log('Custom Fuzzy Rules Applied:', response.data))
    .catch(error => console.error('Error Applying Fuzzy Rules:', error));
```

In this example:

- The conditions specify that if a node's role is "Manager" and they are assigned to the "Alpha" project, the fuzzy logic engine will create a **manages** relationship with all nodes sharing the same project.
- You can customize the rules based on any field and define complex conditions (e.g., matching multiple fields with various operators like **equals**, **contains**, **greater than**, etc.).

### **Monitoring Fuzzy Logic Events**

The fuzzy logic engine logs events and can notify clients in real-time when new relationships are established or modified.

```javascript
const io = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.on('fuzzyLogicUpdate', (data) => {
    console.log('Fuzzy Logic Update:', data);
});
```

This example sets up a WebSocket listener for fuzzy logic updates, allowing you to monitor when the system automatically modifies relationships based on new data or changes.

---

## **API Reference**

### **Document APIs**

- **GET /api/documents**: Retrieve all documents, with optional query parameters for filtering and sorting.
- **POST /api/documents**: Create a new document with a set of nodes.
- **PUT /api/documents/:id**: Update an existing document.
- **DELETE /api/documents/:id**: Delete a document by its ID.

### **Relationship APIs**

- **POST /api/relations**: Manually create a relationship between two nodes.
- **POST /api/relations/fuzzy**: Trigger the fuzzy logic engine to analyze a document and establish relationships.
- **POST /api/relations/fuzzy/rules**: Define custom fuzzy logic rules.
- **DELETE /api/relations/:id**: Remove a relationship.

### **State APIs**

- **GET /api/state**: Retrieve the current global state of the application.
- **PUT /api/state**: Update the global state.

---

## **Comprehensive Usage Examples**

### **1. Managing Documents**

CephaloDB provides robust capabilities for document management, including sorting, filtering, and complex queries.

#### Example: Sorting and Filtering

```javascript
// Retrieve documents sorted by title in ascending order
axios.get('http://localhost:3000/api/documents?sort=title:asc', { headers: { Authorization: 'Bearer <token>' } })
    .then(response => console.log('Sorted Documents:', response.data))
    .catch(error => console.error('Error:', error));

// Filter documents where role contains "Developer"
axios.get('http://localhost:3000/api/documents?filter=role:Developer', { headers: { Authorization: 'Bearer <token>' } })
    .then(response => console.log('Filtered Documents:', response.data))
    .catch(error => console.error('Error:', error));
```

### **2. Establishing Complex Relationships Using Fuzzy Logic**

The fuzzy logic engine enables automatic relationship creation based on predefined rules.

#### Example: Auto-Relate Based on Multiple Fields

```javascript
const ruleSet = {
    conditions: [
        { field: "department", operator: "equals", value: "Engineering" },
        { field: "experience", operator: "greaterThan", value: 5 }
    ],
    actions: [
        { type: "link", relationshipType: "mentor", targetField: "department" }
    ]
};

// Apply fuzzy logic rules for mentorship relationships
axios.post('http://localhost:3000/api/relations/fuzzy/rules', ruleSet, { headers: { Authorization: 'Bearer <token>' } })
    .then(response => console.log('Custom Fuzzy Logic Rules Applied:', response.data))
    .catch(error => console.error('Error:', error));
```

This setup defines a rule where if an employee in the Engineering department has more than 5 years of experience, they are automatically linked as a **mentor** to other employees in the same department.

### **3. Real-time Updates and Event Monitoring**

CephaloDB’s WebSocket integration allows real-time data synchronization across connected clients.

#### Example: Listening for Real-time Changes

```javascript
const socket = io('http://localhost:3000');

// Listen for document updates
socket.on('documentUpdate', (data) => {
    console.log('Document Updated:', data);
});

// Listen for fuzzy logic changes
socket.on('fuzzyLogicUpdate', (data) => {
    console.log('Fuzzy Logic Update:', data);
});

// Listen for global state changes
socket.on('stateChange', (data) => {
    console.log('Global State Change:', data);
});
```

This example sets up listeners for different events, allowing clients to stay in sync with changes in the database, relationships, and global state.

[More examples](UsageExamples)
---

## **Contributing**

We welcome contributions to CephaloDB. To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with a clear description of the changes.

### **Development Setup**

- Run `npm install` to install dependencies.
- Use `npm run dev` for local development.
- Run tests (coming soon) using `npm test`.

---

## License

CephaloDB is licensed under the CephaloDB Non-Commercial License. You are permitted to use, copy, modify, and distribute this software for non-commercial purposes only. For commercial usage, please contact [connectwithpavan@gmail.com](mailto:connectwithpavan@gmail.com) for licensing options.

See the [LICENSE](LICENSE) file for more details.