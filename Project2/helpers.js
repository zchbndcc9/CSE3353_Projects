function depthTraversal(tree, callback, path = "") {
    if (!tree) return;

    callback(tree, path);
    depthTraversal(tree.left, callback, path + 0);
    depthTraversal(tree.right, callback, path + 1);
}

module.exports = depthTraversal;
