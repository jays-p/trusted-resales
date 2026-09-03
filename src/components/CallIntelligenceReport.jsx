import React, { useState } from 'react';
import {
  ArrowLeft, Clock, BarChart2, Target, Calendar, Play, Pause, Flag,
  MessageSquare, Tag, Building2, Zap, TrendingUp, ShieldAlert, Check,
  X, ChevronDown, Volume2, Award, User, HelpCircle, FileText, Activity
} from 'lucide-react';

export const CallIntelligenceReport = ({ record, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  // Extract JSON structure safely from record
  const analysis = record?.analysis || {};
  const callAnalysis = analysis?.call_analysis || {};
  const metadata = callAnalysis?.metadata || {};
  const summary = callAnalysis?.summary || {};
  const execScores = analysis?.audio_parameters?.executive_scores || {};
  const custScores = analysis?.audio_parameters?.customer_scores || {};
  const siteVisit = callAnalysis?.site_visit || {};
  const buyerReadiness = callAnalysis?.buyer_readiness || {};
  const transcript = record?.transcript || [];
  const leadStatus = metadata?.lead_status || record?.status || 'Cold';

  const statusColors = {
    Hot: { color: '#34d399', bg: 'rgba(52, 211, 153, 0.15)', border: 'rgba(52, 211, 153, 0.3)' },
    Warm: { color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.15)', border: 'rgba(251, 191, 36, 0.3)' },
    Cold: { color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.15)', border: 'rgba(56, 189, 248, 0.3)' },
  };
  const theme = statusColors[leadStatus] || statusColors.Cold;

  const durationStr = record?.duration || (record?.call_duration ? `${record.call_duration}s` : '3:05');
  const confidenceStr = summary?.avg_confidence ? `${(summary.avg_confidence * 100).toFixed(0)}%` : '95%';
  const goalStatusStr = siteVisit?.status === 'Confirmed' ? 'Confirmed' : (siteVisit?.status || 'Pending');
  const siteVisitStr = siteVisit?.status === 'Confirmed' ? 'Confirmed' : (siteVisit?.status || 'Not Discussed');

  const renderStars = (score = 0) => {
    const starColor = score < 3.5 ? '#f87171' : '#34d399';
    const fullStars = Math.floor(score);
    const partial = score - fullStars;
    const emptyStars = Math.max(0, 5 - fullStars - (partial > 0 ? 1 : 0));
    const clipId = `report-clip-${String(score).replace('.', '-')}-${Math.random().toString(36).substring(2, 7)}`;

    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
        {Array.from({ length: fullStars }).map((_, i) => (
          <svg key={`full-${i}`} width="13" height="13" viewBox="0 0 24 24" fill={starColor} stroke={starColor} strokeWidth="1">
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
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill={starColor} clipPath={`url(#${clipId})`} />
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="none" stroke="#475569" strokeWidth="1.5" />
          </svg>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <svg key={`empty-${i}`} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        ))}
        <span style={{ fontSize: '11px', color: starColor, marginLeft: '4px', fontWeight: 700 }}>
          [{score}]
        </span>
      </div>
    );
  };

  const EXEC_PARAMS_LIST = [
    { key: 'introduction', label: 'Introduction' },
    { key: 'call_objective', label: 'Call Objective' },
    { key: 'convincing_abilities', label: 'Convincing Abilities' },
    { key: 'comprehension', label: 'Comprehension' },
    { key: 'politeness', label: 'Politeness' },
    { key: 'project_brief_with_location', label: 'Project Brief With Location' },
    { key: 'probing', label: 'Probing' },
    { key: 'project_highlights', label: 'Project Highlights' },
    { key: 'location_advantage', label: 'Location Advantage' },
    { key: 'site_visit_invite_and_urgency', label: 'Site Visit Invite & Urgency' }
  ];

  const CUST_PARAMS_LIST = [
    { key: 'sentiment', label: 'Sentiment' },
    { key: 'eagerness', label: 'Eagerness' },
    { key: 'awareness', label: 'Awareness' }
  ];

  return (
    <div
      className="no-scrollbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        background: '#080c14',
        color: '#f8fafc',
        overflowY: 'auto',
        padding: '24px 32px',
        boxSizing: 'border-box',
      }}
    >
      {/* Top Header Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: '20px',
          paddingBottom: '16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
          <button
            onClick={onBack}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '20px',
              background: 'rgba(30, 41, 59, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: 'var(--text)',
              fontSize: '11px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> BACK
          </button>

          <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#fff', letterSpacing: '0.04em', margin: 0, whiteSpace: 'nowrap' }}>
            CALL INTELLIGENCE REPORT — <span style={{ color: theme.color }}>{leadStatus.toUpperCase()} LEAD</span>
          </h2>
        </div>

        <button
          title="Flag Report"
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'rgba(244, 63, 94, 0.12)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: '#f43f5e',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            cursor: 'pointer',
            marginLeft: 'auto',
            flexShrink: 0,
          }}
        >
          <Flag className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Top 4 Metric KPI Cards */}
      <div
        className="g2"
        style={{
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px',
          marginBottom: '20px',
        }}
      >
        {/* DURATION */}
        <div className="glass" style={{ padding: '16px 20px', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              DURATION
            </span>
            <Clock className="w-4 h-4" style={{ color: 'var(--muted)' }} />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text)', marginBottom: '4px' }}>
            {durationStr}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
            Call Duration
          </div>
        </div>

        {/* AVG CONFIDENCE */}
        <div className="glass" style={{ padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              AVG CONFIDENCE
            </span>
            <BarChart2 className="w-4 h-4" style={{ color: 'var(--muted)' }} />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text)', marginBottom: '4px' }}>
            {confidenceStr}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
            Word-level ASR confidence
          </div>
        </div>

        {/* GOAL: SCHEDULE VISIT */}
        <div className="glass" style={{ padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              GOAL: SCHEDULE VISIT
            </span>
            <Target className="w-4 h-4" style={{ color: 'var(--muted)' }} />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 900, color: siteVisit?.status === 'Confirmed' ? '#34d399' : '#fbbf24', marginBottom: '4px' }}>
            {goalStatusStr}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
            {siteVisit?.status === 'Confirmed' ? '1 of 1 goals completed' : '0 of 1 goals completed'}
          </div>
        </div>

        {/* SITE VISIT */}
        <div className="glass" style={{ padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              SITE VISIT
            </span>
            <Calendar className="w-4 h-4" style={{ color: 'var(--muted)' }} />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--text)', marginBottom: '4px' }}>
            {siteVisitStr}
          </div>
          <div style={{ fontSize: '10px', color: 'var(--muted)', lineHeight: '1.3' }}>
            {siteVisit?.details || 'Site visit status captured during AI evaluation.'}
          </div>
        </div>
      </div>

      {/* Main 2-Column Dashboard Body Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', alignItems: 'start' }}>
        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* AUDIO WAVEFORM CARD */}
          <div className="glass" style={{ padding: '20px' }}>
            <div style={{ fontSize: '10px', fontWeight: 800, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
              AUDIO WAVEFORM &amp; PLAYER
            </div>

            {/* Visual Waveform SVG */}
            <div style={{ height: '70px', display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '20px', overflow: 'hidden' }}>
              {Array.from({ length: 90 }).map((_, i) => {
                const heightPct = Math.sin(i * 0.15) * 40 + Math.cos(i * 0.3) * 35 + 25;
                const isPlayed = i < audioProgress;
                return (
                  <div
                    key={i}
                    onClick={() => setAudioProgress(i)}
                    style={{
                      flex: 1,
                      height: `${Math.max(12, Math.min(100, heightPct))}%`,
                      borderRadius: '3px',
                      background: isPlayed ? theme.color : 'rgba(129, 140, 248, 0.25)',
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                  />
                );
              })}
            </div>

            {/* Audio Controls */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: `linear-gradient(135deg, ${theme.color}, #7c3aed)`,
                    border: 'none',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    cursor: 'pointer',
                  }}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text)', fontFamily: "'JetBrains Mono', monospace" }}>
                  0:00 / {durationStr}
                </span>
              </div>

              <button
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: 'rgba(30, 41, 59, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  color: 'var(--text)',
                  fontSize: '11px',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                1.0x
              </button>
            </div>
          </div>

          {/* TRANSCRIPT TIMELINE CARD */}
          <div className="glass" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <MessageSquare className="w-4 h-4" style={{ color: '#a78bfa' }} />
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                TRANSCRIPT TIMELINE ({transcript.length} MESSAGES)
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {transcript.map((item, idx) => {
                const isAgent = item.speaker === 0;
                return (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: isAgent ? 'flex-start' : 'flex-end',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      {isAgent ? (
                        <>
                          <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: '#3b82f6', color: '#fff', fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>A</div>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)' }}>Agent (Mansi)</span>
                        </>
                      ) : (
                        <>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)' }}>Customer</span>
                          <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: '#10b981', color: '#fff', fontSize: '10px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>C</div>
                        </>
                      )}
                    </div>
                    <div
                      style={{
                        background: isAgent ? 'rgba(30, 41, 59, 0.7)' : 'rgba(6, 78, 59, 0.6)',
                        border: isAgent ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(16, 185, 129, 0.25)',
                        borderRadius: '12px',
                        borderTopLeftRadius: isAgent ? '2px' : '12px',
                        borderTopRightRadius: isAgent ? '12px' : '2px',
                        padding: '10px 14px',
                        maxWidth: '85%',
                        color: isAgent ? 'var(--text)' : '#a7f3d0',
                        fontSize: '12px',
                        lineHeight: '1.5',
                      }}
                    >
                      {item.message}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CALL SUMMARY CARD */}
          <div className="glass" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <FileText className="w-4 h-4" style={{ color: '#a78bfa' }} />
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                CALL SUMMARY &amp; AI ADVICE
              </span>
            </div>

            <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
              {summary?.title || `${leadStatus} Lead Summary`}
            </h4>

            <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.06)', borderRadius: '10px', padding: '14px', color: 'var(--text)', fontSize: '12px', lineHeight: '1.6', marginBottom: '14px' }}>
              {summary?.call_summary || 'No summary text available.'}
            </div>

            {summary?.advice_summary && (
              <div style={{ background: 'rgba(129, 140, 248, 0.1)', border: '1px solid rgba(129, 140, 248, 0.3)', borderRadius: '10px', padding: '12px 14px', color: '#93c5fd', fontSize: '11px', lineHeight: '1.5', marginBottom: '14px' }}>
                <strong>AI ADVICE:</strong> {summary.advice_summary}
              </div>
            )}

            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
                First Call Resolution: <strong style={{ color: 'var(--text)' }}>{summary?.first_call_resolution ? 'Yes' : 'No'}</strong>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--muted)' }}>
                Escalation Required: <strong style={{ color: 'var(--text)' }}>{summary?.escalation_required ? 'Yes' : 'No'}</strong>
              </div>
            </div>
          </div>

          {/* DISCUSSION POINTS & CUSTOMER QUERIES GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {/* DISCUSSION POINTS */}
            <div className="glass" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Activity className="w-4 h-4" style={{ color: '#a78bfa' }} />
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  DISCUSSION POINTS
                </span>
              </div>
              {summary?.discussion_points && summary.discussion_points.length > 0 ? (
                <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {summary.discussion_points.map((pt, i) => (
                    <li key={i} style={{ color: 'var(--text)', fontSize: '11px', lineHeight: '1.4' }}>{pt}</li>
                  ))}
                </ul>
              ) : (
                <div style={{ fontSize: '11px', color: 'var(--muted)', fontStyle: 'italic' }}>No discussion points recorded.</div>
              )}
            </div>

            {/* CUSTOMER QUERIES */}
            <div className="glass" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <HelpCircle className="w-4 h-4" style={{ color: '#a78bfa' }} />
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  CUSTOMER QUERIES
                </span>
              </div>
              {summary?.customer_queries && summary.customer_queries.length > 0 ? (
                <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {summary.customer_queries.map((q, i) => (
                    <li key={i} style={{ color: 'var(--text)', fontSize: '11px', lineHeight: '1.4' }}>{q}</li>
                  ))}
                </ul>
              ) : (
                <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px dashed rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '16px', textAlign: 'center', color: 'var(--muted)', fontSize: '11px', fontStyle: 'italic' }}>
                  No queries recorded.
                </div>
              )}
            </div>
          </div>

          {/* KEYWORDS */}
          <div className="glass" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <Tag className="w-4 h-4" style={{ color: '#a78bfa' }} />
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                KEYWORDS &amp; TAGS
              </span>
            </div>
            {summary?.keywords && summary.keywords.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {summary.keywords.map((tag, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      background: 'rgba(30, 58, 138, 0.4)',
                      border: '1px solid rgba(96, 165, 250, 0.25)',
                      color: '#93c5fd',
                      fontSize: '11px',
                      fontWeight: 600,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : (
              <div style={{ fontSize: '11px', color: 'var(--muted)' }}>No keywords detected.</div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN (SIDEBAR) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* LEAD CLASSIFICATION */}
          <div className="glass" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Target className="w-4 h-4" style={{ color: '#a78bfa' }} />
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                LEAD CLASSIFICATION
              </span>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: `1px solid ${theme.border}`, borderRadius: '12px', padding: '16px' }}>
              <div style={{ marginBottom: '10px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', borderRadius: '8px', background: theme.bg, color: theme.color, fontSize: '11px', fontWeight: 800 }}>
                  <Award className="w-3.5 h-3.5" /> {leadStatus.toUpperCase()}
                </span>
              </div>
              {metadata?.classification_reasons && metadata.classification_reasons.length > 0 ? (
                <ul style={{ margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {metadata.classification_reasons.map((r, i) => (
                    <li key={i} style={{ fontSize: '11px', color: 'var(--muted)', lineHeight: '1.4' }}>{r}</li>
                  ))}
                </ul>
              ) : (
                <div style={{ fontSize: '11px', color: 'var(--muted)', lineHeight: '1.4' }}>
                  Classified automatically based on customer sentiment and agreement.
                </div>
              )}
            </div>
          </div>

          {/* EXECUTIVE & CUSTOMER RATING */}
          <div className="glass" style={{ padding: '20px' }}>
            {/* EXECUTIVE */}
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
              EXECUTIVE EVALUATION
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {EXEC_PARAMS_LIST.map((param) => {
                const val = execScores[param.key] ?? 0;
                return (
                  <div key={param.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{param.label}</span>
                    {renderStars(val)}
                  </div>
                );
              })}
            </div>

            {/* CUSTOMER */}
            <div style={{ fontSize: '11px', fontWeight: 800, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '16px' }}>
              CUSTOMER EVALUATION
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {CUST_PARAMS_LIST.map((param) => {
                const val = custScores[param.key] ?? 0;
                return (
                  <div key={param.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{param.label}</span>
                    {renderStars(val)}
                  </div>
                );
              })}
            </div>
          </div>

          {/* LEAD PROFILE */}
          <div className="glass" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <User className="w-4 h-4" style={{ color: '#a78bfa' }} />
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                LEAD PROFILE
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Purpose</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)' }}>{metadata?.purpose || 'Not discussed'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Budget</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)' }}>{metadata?.budget || 'Not discussed'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', color: 'var(--muted)' }}>BHK Pref</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)' }}>{metadata?.bhk_pref || 'Not discussed'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Location</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)' }}>{metadata?.location || record?.project || 'Sitta'}</span>
              </div>
              {metadata?.interest_details && (
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Interest</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)', textAlign: 'right' }}>{metadata.interest_details}</span>
                </div>
              )}
            </div>
          </div>

          {/* PROPERTY DISCUSSED */}
          <div className="glass" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Building2 className="w-4 h-4" style={{ color: '#a78bfa' }} />
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                PROPERTY DISCUSSED
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Project</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)' }}>{metadata?.project_name || record?.project_name || record?.project || 'Sitta'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Developer</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)' }}>{metadata?.company_name || record?.developer_name || 'Urbanrise'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Config</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)' }}>{metadata?.config || 'Not discussed'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Carpet Area</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)' }}>{metadata?.carpet_area || 'Not discussed'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Starting Price</span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text)' }}>{metadata?.starting_price || 'Not discussed'}</span>
              </div>
            </div>
          </div>

          {/* BUYER READINESS */}
          <div className="glass" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp className="w-4 h-4" style={{ color: '#a78bfa' }} />
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  BUYER READINESS
                </span>
              </div>
              <span style={{ padding: '2px 10px', borderRadius: '6px', background: buyerReadiness?.score === 'High' ? 'rgba(52, 211, 153, 0.15)' : buyerReadiness?.score === 'Medium' ? 'rgba(251, 191, 36, 0.15)' : 'rgba(167, 139, 250, 0.15)', color: buyerReadiness?.score === 'High' ? '#34d399' : buyerReadiness?.score === 'Medium' ? '#fbbf24' : '#c084fc', fontSize: '10px', fontWeight: 800 }}>
                {buyerReadiness?.score || 'Low'}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {buyerReadiness?.signals && buyerReadiness.signals.length > 0 ? (
                buyerReadiness.signals.map((sig, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{ fontSize: '11px', color: 'var(--muted)' }}>{sig.label}</span>
                    {sig.detected ? (
                      <Check className="w-3.5 h-3.5" style={{ color: '#34d399' }} />
                    ) : (
                      <X className="w-3.5 h-3.5" style={{ color: '#f87171' }} />
                    )}
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '11px', color: 'var(--muted)' }}>No signals evaluated.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallIntelligenceReport;
