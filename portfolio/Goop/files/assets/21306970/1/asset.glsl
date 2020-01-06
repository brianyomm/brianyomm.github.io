precision highp float;

varying vec2 originalUV;
varying vec3 wpos;

uniform sampler2D _MainTex;
uniform vec4 _Color;
uniform float _EffectCoef;

uniform vec4 _OldPoint;
uniform int _hiddenTexIndexOld;
uniform sampler2D _FirstTexOld;
uniform sampler2D _SecondTexOld;
uniform sampler2D _ThirdTexOld;
uniform sampler2D _VertTexOld;

uniform vec4 _NewPoint;
uniform int _hiddenTexIndexNew;
uniform sampler2D _FirstTexNew;
uniform sampler2D _SecondTexNew;
uniform sampler2D _ThirdTexNew;
uniform sampler2D _VertTexNew;

uniform bool _isTop;


uniform float _TransitionValue;

float normalizeAngle (float angle) {
	float maxAngle = float (1);
	float fullAngles = float (2);
	if (angle > maxAngle) angle -= fullAngles;
	if (angle < -maxAngle) angle += fullAngles;
	return angle;
}

int getCubeSide (vec4 curPoint, inout vec2 curUV) {
    float PI = 3.1415926;    
    vec4 viewPoint = curPoint;
    viewPoint.w = normalizeAngle (viewPoint.w / 180.0 + 0.5) * PI;
    
    vec3 dif = wpos - viewPoint.xyz;
    float radius = sqrt (dif.x * dif.x + dif.z * dif.z);
    float hAngleCoef = normalizeAngle ((atan (dif.z, dif.x) + viewPoint.w) / PI) * PI;
    dif.x = cos (hAngleCoef) * radius;
    dif.z = sin (hAngleCoef) * radius;
    
    float xLength = abs (dif.x) * float (2);
    float zLength = abs (dif.z) * float (2);
    float yLength = abs (dif.y) * float (2);    
    if (zLength >= xLength && zLength >= yLength) {
        curUV = vec2 ((dif.x / zLength) + 0.5, (dif.y / zLength) + 0.5);
        if (dif.z > float (0)) {
            curUV = vec2 (1.0 - curUV.x, curUV.y);
            return 0;
        } else {
            return 2;
        }
    } else if (xLength >= zLength && xLength >= yLength) {
        curUV = vec2 ((dif.z / xLength) + 0.5, (dif.y / xLength) + 0.5);
        if (dif.x > float (0)) {
            return 3;
        } else {
            curUV = vec2 (1.0 - curUV.x, curUV.y);
            return 1;
        }
    } else if (yLength >= xLength && yLength >= zLength) {
        curUV = vec2 (0.5 - (dif.x / yLength), (dif.z / yLength) + 0.5);
        if (dif.y > float (0)) {
            curUV = vec2 (curUV.x, 1.0 - curUV.y);
            return 4;
        } else {
            return 5;
        }
    }
}

vec4 getOldTexColor () {    
    vec4 resultColor = vec4 (0, 0, 0, 1);
    float sidesCount = 4.0;
    vec2 curUV;
    int side = getCubeSide (_OldPoint, curUV);
    if ((side == 4 && _isTop) || (side == 5 && !_isTop)) {
        resultColor = texture2D (_VertTexOld, curUV);
    } else {
        if (side == int (mod (float (_hiddenTexIndexOld + 1), sidesCount))) {
            resultColor = texture2D (_FirstTexOld, curUV);
        } else if (side == int (mod (float (_hiddenTexIndexOld + 2), sidesCount))) {
            resultColor = texture2D (_SecondTexOld, curUV);
        } else if (side == int (mod (float (_hiddenTexIndexOld + 3), sidesCount))) {
            resultColor = texture2D (_ThirdTexOld, curUV);
        }
    }
    
    return resultColor;
}

vec4 getNewTexColor () {
    vec4 resultColor = vec4 (0, 0, 0, 1);
    float sidesCount = 4.0;
    vec2 curUV;
    int side = getCubeSide (_NewPoint, curUV);
    if ((side == 4 && _isTop) || (side == 5 && !_isTop)) {
        resultColor = texture2D (_VertTexNew, curUV);
    } else {
        if (side == int (mod (float (_hiddenTexIndexNew + 1), sidesCount))) {
            resultColor = texture2D (_FirstTexNew, curUV);
        } else if (side == int (mod (float (_hiddenTexIndexNew + 2), sidesCount))) {
            resultColor = texture2D (_SecondTexNew, curUV);
        } else if (side == int (mod (float (_hiddenTexIndexNew + 3), sidesCount))) {
            resultColor = texture2D (_ThirdTexNew, curUV);
        }
    }
    
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
    vec4 originalColor = texture2D (_MainTex, originalUV) * _Color;
    vec4 oldColorHigh = getOldTexColor ();
    vec4 newColorHigh = getNewTexColor ();
    
    vec4 effectColor = lerp (oldColorHigh, newColorHigh, _TransitionValue);
    gl_FragColor = lerp (originalColor, effectColor, _EffectCoef);
}