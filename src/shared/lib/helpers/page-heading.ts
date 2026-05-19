export function getPageHeadingFromPath(pathname: string): string {
  if (!pathname || pathname === '/') return 'Coldi Brand-Tuned AI Talkers';

  if (pathname === '/about') return 'Expert AI Calling Solutions Provider';
  if (pathname === '/news') return 'AI Calling & Industry News';
  if (pathname === '/products') return 'Our Voice Agents and Solutions';
  if (pathname === '/pricing') return 'Pricing';
  if (pathname === '/voices') return 'Meet Coldi Voices - Real AI Call Agents in Action';
  if (pathname === '/calendar') return 'Book a demo with us';
  if (pathname === '/demo') return 'Coldi Demo - Try Real AI Call Agents Live';
  if (pathname === '/coldi-in-action') return 'Listen to Recorded Calls';
  if (pathname === '/call-request') return 'Request a Call or Demo';
  if (pathname === '/meettheteam') return 'Meet the team';
  if (pathname === '/legal') return 'Coldi Live';
  if (pathname === '/agro-industry') return 'Lead Qualification in the Global Agro-Industry';
  if (pathname === '/hvac-leads') return 'High-Volume Lead Re-engagement for SaaS and HVAC';
  if (pathname === '/helios') return 'How Helios Cut Costs by 30% & Scaled with AI';
  if (pathname === '/turn-leads-into-meetings' || pathname === '/turn-leads-into-meetings-2') {
    return 'Turn Leads into Meetings';
  }

  if (pathname.startsWith('/products/outbound-calling')) {
    return 'Outbound Calling AI Agents for Sales Teams';
  }

  if (pathname.startsWith('/products/inbound-calling')) {
    return 'Inbound Calling AI Agents';
  }

  if (pathname.startsWith('/products/agent-development')) {
    return 'AI Agent Development';
  }

  if (pathname.startsWith('/products/customer-service-agent')) {
    return 'AI Customer Service & Support Solutions';
  }

  if (pathname.startsWith('/products/ai-for-quality-control')) {
    return 'AI for Quality Control';
  }

  if (pathname.startsWith('/products/voip-phone-service')) {
    return 'VoIP Phone Service for Business';
  }

  if (pathname.startsWith('/industries/healthcare')) {
    return 'AI Agents in Healthcare';
  }

  if (pathname.startsWith('/industries/insurance')) {
    return 'AI Insurance Agents';
  }

  if (pathname.startsWith('/industries/real-estate')) {
    return 'AI Real Estate Agents';
  }

  if (pathname.startsWith('/industries/call-center')) {
    return 'AI for Call Centers';
  }

  if (pathname.startsWith('/industries/fx-brokers')) {
    return 'AI Agents for Brokers';
  }

  if (pathname.startsWith('/industries/debt-collection')) {
    return 'AI Agents for Debt Collection';
  }

  if (pathname.startsWith('/industries')) {
    return 'Industries';
  }

  if (pathname.startsWith('/news/')) {
    return 'AI Calling & Industry News';
  }

  return 'Coldi';
}
