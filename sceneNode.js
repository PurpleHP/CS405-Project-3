/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }


    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */
        
        // Apply parent's transformations
        var transformedMvp = mvp;
        var transformedModelView = modelView;
        var transformedNormals = normalMatrix;
        var transformedModel = modelMatrix;

        if (this.trs) {
            // Getting the transformation matrix of the node
            let nodeTransform = this.trs.getTransformationMatrix();
            
            // Updating view model, mvp, model, and normal matrices with the transformation matrix of the node
            transformedMvp = MatrixMult(mvp, nodeTransform);
            transformedModelView = MatrixMult(modelView, nodeTransform);
            transformedNormals = MatrixMult(normalMatrix, nodeTransform);
            transformedModel = MatrixMult(modelMatrix, nodeTransform);
        }
        
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }

        // Draw all the children
        for (let i = 0; i < this.children.length; i++) {
            this.children[i].draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }
        
    }
}
