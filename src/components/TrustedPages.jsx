import React from 'react';
import { Clock, Search, ChevronDown, ChevronRight, RefreshCw, FileText, Calendar, Eye } from 'lucide-react';
import { PrimaryButton, GhostButton } from './RichListPage';
import CallIntelligenceReport from './CallIntelligenceReport';

const IdBadge = ({ id }) => (
  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', color: '#93c5fd', background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(147, 197, 253, 0.2)', borderRadius: '6px', padding: '4px 10px', display: 'inline-block' }}>{id}</span>
);

const DateCell = ({ date, time }) => (
  <div>
    <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)' }}>{date}</div>
    {time && <div style={{ fontSize: '10px', fontWeight: 600, color: 'var(--muted)' }}>{time}</div>}
  </div>
);

const STATUS_BADGE_COLORS = {
  Cold: { color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)', border: 'rgba(56, 189, 248, 0.3)' },
  Warm: { color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.12)', border: 'rgba(251, 191, 36, 0.3)' },
  Skipped: { color: '#94a3b8', bg: 'rgba(148, 163, 184, 0.12)', border: 'rgba(148, 163, 184, 0.3)' },
  Hot: { color: '#34d399', bg: 'rgba(52, 211, 153, 0.12)', border: 'rgba(52, 211, 153, 0.3)' },
};

const StatusBadge = ({ label }) => {
  const badge = STATUS_BADGE_COLORS[label] || STATUS_BADGE_COLORS.Cold;
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 10px',
      borderRadius: '20px',
      background: badge.bg,
      border: `1px solid ${badge.border}`,
      color: badge.color,
      fontSize: '11px',
      fontWeight: 700
    }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: badge.color }} />
      {label}
    </span>
  );
};

const StarRatingColumn = ({ score, onClick }) => {
  if (score === null || score === undefined) {
    return <span onClick={onClick} style={{ color: 'var(--muted)', fontSize: '13px', cursor: 'pointer' }}>—</span>;
  }
  const color = score < 3.5 ? '#f87171' : '#34d399';
  const fullStars = Math.floor(score);
  const partial = score - fullStars;
  const emptyStars = Math.max(0, 5 - fullStars - (partial > 0 ? 1 : 0));
  const clipId = `star-clip-${String(score).replace('.', '-')}-${Math.random().toString(36).substring(2, 7)}`;

  return (
    <div onClick={onClick} style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <svg key={`full-${i}`} width="13" height="13" viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
      {partial > 0 && (
        <svg key="partial" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5">
          <defs>
            <clipPath id={clipId}>
              <rect x="0" y="0" width={partial * 24} height="24" />
            </clipPath>
          </defs>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill={color} clipPath={`url(#${clipId})`} />
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="none" stroke="#475569" strokeWidth="1.5" />
        </svg>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <svg key={`empty-${i}`} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
      <span style={{ fontSize: '11px', color, fontWeight: 700, marginLeft: '4px' }}>[{score}]</span>
    </div>
  );
};

const TopBorderCard = ({ label, value, color, valueColor }) => (
  <div className="glass" style={{ padding: '16px 18px', borderTop: `2px solid ${color}` }}>
    <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>{label}</div>
    <div style={{ fontSize: '22px', fontWeight: 800, color: valueColor || 'var(--text)' }}>{value}</div>
  </div>
);

const FilterDot = ({ label, color = '#818cf8', active, onClick }) => (
  <div
    onClick={onClick}
    style={{
      display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '20px',
      background: active ? `${color}20` : 'var(--card-bg-alt)',
      border: active ? `1px solid ${color}80` : '1px solid rgba(255,255,255,0.08)',
      color: active ? color : 'var(--dim)',
      fontSize: '11px', fontWeight: active ? 700 : 600, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s ease',
    }}
  >
    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }} />
    {label}
  </div>
);

const toggleInArray = (setter, value) => setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);

const LEAD_STATUS_COLORS = { Hot: '#f87171', Warm: '#fbbf24', Cold: '#38bdf8', Skipped: '#94a3b8' };

/* ---------- ALL CALL RECORDS ---------- */

const CALL_RECORDS_STATS = [
  { label: 'Total Calls', value: '15', color: '#818cf8' },
  { label: 'Hot', value: '5', color: '#34d399' },
  { label: 'Warm', value: '6', color: '#fbbf24' },
  { label: 'Cold', value: '4', color: '#38bdf8' },
  { label: 'Failed', value: '0', color: '#f43f5e' },
  { label: 'Skipped', value: '0', color: '#94a3b8' },
  { label: 'On Hold', value: '0', color: '#fb923c' },
];

const LEAD_STATUS_CYCLE = ['Hot', 'Warm', 'Cold'];

const HOT_CALL_DATA = {
  transcript: [
    { message: "Hello, I am Mansi from Urbanrise.", speaker: 0 },
    { message: "Yes, please go ahead.", speaker: 1 },
    { message: "I'm calling regarding our Sitta project. Are you currently looking to buy a property?", speaker: 0 },
    { message: "Yes, I am looking for a property.", speaker: 1 },
    { message: "Great. May I know which configuration you are looking for?", speaker: 0 },
    { message: "3 BHK.", speaker: 1 },
    { message: "For 3 BHK, the carpet area is around 1450 square feet and the price starts at around 1.80 crore. Does this fit within your budget?", speaker: 0 },
    { message: "Yes, that is within my budget.", speaker: 1 },
    { message: "That's great. Would you like to visit the project and experience it personally?", speaker: 0 },
    { message: "Yes, definitely. I can visit this Saturday.", speaker: 1 },
    { message: "Perfect. Shall I schedule your site visit for Saturday at 11 AM?", speaker: 0 },
    { message: "Yes, Saturday at 11 AM works for me.", speaker: 1 },
    { message: "Wonderful. I'll arrange the site visit for Saturday at 11 AM and our sales executive will coordinate with you.", speaker: 0 },
    { message: "Okay, thank you.", speaker: 1 }
  ],
  call_id: "hot-52181c3d-51b2-415a-9198-d598424f0001",
  analysis: {
    audio_parameters: {
      executive_scores: {
        introduction: 5,
        call_objective: 5,
        convincing_abilities: 5,
        comprehension: 5,
        politeness: 5,
        project_brief_with_location: 5,
        probing: 5,
        project_highlights: 5,
        location_advantage: 4,
        site_visit_invite_and_urgency: 5
      },
      customer_scores: {
        sentiment: 5,
        eagerness: 5,
        awareness: 4
      }
    },
    call_analysis: {
      metadata: {
        company_name: "Urbanrise",
        project_name: "Sitta",
        lead_status: "Hot",
        location: "Sitta",
        interest_details: "3 BHK property for self-use",
        purpose: "Self Use",
        budget: "Around 2 crore",
        bhk_pref: "3 BHK",
        classification_reasons: [
          "Customer clearly expressed interest in the project.",
          "Customer confirmed that the quoted price fits within their budget.",
          "Customer agreed to a specific site visit date and time."
        ],
        config: "3 BHK",
        carpet_area: "1450 square feet",
        starting_price: "1.80 crore",
        total_units: "Not discussed",
        green_space: "Not discussed"
      },
      summary: {
        title: "Hot Lead - 3 BHK Site Visit Confirmed",
        call_summary: "Customer expressed strong interest in the Sitta project and selected a 3 BHK configuration. The customer confirmed that the quoted starting price of 1.80 crore is within budget and confirmed a physical site visit for Saturday at 11 AM.",
        customer_budget: "Around 2 crore",
        customer_contact_number: "Current number",
        customer_preferences: "Looking for a 3 BHK property for self-use.",
        first_call_resolution: true,
        escalation_required: false,
        avg_confidence: 0.95,
        disposition: "Site Visit Confirmed",
        advice_summary: "Customer is highly interested. Ensure the site visit is coordinated and confirmed.",
        agent_communication_summary: "Agent communicated clearly, qualified the customer effectively, addressed configuration and budget, and successfully converted the conversation into a confirmed site visit.",
        expression_of_interest: true,
        discussion_points: [
          "Property interest",
          "3 BHK configuration",
          "Carpet area",
          "Budget",
          "Project pricing",
          "Site visit"
        ],
        customer_queries: [
          "What is the carpet area for 3 BHK?",
          "What is the starting price?"
        ],
        next_action_items_external: [
          "Confirm site visit for Saturday at 11 AM.",
          "Coordinate with the sales executive."
        ],
        next_action_items_internal: [
          "Update CRM with confirmed site visit.",
          "Assign sales executive for the visit."
        ],
        keywords: [
          "3 BHK",
          "Budget",
          "Site Visit",
          "Confirmed"
        ],
        budget_issue: false,
        location_issue: false,
        configuration_issue: false,
        received_but_not_responded: false,
        call_hangup: true
      },
      sentiment: {
        positive: 90,
        neutral: 10,
        negative: 0
      },
      kpis: {
        avg_response_time: "1s",
        interruptions: 0,
        overlaps: 0,
        questions_asked: 2
      },
      call_objective: [
        { name: "Discuss Configuration", achieved: true, time: "00:50" },
        { name: "Discuss Budget", achieved: true, time: "01:20" },
        { name: "Confirm Customer Interest", achieved: true, time: "00:30" },
        { name: "Schedule Site Visit", achieved: true, time: "02:10" }
      ],
      hot_words: [
        { name: "Site Visit", detected: true, time: "02:10" },
        { name: "3 BHK", detected: true, time: "00:50" }
      ],
      objections: [],
      automated_actions: [],
      competitors: [],
      site_visit: {
        status: "Confirmed",
        details: "Customer confirmed a physical site visit for Saturday at 11 AM.",
        has_site_visit: true,
        physical_sitevisit: true,
        virtual_sitevisit: false,
        site_visit_date: "Saturday",
        site_visit_time: "11:00 AM"
      },
      follow_up_details: {
        should_follow_up: true,
        follow_up_date: "Saturday",
        follow_up_time: "10:00 AM",
        follow_up_remarks: "Follow up to reconfirm the site visit before the scheduled time."
      },
      brocher_details: {
        wants_brochure: false,
        brochure_medium: null
      },
      buyer_readiness: {
        score: "High",
        signals: [
          { label: "Confirmed interest in area", detected: true, time: "00:30" },
          { label: "Selected BHK/Config", detected: true, time: "00:50" },
          { label: "Budget within range", detected: true, time: "01:20" },
          { label: "Agreed to site visit", detected: true, time: "02:10" }
        ]
      }
    },
    metrics_parameters: {
      metrics_summary: {
        silence_percentage: 0.2,
        agent_talk_ratio: 0.45,
        customer_talk_ratio: 0.35,
        total_words: 500,
        wpm: 145
      },
      kpis: {
        interruptions: 0,
        overlaps: 0
      }
    }
  },
  lead_id: "00Q5g00000abcXYZ02",
  project_id: "a025g00000defUVW02",
  project_name: "Sitta",
  developer_name: "Urbanrise",
  agent_id: "0055g00000xyzABC02",
  agent_name: "Mansi",
  is_presales_executive: true,
  call_duration: 185.5,
  success: true
};

const WARM_CALL_DATA = {
  transcript: [
    { message: "Hello, I am Mansi from Urbanrise.", speaker: 0 },
    { message: "Yes, please go ahead.", speaker: 1 },
    { message: "I'm calling regarding our Sitta project. Are you currently looking to buy a property?", speaker: 0 },
    { message: "Yes, I am looking for a property.", speaker: 1 },
    { message: "Great. May I know which configuration you are looking for?", speaker: 0 },
    { message: "3 BHK.", speaker: 1 },
    { message: "For 3 BHK, the carpet area is around 1450 square feet and the price starts at around 1.80 crore. Does this fit within your budget?", speaker: 0 },
    { message: "Yes, that is within my budget.", speaker: 1 },
    { message: "That's great. Would you like to visit the project and experience it personally?", speaker: 0 },
    { message: "I will discuss with my family and let you know.", speaker: 1 },
    { message: "Sure, should I send you the brochure on WhatsApp?", speaker: 0 },
    { message: "Yes, please send it.", speaker: 1 },
    { message: "Sure, I am sharing the brochure details now.", speaker: 0 },
    { message: "Okay, thank you.", speaker: 1 }
  ],
  call_id: "warm-52181c3d-51b2-415a-9198-d598424f0002",
  analysis: {
    audio_parameters: {
      executive_scores: {
        introduction: 4,
        call_objective: 4,
        convincing_abilities: 0,
        comprehension: 5,
        politeness: 5,
        project_brief_with_location: 0,
        probing: 0,
        project_highlights: 0,
        location_advantage: 0,
        site_visit_invite_and_urgency: 0
      },
      customer_scores: {
        sentiment: 4,
        eagerness: 4,
        awareness: 4
      }
    },
    call_analysis: {
      metadata: {
        company_name: "Urbanrise",
        project_name: "Sitta",
        lead_status: "Warm",
        location: "Sitta",
        interest_details: "3 BHK property for self-use",
        purpose: "Self Use",
        budget: "Around 1.80 - 2 crore",
        bhk_pref: "3 BHK",
        classification_reasons: [
          "Customer expressed clear interest in 3 BHK project.",
          "Confirmed price fits within budget.",
          "Requested brochure to discuss with family before scheduling visit."
        ],
        config: "3 BHK",
        carpet_area: "1450 square feet",
        starting_price: "1.80 crore",
        total_units: "Not discussed",
        green_space: "Not discussed"
      },
      summary: {
        title: "Warm Lead - 3 BHK Pricing & Details Shared",
        call_summary: "Customer expressed interest in Sitta 3 BHK project. Quoted starting price of 1.80 crore is within budget. Customer requested brochure on WhatsApp and will decide on site visit after consulting family.",
        customer_budget: "Around 1.80 - 2 crore",
        customer_contact_number: "Current number",
        customer_preferences: "Looking for a 3 BHK property for self-use.",
        first_call_resolution: true,
        escalation_required: false,
        avg_confidence: 0.93,
        disposition: "Brochure Shared",
        advice_summary: "Customer is interested. Send brochure and follow up in 2 days.",
        agent_communication_summary: "Agent introduced project effectively, confirmed budget, and sent brochure.",
        expression_of_interest: true,
        discussion_points: [
          "Property interest",
          "3 BHK configuration",
          "Carpet area",
          "Budget & pricing",
          "Brochure request"
        ],
        customer_queries: [
          "Can you send the brochure?"
        ],
        next_action_items_external: [
          "Send brochure on WhatsApp.",
          "Follow up after 2 days."
        ],
        next_action_items_internal: [
          "Update CRM lead status to Warm.",
          "Schedule follow-up reminder."
        ],
        keywords: [
          "3 BHK",
          "Budget",
          "Brochure",
          "Warm Lead"
        ],
        budget_issue: false,
        location_issue: false,
        configuration_issue: false,
        received_but_not_responded: false,
        call_hangup: false
      },
      sentiment: {
        positive: 75,
        neutral: 25,
        negative: 0
      },
      kpis: {
        avg_response_time: "1s",
        interruptions: 0,
        overlaps: 0,
        questions_asked: 2
      },
      call_objective: [
        { name: "Discuss Configuration", achieved: true, time: "00:50" },
        { name: "Discuss Budget", achieved: true, time: "01:20" },
        { name: "Confirm Customer Interest", achieved: true, time: "00:30" },
        { name: "Schedule Site Visit", achieved: false, time: null }
      ],
      hot_words: [
        { name: "3 BHK", detected: true, time: "00:50" },
        { name: "Brochure", detected: true, time: "01:25" }
      ],
      objections: [],
      automated_actions: [],
      competitors: [],
      site_visit: {
        status: "Pending Family Discussion",
        details: "Customer will decide on site visit after discussing with family.",
        has_site_visit: false,
        physical_sitevisit: false,
        virtual_sitevisit: false,
        site_visit_date: null,
        site_visit_time: null
      },
      follow_up_details: {
        should_follow_up: true,
        follow_up_date: "Saturday",
        follow_up_time: "02:00 PM",
        follow_up_remarks: "Follow up after family discussion."
      },
      brocher_details: {
        wants_brochure: true,
        brochure_medium: "WhatsApp"
      },
      buyer_readiness: {
        score: "Medium",
        signals: [
          { label: "Confirmed interest in area", detected: true, time: "00:30" },
          { label: "Selected BHK/Config", detected: true, time: "00:50" },
          { label: "Budget within range", detected: true, time: "01:20" },
          { label: "Agreed to site visit", detected: false, time: null }
        ]
      }
    },
    metrics_parameters: {
      metrics_summary: {
        silence_percentage: 0.2,
        agent_talk_ratio: 0.45,
        customer_talk_ratio: 0.35,
        total_words: 420,
        wpm: 145
      },
      kpis: {
        interruptions: 0,
        overlaps: 0
      }
    }
  },
  lead_id: "00Q5g00000abcXYZ03",
  project_id: "a025g00000defUVW03",
  project_name: "Sitta",
  developer_name: "Urbanrise",
  agent_id: "0055g00000xyzABC03",
  agent_name: "Mansi",
  is_presales_executive: true,
  call_duration: 125.0,
  success: true
};

const COLD_CALL_DATA = {
  transcript: [
    { message: "Hello, I am Mansi from Urbanrise.", speaker: 0 },
    { message: "Yes.", speaker: 1 },
    { message: "I'm calling regarding our Sitta project. Are you currently looking to buy a property?", speaker: 0 },
    { message: "No, I'm not interested in buying any property.", speaker: 1 },
    { message: "I understand. Would you like me to share some brief information for future reference?", speaker: 0 },
    { message: "No, I'm not interested. Please don't call again.", speaker: 1 },
    { message: "Sure, I understand. Thank you for your time.", speaker: 0 },
    { message: "Okay, bye.", speaker: 1 }
  ],
  call_id: "cold-52181c3d-51b2-415a-9198-d598424f0003",
  analysis: {
    audio_parameters: {
      executive_scores: {
        introduction: 4,
        call_objective: 4,
        convincing_abilities: 2,
        comprehension: 5,
        politeness: 5,
        project_brief_with_location: 0,
        probing: 0,
        project_highlights: 0,
        location_advantage: 0,
        site_visit_invite_and_urgency: 0
      },
      customer_scores: {
        sentiment: 1,
        eagerness: 1,
        awareness: 0
      }
    },
    call_analysis: {
      metadata: {
        company_name: "Urbanrise",
        project_name: "Sitta",
        lead_status: "Cold",
        location: null,
        interest_details: null,
        purpose: null,
        budget: null,
        bhk_pref: null,
        classification_reasons: [
          "Customer clearly stated that they are not interested in buying property.",
          "Customer declined to receive project information.",
          "Customer requested not to be contacted again."
        ],
        config: null,
        carpet_area: null,
        starting_price: null,
        total_units: "Not discussed",
        green_space: "Not discussed"
      },
      summary: {
        title: "Cold Lead - Not Interested",
        call_summary: "Customer clearly stated that they are not interested in purchasing any property. The customer declined further project information and requested not to be contacted again. The call was ended politely.",
        customer_budget: null,
        customer_contact_number: "Current number",
        customer_preferences: null,
        first_call_resolution: true,
        escalation_required: false,
        avg_confidence: 0.96,
        disposition: "Not Interested",
        advice_summary: "Do not schedule further follow-ups because the customer explicitly declined and requested not to be contacted again.",
        agent_communication_summary: "Agent introduced herself, communicated the purpose of the call, understood the customer's lack of interest, and ended the conversation politely.",
        expression_of_interest: false,
        discussion_points: [
          "Introduction",
          "Project reference",
          "Customer interest"
        ],
        customer_queries: [],
        next_action_items_external: [],
        next_action_items_internal: [
          "Update CRM as Not Interested.",
          "Do not schedule another follow-up."
        ],
        keywords: [
          "Not Interested",
          "No Property",
          "Do Not Call"
        ],
        budget_issue: false,
        location_issue: false,
        configuration_issue: false,
        received_but_not_responded: false,
        call_hangup: true
      },
      sentiment: {
        positive: 5,
        neutral: 15,
        negative: 80
      },
      kpis: {
        avg_response_time: "1s",
        interruptions: 0,
        overlaps: 0,
        questions_asked: 2
      },
      call_objective: [
        { name: "Discuss Configuration", achieved: false, time: null },
        { name: "Discuss Budget", achieved: false, time: null },
        { name: "Confirm Customer Interest", achieved: true, time: "00:25" },
        { name: "Schedule Site Visit", achieved: false, time: null }
      ],
      hot_words: [],
      objections: [
        { name: "Not Interested", detected: true, time: "00:20" }
      ],
      automated_actions: [],
      competitors: [],
      site_visit: {
        status: "Not Interested",
        details: "Customer was not interested and did not agree to a site visit.",
        has_site_visit: false,
        physical_sitevisit: false,
        virtual_sitevisit: false,
        site_visit_date: null,
        site_visit_time: null
      },
      follow_up_details: {
        should_follow_up: false,
        follow_up_date: null,
        follow_up_time: null,
        follow_up_remarks: "Customer explicitly requested not to be contacted again."
      },
      brocher_details: {
        wants_brochure: false,
        brochure_medium: null
      },
      buyer_readiness: {
        score: "Low",
        signals: [
          { label: "Customer expressed no interest", detected: true, time: "00:20" },
          { label: "Customer declined project information", detected: true, time: "00:35" }
        ]
      }
    },
    metrics_parameters: {
      metrics_summary: {
        silence_percentage: 0.1,
        agent_talk_ratio: 0.55,
        customer_talk_ratio: 0.35,
        total_words: 180,
        wpm: 145
      },
      kpis: {
        interruptions: 0,
        overlaps: 0
      }
    }
  },
  lead_id: "00Q5g00000abcXYZ04",
  project_id: "a025g00000defUVW04",
  project_name: "Sitta",
  developer_name: "Urbanrise",
  agent_id: "0055g00000xyzABC04",
  agent_name: "Mansi",
  is_presales_executive: true,
  call_duration: 38.2,
  success: true
};

const CALL_RECORDS_DATA = [
  {
    ...HOT_CALL_DATA,
    rowId: 5701,
    project: 'SIITA',
    id: 'hot-52181c3d-51b2-415a-9198-d598424f0001',
    status: 'Hot',
    ratingScore: 5.0,
    duration: '3:05',
    totalUsed: '₹12',
    date: '14 Jun 2026',
    time: '12:08 PM',
    agent_name: 'Mansi',
  },
  {
    ...WARM_CALL_DATA,
    rowId: 5702,
    project: 'SIITA',
    id: 'warm-52181c3d-51b2-415a-9198-d598424f0002',
    status: 'Warm',
    ratingScore: 4.5,
    duration: '1:45',
    totalUsed: '₹6',
    date: '14 Jun 2026',
    time: '12:05 PM',
    agent_name: 'Mansi',
  },
  {
    ...COLD_CALL_DATA,
    rowId: 5703,
    project: 'SIITA',
    id: 'cold-52181c3d-51b2-415a-9198-d598424f0003',
    status: 'Cold',
    ratingScore: 4.0,
    duration: '0:38',
    totalUsed: '₹3',
    date: '14 Jun 2026',
    time: '11:58 AM',
    agent_name: 'Mansi',
  },
  {
    ...HOT_CALL_DATA,
    rowId: 5704,
    project: 'Urbanrise The World Of Joy',
    id: 'hot-52181c3d-51b2-415a-9198-d598424f0004',
    status: 'Hot',
    ratingScore: 5.0,
    duration: '3:12',
    totalUsed: '₹12',
    date: '14 Jun 2026',
    time: '11:45 AM',
    agent_name: 'Sneha',
  },
  {
    ...WARM_CALL_DATA,
    rowId: 5705,
    project: 'Urbanrise The World Of Joy',
    id: 'warm-52181c3d-51b2-415a-9198-d598424f0005',
    status: 'Warm',
    ratingScore: 4.5,
    duration: '2:01',
    totalUsed: '₹7',
    date: '14 Jun 2026',
    time: '11:30 AM',
    agent_name: 'Sneha',
  },
  {
    ...COLD_CALL_DATA,
    rowId: 5706,
    project: 'Urbanrise The World Of Joy',
    id: 'cold-52181c3d-51b2-415a-9198-d598424f0006',
    status: 'Cold',
    ratingScore: 4.0,
    duration: '0:42',
    totalUsed: '₹3',
    date: '14 Jun 2026',
    time: '11:15 AM',
    agent_name: 'Sneha',
  },
  {
    ...HOT_CALL_DATA,
    rowId: 5707,
    project: 'Urbanrise Oncloud 33',
    id: 'hot-52181c3d-51b2-415a-9198-d598424f0007',
    status: 'Hot',
    ratingScore: 5.0,
    duration: '2:55',
    totalUsed: '₹11',
    date: '14 Jun 2026',
    time: '11:00 AM',
    agent_name: 'Prachi',
  },
  {
    ...WARM_CALL_DATA,
    rowId: 5708,
    project: 'Urbanrise Oncloud 33',
    id: 'warm-52181c3d-51b2-415a-9198-d598424f0008',
    status: 'Warm',
    ratingScore: 4.2,
    duration: '1:50',
    totalUsed: '₹6',
    date: '14 Jun 2026',
    time: '10:45 AM',
    agent_name: 'Prachi',
  },
  {
    ...COLD_CALL_DATA,
    rowId: 5709,
    project: 'Urbanrise Oncloud 33',
    id: 'cold-52181c3d-51b2-415a-9198-d598424f0009',
    status: 'Cold',
    ratingScore: 4.0,
    duration: '0:35',
    totalUsed: '₹3',
    date: '14 Jun 2026',
    time: '10:30 AM',
    agent_name: 'Prachi',
  },
  {
    ...HOT_CALL_DATA,
    rowId: 5710,
    project: 'Urbanrise Galleria Gardens',
    id: 'hot-52181c3d-51b2-415a-9198-d598424f0010',
    status: 'Hot',
    ratingScore: 5.0,
    duration: '3:20',
    totalUsed: '₹13',
    date: '14 Jun 2026',
    time: '10:15 AM',
    agent_name: 'Divya',
  },
  {
    ...WARM_CALL_DATA,
    rowId: 5711,
    project: 'Urbanrise Galleria Gardens',
    id: 'warm-52181c3d-51b2-415a-9198-d598424f0011',
    status: 'Warm',
    ratingScore: 4.0,
    duration: '1:40',
    totalUsed: '₹5',
    date: '14 Jun 2026',
    time: '10:00 AM',
    agent_name: 'Divya',
  },
  {
    ...WARM_CALL_DATA,
    rowId: 5712,
    project: 'Urbanrise Galleria Gardens',
    id: 'warm-52181c3d-51b2-415a-9198-d598424f0012',
    status: 'Warm',
    ratingScore: 4.2,
    duration: '1:55',
    totalUsed: '₹6',
    date: '14 Jun 2026',
    time: '09:45 AM',
    agent_name: 'Neha',
  },
  {
    ...HOT_CALL_DATA,
    rowId: 5713,
    project: 'SIITA',
    id: 'hot-52181c3d-51b2-415a-9198-d598424f0013',
    status: 'Hot',
    ratingScore: 4.8,
    duration: '3:00',
    totalUsed: '₹11',
    date: '14 Jun 2026',
    time: '09:30 AM',
    agent_name: 'Neha',
  },
  {
    ...WARM_CALL_DATA,
    rowId: 5714,
    project: 'SIITA',
    id: 'warm-52181c3d-51b2-415a-9198-d598424f0014',
    status: 'Warm',
    ratingScore: 4.3,
    duration: '1:48',
    totalUsed: '₹6',
    date: '14 Jun 2026',
    time: '09:15 AM',
    agent_name: 'Neha',
  },
  {
    ...COLD_CALL_DATA,
    rowId: 5715,
    project: 'SIITA',
    id: 'cold-52181c3d-51b2-415a-9198-d598424f0015',
    status: 'Cold',
    ratingScore: 3.9,
    duration: '0:40',
    totalUsed: '₹3',
    date: '14 Jun 2026',
    time: '09:00 AM',
    agent_name: 'Divya',
  },
];

export const AllCallRecordsPage = ({ initialFilter }) => {
  const [selectedRecord, setSelectedRecord] = React.useState(null);
  const [search, setSearch] = React.useState('');
  const [agentFilter, setAgentFilter] = React.useState(
    initialFilter?.type === 'agent'
      ? initialFilter.value
      : initialFilter?.type === 'agent_status'
      ? initialFilter.agent
      : null
  );
  const [statusFilter, setStatusFilter] = React.useState(
    initialFilter?.type === 'lead'
      ? [initialFilter.value]
      : initialFilter?.type === 'agent_status'
      ? [initialFilter.value || initialFilter.status]
      : []
  );

  if (selectedRecord) {
    return <CallIntelligenceReport record={selectedRecord} onBack={() => setSelectedRecord(null)} />;
  }

  const rows = CALL_RECORDS_DATA.filter(r => {
    const matchesSearch = r.id.toLowerCase().includes(search.toLowerCase()) || 
                          r.project.toLowerCase().includes(search.toLowerCase()) ||
                          (r.agent_name && r.agent_name.toLowerCase().includes(search.toLowerCase()));
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(r.status);
    const matchesAgent = !agentFilter || (r.agent_name && r.agent_name.toLowerCase() === agentFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesAgent;
  });

  const stats = agentFilter ? [
    { label: 'Total Calls', value: String(CALL_RECORDS_DATA.filter(r => r.agent_name && r.agent_name.toLowerCase() === agentFilter.toLowerCase()).length), color: '#818cf8' },
    { label: 'Hot', value: String(CALL_RECORDS_DATA.filter(r => r.agent_name && r.agent_name.toLowerCase() === agentFilter.toLowerCase() && r.status === 'Hot').length), color: '#34d399' },
    { label: 'Warm', value: String(CALL_RECORDS_DATA.filter(r => r.agent_name && r.agent_name.toLowerCase() === agentFilter.toLowerCase() && r.status === 'Warm').length), color: '#fbbf24' },
    { label: 'Cold', value: String(CALL_RECORDS_DATA.filter(r => r.agent_name && r.agent_name.toLowerCase() === agentFilter.toLowerCase() && r.status === 'Cold').length), color: '#38bdf8' },
    { label: 'Failed', value: '0', color: '#f43f5e' },
    { label: 'Skipped', value: '0', color: '#94a3b8' },
    { label: 'On Hold', value: '0', color: '#fb923c' },
  ] : CALL_RECORDS_STATS;

  return (
    <div className="main-content no-scrollbar">
      <div className="topbar">
        <div className="topbar-left">
          <h2>All Call Records {agentFilter ? `— ${agentFilter}` : ''}</h2>
        </div>
        <div className="topbar-right">
          <div className="glass" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px' }}>
            <Clock className="w-4 h-4" style={{ color: 'var(--accent)' }} />
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)' }}>Analyzing 25 recordings...</div>
              <div style={{ fontSize: '10px', color: 'var(--muted)' }}>Results will appear automatically when ready</div>
            </div>
            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: '12px', marginLeft: '4px', textAlign: 'center' }}>
              <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' }}>In Queue</div>
              <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--accent)' }}>25</div>
            </div>
          </div>
        </div>
      </div>

      <div className="g2" style={{ gridTemplateColumns: 'repeat(7, 1fr)', marginBottom: '16px' }}>
        {stats.map((s, i) => <TopBorderCard key={i} {...s} />)}
      </div>

      <div className="glass" style={{ padding: '14px 16px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--card-bg-alt)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '10px 14px', gap: '8px', marginBottom: '14px' }}>
          <Search className="w-3.5 h-3.5" style={{ color: 'var(--muted)' }} />
          <input
            type="text"
            placeholder="Search by project or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', fontSize: '12px', fontWeight: 600, width: '100%' }}
          />
          {agentFilter && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(129,140,248,0.2)', border: '1px solid rgba(129,140,248,0.4)', borderRadius: '6px', padding: '3px 10px', fontSize: '11px', fontWeight: 700, color: '#818cf8', whiteSpace: 'nowrap' }}>
              <span>Executive: {agentFilter}</span>
              <span style={{ cursor: 'pointer', marginLeft: '4px', fontWeight: 900 }} onClick={() => setAgentFilter(null)} title="Clear executive filter">✕</span>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Status</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {LEAD_STATUS_CYCLE.map((l) => (
                <FilterDot key={l} label={l} color={LEAD_STATUS_COLORS[l]} active={statusFilter.includes(l)} onClick={() => toggleInArray(setStatusFilter, l)} />
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Project</div>
            <GhostButton icon={ChevronDown}>All Projects</GhostButton>
          </div>
          <div>
            <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Date Range</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <GhostButton icon={Calendar}>mm/dd/yyyy</GhostButton>
              <span style={{ color: 'var(--muted)', fontSize: '11px' }}>To</span>
              <GhostButton icon={Calendar}>mm/dd/yyyy</GhostButton>
            </div>
          </div>
          <div style={{ marginLeft: 'auto', alignSelf: 'flex-end' }}>
            <GhostButton icon={ChevronDown}>More</GhostButton>
          </div>
        </div>
      </div>

      <div className="glass">
        <div style={{ overflowX: 'auto' }}>
          <table className="lb-table">
            <thead>
              <tr>
                {['#', 'PROJECT', 'CALL ID', 'STATUS', 'RATING', 'DURATION', 'TOTAL USED', 'DATE ANALYZED', 'ACTION'].map((c, i) => (
                  <th key={i} style={{ whiteSpace: 'nowrap' }}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.rowId} onClick={() => setSelectedRecord(r)} style={{ cursor: 'pointer' }}>
                  <td style={{ color: 'var(--muted)', fontSize: '11px', fontWeight: 600 }}>{r.rowId}</td>
                  <td style={{ fontWeight: 800, color: 'var(--text)', fontSize: '12px' }}>{r.project}</td>
                  <td><IdBadge id={r.id} /></td>
                  <td><StatusBadge label={r.status} /></td>
                  <td><StarRatingColumn score={r.ratingScore} onClick={(e) => { e.stopPropagation(); setSelectedRecord(r); }} /></td>
                  <td style={{ color: 'var(--text)', fontSize: '12px', fontWeight: 600 }}>{r.duration}</td>
                  <td style={{ color: r.totalUsed === '—' ? 'var(--muted)' : 'var(--text)', fontSize: '13px', fontWeight: r.totalUsed === '—' ? 500 : 800 }}>{r.totalUsed}</td>
                  <td><DateCell date={r.date} time={r.time} /></td>
                  <td>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedRecord(r); }}
                      style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(255,255,255,0.08)', color: '#818cf8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


/* ---------- STRATEGIC PERFORMANCE MATRIX ---------- */

const MATRIX_LEGEND = [
  { label: 'Pricing Presented', color: '#818cf8' },
  { label: 'Qualify Interest', color: '#34d399' },
  { label: 'Schedule Visit', color: '#fbbf24' },
];

const MATRIX_DATA = [
  { project: 'M3m', dev: 'M3M', totalCalls: 514, pricing: 24, pricingPct: 5, qualify: 50, qualifyPct: 10, schedule: 1, schedulePct: 0 },
];

const matrixColor = (pct) => (pct >= 70 ? '#34d399' : pct >= 40 ? '#fbbf24' : pct > 0 ? '#f87171' : '#94a3b8');

export const StrategicMatrixPage = () => (
  <div className="main-content no-scrollbar">
    <div className="topbar">
      <div className="topbar-left">
        <h2>Strategic Performance Matrix</h2>
        <p>Goal achievement rates across all projects — chart and table tell the same story</p>
      </div>
    </div>

    <div className="glass" style={{ padding: '14px 20px', marginBottom: '16px', display: 'flex', gap: '20px' }}>
      {MATRIX_LEGEND.map((l, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', fontWeight: 700, color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: l.color }} />
          {l.label}
        </div>
      ))}
    </div>

    <div className="glass" style={{ marginBottom: '16px' }}>
      <div className="glass-header"><div className="glass-title">Goal Achievement Per Project</div></div>
      <div style={{ padding: '24px 24px 16px', position: 'relative' }}>
        {(() => {
          const PLOT_H = 220;
          const gridLines = [100, 75, 50, 25, 0];
          const barVal = (pct) => Math.max((pct / 100) * PLOT_H, pct > 0 ? 3 : 0);
          return (
            <div style={{ display: 'flex' }}>
              <div style={{ width: '40px', flexShrink: 0, position: 'relative', height: `${PLOT_H}px` }}>
                {gridLines.map((g) => (
                  <span key={g} style={{ position: 'absolute', top: `${PLOT_H - (g / 100) * PLOT_H - 6}px`, right: '10px', fontSize: '10px', color: 'var(--muted)' }}>{g}%</span>
                ))}
              </div>
              <div style={{ flex: 1, position: 'relative' }}>
                <div style={{ position: 'relative', height: `${PLOT_H}px` }}>
                  {gridLines.map((g) => (
                    <div key={g} style={{ position: 'absolute', left: 0, right: 0, top: `${PLOT_H - (g / 100) * PLOT_H}px`, borderTop: g === 0 ? '1px solid rgba(255,255,255,0.12)' : '1px dashed rgba(255,255,255,0.05)' }} />
                  ))}
                  <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '48px' }}>
                    {MATRIX_DATA.map((m, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-end', gap: '6px' }}>
                        {[
                          { pct: m.pricingPct, color: MATRIX_LEGEND[0].color },
                          { pct: m.qualifyPct, color: MATRIX_LEGEND[1].color },
                          { pct: m.schedulePct, color: MATRIX_LEGEND[2].color },
                        ].map((bar, bi) => (
                          <div key={bi} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <span style={{ fontSize: '10px', fontWeight: 700, color: bar.color, marginBottom: '4px' }}>{bar.pct}%</span>
                            <div style={{ width: '32px', height: `${barVal(bar.pct)}px`, background: bar.color, borderRadius: '4px 4px 0 0', transition: 'height 0.6s ease' }} />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '48px', justifyContent: 'center', marginTop: '10px' }}>
                  {MATRIX_DATA.map((m, i) => (
                    <span key={i} style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)', width: '106px', textAlign: 'center' }}>{m.project}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>

    <div className="glass">
      <div className="glass-header">
        <div>
          <div className="glass-title">Detailed Breakdown</div>
          <div style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>Same values as the chart above — green ≥70%, yellow ≥40%, red below</div>
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="lb-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Developer</th>
              <th>Total Calls</th>
              <th>Pricing Presented</th>
              <th>Qualify Interest</th>
              <th>Schedule Visit</th>
            </tr>
          </thead>
          <tbody>
            {MATRIX_DATA.map((m, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 700, color: 'var(--text)' }}>{m.project}</td>
                <td style={{ color: 'var(--dim)' }}>{m.dev}</td>
                <td style={{ color: 'var(--dim)' }}>{m.totalCalls}</td>
                <td><span className="lb-badge" style={{ background: `${matrixColor(m.pricingPct)}20`, color: matrixColor(m.pricingPct) }}>{m.pricing} ({m.pricingPct}%)</span></td>
                <td><span className="lb-badge" style={{ background: `${matrixColor(m.qualifyPct)}20`, color: matrixColor(m.qualifyPct) }}>{m.qualify} ({m.qualifyPct}%)</span></td>
                <td><span className="lb-badge" style={{ background: `${matrixColor(m.schedulePct)}20`, color: matrixColor(m.schedulePct) }}>{m.schedule} ({m.schedulePct}%)</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

/* ---------- FLAGGED REPORTS ---------- */

const FLAGGED_DATA = [
  { id: '6a4de8936b40c19bcc17e3ee', sections: '2 sections', submitter: 'Abc@gmail.com', date: '08 Jul 2026', time: '03:14 pm', color: '#94a3b8' },
  { id: '6a4de8936b40c19bcc17e3ee', sections: '1 section', submitter: 'Abc@gmail.com', date: '08 Jul 2026', time: '03:08 pm', color: '#94a3b8' },
  { id: '6a4de8936b40c19bcc17e3ee', sections: '2 sections', submitter: 'Abc@gmail.com', date: '08 Jul 2026', time: '02:56 pm', color: '#94a3b8' },
  { id: '6a4de8936b40c19bcc17e3ee', sections: '2 sections', submitter: 'Abc@gmail.com', date: '08 Jul 2026', time: '02:53 pm', color: '#94a3b8' },
  { id: '6a4de8936b40c19bcc17e3ee', sections: '2 sections', submitter: 'Abc@gmail.com', date: '08 Jul 2026', time: '02:50 pm', color: '#94a3b8' },
  { id: '6a4de8936b40c19bcc17e3ee', sections: '2 sections', submitter: 'Abc@gmail.com', date: '08 Jul 2026', time: '02:37 pm', color: '#94a3b8' },
  { id: '6a4de8936b40c19bcc17e3ee', sections: '2 sections', submitter: 'Abc@gmail.com', date: '08 Jul 2026', time: '11:57 am', color: '#94a3b8' },
  { id: '6a4267e3c2a8bfdd64591169', sections: '1 section', submitter: 'Dtcgrouptrusted@gmail.com', date: '01 Jul 2026', time: '04:17 pm', color: '#94a3b8' },
  { id: '6a433d38d22a2ddb2c93926a', sections: '3 sections', submitter: 'Demo@gmail.com', date: '30 Jun 2026', time: '09:24 am', color: '#fbbf24' },
];

export const FlaggedReportsPage = () => {
  const [search, setSearch] = React.useState('');
  const rows = FLAGGED_DATA.filter(r => r.id.toLowerCase().includes(search.toLowerCase()) || r.submitter.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="main-content no-scrollbar">
      <div className="topbar">
        <div className="topbar-left">
          <h2>Flagged Reports</h2>
          <p>Issues flagged by agents during call analysis — review and action required</p>
        </div>
        <div className="topbar-right">
          <GhostButton icon={RefreshCw}>Refresh</GhostButton>
        </div>
      </div>

      <div className="g2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', maxWidth: '480px', marginBottom: '16px' }}>
        <div className="glass" style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(129,140,248,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText className="w-4 h-4" style={{ color: '#818cf8' }} />
          </div>
          <div>
            <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' }}>Total Reported</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text)' }}>{FLAGGED_DATA.length}</div>
          </div>
        </div>
        <div className="glass" style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(96,165,250,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Calendar className="w-4 h-4" style={{ color: '#60a5fa' }} />
          </div>
          <div>
            <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' }}>Reported This Week</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text)' }}>0</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--card-bg-alt)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '9px 14px', gap: '8px' }}>
          <Search className="w-3.5 h-3.5" style={{ color: 'var(--muted)' }} />
          <input
            type="text"
            placeholder="Search by Call ID or agent..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text)', fontSize: '12px', fontWeight: 600, width: '100%' }}
          />
        </div>
        <GhostButton icon={ChevronDown}>All Statuses</GhostButton>
      </div>

      <div className="glass">
        <div style={{ overflowX: 'auto' }}>
          <table className="lb-table">
            <thead>
              <tr>
                {['#', 'CALL ID', 'STATUS', 'FLAGGED SECTIONS', 'SUBMITTED BY', 'DATE & TIME', 'ANALYSIS', 'ACTIONS'].map((c, i) => (
                  <th key={i} style={{ whiteSpace: 'nowrap' }}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td style={{ color: 'var(--muted)' }}>{i + 1}</td>
                  <td><IdBadge id={r.id} /></td>
                  <td><GhostButton icon={ChevronDown}>Pending</GhostButton></td>
                  <td><span className="lb-badge" style={{ background: `${r.color}20`, color: r.color }}>{r.sections}</span></td>
                  <td style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: '#7c3aed', color: '#fff', fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {r.submitter[0].toUpperCase()}
                    </div>
                    <span style={{ color: 'var(--dim)', fontSize: '11px' }}>{r.submitter}</span>
                  </td>
                  <td><DateCell date={r.date} time={r.time} /></td>
                  <td><PrimaryButton icon={Search}>Analysis</PrimaryButton></td>
                  <td><GhostButton icon={Eye}>View</GhostButton></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ---------- TRUSTED TRANSACTIONS (project-wise auto billing) ---------- */

const TRUSTED_TX_STATS = [
  { label: 'Total Credits', value: '₹1,16,947', color: '#818cf8' },
  { label: 'Setup Amount', value: '₹70,000', color: '#a78bfa' },
  { label: 'Available Credits', value: '₹39,849', color: '#34d399', valueColor: '#34d399' },
  { label: 'Used Credits', value: '₹77,098', color: '#f87171', valueColor: '#f87171' },
  { label: 'Total Transactions', value: '1600', color: '#22d3ee' },
];

const PROJECT_CREDIT_SUMMARY = [
  { project: 'M3m', rate: '₹3/min', loaded: '₹1,16,947', topup: '+ ₹1,17,031', adhoc: '− ₹70,000', deducted: '₹77,098', available: '₹39,849', txns: 1600, onHold: '—', particular: 'Analysis', type: 'Debit', date: '09 Jun 2026' },
];

export const TrustedTransactionsPage = () => {
  const [tab, setTab] = React.useState('ledger');

  return (
    <div className="main-content no-scrollbar">
      <div className="topbar">
        <div className="topbar-left">
          <h2>Transactions</h2>
          <p>Project-wise auto billing</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '4px', background: 'var(--card-bg-alt)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '4px', width: 'fit-content', marginBottom: '20px' }}>
        <button
          onClick={() => setTab('ledger')}
          style={{ padding: '9px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 800, background: tab === 'ledger' ? 'linear-gradient(135deg, #a78bfa, #7c3aed)' : 'transparent', color: tab === 'ledger' ? '#fff' : 'var(--muted)' }}
        >
          Transaction Ledger
        </button>
        <button
          onClick={() => setTab('history')}
          style={{ padding: '9px 18px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontSize: '11px', fontWeight: 800, background: tab === 'history' ? 'linear-gradient(135deg, #a78bfa, #7c3aed)' : 'transparent', color: tab === 'history' ? '#fff' : 'var(--muted)' }}
        >
          Transaction History
        </button>
      </div>

      {tab === 'ledger' ? (
        <>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <GhostButton icon={ChevronDown}>All Developers</GhostButton>
            <GhostButton icon={ChevronDown}>All Projects</GhostButton>
          </div>

          <div className="g2" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginBottom: '20px' }}>
            {TRUSTED_TX_STATS.map((s, i) => <TopBorderCard key={i} {...s} />)}
          </div>

          <div className="glass">
            <div className="glass-header">
              <div>
                <div className="glass-title">Project Credit Summary</div>
                <div style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '2px' }}>Live balance status across all projects — red indicates deficit</div>
              </div>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="lb-table">
                <thead>
                  <tr>
                    {['PROJECT', 'RATE/MIN', 'TOTAL LOADED', '+ TOP-UP', 'AD-HOC', 'TOTAL DEDUCTED', 'AVAILABLE BALANCE', 'TRANSACTIONS', 'ON HOLD', 'LAST PARTICULAR', 'TYPE', 'DATE'].map((c, i) => (
                      <th key={i} style={{ whiteSpace: 'nowrap' }}>{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PROJECT_CREDIT_SUMMARY.map((p, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 700, color: 'var(--text)' }}>{p.project}</td>
                      <td style={{ color: 'var(--accent)', fontWeight: 700 }}>{p.rate}</td>
                      <td style={{ color: 'var(--dim)' }}>{p.loaded}</td>
                      <td><span className="lb-badge" style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399' }}>{p.topup}</span></td>
                      <td><span className="lb-badge" style={{ background: 'rgba(251,191,36,0.15)', color: '#fbbf24' }}>{p.adhoc}</span></td>
                      <td style={{ color: '#f87171', fontWeight: 700 }}>{p.deducted}</td>
                      <td><span className="lb-badge" style={{ background: 'rgba(52,211,153,0.1)', color: '#34d399', border: '1px solid rgba(52,211,153,0.3)' }}>{p.available}</span></td>
                      <td><span className="lb-badge" style={{ background: 'rgba(129,140,248,0.1)', color: '#818cf8', border: '1px solid rgba(129,140,248,0.3)' }}>{p.txns}</span></td>
                      <td style={{ color: 'var(--muted)' }}>{p.onHold}</td>
                      <td style={{ color: 'var(--muted)', fontStyle: 'italic' }}>{p.particular}</td>
                      <td><span className="lb-badge" style={{ background: 'rgba(248,113,113,0.15)', color: '#f87171' }}>{p.type}</span></td>
                      <td style={{ color: 'var(--dim)', whiteSpace: 'nowrap' }}>{p.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="glass" style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>
          No transaction history entries yet.
        </div>
      )}
    </div>
  );
};
