export interface AIQueryResponse {
  id: string
  question: string
  category: 'Academics' | 'Campus Operations' | 'Career & Skills' | 'Facility Telemetry'
  summary: string
  keyMetrics: { label: string; value: string; detail: string }[]
  recommendations: string[]
  telemetryCitations: string[]
  confidenceScore: number
  generatedAt: string
}

export const defaultPresets: { question: string; category: AIQueryResponse['category'] }[] = [
  {
    question: 'How can I optimize my 8.4 CGPA to reach the 8.8+ Dean’s Honor bracket?',
    category: 'Academics',
  },
  {
    question: 'Where is the quietest study space with high Wi-Fi bandwidth right now?',
    category: 'Facility Telemetry',
  },
  {
    question: 'What is our department’s projected pass rate in Distributed Systems & Cloud?',
    category: 'Academics',
  },
  {
    question: 'How will campus power load behave during the upcoming exam week?',
    category: 'Campus Operations',
  },
  {
    question: 'Which upcoming hackathons or workshops yield required co-curricular credits?',
    category: 'Career & Skills',
  },
]

export function generateMockAiResponse(query: string, category?: string): AIQueryResponse {
  const lower = query.toLowerCase()

  if (lower.includes('cgpa') || lower.includes('gpa') || lower.includes('grade') || lower.includes('dean')) {
    return {
      id: 'res-' + Date.now(),
      question: query,
      category: 'Academics',
      summary:
        'To elevate your cumulative 8.40 CGPA to 8.80+, target a minimum of 9.20 SGPA in the remaining 12 credits of Term 5. Your strongest opportunity lies in raising Database Management Systems (currently 76% score) and maintaining 90%+ in Distributed Systems lab assessments.',
      keyMetrics: [
        { label: 'Current CGPA', value: '8.40 / 10', detail: 'Top 12% in CSE Cohort' },
        { label: 'Target SGPA Required', value: '9.25 SGPA', detail: 'Across remaining 12 credits' },
        { label: 'Key Course Leverage', value: 'CS-505 DBMS', detail: '2 midterm weightage pending' },
      ],
      recommendations: [
        'Attend faculty mentor office hours for CS-505 (Tuesdays 3–5 PM in Turing Hall).',
        'Maintain 85%+ biometric attendance to secure the 5% continuous evaluation buffer.',
        'Submit the Distributed Systems Cloud Milestone 2 project before 8 PM for peak evaluation accuracy.',
      ],
      telemetryCitations: [
        'CSE Term 5 Grade Ledger v2.4',
        'Continuous Assessment Portal Telemetry',
        'Biometric Attendance RFID Feed (82% Verified)',
      ],
      confidenceScore: 97.4,
      generatedAt: 'Just now',
    }
  }

  if (lower.includes('quiet') || lower.includes('study') || lower.includes('library') || lower.includes('space') || lower.includes('seat')) {
    return {
      id: 'res-' + Date.now(),
      question: query,
      category: 'Facility Telemetry',
      summary:
        'Live spatial telemetry indicates the North Quad Study Annex (Floor 2, Pods 201–214) is currently the quietest zone at 34 dB ambient noise, with 42 open seats and full Wi-Fi 6 coverage (140 Mbps throughput).',
      keyMetrics: [
        { label: 'Top Recommended Space', value: 'North Annex Pods', detail: '42 / 60 seats available' },
        { label: 'Ambient Noise Level', value: '34 dBA', detail: 'Pristine quiet study threshold' },
        { label: 'Wi-Fi Signal Strength', value: '-48 dBm', detail: '140 Mbps dedicated link' },
      ],
      recommendations: [
        'Reserve Study Pod #204 via the SmartCampus portal for uninterrupted 3-hour power backup.',
        'Avoid Central Library Level 3 between 2:30 PM and 4:30 PM due to group discussion saturation (94% full).',
      ],
      telemetryCitations: [
        'Acoustic decibel sensor grid node #NX-04',
        'Wi-Fi AP controller telemetry (AP-North-2B)',
        'Smart Door turnstile spatial counter',
      ],
      confidenceScore: 98.2,
      generatedAt: 'Just now',
    }
  }

  if (lower.includes('pass') || lower.includes('exam') || lower.includes('distributed') || lower.includes('fail')) {
    return {
      id: 'res-' + Date.now(),
      question: query,
      category: 'Academics',
      summary:
        'Machine learning projection models estimate a 91.4% passing rate in CS-502 (Distributed Systems & Cloud Architecture), with an average section score of 81.2%. High lab completion scores (88% average) are insulating students from exam variance.',
      keyMetrics: [
        { label: 'Projected Section Pass Rate', value: '91.4%', detail: '+3.2% vs previous academic term' },
        { label: 'Mean Assessment Score', value: '81.2 / 100', detail: '184 students enrolled' },
        { label: 'At-Risk Variance', value: '< 6% cohort', detail: 'Under targeted AI tutoring intervention' },
      ],
      recommendations: [
        'Review the Phase 2 Cloud Deployment rubrics before next Tuesday’s lab examination.',
        'Participate in the peer review sessions organized by the ACM Student Chapter on Thursday.',
      ],
      telemetryCitations: [
        'Institutional Assessment LMS Database',
        'Distributed Systems Course Evaluation Model v4.1',
      ],
      confidenceScore: 95.8,
      generatedAt: 'Just now',
    }
  }

  if (lower.includes('energy') || lower.includes('power') || lower.includes('solar') || lower.includes('consumption') || lower.includes('load')) {
    return {
      id: 'res-' + Date.now(),
      question: query,
      category: 'Campus Operations',
      summary:
        'During next week’s examinations, campus power demand is forecasted to peak at 1.38 MW at 2:00 PM daily. Rooftop solar generation will offset 36% of this load, while automated HVAC pre-cooling will save an estimated 1,200 kWh across all blocks.',
      keyMetrics: [
        { label: 'Forecasted Peak Demand', value: '1.38 MW', detail: 'Peak between 1:30 – 3:30 PM' },
        { label: 'Solar Generation Offset', value: '490 kW (36%)', detail: 'Rooftop photovolatic array' },
        { label: 'Carbon Avoidance', value: '4.8 Tons CO2e', detail: 'Weekly smart grid optimization' },
      ],
      recommendations: [
        'Facilities team has automated pre-cooling in Hall 1 & 2 between 7:30 AM and 8:30 AM to exploit off-peak tariffs.',
        'EV shuttle charging stations will run at restricted 7 kW rate between 1:00 PM and 3:00 PM.',
      ],
      telemetryCitations: [
        'Smart Grid Sub-metering telemetry (Substation Alpha)',
        'Solar Inverter SCADA controller',
        'Weather & Solar Irradiance Station',
      ],
      confidenceScore: 94.1,
      generatedAt: 'Just now',
    }
  }

  // Fallback rich generative synthesis
  return {
    id: 'res-' + Date.now(),
    question: query,
    category: (category as any) || 'Academics',
    summary: `Based on unified telemetry across 480+ campus sensors and your Term 5 academic ledger, the SmartCampus Intelligence system analyzed your query regarding "${query}". Performance indicators and spatial metrics are operating comfortably within high-efficiency target ranges.`,
    keyMetrics: [
      { label: 'System Alignment', value: '98.5% Optimal', detail: 'Within target operational bounds' },
      { label: 'Cohort Comparison', value: 'Above Average', detail: 'Top quartile across telemetry metrics' },
      { label: 'Data Quality Index', value: '482/482 Nodes', detail: 'Zero telemetry packet loss' },
    ],
    recommendations: [
      'Maintain continuous adherence to academic milestone deadlines and biometric attendance standards.',
      'Check the Campus Events feed for peer review groups and technical workshop opportunities.',
      'Consult faculty advisors or AI study modules for targeted course improvements.',
    ],
    telemetryCitations: [
      'SmartCampus Unified Data Warehouse',
      'Campus Spatial Telemetry Grid',
      'Academic Affairs Assessment Node',
    ],
    confidenceScore: 93.6,
    generatedAt: 'Just now',
  }
}
