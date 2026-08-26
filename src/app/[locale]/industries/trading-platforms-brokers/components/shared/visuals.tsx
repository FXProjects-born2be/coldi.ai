type SvgProps = {
  className?: string;
};

const styles = {
  blue: '#4268FF',
  blueSoft: '#E3E9FF',
  blueTint: 'rgba(66,104,255,0.12)',
  text: '#0C1021',
  textMuted: '#535662',
  border: '#E8EBF5',
  borderStrong: 'rgba(45,45,45,0.1)',
  panel: '#FFFFFF',
  panelSoft: '#FAFAFA',
  green: '#28BC62',
  greenSoft: '#DEF8E8',
  red: '#F30040',
  dot: 'rgba(66,104,255,0.12)',
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
  rx = 16,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  rx?: number;
}) {
  return (
    <rect
      fill={styles.panel}
      height={height}
      rx={rx}
      stroke={styles.border}
      strokeWidth="1"
      width={width}
      x={x}
      y={y}
    />
  );
}

function Pill({
  x,
  y,
  width,
  height,
  text,
  fill = styles.panel,
  stroke = styles.borderStrong,
  textColor = styles.text,
  fontSize = 16,
  fontWeight = 500,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  fill?: string;
  stroke?: string;
  textColor?: string;
  fontSize?: number;
  fontWeight?: number;
}) {
  return (
    <>
      <rect fill={fill} height={height} rx={height / 2} stroke={stroke} width={width} x={x} y={y} />
      <text
        fill={textColor}
        fontFamily="Urbanist, sans-serif"
        fontSize={fontSize}
        fontWeight={fontWeight}
        textAnchor="middle"
        x={x + width / 2}
        y={y + height / 2 + fontSize * 0.33}
      >
        {text}
      </text>
    </>
  );
}

function StatCard({
  x,
  y,
  title,
  subtitleLines,
}: {
  x: number;
  y: number;
  title: string;
  subtitleLines: string[];
}) {
  return (
    <>
      <SurfaceCard x={x} y={y} width={130} height={88} rx={18} />
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="18"
        fontWeight="600"
        textAnchor="middle"
        x={x + 65}
        y={y + 34}
      >
        {title}
      </text>
      {subtitleLines.map((line, index) => (
        <text
          key={line}
          fill={styles.textMuted}
          fontFamily="Urbanist, sans-serif"
          fontSize="13"
          textAnchor="middle"
          x={x + 65}
          y={y + 56 + index * 15}
        >
          {line}
        </text>
      ))}
    </>
  );
}

function DottedBackground() {
  return (
    <>
      {Array.from({ length: 17 }).map((_, row) =>
        Array.from({ length: 17 }).map((__, col) => (
          <circle
            key={`${row}-${col}`}
            cx={22 + col * 24}
            cy={22 + row * 24}
            fill={styles.dot}
            r="1.5"
          />
        ))
      )}
    </>
  );
}

export function ManagedByVisual({ className }: SvgProps) {
  return (
    <BaseSvg className={className}>
      <rect fill={styles.panelSoft} height="427" rx="24" width="427" />
      <SurfaceCard x={30} y={30} width={367} height={367} rx={20} />
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="20"
        fontWeight="600"
        textAnchor="middle"
        x="214"
        y="80"
      >
        Managed by Coldi.ai
      </text>

      <Pill x={56} y={112} width={135} height={38} text="API Integrations" />
      <Pill x={50} y={178} width={185} height={38} text="Account Verification" />
      <Pill x={50} y={244} width={187} height={38} text="Telephony Infrastructure" />
      <Pill x={50} y={310} width={165} height={38} text="Optimization Engine" />

      <path
        d="M190 131C216 131 216 145 245 145"
        stroke={styles.blue}
        strokeDasharray="6 6"
        strokeWidth="2"
      />
      <path
        d="M234 197C261 197 261 211 289 211"
        stroke={styles.blue}
        strokeDasharray="6 6"
        strokeWidth="2"
      />
      <path
        d="M236 263C261 263 261 277 267 277"
        stroke={styles.blue}
        strokeDasharray="6 6"
        strokeWidth="2"
      />
      <path
        d="M214 329C240 329 240 343 256 343"
        stroke={styles.blue}
        strokeDasharray="6 6"
        strokeWidth="2"
      />
      <circle cx="190" cy="131" fill={styles.blue} r="4" />
      <circle cx="234" cy="197" fill={styles.blue} r="4" />
      <circle cx="236" cy="263" fill={styles.blue} r="4" />
      <circle cx="214" cy="329" fill={styles.blue} r="4" />

      <Pill
        x={247}
        y={124}
        width={124}
        height={42}
        fill={styles.greenSoft}
        stroke="rgba(40,188,98,0.1)"
        text="Connected"
        textColor={styles.green}
      />
      <image href="/images/brokers/checkmark-circle.svg" height="24" width="24" x="258" y="133" />

      <Pill
        x={291}
        y={190}
        width={90}
        height={42}
        fill={styles.greenSoft}
        stroke="rgba(40,188,98,0.1)"
        text="Active"
        textColor={styles.green}
      />
      <image href="/images/brokers/checkmark-circle.svg" height="24" width="24" x="301" y="199" />

      <Pill
        x={269}
        y={256}
        width={112}
        height={42}
        fill={styles.greenSoft}
        stroke="rgba(40,188,98,0.1)"
        text="Operational"
        textColor={styles.green}
      />
      <image href="/images/brokers/checkmark-circle.svg" height="24" width="24" x="279" y="265" />

      <Pill
        x={258}
        y={322}
        width={122}
        height={42}
        fill={styles.blueSoft}
        stroke="rgba(66,104,255,0.2)"
        text="Auto-learning"
        textColor={styles.blue}
      />
      <image href="/images/brokers/gear.svg" height="24" width="24" x="268" y="331" />
    </BaseSvg>
  );
}

export function SupportInterfaceVisual({ className }: SvgProps) {
  return (
    <BaseSvg className={className}>
      <rect fill={styles.panelSoft} height="427" rx="24" width="427" />
      <SurfaceCard x={20} y={18} width={387} height={391} rx={22} />
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="24"
        fontWeight="600"
        x="42"
        y="68"
      >
        Support Interface
      </text>

      <Pill
        x={278}
        y={38}
        width={113}
        height={34}
        fill={styles.greenSoft}
        stroke="rgba(40,188,98,0.1)"
        text="Resolved automatically"
        textColor={styles.green}
        fontSize={14}
        fontWeight={400}
      />

      <rect
        fill={styles.panel}
        height="198"
        rx="22"
        stroke={styles.border}
        strokeWidth="1"
        width="347"
        x="40"
        y="104"
      />
      <DottedBackground />

      <circle cx="76" cy="146" fill="#F1D7C7" r="18" />
      <image href="/images/brokers/trader-avatar.png" height="36" width="36" x="58" y="128" />
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="16"
        fontWeight="600"
        x="105"
        y="148"
      >
        Trader
      </text>

      <rect fill={styles.blue} height="40" rx="20" width="240" x="104" y="164" />
      <text
        fill="white"
        fontFamily="Urbanist, sans-serif"
        fontSize="15"
        fontWeight="500"
        x="120"
        y="189"
      >
        Why is my deposit still pending?
      </text>

      <Pill x={62} y={245} width={145} height={34} text="AI detected intent" />
      <Pill
        x={267}
        y={245}
        width={112}
        height={34}
        text="Deposit Status"
        fill={styles.blueSoft}
        stroke="rgba(66,104,255,0.2)"
        textColor={styles.blue}
      />
      <path
        d="M208 262C232 262 232 262 257 262"
        stroke={styles.blue}
        strokeDasharray="6 6"
        strokeWidth="2"
      />
      <circle cx="208" cy="262" fill={styles.blue} r="3.5" />
      <circle cx="257" cy="262" fill={styles.blue} r="3.5" />

      <text fill={styles.textMuted} fontFamily="Urbanist, sans-serif" fontSize="14" x="40" y="368">
        Resolution
      </text>
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="16"
        fontWeight="600"
        textAnchor="end"
        x="387"
        y="368"
      >
        Deposit confirmed
      </text>
      <text fill={styles.textMuted} fontFamily="Urbanist, sans-serif" fontSize="14" x="40" y="399">
        Processing time
      </text>
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="16"
        fontWeight="600"
        textAnchor="end"
        x="387"
        y="399"
      >
        3 minutes
      </text>
    </BaseSvg>
  );
}

export function RoutingPanelVisual({ className }: SvgProps) {
  return (
    <BaseSvg className={className}>
      <rect fill={styles.panelSoft} height="427" rx="24" width="427" />
      <SurfaceCard x={46} y={76} width={335} height={246} rx={20} />
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="24"
        fontWeight="600"
        x="68"
        y="126"
      >
        Routing Panel
      </text>
      <Pill
        x={250}
        y={96}
        width={111}
        height={34}
        text="Incoming call detected"
        fill={styles.blueSoft}
        stroke="rgba(66,104,255,0.2)"
        textColor={styles.blue}
        fontSize={15}
      />

      <text fill={styles.textMuted} fontFamily="Urbanist, sans-serif" fontSize="14" x="68" y="170">
        Account Tier
      </text>
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="16"
        fontWeight="600"
        textAnchor="end"
        x="363"
        y="170"
      >
        VIP
      </text>
      <text fill={styles.textMuted} fontFamily="Urbanist, sans-serif" fontSize="14" x="68" y="196">
        Instrument
      </text>
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="16"
        fontWeight="600"
        textAnchor="end"
        x="363"
        y="196"
      >
        Crypto Futures
      </text>
      <text fill={styles.textMuted} fontFamily="Urbanist, sans-serif" fontSize="14" x="68" y="222">
        Urgency
      </text>
      <text
        fill={styles.red}
        fontFamily="Urbanist, sans-serif"
        fontSize="16"
        fontWeight="600"
        textAnchor="end"
        x="363"
        y="222"
      >
        High
      </text>
      <rect fill="rgba(83,86,98,0.15)" height="1" width="295" x="68" y="248" />
      <Pill x={68} y={278} width={112} height={34} text="Routing result" />
      <Pill
        x={248}
        y={312}
        width={118}
        height={34}
        text="Senior Trading Desk"
        fill={styles.greenSoft}
        stroke="rgba(40,188,98,0.1)"
        textColor={styles.green}
        fontSize={15}
      />
      <path
        d="M180 295C228 295 214 329 248 329"
        stroke={styles.blue}
        strokeDasharray="6 6"
        strokeWidth="2"
      />
      <circle cx="180" cy="295" fill={styles.blue} r="3.5" />
      <circle cx="248" cy="329" fill={styles.blue} r="3.5" />

      <SurfaceCard x={18} y={318} width={86} height={90} rx={20} />
      <text
        fill={styles.green}
        fontFamily="Urbanist, sans-serif"
        fontSize="18"
        fontWeight="600"
        x="36"
        y="360"
      >
        1.2 sec
      </text>
      <text fill={styles.textMuted} fontFamily="Urbanist, sans-serif" fontSize="14" x="36" y="386">
        Routing time
      </text>
    </BaseSvg>
  );
}

export function VerificationPathVisual({ className }: SvgProps) {
  return (
    <BaseSvg className={className}>
      <rect fill={styles.panelSoft} height="427" rx="24" width="427" />
      <SurfaceCard x={73} y={93} width={281} height={281} rx={18} />
      <rect
        fill={styles.panel}
        height="300"
        opacity="0.8"
        rx="16"
        stroke={styles.border}
        width="300"
        x="60"
        y="104"
      />
      <rect
        fill={styles.panel}
        height="320"
        opacity="0.5"
        rx="14"
        stroke={styles.border}
        width="320"
        x="50"
        y="114"
      />

      <Pill x={237} y={131} width={108} height={34} text="Verification" />
      <Pill x={83} y={204} width={166} height={38} text="Intent detected" />
      <Pill
        x={214}
        y={302}
        width={136}
        height={44}
        text="Issue resolved"
        fill={styles.blueSoft}
        stroke="rgba(66,104,255,0.2)"
        textColor={styles.blue}
        fontSize={18}
      />

      <path
        d="M241 148C189 148 190 168 190 204"
        stroke={styles.blue}
        strokeDasharray="6 6"
        strokeWidth="2"
      />
      <path
        d="M249 223C283 223 282 302 214 324"
        stroke={styles.blue}
        strokeDasharray="6 6"
        strokeWidth="2"
      />
      <circle cx="241" cy="148" fill={styles.blue} r="3.5" />
      <circle cx="249" cy="223" fill={styles.blue} r="3.5" />
    </BaseSvg>
  );
}

export function InfrastructureVisual({ className }: SvgProps) {
  return (
    <BaseSvg className={className}>
      <rect fill={styles.panelSoft} height="427" rx="24" width="427" />
      <DottedBackground />
      <Pill
        x={146}
        y={51}
        width={135}
        height={44}
        text="Infrastructure"
        fill={styles.blue}
        stroke={styles.blue}
        textColor="white"
        fontSize={18}
        fontWeight={600}
      />

      <path
        d="M214 96V155M214 155C150 155 120 155 104 181M214 155C278 155 304 155 320 181M214 155C214 212 214 212 150 288M214 155C214 236 214 236 280 300"
        stroke={styles.blue}
        strokeDasharray="6 6"
        strokeWidth="2"
      />
      <circle cx="214" cy="155" fill={styles.blue} r="3.5" />

      <StatCard x={26} y={196} title="92%" subtitleLines={['Deposit / Withdrawal', 'resolution']} />
      <StatCard x={272} y={208} title="Encrypted" subtitleLines={['Secure', 'communication']} />
      <StatCard x={90} y={291} title="Active" subtitleLines={['AI agent financial', 'knowledge']} />
      <StatCard x={240} y={310} title="MT4 / MT5" subtitleLines={['Platform integration']} />
    </BaseSvg>
  );
}

export function EcosystemVisual({ className }: SvgProps) {
  return (
    <BaseSvg className={className}>
      <rect fill={styles.panelSoft} height="427" rx="24" width="427" />
      <DottedBackground />
      <Pill
        x={92}
        y={46}
        width={244}
        height={44}
        text="Ecosystem Integrations"
        fontSize={20}
        fontWeight={600}
      />

      <Pill x={36} y={160} width={78} height={38} text="MT4/5" />
      <Pill x={152} y={196} width={70} height={38} text="CRM" />
      <Pill x={263} y={156} width={122} height={38} text="Internal API" />
      <Pill x={226} y={224} width={152} height={38} text="Payment Gateway" />

      <path
        d="M214 90V122M214 122C118 122 76 122 74 160M214 122C187 122 187 166 187 196M214 122C316 122 324 122 324 156M214 122C266 122 302 122 302 224"
        stroke={styles.blue}
        strokeDasharray="6 6"
        strokeWidth="2"
      />
      <circle cx="214" cy="122" fill={styles.blue} r="3.5" />

      <path
        d="M74 198V301M187 234V343M324 194V344M302 262V304"
        stroke={styles.green}
        strokeDasharray="6 6"
        strokeWidth="2"
      />
      <circle cx="74" cy="198" fill={styles.green} r="3.5" />
      <circle cx="187" cy="234" fill={styles.green} r="3.5" />
      <circle cx="324" cy="194" fill={styles.green} r="3.5" />
      <circle cx="302" cy="262" fill={styles.green} r="3.5" />

      <Pill
        x={24}
        y={301}
        width={113}
        height={38}
        text="Connected"
        fill={styles.greenSoft}
        stroke="rgba(40,188,98,0.1)"
        textColor={styles.green}
      />
      <image href="/images/brokers/checkmark-circle.svg" height="20" width="20" x="37" y="310" />

      <Pill
        x={132}
        y={344}
        width={113}
        height={38}
        text="Connected"
        fill={styles.greenSoft}
        stroke="rgba(40,188,98,0.1)"
        textColor={styles.green}
      />
      <image href="/images/brokers/checkmark-circle.svg" height="20" width="20" x="145" y="353" />

      <Pill
        x={231}
        y={304}
        width={113}
        height={38}
        text="Connected"
        fill={styles.greenSoft}
        stroke="rgba(40,188,98,0.1)"
        textColor={styles.green}
      />
      <image href="/images/brokers/checkmark-circle.svg" height="20" width="20" x="244" y="313" />

      <Pill
        x={290}
        y={344}
        width={113}
        height={38}
        text="Connected"
        fill={styles.greenSoft}
        stroke="rgba(40,188,98,0.1)"
        textColor={styles.green}
      />
      <image href="/images/brokers/checkmark-circle.svg" height="20" width="20" x="303" y="353" />
    </BaseSvg>
  );
}

export function BrokerSupportVisual({ className }: SvgProps) {
  return (
    <BaseSvg className={className}>
      <rect fill={styles.panelSoft} height="427" rx="24" width="427" />
      <SurfaceCard x={48} y={104} width={331} height={278} rx={20} />
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="24"
        fontWeight="600"
        x="72"
        y="145"
      >
        Broker Support
      </text>

      {[
        { x: 72, y: 176, value: '124', label: 'Password reset calls' },
        { x: 226, y: 176, value: '88', label: 'Deposit confirmations' },
        { x: 72, y: 255, value: '88', label: 'Deposit confirmations' },
        { x: 226, y: 255, value: '56', label: 'Platform help' },
      ].map((item) => (
        <g key={`${item.x}-${item.y}`}>
          <rect
            fill={styles.panel}
            height="62"
            rx="18"
            stroke={styles.border}
            width="128"
            x={item.x}
            y={item.y}
          />
          <text
            fill={styles.text}
            fontFamily="Urbanist, sans-serif"
            fontSize="18"
            fontWeight="600"
            textAnchor="middle"
            x={item.x + 64}
            y={item.y + 27}
          >
            {item.value}
          </text>
          <text
            fill={styles.textMuted}
            fontFamily="Urbanist, sans-serif"
            fontSize="13"
            textAnchor="middle"
            x={item.x + 64}
            y={item.y + 48}
          >
            {item.label}
          </text>
        </g>
      ))}

      <rect fill="rgba(83,86,98,0.15)" height="1" width="287" x="72" y="332" />
      <text fill={styles.textMuted} fontFamily="Urbanist, sans-serif" fontSize="14" x="72" y="364">
        Active AI agents
      </text>
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="16"
        fontWeight="600"
        textAnchor="end"
        x="359"
        y="364"
      >
        32
      </text>

      <Pill
        x={72}
        y={380}
        width={162}
        height={34}
        text="Handling routine requests"
        fill={styles.blueSoft}
        stroke="rgba(66,104,255,0.2)"
        textColor={styles.blue}
        fontSize={15}
      />
    </BaseSvg>
  );
}

export function CallVolumeVisual({ className }: SvgProps) {
  return (
    <BaseSvg className={className}>
      <rect fill={styles.panelSoft} height="427" rx="24" width="427" />
      <SurfaceCard x={48} y={78} width={331} height={299} rx={20} />
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="24"
        fontWeight="600"
        x="72"
        y="121"
      >
        Call Volume Scaling
      </text>
      <Pill
        x={72}
        y={138}
        width={178}
        height={34}
        text="High-volume infrastructure"
        fill={styles.blueSoft}
        stroke="rgba(66,104,255,0.2)"
        textColor={styles.blue}
      />

      <path
        d="M72 354C136 326 184 299 230 250C262 216 292 184 379 122V377H72V354Z"
        fill="rgba(66,104,255,0.12)"
      />
      <path
        d="M72 354C136 326 184 299 230 250C262 216 292 184 379 122"
        stroke={styles.blue}
        strokeWidth="2"
      />
      <line stroke={styles.blue} strokeWidth="2" x1="295" x2="295" y1="205" y2="376" />
      <circle cx="295" cy="205" fill={styles.blue} r="8" stroke="white" strokeWidth="4" />

      <rect fill={styles.text} height="34" rx="17" width="90" x="252" y="178" />
      <text
        fill="white"
        fontFamily="Urbanist, sans-serif"
        fontSize="16"
        textAnchor="middle"
        x="297"
        y="200"
      >
        3,200 calls
      </text>
    </BaseSvg>
  );
}

export function MultilingualVisual({ className }: SvgProps) {
  return (
    <BaseSvg className={className}>
      <rect fill={styles.panelSoft} height="427" rx="24" width="427" />
      <SurfaceCard x={46} y={30} width={335} height={367} rx={22} />
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="24"
        fontWeight="600"
        x="72"
        y="72"
      >
        Multilingual AI
      </text>
      <text fill={styles.textMuted} fontFamily="Urbanist, sans-serif" fontSize="14" x="72" y="95">
        Languages Supported
      </text>
      <text
        fill={styles.green}
        fontFamily="Urbanist, sans-serif"
        fontSize="22"
        fontWeight="600"
        textAnchor="end"
        x="360"
        y="94"
      >
        30+
      </text>

      <ellipse
        cx="214"
        cy="246"
        fill="none"
        rx="102"
        ry="85"
        stroke="rgba(12,16,33,0.06)"
        strokeWidth="18"
      />
      <ellipse
        cx="214"
        cy="246"
        fill="none"
        rx="102"
        ry="85"
        stroke="rgba(12,16,33,0.03)"
        strokeDasharray="2 8"
        strokeWidth="36"
      />

      {[
        { x: 104, y: 152, width: 102, text: 'English', flag: 'UK', flagFill: '#E9EEFF' },
        { x: 191, y: 112, width: 104, text: 'French', flag: 'FR', flagFill: '#FFE5EF' },
        { x: 272, y: 182, width: 106, text: 'Spanish', flag: 'ES', flagFill: '#FFF3E1' },
        { x: 245, y: 261, width: 114, text: 'Chinese', flag: 'CN', flagFill: '#FFE5E5' },
        { x: 94, y: 286, width: 106, text: 'German', flag: 'DE', flagFill: '#F4F4F4' },
        { x: 189, y: 330, width: 132, text: 'Portuguese', flag: 'PT', flagFill: '#E7F9EC' },
        { x: 140, y: 222, width: 110, text: 'Japanese', flag: 'JP', flagFill: '#FFF5F5' },
      ].map((item) => (
        <g key={item.text}>
          <rect
            fill="#F5F6F6"
            height="36"
            rx="18"
            stroke={styles.borderStrong}
            width={item.width}
            x={item.x}
            y={item.y}
          />
          <circle
            cx={item.x + 20}
            cy={item.y + 18}
            fill={item.flagFill}
            r="10"
            stroke="white"
            strokeWidth="2"
          />
          <text
            fill={styles.text}
            fontFamily="Urbanist, sans-serif"
            fontSize="12"
            fontWeight="600"
            textAnchor="middle"
            x={item.x + 20}
            y={item.y + 22}
          >
            {item.flag}
          </text>
          <text
            fill={styles.text}
            fontFamily="Urbanist, sans-serif"
            fontSize="15"
            x={item.x + 38}
            y={item.y + 23}
          >
            {item.text}
          </text>
        </g>
      ))}
    </BaseSvg>
  );
}

export function OperationsScalingVisual({ className }: SvgProps) {
  return (
    <BaseSvg className={className}>
      <rect fill={styles.panelSoft} height="427" rx="24" width="427" />
      <SurfaceCard x={46} y={78} width={335} height={299} rx={20} />
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="24"
        fontWeight="600"
        x="76"
        y="122"
      >
        AI Voice Agents scaling
      </text>
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="24"
        fontWeight="600"
        x="76"
        y="150"
      >
        operations
      </text>

      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          stroke="rgba(0,40,82,0.08)"
          x1="72"
          x2="360"
          y1={196 + i * 45}
          y2={196 + i * 45}
        />
      ))}
      <line stroke="rgba(0,40,82,0.08)" x1="72" x2="72" y1="165" y2="333" />
      <line stroke="rgba(0,40,82,0.08)" x1="360" x2="360" y1="165" y2="333" />

      <path
        d="M72 270C130 265 176 260 224 255C272 251 312 235 360 182"
        stroke="#8E46FF"
        strokeWidth="2.5"
      />
      <path
        d="M72 300C140 295 194 287 236 283C282 279 320 280 360 288"
        stroke={styles.blue}
        strokeWidth="2.5"
      />
      <line stroke="#8E46FF" strokeWidth="1.5" x1="265" x2="265" y1="237" y2="332" />
      <line stroke={styles.blue} strokeWidth="1.5" x1="188" x2="188" y1="283" y2="332" />
      <circle cx="265" cy="237" fill="#8E46FF" r="8" stroke="white" strokeWidth="4" />
      <circle cx="188" cy="283" fill={styles.blue} r="8" stroke="white" strokeWidth="4" />

      <rect fill={styles.text} height="34" rx="17" width="126" x="214" y="203" />
      <text
        fill="white"
        fontFamily="Urbanist, sans-serif"
        fontSize="16"
        textAnchor="middle"
        x="277"
        y="225"
      >
        Human staffing cost
      </text>
      <rect fill={styles.text} height="34" rx="17" width="124" x="150" y="252" />
      <text
        fill="white"
        fontFamily="Urbanist, sans-serif"
        fontSize="16"
        textAnchor="middle"
        x="212"
        y="274"
      >
        AI automation cost
      </text>

      <text fill={styles.textMuted} fontFamily="Urbanist, sans-serif" fontSize="14" x="72" y="362">
        Operational cost reduced
      </text>
      <text
        fill={styles.green}
        fontFamily="Urbanist, sans-serif"
        fontSize="22"
        fontWeight="600"
        textAnchor="end"
        x="360"
        y="362"
      >
        -42%
      </text>
    </BaseSvg>
  );
}
