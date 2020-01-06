var SpritesheetTexture = pc.createScript('spritesheetTexture');

SpritesheetTexture.attributes.add('materialAsset', {
    type: 'asset', 
    assetType: 'material', title: 'Material Asset'
});

SpritesheetTexture.attributes.add('frameCount', {
    type: 'number', 
    default: 1, 
    title: 'Frame Count', 
});


SpritesheetTexture.attributes.add('width', {
    type: 'number',
    default: 1,
    title: 'Width',
    description: 'Number of frames wide'
});

SpritesheetTexture.attributes.add('height', {
    type: 'number',
    default: 1,
    title: 'Height',
    description: 'Number of frames high'
});
    
var meshes;

SpritesheetTexture.prototype.initialize = function() {
    this.frame = Math.round(Math.random()*this.frameCount);
    this.transform = new pc.Vec4();
    
    meshes = this.entity.model.meshInstances;
    this.updateMaterial(0);
};

// update code called every frame
SpritesheetTexture.prototype.update = function(dt) {
    this.frame = (this.frame + 1) % this.frameCount;
    this.updateMaterial(this.frame);
};

SpritesheetTexture.prototype.updateMaterial = function (frame) {
    var dx = 1 / this.width;
    var dy = 1 / this.height;

    var x = frame % this.width;
    var y = Math.floor(frame / this.width);

    this.transform.set(dx, dy, x * dx, (1 - dy) - (y * dy));
    for (var i = 0; i < meshes.length; ++i) {
        meshes[i].setParameter("texture_diffuseMapTransform", this.transform.data);
        meshes[i].setParameter("texture_opacityMapTransform", this.transform.data);
    }
};