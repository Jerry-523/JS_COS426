// In this file you will implement traversal and analysis for your assignment.
// Make sure to familiarize yourself with the utility functions in meshUtils.js
// they might be useful for the second part of your assignment!

////////////////////////////////////////////////////////////////////////////////
// Traversal
////////////////////////////////////////////////////////////////////////////////

// Return all vertices on face f
Mesh.prototype.verticesOnFace = function(f) {
  const vertices = [];
  let he = f.halfedge;
  const first = he;
  while (true) {
    vertices.push(he.vertex);
    he = he.next;
    if (he === first) {
      break;
    }
  }
  return vertices;
};

// Return all halfedges on face f
Mesh.prototype.edgesOnFace = function(f) {
  const halfedges = [];
  let he = f.halfedge;
  const first = he;
  while (true) {
    halfedges.push(he);
    he = he.next;
    if (he === first) {
      break;
    }
  }
  return halfedges;
};

// Return all faces adjacent to input face, not
// including input face.
Mesh.prototype.facesOnFace = function(f) {
  const faces = [];
  let he = f.halfedge;
  const first = he;
  do {
    const oppFace = he.opposite.face;
    if (oppFace !== f) {
      faces.push(oppFace);
    }
    he = he.next;
  } while (he !== first);
  return faces;
};


// Return one-ring neighbors of input vertex, not
// including the input vertex itself
Mesh.prototype.verticesOnVertex = function(v) {
  const vertices = [];
  let he = v.halfedge;
  do {
    vertices.push(he.opposite.vertex);
    he = he.opposite.next;
  } while (he !== v.halfedge);
  return vertices;
};

// Return all halfedges that point away from v
Mesh.prototype.edgesOnVertex = function(v) {
  const halfedges = [];
  let he = v.halfedge;
  do {
    halfedges.push(he);
    he = he.opposite.next;
  } while (he !== v.halfedge);
  return halfedges;
};


// Return all faces that include v as a vertex.
Mesh.prototype.facesOnVertex = function(v) {
  const faces = [];
  let he = v.halfedge;
  do {
    faces.push(he.face);
    he = he.opposite.next;
  } while (he !== v.halfedge);
  return faces;
};

// Return the vertices that form the endpoints of a given edge
Mesh.prototype.verticesOnEdge = function(e) {
  return [e.vertex, e.opposite.vertex];
};

// Return the faces that include a given edge
Mesh.prototype.facesOnEdge = function(e) {
  return [e.face, e.opposite.face];
};


// Return the edge pointing from v1 to v2
Mesh.prototype.edgeBetweenVertices = function(v1, v2) {
  let he = v1.halfedge;
  do {
    if (he.opposite.vertex === v2) {
      return he;
    }
    he = he.opposite.next;
  } while (he !== v1.halfedge);
  return undefined;
};

////////////////////////////////////////////////////////////////////////////////
// Analysis
////////////////////////////////////////////////////////////////////////////////

// Return the surface area of a provided face f.
Mesh.prototype.calculateFaceArea = function(f) {
  const vertices = this.verticesOnFace(f);
  if (vertices.length < 3) return 0;

  const p0 = vertices[0].position;
  let area = 0;
  for (let i = 1; i < vertices.length - 1; i++) {
    const p1 = vertices[i].position;
    const p2 = vertices[i + 1].position;
    const edge1 = new THREE.Vector3().subVectors(p1, p0);
    const edge2 = new THREE.Vector3().subVectors(p2, p0);
    const crossProd = new THREE.Vector3().crossVectors(edge1, edge2);
    area += crossProd.length() / 2;
  }
  f.area = area;
  return area;
};


// Update the area attributes of all faces in the mesh
Mesh.prototype.calculateFacesArea = function() {
  for (let i = 0; i < this.faces.length; ++i) {
    this.calculateFaceArea(this.faces[i]);
  }
};

// Calculate the vertex normal at a given vertex,
// using the face normals of bordering faces, weighted by face area
Mesh.prototype.calculateVertexNormal = function(v) {
  const faces = this.facesOnVertex(v);
  const v_normal = new THREE.Vector3(0, 0, 0);
  for (let i = 0; i < faces.length; i++) {
    const face = faces[i];
    v_normal.addScaledVector(face.normal, face.area);
  }
  v_normal.normalize();
  v.normal = v_normal;
  return v_normal;
};


// update the vertex normals of every vertex in the mesh
Mesh.prototype.updateVertexNormals = function() {
  for (let i = 0; i < this.vertices.length; ++i) {
    this.calculateVertexNormal(this.vertices[i]);
  }
};

// compute the average length of edges touching v
Mesh.prototype.averageEdgeLength = function(v) {
  const edges = this.edgesOnVertex(v);
  let totalLength = 0;
  for (let i = 0; i < edges.length; i++) {
    totalLength += edges[i].vertex.position.distanceTo(edges[i].opposite.vertex.position);
  }
  return totalLength / edges.length;
};


////////////////////////////////////////////////////////////////////////////////
// Topology
////////////////////////////////////////////////////////////////////////////////

// Given a face in the shape of an arbitrary polygon,
// split that face so it consists only of several triangular faces. 
Mesh.prototype.triangulateFace = function(f) {
  const vertices = this.verticesOnFace(f);
  if (vertices.length <= 3) return; // Already a triangle or invalid

  let firstVertex = vertices[0];
  for (let i = 1; i < vertices.length - 1; i++) {
    let v1 = vertices[i];
    let v2 = vertices[i + 1];
    this.splitFaceMakeEdge(f, firstVertex, v2);
  }
};
