/**
 * Primary image alt theme per marketing URL (accessibility + SEO).
 * Use {@link imageAlt} to combine with section-specific detail.
 */
export const IMAGE_ALT = {
  home: 'Coldi Brand-Tuned AI Talkers',
  healthcare: 'AI Agents in Healthcare',
  insurance: 'AI Insurance Agents',
  realEstate: 'AI Real Estate Agents',
  callCenter: 'AI for Call Centers',
  fxBrokers: 'AI Agents for Brokers',
  debtCollection: 'AI Agents for Debt Collection',
  outboundCalling: 'AI Outbound Calling',
  inboundCalling: 'AI Inbound Calling',
  agentDevelopment: 'AI Agent Development',
  customerServiceAgent: 'AI Customer Service Agent',
  aiForQualityControl: 'AI for Quality Control',
  voipPhoneService: 'VoIP Phone Service',
  meettheteam: 'Meet the Team',
  residentialServiceAutomation: 'Residential Service Automation',
} as const;

export type ImageAltPage = keyof typeof IMAGE_ALT;

export function imageAlt(page: ImageAltPage, detail?: string): string {
  return `${IMAGE_ALT[page]}${detail ? `` : ''}`;
}
