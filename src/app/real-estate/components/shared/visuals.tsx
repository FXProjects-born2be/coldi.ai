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
  green: '#28bc62',
  greenSoft: 'rgba(61,236,130,0.15)',
  track: '#F1F1F1',
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

export function FirstCallVisual({ className }: SvgProps) {
  return (
    <BaseSvg className={className}>
      <rect
        fill={styles.panel}
        height="380"
        rx="22"
        stroke={styles.border}
        width="380"
        x="24"
        y="24"
      />
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="18"
        fontWeight="600"
        textAnchor="middle"
        x="214"
        y="68"
      >
        First-call resolution performance
      </text>
      {/* Donut chart */}
      <circle cx="214" cy="220" r="100" fill="none" stroke="#E9EEFF" strokeWidth="32" />
      <circle
        cx="214"
        cy="220"
        r="100"
        fill="none"
        stroke={styles.blue}
        strokeWidth="32"
        strokeDasharray="430 200"
        strokeDashoffset="0"
        strokeLinecap="round"
      />
      <circle
        cx="214"
        cy="220"
        r="100"
        fill="none"
        stroke="#B9C9FF"
        strokeWidth="32"
        strokeDasharray="140 490"
        strokeDashoffset="-430"
        strokeLinecap="round"
      />
      {/* Legend panel */}
      <rect
        fill={styles.panel}
        height="90"
        rx="16"
        stroke={styles.border}
        width="220"
        x="270"
        y="185"
      />
      <text fill={styles.textMuted} fontFamily="Urbanist, sans-serif" fontSize="13" x="282" y="212">
        Resolved on first call
      </text>
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="13"
        textAnchor="end"
        x="478"
        y="212"
      >
        68%
      </text>
      <text fill={styles.textMuted} fontFamily="Urbanist, sans-serif" fontSize="13" x="282" y="238">
        Escalated to agent
      </text>
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="13"
        textAnchor="end"
        x="478"
        y="238"
      >
        22%
      </text>
      <text fill={styles.textMuted} fontFamily="Urbanist, sans-serif" fontSize="13" x="282" y="264">
        Follow-up scheduled
      </text>
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="13"
        textAnchor="end"
        x="478"
        y="264"
      >
        10%
      </text>
    </BaseSvg>
  );
}

export function QualifiedLeadsVisual({ className }: SvgProps) {
  return (
    <BaseSvg className={className}>
      <rect
        fill={styles.panel}
        height="200"
        rx="22"
        stroke={styles.border}
        width="380"
        x="24"
        y="114"
      />
      <text fill={styles.text} fontFamily="Urbanist, sans-serif" fontSize="16" x="48" y="148">
        Qualified leads
      </text>
      {/* Progress bar */}
      <rect fill={styles.track} height="22" rx="11" width="336" x="48" y="162" />
      <rect fill={styles.blue} height="22" rx="11" width="218" x="48" y="162" />
      {/* Badge */}
      <rect fill={styles.text} height="32" rx="16" width="60" x="224" y="134" />
      <text
        fill="white"
        fontFamily="Urbanist, sans-serif"
        fontSize="16"
        textAnchor="middle"
        x="254"
        y="155"
      >
        72%
      </text>
      {/* Stats row */}
      <circle cx="58" cy="216" r="5" fill={styles.blue} />
      <text fill={styles.textMuted} fontFamily="Urbanist, sans-serif" fontSize="12" x="70" y="212">
        Completed
      </text>
      <text fill={styles.text} fontFamily="Urbanist, sans-serif" fontSize="14" x="70" y="230">
        72%
      </text>
      <circle cx="160" cy="216" r="5" fill={styles.blue} />
      <text fill={styles.textMuted} fontFamily="Urbanist, sans-serif" fontSize="12" x="172" y="212">
        Lead score
      </text>
      <text fill={styles.text} fontFamily="Urbanist, sans-serif" fontSize="14" x="172" y="230">
        87 / 100
      </text>
      <circle cx="268" cy="216" r="5" fill={styles.blue} />
      <text fill={styles.textMuted} fontFamily="Urbanist, sans-serif" fontSize="12" x="280" y="212">
        Buyer intent
      </text>
      <text fill={styles.green} fontFamily="Urbanist, sans-serif" fontSize="14" x="280" y="230">
        High
      </text>
    </BaseSvg>
  );
}

function BarRow({ label, width, y }: { label: string; width: number; y: number }) {
  return (
    <>
      <text
        fill={styles.textMuted}
        fontFamily="Urbanist, sans-serif"
        fontSize="12"
        x="48"
        y={y + 16}
      >
        {label}
      </text>
      <rect fill={styles.track} height="20" rx="10" width="300" x="90" y={y} />
      <rect fill={styles.blue} height="20" rx="10" width={width} x="90" y={y} />
    </>
  );
}

export function PeakHoursVisual({ className }: SvgProps) {
  return (
    <BaseSvg className={className}>
      <rect
        fill={styles.panel}
        height="360"
        rx="22"
        stroke={styles.border}
        width="380"
        x="24"
        y="34"
      />
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="18"
        fontWeight="600"
        x="48"
        y="72"
      >
        Peak buyer inquiry hours
      </text>
      <text fill={styles.textMuted} fontFamily="Urbanist, sans-serif" fontSize="12" x="48" y="92">
        {'Calls handled by AI - '}
      </text>
      <text fill={styles.blue} fontFamily="Urbanist, sans-serif" fontSize="12" x="166" y="92">
        81%
      </text>
      <BarRow label="Mon" width={84} y={114} />
      <BarRow label="Tue" width={150} y={148} />
      <BarRow label="Wed" width={103} y={182} />
      <BarRow label="Thu" width={131} y={216} />
      <BarRow label="Fri" width={82} y={250} />
      <BarRow label="Sat" width={254} y={284} />
      <BarRow label="Sun" width={198} y={318} />
    </BaseSvg>
  );
}

export function LanguagesVisual({ className }: SvgProps) {
  return (
    <BaseSvg className={className}>
      <rect
        fill={styles.panel}
        height="340"
        rx="22"
        stroke={styles.border}
        width="380"
        x="24"
        y="44"
      />
      <text
        fill={styles.text}
        fontFamily="Urbanist, sans-serif"
        fontSize="18"
        fontWeight="600"
        textAnchor="middle"
        x="214"
        y="84"
      >
        Languages supported
      </text>
      <rect fill="rgba(12,16,33,0.15)" height="1" width="336" x="48" y="100" />
      {/* Flag circles */}
      <circle cx="214" cy="140" r="28" fill="#E3E9FF" />
      <text
        fill={styles.blue}
        fontFamily="Urbanist, sans-serif"
        fontSize="16"
        fontWeight="600"
        textAnchor="middle"
        x="214"
        y="146"
      >
        EN
      </text>
      <circle cx="120" cy="190" r="28" fill="#FFE5E5" />
      <text
        fill="#CC4444"
        fontFamily="Urbanist, sans-serif"
        fontSize="16"
        fontWeight="600"
        textAnchor="middle"
        x="120"
        y="196"
      >
        CN
      </text>
      <circle cx="308" cy="190" r="28" fill="#E5FFE5" />
      <text
        fill="#44AA44"
        fontFamily="Urbanist, sans-serif"
        fontSize="16"
        fontWeight="600"
        textAnchor="middle"
        x="308"
        y="196"
      >
        DE
      </text>
      <circle cx="80" cy="268" r="28" fill="#FFF5E5" />
      <text
        fill="#CC8844"
        fontFamily="Urbanist, sans-serif"
        fontSize="16"
        fontWeight="600"
        textAnchor="middle"
        x="80"
        y="274"
      >
        PT
      </text>
      <circle cx="168" cy="280" r="28" fill="#F5F5F5" />
      <text
        fill={styles.textMuted}
        fontFamily="Urbanist, sans-serif"
        fontSize="16"
        fontWeight="600"
        textAnchor="middle"
        x="168"
        y="286"
      >
        JP
      </text>
      <circle cx="260" cy="280" r="28" fill="#E5E5FF" />
      <text
        fill="#6644CC"
        fontFamily="Urbanist, sans-serif"
        fontSize="16"
        fontWeight="600"
        textAnchor="middle"
        x="260"
        y="286"
      >
        FR
      </text>
      <circle cx="348" cy="268" r="28" fill="#FFECE5" />
      <text
        fill="#CC6644"
        fontFamily="Urbanist, sans-serif"
        fontSize="16"
        fontWeight="600"
        textAnchor="middle"
        x="348"
        y="274"
      >
        ES
      </text>
      <text
        fill={styles.textMuted}
        fontFamily="Urbanist, sans-serif"
        fontSize="16"
        textAnchor="middle"
        x="214"
        y="340"
      >
        and others
      </text>
    </BaseSvg>
  );
}
