const SKY_VERTEX_SHADER = `#version 300 es
void main() {
  vec2 corner = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(corner * 2.0 - 1.0, 0.0, 1.0);
}
`;

const SKY_FRAGMENT_SHADER = `#version 300 es
precision highp float;
out vec4 fragColor;

uniform vec2 uResolution;
uniform vec2 uPointer;

const vec3 SUN = vec3(-0.56, 0.79, -0.25);
const vec2 BANK_MOTION = vec2(0.10, 0.075);
const vec2 LEFT_MOTION = vec2(0.49, 0.31);
const vec2 RIGHT_MOTION = vec2(0.61, 0.34);

float hash(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.11, 0.29, 0.47));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x),
        mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
    mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x),
        mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
    f.z);
}

float lobe(vec3 samplePoint, vec3 center, vec3 radius) {
  vec3 delta = (samplePoint - center) / radius;
  return 1.0 - dot(delta, delta);
}

// Blend neighbouring lobes before adding the fine structure.
float joinLobes(float a, float b, float width) {
  float overlap = max(width - abs(a - b), 0.0) / width;
  return max(a, b) + overlap * overlap * width * 0.25;
}

float distantBank(vec3 p) {
  p.xy += uPointer * BANK_MOTION;
  float shape = lobe(p, vec3(-1.0, -5.15, 17.0), vec3(18.0, 3.65, 9.6));
  shape = joinLobes(shape, lobe(p, vec3(-4.6, -2.55, 14.0), vec3(5.0, 2.34, 3.1)), 0.32);
  shape = joinLobes(shape, lobe(p, vec3(-1.62, -2.10, 14.4), vec3(2.68, 2.30, 2.95)), 0.35);
  shape = joinLobes(shape, lobe(p, vec3(0.75, -2.45, 15.3), vec3(2.86, 2.36, 3.25)), 0.32);
  shape = joinLobes(shape, lobe(p, vec3(3.40, -3.05, 16.4), vec3(3.8, 2.34, 3.65)), 0.32);
  shape = joinLobes(shape, lobe(p, vec3(7.2, -4.36, 18.3), vec3(7.1, 2.66, 4.3)), 0.27);
  return shape;
}

float nearLeft(vec3 p) {
  p.xy += uPointer * LEFT_MOTION;
  float shape = lobe(p, vec3(-4.55, -3.96, 10.4), vec3(4.25, 1.85, 3.26));
  return joinLobes(shape, lobe(p, vec3(-6.3, -3.55, 10.7), vec3(2.5, 1.78, 2.3)), 0.40);
}

float nearRight(vec3 p) {
  p.xy += uPointer * RIGHT_MOTION;
  float shape = lobe(p, vec3(5.15, -4.14, 10.9), vec3(3.15, 1.77, 3.1));
  return joinLobes(shape, lobe(p, vec3(3.90, -4.56, 11.7), vec3(2.7, 1.4, 2.7)), 0.34);
}

vec2 cloudField(vec3 p) {
  // Anchoring each noise field to its shape lets the cloud drift as a volume.
  float bank = distantBank(p);
  float left = nearLeft(p);
  float right = nearRight(p);
  float shape = max(bank, max(left, right));
  if (shape < -0.42) return vec2(0.0);
  vec3 weights = smoothstep(vec3(-0.28), vec3(0.0), vec3(bank, left, right) - shape);
  vec2 movement = (BANK_MOTION * weights.x + LEFT_MOTION * weights.y + RIGHT_MOTION * weights.z)
    / (weights.x + weights.y + weights.z);
  vec3 detailPoint = (p + vec3(uPointer * movement, 0.0)) * vec3(1.05, 1.34, 1.02);
  float structure = noise(detailPoint) * 0.55
    + noise(detailPoint * 2.10 + 3.7) * 0.27
    + noise(detailPoint * 4.16 - 6.2) * 0.13
    + noise(detailPoint * 8.06 + 1.9) * 0.05;
  float density = smoothstep(0.035, 0.53, shape + (structure - 0.56) * 1.38);
  return vec2(density, structure);
}

vec3 skyColor(vec2 uv) {
  float elevation = smoothstep(-0.52, 0.58, uv.y);
  vec3 sky = mix(vec3(0.86, 0.91, 0.935), vec3(0.51, 0.71, 0.825), elevation);
  vec2 fromLight = (uv - vec2(-0.76, 0.33)) * vec2(1.23, 1.53);
  float warmth = exp(-dot(fromLight, fromLight));
  return mix(sky, vec3(0.987, 0.95, 0.858), warmth * 0.57);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  vec3 background = skyColor(uv);
  float grain = hash(vec3(gl_FragCoord.xy, 0.63));
  if (uv.y > 0.12) {
    fragColor = vec4(background + (grain - 0.5) * 0.009, 1.0);
    return;
  }

  // March from the viewer through the near clouds and then into the bank.
  const float stepSize = 0.43;
  vec3 cloudLight = vec3(0.0);
  float transmittance = 1.0;
  for (int i = 0; i < 49; i++) {
    float z = 6.5 + (float(i) + grain) * stepSize;
    vec3 p = vec3(uv * z / 1.42, z);
    vec2 sampleValue = cloudField(p);
    float density = sampleValue.x;
    if (density < 0.004) continue;

    float lightDensity = cloudField(p + SUN * 0.88).x;
    float fartherDensity = cloudField(p + SUN * 2.0).x;
    float directLight = exp(-1.22 * lightDensity - 1.12 * fartherDensity);
    float ambient = smoothstep(-5.8, 0.1, p.y);
    float lighting = clamp(directLight * 0.77 + ambient * 0.22 + 0.08, 0.0, 1.0);
    vec3 shadow = vec3(0.61, 0.708, 0.79);
    vec3 silver = mix(vec3(0.952, 0.972, 0.981), vec3(1.0, 0.978, 0.923),
                      1.0 - smoothstep(-7.0, 3.5, p.x));
    vec3 color = mix(shadow, silver, lighting);
    color += (sampleValue.y - 0.5) * 0.05;
    color = mix(color, background, smoothstep(12.5, 26.0, z) * 0.28);

    float alpha = 1.0 - exp(-density * stepSize * 1.14);
    cloudLight += transmittance * alpha * color;
    transmittance *= 1.0 - alpha;
    if (transmittance < 0.013) break;
  }
  vec3 color = cloudLight + transmittance * background;
  color = mix(color, vec3(0.923, 0.954, 0.973), smoothstep(0.13, 0.57, -uv.y) * 0.22);
  fragColor = vec4(color + (grain - 0.5) * 0.009, 1.0);
}
`;
