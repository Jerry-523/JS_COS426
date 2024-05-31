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
  do {
    halfedges.push(he);
    he = he.next;
  } while (he !== first);
  return halfedges;
};

// Return all faces adjacent to input face, not
// including input face.
Mesh.prototype.facesOnFace = function(f) {
  const faces = [];
  let he = f.halfedge;
  const first = he;
  do {
    const twinFace = he.twin.face;
    if (twinFace && twinFace !== f) {
      faces.push(twinFace);
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
  const first = he;
  do {
    const neighbor = he.twin.vertex;
    if (!vertices.includes(neighbor)) {
      vertices.push(neighbor);
    }
    he = he.twin.next;
  } while (he !== first);
  return vertices;
};

// Return all halfedges that point away from v
Mesh.prototype.edgesOnVertex = function(v) {
  const halfedges = [];
  let he = v.halfedge;
  const first = he;
  do {
    halfedges.push(he);
    he = he.twin.next;
  } while (he !== first);
  return halfedges;
};

// Return all faces that include v as a vertex.
Mesh.prototype.facesOnVertex = function(v) {
  const faces = [];
  let he = v.halfedge;
  const first = he;
  do {
    const face = he.face;
    if (!faces.includes(face)) {
      faces.push(face);
    }
    he = he.twin.next;
  } while (he !== first);
  return faces;
};

// Return the vertices that form the endpoints of a given edge
Mesh.prototype.verticesOnEdge = function(e) {
  const vertices = [e.vertex, e.twin.vertex];
  return vertices;
};

// Return the faces that include a given edge
Mesh.prototype.facesOnEdge = function(e) {
  const faces = [e.face, e.twin.face];
  return faces;
};

// Return the edge pointing from v1 to v2
Mesh.prototype.edgeBetweenVertices = function(v1, v2) {
  let he = v1.halfedge;
  const first = he;
  do {
    if (he.twin.vertex === v2) {
      return he;
    }
    he = he.twin.next;
  } while (he !== first);
  return undefined;
};

////////////////////////////////////////////////////////////////////////////////
// Analysis
////////////////////////////////////////////////////////////////////////////////

// Return the surface area of a provided face f.
Mesh.prototype.calculateFaceArea = function(f) {
  let area = 0.0;
  const vertices = this.verticesOnFace(f);
  if (vertices.length < 3) {
    return area;
  }

  const origin = vertices[0].position;
  for (let i = 1; i < vertices.length - 1; ++i) {
    const v1 = vertices[i].position.clone().sub(origin);
    const v2 = vertices[i + 1].position.clone().sub(origin);
    area += v1.cross(v2).length() / 2;
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
  const v_normal = new THREE.Vector3(0, 0, 0);
  const faces = this.facesOnVertex(v);
  for (let i = 0; i < faces.length; ++i) {
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
  let totalLength = 0.0;
  const halfedges = this.edgesOnVertex(v);
  halfedges.forEach(he => {
    totalLength += he.length();
  });
  const avg = totalLength / halfedges.length;
  return avg;
};

////////////////////////////////////////////////////////////////////////////////
// Topology
////////////////////////////////////////////////////////////////////////////////

// Given a face in the shape of an arbitrary polygon,
// split that face so it consists only of several triangular faces. 
Mesh.prototype.triangulateFace = function(f) {
  const vertices = this.verticesOnFace(f);
  const origin = vertices[0];
  for (let i = 1; i < vertices.length - 1; ++i) {
    this.addFace(origin, vertices[i], vertices[i + 1]);
  }
  this.deleteFace(f);
};
