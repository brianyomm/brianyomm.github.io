
varying vec2 originalUV;
varying vec3 wpos;

uniform sampler2D _MainTex;
uniform vec4 _Color;
uniform float _EffectCoef;

uniform vec3 _OldPoint;
uniform samplerCube _OldCubemap;
uniform mat3 _OldRotMat;

uniform vec3 _NewPoint;
uniform samplerCube _NewCubemap;
uniform mat3 _NewRotMat;

uniform float _TransitionValue;

vec4 getOldTexColor () {
    vec3 dif = wpos - _OldPoint;
    dif.x = -dif.x;
    dif = _OldRotMat * dif;
    
    vec4 resultColor = textureCube (_OldCubemap, dif);
    return resultColor;
}

vec4 getNewTexColor () {    
    vec3 dif = wpos - _NewPoint;
    dif.x = -dif.x;
    dif = _NewRotMat * dif;
    
    vec4 resultColor = textureCube (_NewCubemap, dif);
    return resultColor;
}

vec4 lerp (vec4 fVec, vec4 sVec, float coef) {
	float maxValue = float (1);
	float newX = fVec.x*(maxValue-coef) + sVec.x*coef;
	float newY = fVec.y*(maxValue-coef) + sVec.y*coef;
	float newZ = fVec.z*(maxValue-coef) + sVec.z*coef;
	float newW = fVec.w*(maxValue-coef) + sVec.w*coef;
	return vec4 (newX, newY, newZ, newW);
}

void main (void) {
    //vec4 originalColor = texture2D (_MainTex, originalUV) * _Color;
    vec4 oldColor = getOldTexColor ();
    vec4 newColor = getNewTexColor ();
    
    //vec4 effectColor = lerp (oldColor, newColor, float (1));
    vec4 effectColor = lerp (oldColor, newColor, _TransitionValue);
    vec4 resultColor = effectColor;
    gl_FragColor = resultColor;
}