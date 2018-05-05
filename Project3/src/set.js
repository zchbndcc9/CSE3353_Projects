// Object used for creating disjoint sets for labels. Each root node references
// itself as its parent.
function set () {
  this.parent = []

  this.add = label => {
    this.parent[label] = label
  }

  // Determines whether or not there is a root containing the designated label
  this.contains = label => {
    return this.parent[label] === label
  }

  // Returns the root of a given disjoint set tree while simoltaneously
  // compressing paths to root to reduce root finding time
  this.find = label => {
    if (this.parent[label] === label) return label
    let result = this.find(this.parent[label])
    this.parent[label] = result
    return result
  }

  // Merges two disjoint sets
  this.union = (x, y) => {
    // Finds roots of each tree
    let rootX = this.find(x)
    let rootY = this.find(y)

    // Don't do anything if the parent root labels are the same
    if (rootX === rootY) return

    // Combine the disjoint sets by setting the parent of the set with the
    // greater label index to that of the smaller label index, hence combining
    // the sets
    if (rootX < rootY) {
      this.parent[rootY] = rootX
    } else {
      this.parent[rootX] = rootY
    }
  }
}

module.exports = set
