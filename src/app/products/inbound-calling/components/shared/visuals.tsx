type SvgProps = {
  className?: string;
};

const styles = {
  blue: '#4268FF',
  blueSoft: '#95A6F8',
  purple: '#8F46FF',
  text: '#0C1021',
  textMuted: '#535662',
  border: '#E8EBF5',
  borderStrong: 'rgba(45, 45, 45, 0.1)',
  panel: '#FFFFFF',
  panelSoft: '#FAFAFA',
  green: '#28BC62',
  greenSoft: '#DEF8E8',
};

function BaseSvg({
  children,
  className,
  viewBox = '0 0 427 427',
}: SvgProps & { children: React.ReactNode; viewBox?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

function SurfaceCard({
  x,
  y,
  width,
  height,
  rx = 24,
  stroke = styles.border,
  fill = styles.panel,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  rx?: number;
  stroke?: string;
  fill?: string;
}) {
  return <rect fill={fill} height={height} rx={rx} stroke={stroke} width={width} x={x} y={y} />;
}

function Pill({
  x,
  y,
  width,
  height,
  text,
  fontSize = 14,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  fontSize?: number;
}) {
  return (
    <>
      <rect
        fill={styles.panel}
        height={height}
        rx={height / 2}
        stroke={styles.borderStrong}
        width={width}
        x={x}
        y={y}
      />
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize={fontSize}
        fontWeight="500"
        x={x + 52}
        y={y + height / 2 + fontSize * 0.3}
      >
        {text}
      </text>
    </>
  );
}

function StatusPill({ x, y, width, text }: { x: number; y: number; width: number; text: string }) {
  return (
    <>
      <Pill x={x} y={y} width={width} height={44} text={text} fontSize={14.6} />
      <circle
        cx={x + 21}
        cy={y + 22}
        fill={styles.greenSoft}
        r="19"
        stroke="rgba(40, 188, 98, 0.1)"
      />
      <image
        href="/images/inbound-calling/why-check.svg"
        height="22"
        width="22"
        x={x + 10}
        y={y + 11}
      />
    </>
  );
}

function DottedCurve({ d }: { d: string }) {
  return <path d={d} stroke={styles.blue} strokeDasharray="6 7" strokeWidth="2" />;
}

export function DeploymentVisual({ className }: SvgProps) {
  return (
    <BaseSvg className={className}>
      <rect fill={styles.panelSoft} height="427" rx="24" width="427" />
      <SurfaceCard x={51} y={61} width={325} height={318} rx={22} stroke="rgba(12,16,33,0.05)" />
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="24"
        fontWeight="600"
        textAnchor="middle"
        x="214"
        y="116"
      >
        System Deployment
      </text>

      <StatusPill x={88} y={146} width={165} text="CRM Connected" />
      <StatusPill x={114} y={214} width={184} text="Help Desk Integrated" />
      <StatusPill x={180} y={282} width={160} text="Telephony Active" />
      <StatusPill x={196} y={350} width={211} text="Call Logic Configured" />

      <DottedCurve d="M180 190C180 208 190 215 206 215C222 215 223 232 223 239" />
      <DottedCurve d="M223 258C223 274 236 282 250 282C266 282 271 296 271 302" />
      <DottedCurve d="M271 326C271 339 278 347 293 347C303 347 307 356 307 366" />
    </BaseSvg>
  );
}

export function ResolutionVisual({ className }: SvgProps) {
  return (
    <BaseSvg className={className}>
      <rect fill={styles.panelSoft} height="427" rx="24" width="427" />
      <SurfaceCard x={51} y={61} width={325} height={318} rx={22} stroke="rgba(12,16,33,0.05)" />
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="24"
        fontWeight="600"
        textAnchor="middle"
        x="214"
        y="116"
      >
        Zero hold time enabled
      </text>

      <image
        href="/images/inbound-calling/donut-wrap.svg"
        height="260"
        width="260"
        x="84"
        y="120"
      />
      <image href="/images/inbound-calling/donut-dot.svg" height="16" width="16" x="274" y="150" />
      <image href="/images/inbound-calling/donut-dot.svg" height="16" width="16" x="121" y="303" />

      <rect fill={styles.text} height="52" rx="20" width="78" x="261" y="139" />
      <text
        fill="white"
        fontFamily="Urbanist, sans-serif"
        fontSize="18"
        fontWeight="400"
        textAnchor="middle"
        x="300"
        y="162"
      >
        24%
      </text>
      <text
        fill="rgba(255,255,255,0.8)"
        fontFamily="Urbanist, sans-serif"
        fontSize="12"
        fontWeight="400"
        textAnchor="middle"
        x="300"
        y="179"
      >
        Escalated
      </text>

      <rect fill={styles.text} height="64" rx="22" width="90" x="69" y="299" />
      <text
        fill="white"
        fontFamily="Urbanist, sans-serif"
        fontSize="24"
        fontWeight="400"
        textAnchor="middle"
        x="114"
        y="329"
      >
        76%
      </text>
      <text
        fill="rgba(255,255,255,0.8)"
        fontFamily="Urbanist, sans-serif"
        fontSize="16"
        fontWeight="400"
        textAnchor="middle"
        x="114"
        y="350"
      >
        Resolved
      </text>
    </BaseSvg>
  );
}

export function CapacityVisual({ className }: SvgProps) {
  return (
    <BaseSvg className={className}>
      <rect fill={styles.panelSoft} height="427" rx="24" width="427" />
      <Pill x={30} y={86} width={212} height={44} text="Low-latency voice processing" />
      <Pill x={206} y={148} width={182} height={44} text="High first-call resolution" />
      <Pill x={26} y={320} width={202} height={44} text="Built for peak call volumes" />
      <Pill x={214} y={286} width={187} height={44} text="Seamless integrations" />

      <DottedCurve d="M157 130C157 168 205 148 205 182" />
      <DottedCurve d="M297 192C297 214 286 226 258 226" />
      <DottedCurve d="M205 182V256C205 282 178 286 178 320" />
      <DottedCurve d="M205 226V256C205 274 236 274 236 286" />

      <SurfaceCard x={64} y={180} width={299} height={106} rx={24} stroke="rgba(12,16,33,0.05)" />
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="22"
        fontWeight="500"
        x="92"
        y="223"
      >
        System load capacity
      </text>
      <rect fill="#F1F1F1" height="22" rx="11" width="242" x="92" y="244" />
      <rect fill={styles.blue} height="22" rx="11" width="220" x="92" y="244" />
      <rect fill={styles.text} height="44" rx="22" width="70" x="270" y="193" />
      <text
        fill="white"
        fontFamily="Urbanist, sans-serif"
        fontSize="24"
        textAnchor="middle"
        x="305"
        y="222"
      >
        95%
      </text>
      <circle cx="304" cy="255" fill={styles.blue} r="9" stroke="white" strokeWidth="4" />
      <path
        d="M308 278L318 271L326 282"
        stroke="#C8CEE3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="6"
      />

      <circle cx="54" cy="108" fill={styles.greenSoft} r="19" stroke="rgba(40, 188, 98, 0.1)" />
      <image href="/images/inbound-calling/why-check.svg" height="22" width="22" x="43" y="97" />
      <circle cx="230" cy="170" fill={styles.greenSoft} r="19" stroke="rgba(40, 188, 98, 0.1)" />
      <image href="/images/inbound-calling/why-check.svg" height="22" width="22" x="219" y="159" />
      <circle cx="50" cy="342" fill={styles.greenSoft} r="19" stroke="rgba(40, 188, 98, 0.1)" />
      <image href="/images/inbound-calling/why-check.svg" height="22" width="22" x="39" y="331" />
      <circle cx="238" cy="308" fill={styles.greenSoft} r="19" stroke="rgba(40, 188, 98, 0.1)" />
      <image href="/images/inbound-calling/why-check.svg" height="22" width="22" x="227" y="297" />
    </BaseSvg>
  );
}

export function LeadCaptureVisual({ className }: SvgProps) {
  return (
    <BaseSvg className={className}>
      <rect fill={styles.panelSoft} height="427" rx="24" width="427" />
      <SurfaceCard x={30} y={42} width={142} height={118} rx={32} stroke="rgba(12,16,33,0.12)" />
      <SurfaceCard x={114} y={150} width={282} height={156} rx={52} stroke="rgba(12,16,33,0.12)" />
      <SurfaceCard x={32} y={318} width={186} height={92} rx={32} stroke="rgba(12,16,33,0.12)" />

      <DottedCurve d="M171 96H258C280 96 286 108 286 132V180" />
      <DottedCurve d="M201 318V280C201 264 240 264 240 234" />

      <defs>
        <linearGradient id="leadGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#7490FF" />
          <stop offset="100%" stopColor="#4268FF" />
        </linearGradient>
      </defs>

      <text
        fill="url(#leadGradient)"
        fontFamily="Urbanist, sans-serif"
        fontSize="72"
        fontWeight="300"
        textAnchor="middle"
        x="101"
        y="106"
      >
        0%
      </text>
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="18"
        fontWeight="600"
        textAnchor="middle"
        x="101"
        y="132"
      >
        Missed calls
      </text>

      <text
        fill="url(#leadGradient)"
        fontFamily="Urbanist, sans-serif"
        fontSize="94"
        fontWeight="300"
        textAnchor="middle"
        x="255"
        y="232"
      >
        +62%
      </text>
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="22"
        fontWeight="600"
        textAnchor="middle"
        x="255"
        y="266"
      >
        Lead capture
      </text>

      <text
        fill="url(#leadGradient)"
        fontFamily="Urbanist, sans-serif"
        fontSize="58"
        fontWeight="300"
        textAnchor="middle"
        x="125"
        y="378"
      >
        Instant
      </text>
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="18"
        fontWeight="600"
        textAnchor="middle"
        x="125"
        y="401"
      >
        Response time
      </text>
    </BaseSvg>
  );
}

export function InboundTrafficVisual({ className }: SvgProps) {
  return (
    <BaseSvg className={className}>
      <rect fill={styles.panelSoft} height="427" rx="24" width="427" />
      <SurfaceCard x={44} y={58} width={339} height={311} rx={24} stroke="rgba(12,16,33,0.05)" />

      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="24"
        fontWeight="600"
        textAnchor="middle"
        x="214"
        y="107"
      >
        Inbound Traffic
      </text>
      <text
        fill={styles.textMuted}
        fontFamily="Urbanist, sans-serif"
        fontSize="15"
        textAnchor="middle"
        x="214"
        y="131"
      >
        AI calls handled ∞ scalable
      </text>

      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          stroke="rgba(0,40,82,0.08)"
          x1="70"
          x2="360"
          y1={167 + i * 55}
          y2={167 + i * 55}
        />
      ))}
      <line stroke="rgba(0,40,82,0.08)" x1="70" x2="70" y1="152" y2="346" />
      <line stroke="rgba(0,40,82,0.08)" x1="360" x2="360" y1="152" y2="346" />

      <path
        d="M70 276C100 276 116 276 126 236C136 191 132 160 150 160C168 160 164 254 190 254C216 254 212 186 230 186C248 186 238 254 270 254C302 254 292 160 316 160C340 160 336 256 360 256"
        stroke={styles.purple}
        strokeWidth="2.5"
      />
      <path
        d="M70 302C134 296 197 289 248 287C286 286 324 286 360 290"
        stroke={styles.blue}
        strokeWidth="2.5"
      />
      <line stroke={styles.purple} strokeWidth="1.5" x1="209" x2="209" y1="160" y2="303" />
      <line stroke={styles.blue} strokeWidth="1.5" x1="232" x2="232" y1="287" y2="344" />
      <circle cx="209" cy="160" fill={styles.purple} r="8" stroke="white" strokeWidth="4" />
      <circle cx="232" cy="287" fill={styles.blue} r="8" stroke="white" strokeWidth="4" />

      <rect fill={styles.text} height="38" rx="19" width="132" x="154" y="126" />
      <text
        fill="white"
        fontFamily="Urbanist, sans-serif"
        fontSize="16"
        textAnchor="middle"
        x="220"
        y="150"
      >
        Inbound traffic
      </text>
      <rect fill={styles.text} height="38" rx="19" width="42" x="210" y="249" />
      <text
        fill="white"
        fontFamily="Urbanist, sans-serif"
        fontSize="16"
        textAnchor="middle"
        x="231"
        y="273"
      >
        AI
      </text>
    </BaseSvg>
  );
}
