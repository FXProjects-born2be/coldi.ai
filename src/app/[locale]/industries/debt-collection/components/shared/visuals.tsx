type WhyVisualKey =
  | 'managed'
  | 'conversations'
  | 'payments'
  | 'routing'
  | 'logging'
  | 'compliance'
  | 'multilingual';

type ContentCardIconKey = 'first-call' | 'brain' | 'voice' | 'chart' | 'globe' | 'speed';

type SvgProps = {
  className?: string;
};

const styles = {
  blue: '#4268FF',
  blueSoft: '#E9EEFF',
  text: '#0C1021',
  textMuted: '#535662',
  border: '#E8EBF5',
  panel: '#FFFFFF',
  panelSoft: '#FAFAFA',
  green: '#33C46B',
  orange: '#FFB54D',
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

function Badge({
  x,
  y,
  width,
  label,
  color = styles.blueSoft,
}: {
  x: number;
  y: number;
  width: number;
  label: string;
  color?: string;
}) {
  return (
    <>
      <rect fill={color} height="34" rx="17" stroke={styles.border} width={width} x={x} y={y} />
      <circle cx={x + 18} cy={y + 17} fill={styles.blue} r="6" />
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="14"
        fontWeight="500"
        x={x + 34}
        y={y + 21}
      >
        {label}
      </text>
    </>
  );
}

function ManagedVisual() {
  return (
    <BaseSvg>
      <rect
        fill={styles.panel}
        height="299"
        rx="36"
        stroke={styles.border}
        width="299"
        x="64"
        y="64"
      />
      <rect fill={styles.blueSoft} height="36" rx="18" width="152" x="137.5" y="94" />
      <circle cx="158.5" cy="112" fill={styles.green} r="6" />
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="15"
        fontWeight="600"
        x="174.5"
        y="117"
      >
        Connected
      </text>
      <rect fill={styles.panelSoft} height="170" rx="20" width="111" x="94" y="150" />
      <rect fill={styles.panelSoft} height="170" rx="20" width="111" x="222" y="150" />
      <text fill={styles.textMuted} fontFamily="Urbanist, sans-serif" fontSize="14" x="112" y="177">
        Setup handled
      </text>
      <rect fill={styles.blue} height="8" rx="4" width="74" x="112" y="192" />
      <rect fill="#D6DEF8" height="8" rx="4" width="74" x="112" y="214" />
      <rect fill="#D6DEF8" height="8" rx="4" width="58" x="112" y="236" />
      <rect fill="#D6DEF8" height="8" rx="4" width="82" x="112" y="258" />
      <circle cx="112" cy="294" fill={styles.green} r="6" />
      <text fill={styles.textMuted} fontFamily="Urbanist, sans-serif" fontSize="13" x="126" y="299">
        AI logic managed
      </text>
      <text fill={styles.textMuted} fontFamily="Urbanist, sans-serif" fontSize="14" x="240" y="177">
        Recovery rate
      </text>
      <rect fill="#DCE4FF" height="76" rx="12" width="18" x="246" y="214" />
      <rect fill="#B9C9FF" height="98" rx="12" width="18" x="272" y="192" />
      <rect fill={styles.blue} height="124" rx="12" width="18" x="298" y="166" />
      <Badge label="CRM linked" width={116} x={148} y={336} />
    </BaseSvg>
  );
}

function ConversationsVisual() {
  return (
    <BaseSvg>
      <rect
        fill={styles.panel}
        height="299"
        rx="36"
        stroke={styles.border}
        width="299"
        x="64"
        y="64"
      />
      <Badge label="Connected" width={122} x={151} y={94} />
      <rect fill={styles.blueSoft} height="52" rx="22" width="212" x="108" y="165" />
      <text fill={styles.text} fontFamily="Urbanist, sans-serif" fontSize="15" x="132" y="196">
        I can not pay the full amount today.
      </text>
      <circle cx="332" cy="191" fill="#D9DEEB" r="24" />
      <rect fill={styles.panelSoft} height="66" rx="26" width="216" x="95" y="233" />
      <circle cx="119" cy="257" fill={styles.blue} r="24" />
      <path
        d="M109 257L116 264L129 250"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <text fill={styles.text} fontFamily="Urbanist, sans-serif" fontSize="15" x="151" y="258">
        We can offer a payment plan.
      </text>
      <text fill={styles.text} fontFamily="Urbanist, sans-serif" fontSize="15" x="151" y="278">
        Would you like to schedule it?
      </text>
      <Badge label="Payment discussion" width={176} x={125.5} y={327} />
    </BaseSvg>
  );
}

function PaymentsVisual() {
  return (
    <BaseSvg>
      <rect
        fill={styles.panel}
        height="299"
        rx="36"
        stroke={styles.border}
        width="299"
        x="64"
        y="64"
      />
      <Badge label="Payment plan" width={136} x={145.5} y={94} />
      <rect fill={styles.panelSoft} height="142" rx="24" width="205" x="111" y="154" />
      <text fill={styles.textMuted} fontFamily="Urbanist, sans-serif" fontSize="14" x="133" y="186">
        Outstanding balance
      </text>
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="28"
        fontWeight="600"
        x="133"
        y="223"
      >
        $1,420
      </text>
      <rect fill="#EEF2FF" height="10" rx="5" width="164" x="133" y="241" />
      <rect fill={styles.blue} height="10" rx="5" width="98" x="133" y="241" />
      <rect fill={styles.blue} height="40" rx="14" width="80" x="133" y="266" />
      <rect
        fill={styles.panel}
        height="40"
        rx="14"
        stroke={styles.border}
        width="80"
        x="222"
        y="266"
      />
      <text
        fill="white"
        fontFamily="Urbanist, sans-serif"
        fontSize="14"
        fontWeight="600"
        x="154"
        y="291"
      >
        Pay now
      </text>
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="14"
        fontWeight="600"
        x="240"
        y="291"
      >
        Plan
      </text>
      <rect fill="#FFF6E5" height="34" rx="17" width="126" x="150.5" y="324" />
      <circle cx="168.5" cy="341" fill={styles.orange} r="6" />
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="14"
        fontWeight="500"
        x="184.5"
        y="346"
      >
        Secure payment
      </text>
    </BaseSvg>
  );
}

function RoutingVisual() {
  return (
    <BaseSvg>
      <rect
        fill={styles.panel}
        height="299"
        rx="36"
        stroke={styles.border}
        width="299"
        x="64"
        y="64"
      />
      <text
        fill={styles.textMuted}
        fontFamily="Urbanist, sans-serif"
        fontSize="16"
        fontWeight="500"
        x="149"
        y="112"
      >
        Incoming call
      </text>
      <circle cx="213.5" cy="211.5" fill={styles.blueSoft} r="62" stroke={styles.border} />
      <circle cx="213.5" cy="211.5" fill={styles.blue} r="28" />
      <path
        d="M205 212L212 219L224 205"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <path d="M213.5 149V122" stroke="#CBD3EA" strokeWidth="3" />
      <path d="M159 177L124 158" stroke="#CBD3EA" strokeWidth="3" />
      <path d="M268 177L302 158" stroke="#CBD3EA" strokeWidth="3" />
      <path d="M213.5 274V307" stroke="#CBD3EA" strokeWidth="3" />
      <Badge label="Sentiment" width={118} x={154.5} y={96} />
      <Badge label="Risk analysis" width={132} x={76} y={155} />
      <Badge label="Routing decision" width={152} x={199} y={155} />
      <Badge label="AI triage engine" width={156} x={135.5} y={306} />
    </BaseSvg>
  );
}

function LoggingVisual() {
  return (
    <BaseSvg>
      <rect
        fill={styles.panel}
        height="299"
        rx="36"
        stroke={styles.border}
        width="299"
        x="64"
        y="64"
      />
      <Badge label="CRM updated" width={136} x={145.5} y={94} />
      <rect fill={styles.panelSoft} height="166" rx="24" width="150" x="92" y="152" />
      <rect fill={styles.panelSoft} height="166" rx="24" width="91" x="251" y="152" />
      <text fill={styles.textMuted} fontFamily="Urbanist, sans-serif" fontSize="14" x="113" y="179">
        Borrower profile
      </text>
      <rect fill="#DCE4FF" height="10" rx="5" width="108" x="113" y="196" />
      <rect fill="#E9EDF7" height="8" rx="4" width="98" x="113" y="219" />
      <rect fill="#E9EDF7" height="8" rx="4" width="92" x="113" y="239" />
      <rect fill="#E9EDF7" height="8" rx="4" width="84" x="113" y="259" />
      <rect fill="#E9EDF7" height="8" rx="4" width="74" x="113" y="279" />
      <text fill={styles.textMuted} fontFamily="Urbanist, sans-serif" fontSize="14" x="269" y="179">
        Audit trail
      </text>
      <rect fill={styles.blue} height="44" rx="14" width="47" x="273" y="242" />
      <rect fill="#DCE4FF" height="28" rx="14" width="47" x="273" y="202" />
      <Badge label="Case synced" width={122} x={152.5} y={330} />
    </BaseSvg>
  );
}

function ComplianceVisual() {
  return (
    <BaseSvg>
      <rect
        fill={styles.panel}
        height="299"
        rx="36"
        stroke={styles.border}
        width="299"
        x="64"
        y="64"
      />
      <rect fill={styles.blueSoft} height="240" rx="30" width="136" x="91" y="94" />
      <rect
        fill={styles.panel}
        height="212"
        rx="24"
        stroke={styles.border}
        width="108"
        x="105"
        y="108"
      />
      <circle cx="159" cy="138" fill="#DCE4FF" r="18" />
      <path
        d="M151 138L157 144L167 132"
        stroke={styles.blue}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <rect fill="#EEF2FF" height="10" rx="5" width="64" x="127" y="172" />
      <rect fill="#EEF2FF" height="10" rx="5" width="58" x="127" y="192" />
      <rect fill="#EEF2FF" height="10" rx="5" width="70" x="127" y="212" />
      <Badge label="Identity verified" width={164} x={209} y={132} />
      <Badge label="Call recorded" width={142} x={209} y={182} />
      <Badge label="Compliant script" width={154} x={209} y={232} />
      <Badge label="Audit ready" width={122} x={209} y={282} />
    </BaseSvg>
  );
}

function MultilingualVisual({ className }: SvgProps) {
  return (
    <BaseSvg className={className}>
      <rect
        fill={styles.panel}
        height="299"
        rx="36"
        stroke={styles.border}
        width="299"
        x="64"
        y="64"
      />
      <circle cx="213.5" cy="214" fill={styles.blueSoft} r="90" stroke={styles.border} />
      <ellipse cx="213.5" cy="214" rx="90" ry="34" stroke={styles.blue} strokeWidth="3" />
      <ellipse cx="213.5" cy="214" rx="36" ry="90" stroke={styles.blue} strokeWidth="3" />
      <path d="M123 214H304" stroke={styles.blue} strokeWidth="3" />
      <path d="M133 171C173 186 254 186 294 171" stroke={styles.blue} strokeWidth="3" />
      <path d="M133 257C173 242 254 242 294 257" stroke={styles.blue} strokeWidth="3" />
      <Badge label="EN" width={72} x={178} y={92} />
      <Badge label="ES" width={72} x={95} y={192} />
      <Badge label="DE" width={72} x={260} y={192} />
      <Badge label="FR" width={72} x={178} y={314} />
    </BaseSvg>
  );
}

export function DebtCollectionWhyVisual({
  variant,
  className,
}: {
  variant: WhyVisualKey;
  className?: string;
}) {
  switch (variant) {
    case 'managed':
      return <ManagedVisual />;
    case 'conversations':
      return <ConversationsVisual />;
    case 'payments':
      return <PaymentsVisual />;
    case 'routing':
      return <RoutingVisual />;
    case 'logging':
      return <LoggingVisual />;
    case 'compliance':
      return <ComplianceVisual />;
    case 'multilingual':
      return <MultilingualVisual className={className} />;
    default:
      return null;
  }
}

function PhoneCheckIcon({ className }: SvgProps) {
  return (
    <BaseSvg className={className} viewBox="0 0 80 80">
      <rect fill={styles.blue} height="80" rx="40" width="80" />
      <path
        d="M28 26C28 24.9 28.9 24 30 24H35L38 32L34 35C35.8 38.4 38.6 41.2 42 43L45 39L53 42V47C53 48.1 52.1 49 51 49H49C37.4 49 28 39.6 28 28V26Z"
        fill="white"
      />
      <path
        d="M48 28L52 32L58 25"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
    </BaseSvg>
  );
}

function BrainIcon({ className }: SvgProps) {
  return (
    <BaseSvg className={className} viewBox="0 0 80 80">
      <rect fill={styles.blue} height="80" rx="40" width="80" />
      <path
        d="M31 27C27.7 27 25 29.7 25 33C25 35.2 26.2 37.1 28 38.1V42C28 45.9 31.1 49 35 49H45C48.9 49 52 45.9 52 42V38.1C53.8 37.1 55 35.2 55 33C55 29.7 52.3 27 49 27C47.5 27 46.1 27.6 45 28.6C43.8 26.4 41.1 25 38 25C34.9 25 32.2 26.4 31 28.6C29.9 27.6 28.5 27 27 27"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <path d="M40 30V48M34 34H40M40 40H46" stroke="white" strokeLinecap="round" strokeWidth="3" />
    </BaseSvg>
  );
}

function VoiceIcon({ className }: SvgProps) {
  return (
    <BaseSvg className={className} viewBox="0 0 80 80">
      <rect fill={styles.blue} height="80" rx="40" width="80" />
      <path
        d="M25 30C25 27.8 26.8 26 29 26H51C53.2 26 55 27.8 55 30V44C55 46.2 53.2 48 51 48H39L31 54V48H29C26.8 48 25 46.2 25 44V30Z"
        fill="white"
      />
      <path d="M34 33H46M34 39H42" stroke={styles.blue} strokeLinecap="round" strokeWidth="3" />
    </BaseSvg>
  );
}

function ChartIcon({ className }: SvgProps) {
  return (
    <BaseSvg className={className} viewBox="0 0 80 80">
      <rect fill={styles.blue} height="80" rx="40" width="80" />
      <path d="M26 52H54" stroke="white" strokeLinecap="round" strokeWidth="3" />
      <path
        d="M29 45L36 38L42 42L51 30"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <circle cx="29" cy="45" fill="white" r="3" />
      <circle cx="36" cy="38" fill="white" r="3" />
      <circle cx="42" cy="42" fill="white" r="3" />
      <circle cx="51" cy="30" fill="white" r="3" />
    </BaseSvg>
  );
}

function GlobeIcon({ className }: SvgProps) {
  return (
    <BaseSvg className={className} viewBox="0 0 80 80">
      <rect fill={styles.blue} height="80" rx="40" width="80" />
      <circle cx="40" cy="40" fill="none" r="18" stroke="white" strokeWidth="3" />
      <ellipse cx="40" cy="40" rx="8" ry="18" stroke="white" strokeWidth="3" />
      <path
        d="M22 40H58M25 32C33 35 47 35 55 32M25 48C33 45 47 45 55 48"
        stroke="white"
        strokeWidth="3"
      />
    </BaseSvg>
  );
}

function SpeedIcon({ className }: SvgProps) {
  return (
    <BaseSvg className={className} viewBox="0 0 80 80">
      <rect fill={styles.blue} height="80" rx="40" width="80" />
      <path
        d="M26 48C29 38 37.5 32 48 32C50.8 32 53.5 32.4 56 33.4"
        stroke="white"
        strokeLinecap="round"
        strokeWidth="3"
      />
      <path d="M28 50H52" stroke="white" strokeLinecap="round" strokeWidth="3" />
      <path d="M40 44L50 34" stroke="white" strokeLinecap="round" strokeWidth="3" />
      <circle cx="40" cy="44" fill="white" r="4" />
    </BaseSvg>
  );
}

export function DebtCollectionContentIcon({
  variant,
  className,
}: {
  variant: ContentCardIconKey;
  className?: string;
}) {
  switch (variant) {
    case 'first-call':
      return <PhoneCheckIcon className={className} />;
    case 'brain':
      return <BrainIcon className={className} />;
    case 'voice':
      return <VoiceIcon className={className} />;
    case 'chart':
      return <ChartIcon className={className} />;
    case 'globe':
      return <GlobeIcon className={className} />;
    case 'speed':
      return <SpeedIcon className={className} />;
    default:
      return null;
  }
}
