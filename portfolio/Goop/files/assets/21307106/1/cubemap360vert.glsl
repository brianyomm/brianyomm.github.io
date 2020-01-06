attribute vec3 aVertex_Position;
attribute vec2 aVertex_UV0;

uniform mat4 matrix_model;
uniform mat4 matrix_viewProjection;

varying vec2 originalUV;
varying vec3 wpos;

void main (void) {
    originalUV = aVertex_UV0;
    wpos = (matrix_model * vec4 (aVertex_Position, 1.0)).xyz;
    gl_Position = matrix_viewProjection * matrix_model * vec4 (aVertex_Position, 1.0);
}