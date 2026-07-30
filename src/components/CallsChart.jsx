import React, { useRef, useEffect } from 'react';

const CallsChart = ({ data = [] }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || data.length === 0) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    const drawChart = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      ctx.scale(dpr, dpr);

      const W = rect.width;
      const H = rect.height;
      const pad = { t: 18, b: 28, l: 30, r: 14 };
      const cW = W - pad.l - pad.r;
      const cH = H - pad.t - pad.b;

      const values = data.map(d => d.value);
      const labels = data.map(d => d.label);
      const max = Math.max(...values, 10) * 1.2;
      const step = cW / (values.length - 1 || 1);

      ctx.clearRect(0, 0, W, H);

      // Grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = pad.t + cH - (i / 4) * cH;
        ctx.beginPath();
        ctx.moveTo(pad.l, y);
        ctx.lineTo(pad.l + cW, y);
        ctx.stroke();

        // Y-axis labels
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.font = '8px JetBrains Mono, monospace';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round((i / 4) * max), pad.l - 8, y + 3);
      }

      // Data points
      const points = values.map((v, i) => ({
        x: pad.l + i * step,
        y: pad.t + cH - (v / max) * cH
      }));

      // Create smooth curve path
      const createPath = () => {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        const tension = 0.15;
        for (let i = 0; i < points.length - 1; i++) {
          const p1 = points[i];
          const p2 = points[i + 1];
          const prev = points[i - 1] || p1;
          const next = points[i + 2] || p2;
          const cp1x = p1.x + (p2.x - prev.x) * tension;
          const cp1y = p1.y + (p2.y - prev.y) * tension;
          const cp2x = p2.x - (next.x - p1.x) * tension;
          const cp2y = p2.y - (next.y - p1.y) * tension;
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
        }
      };

      // Fill gradient
      createPath();
      ctx.lineTo(pad.l + cW, pad.t + cH);
      ctx.lineTo(pad.l, pad.t + cH);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, pad.t, 0, pad.t + cH);
      grad.addColorStop(0, 'rgba(129, 140, 248, 0.22)');
      grad.addColorStop(1, 'rgba(129, 140, 248, 0.01)');
      ctx.fillStyle = grad;
      ctx.fill();

      // Stroke
      createPath();
      ctx.strokeStyle = '#818cf8';
      ctx.lineWidth = 1.75;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'rgba(129, 140, 248, 0.5)';
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Points + value labels
      const maxV = Math.max(...values);
      points.forEach((p, i) => {
        if (values[i] > 0) {
          const isMax = values[i] === maxV;
          const color = isMax ? '#34d399' : '#818cf8';

          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#0d1117';
          ctx.fill();
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.5;
          ctx.stroke();

          // Value labels for significant points
          if (values[i] > max * 0.15) {
            ctx.fillStyle = color;
            ctx.font = 'bold 8px JetBrains Mono, monospace';
            ctx.textAlign = 'center';
            ctx.fillText(values[i], p.x, p.y - 8);
          }
        }
      });

      // X-axis labels
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.textAlign = 'center';
      ctx.font = '8px JetBrains Mono, monospace';
      const labelFreq = Math.max(1, Math.ceil(labels.length / 10));
      labels.forEach((l, i) => {
        if (i % labelFreq === 0) {
          ctx.fillText(l, points[i].x, pad.t + cH + 20);
        }
      });

      // Average line
      const avg = values.reduce((a, b) => a + b, 0) / (values.length || 1);
      const avgY = pad.t + cH - (avg / max) * cH;
      ctx.beginPath();
      ctx.setLineDash([5, 5]);
      ctx.moveTo(pad.l, avgY);
      ctx.lineTo(pad.l + cW, avgY);
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(251, 191, 36, 0.6)';
      ctx.textAlign = 'right';
      ctx.font = '8px JetBrains Mono, monospace';
      ctx.fillText(`avg ${avg.toFixed(0)}`, pad.l + cW, avgY - 5);
    };

    drawChart();
    window.addEventListener('resize', drawChart);
    return () => window.removeEventListener('resize', drawChart);
  }, [data]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
};

export default CallsChart;
