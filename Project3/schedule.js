function Node (data = null) {
  return {
    next: null,
    data: data
  }
}

function AdjacencyList () {
  const vertices = {}

  const add = (origin, dest) => {
    if (!vertices[origin]) vertices[origin] = Node(origin)
    if (!vertices[dest]) vertices[dest] = Node(dest)
    let node = vertices[origin]
    while (node.next !== null) {
      node = node.next
    }
    node.next = Node(dest)
  }

  const dfs = () => {
    const sorted = []
    const visit = node => {
      if (!node) return
      vertices[node.data].visited = true
      let i = node
      while (i) {
        if (!vertices[i.data].visited) visit(vertices[i.data])
        i = i.next
      }
      sorted.push(node.data)
    }

    // Ensures that all vertices are visited
    for (let [key] in vertices) {
      if (!vertices[key].visited) visit(vertices[key])
    }
    return sorted.reverse()
  }

  return {
    vertices,
    add: (origin, dest) => add(origin, dest),
    order: () => dfs()
  }
}

module.exports = AdjacencyList
