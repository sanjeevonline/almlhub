import React, { useMemo, useState, useEffect } from 'react';
import { Category, CompetencyTerm, MaturityLevel, RadarItem } from '../types';

interface Props {
  onQuadrantClick?: (quadrant: string) => void;
  onPointClick?: (item: CompetencyTerm) => void;
  activeQuadrant?: Category | null;
  allCompetencies: CompetencyTerm[];
}

const RINGS: MaturityLevel[] = ['Adopt', 'Trial', 'Assess', 'Experimental'];
const QUADRANTS: Category[] = ['Techniques', 'Tools', 'Platforms', 'Governance'];

const QUADRANT_COLORS: Record<Category, string> = {
  Techniques: '#3b82f6',
  Tools: '#06b6d4',
  Platforms: '#6366f1',
  Governance: '#94a3b8',
};

const TechnicalRadar: React.FC<Props> = ({ onQuadrantClick, onPointClick, activeQuadrant, allCompetencies }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  const viewWidth = 800;
  const viewHeight = 520; 
  const centerX = viewWidth / 2;
  const centerY = viewHeight / 2;
  const gap = 12; 
  const quadWidth = (viewWidth - gap) / 2;
  const quadHeight = (viewHeight - gap) / 2;

  const ringRadii = [110, 165, 215, 260];

  useEffect(() => {
    const checkMobile = () => window.innerWidth < 768;
    const updateMobile = () => setIsMobile(checkMobile());
    updateMobile();
    window.addEventListener('resize', updateMobile);
    return () => window.removeEventListener('resize', updateMobile);
  }, []);

  const points = useMemo(() => {
    const itemsWithCoords: RadarItem[] = [];

    QUADRANTS.forEach((q) => {
      const qIdx = QUADRANTS.indexOf(q);
      const qAngles = [
        { start: 195, end: 255 }, // Techniques (Top Left)
        { start: 285, end: 345 }, // Tools (Top Right)
        { start: 105, end: 165 }, // Platforms (Bottom Left)
        { start: 15, end: 75 },   // Governance (Bottom Right)
      ];

      RINGS.forEach((ring, rIdx) => {
        const groupItems = allCompetencies.filter(item => item.category === q && item.maturity === ring);
        if (groupItems.length === 0) return;

        const innerR = rIdx === 0 ? 30 : ringRadii[rIdx - 1] + 12;
        const outerR = ringRadii[rIdx] - 12;
        const startAngle = qAngles[qIdx].start;
        const endAngle = qAngles[qIdx].end;
        const angleRange = endAngle - startAngle;

        const itemCount = groupItems.length;
        const rows = Math.ceil(Math.sqrt(itemCount * (outerR - innerR) / (angleRange * 2)));
        const cols = Math.ceil(itemCount / rows);

        groupItems.forEach((item, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          
          const rowJitter = (Math.sin(i * 0.7) * 0.2);
          const colJitter = (Math.cos(i * 0.9) * 0.2);

          const rNorm = (row + 0.5 + rowJitter) / rows;
          const aNorm = (col + 0.5 + colJitter) / cols;

          const radius = innerR + rNorm * (outerR - innerR);
          const angle = startAngle + aNorm * angleRange;
          const angleRad = (angle * Math.PI) / 180;
          
          const x = centerX + radius * Math.cos(angleRad);
          const y = centerY + radius * Math.sin(angleRad);
          
          itemsWithCoords.push({ ...item, x, y } as RadarItem);
        });
      });
    });

    return itemsWithCoords;
  }, [centerX, centerY, allCompetencies]);

  const getViewBox = () => {
    if (!activeQuadrant) return `0 0 ${viewWidth} ${viewHeight}`;
    
    switch (activeQuadrant) {
      case 'Techniques': return `0 0 ${quadWidth} ${quadHeight}`;
      case 'Tools': return `${quadWidth + gap} 0 ${quadWidth} ${quadHeight}`;
      case 'Platforms': return `0 ${quadHeight + gap} ${quadWidth} ${quadHeight}`;
      case 'Governance': return `${quadWidth + gap} ${quadHeight + gap} ${quadWidth} ${quadHeight}`;
      default: return `0 0 ${viewWidth} ${viewHeight}`;
    }
  };

  return (
    <div className={`w-full h-full bg-transparent flex flex-col items-center justify-center overflow-visible ${isMobile ? 'px-6' : 'p-4 md:p-8'}`}>
      <svg 
        viewBox={getViewBox()} 
        className="max-w-full max-h-full w-auto h-auto transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="blipShadow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
            <feComponentTransfer><feFuncA type="linear" slope="0.9"/></feComponentTransfer>
            <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="ringGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          {/* Gradients for brighter quadrants */}
          <radialGradient id="gradTechniques" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#1e293b" stopOpacity="1" />
          </radialGradient>
          <radialGradient id="gradTools" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="1" />
          </radialGradient>
          <radialGradient id="gradPlatforms" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="1" />
          </radialGradient>
          <radialGradient id="gradGovernance" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#1e293b" stopOpacity="1" />
          </radialGradient>
        </defs>

        {/* Quadrant Rectangles with vibrant borders and brighter fills */}
        <g>
          {/* Techniques - Top Left */}
          <rect 
            x="0" y="0" width={quadWidth} height={quadHeight} 
            fill="url(#gradTechniques)" 
            stroke={QUADRANT_COLORS.Techniques} 
            strokeWidth="4" 
            strokeOpacity="0.5"
            className="transition-all duration-500 cursor-pointer hover:stroke-opacity-100 hover:fill-blue-600/30" 
            onClick={() => onQuadrantClick?.('Techniques')} 
          />
          {/* Tools - Top Right */}
          <rect 
            x={quadWidth + gap} y="0" width={quadWidth} height={quadHeight} 
            fill="url(#gradTools)" 
            stroke={QUADRANT_COLORS.Tools} 
            strokeWidth="4" 
            strokeOpacity="0.5"
            className="transition-all duration-500 cursor-pointer hover:stroke-opacity-100 hover:fill-cyan-600/30" 
            onClick={() => onQuadrantClick?.('Tools')} 
          />
          {/* Platforms - Bottom Left */}
          <rect 
            x="0" y={quadHeight + gap} width={quadWidth} height={quadHeight} 
            fill="url(#gradPlatforms)" 
            stroke={QUADRANT_COLORS.Platforms} 
            strokeWidth="4" 
            strokeOpacity="0.5"
            className="transition-all duration-500 cursor-pointer hover:stroke-opacity-100 hover:fill-indigo-600/30" 
            onClick={() => onQuadrantClick?.('Platforms')} 
          />
          {/* Governance - Bottom Right */}
          <rect 
            x={quadWidth + gap} y={quadHeight + gap} width={quadWidth} height={quadHeight} 
            fill="url(#gradGovernance)" 
            stroke={QUADRANT_COLORS.Governance} 
            strokeWidth="4" 
            strokeOpacity="0.5"
            className="transition-all duration-500 cursor-pointer hover:stroke-opacity-100 hover:fill-slate-500/30" 
            onClick={() => onQuadrantClick?.('Governance')} 
          />
        </g>

        {/* Maturity Rings & Labels - Hidden in active quadrant view */}
        <g className={`pointer-events-none transition-opacity duration-500 ${activeQuadrant ? 'opacity-0' : 'opacity-100'}`}>
          {ringRadii.map((r, i) => (
            <React.Fragment key={i}>
              <circle cx={centerX} cy={centerY} r={r} fill="none" stroke="#3b82f6" strokeOpacity="0.15" strokeWidth="4" filter="url(#ringGlow)"/>
              <circle cx={centerX} cy={centerY} r={r} fill="none" stroke="white" strokeOpacity="0.35" strokeWidth="2" strokeDasharray="6 8"/>
              <text x={centerX} y={centerY - r + 18} textAnchor="middle" fill="white" fillOpacity="0.6" className="text-[10px] font-black uppercase tracking-[0.4em] pointer-events-none drop-shadow-md">
                {RINGS[i]}
              </text>
            </React.Fragment>
          ))}
        </g>

        {/* Quadrant Labels - Hidden in zoomed view to prevent double-titles */}
        <g className={`pointer-events-none fill-white/30 font-black uppercase transition-all duration-700 ${activeQuadrant ? 'opacity-0' : 'opacity-100'}`}>
          <text x={quadWidth / 2} y={quadHeight / 2} textAnchor="middle" dominantBaseline="central" style={{ fontSize: '38px', letterSpacing: '0.05em' }}>Techniques</text>
          <text x={quadWidth + gap + quadWidth / 2} y={quadHeight / 2} textAnchor="middle" dominantBaseline="central" style={{ fontSize: '38px', letterSpacing: '0.05em' }}>Tools</text>
          <text x={quadWidth / 2} y={quadHeight + gap + quadHeight / 2} textAnchor="middle" dominantBaseline="central" style={{ fontSize: '38px', letterSpacing: '0.05em' }}>Platforms</text>
          <text x={quadWidth + gap + quadWidth / 2} y={quadHeight + gap + quadHeight / 2} textAnchor="middle" dominantBaseline="central" style={{ fontSize: '38px', letterSpacing: '0.05em' }}>Governance</text>
        </g>

        {/* Blips - Only visible in full radar view now */}
        <g className={`transition-opacity duration-500 ${activeQuadrant || (isMobile && !activeQuadrant) ? 'opacity-0' : 'opacity-100'}`}>
          {!activeQuadrant && points.map((p) => {
            const isHovered = hoveredId === p.id;
            return (
              <g 
                key={p.id} 
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  onPointClick?.(p);
                }}
                className="transition-all duration-300 cursor-pointer"
              >
                <circle
                  cx={p.x} cy={p.y}
                  r={isHovered ? 10 : 5.5}
                  fill={isHovered ? QUADRANT_COLORS[p.category] || "#3b82f6" : "white"}
                  fillOpacity={isHovered ? 1 : 0.9}
                  stroke="rgba(0,0,0,0.4)"
                  strokeWidth="1.5"
                  className="transition-all duration-300"
                  filter={isHovered ? "url(#blipShadow)" : ""}
                />
              </g>
            );
          })}
        </g>

        {/* Tooltip */}
        {!isMobile && !activeQuadrant && points.map((p) => {
          if (hoveredId !== p.id) return null;
          const tooltipWidth = 180;
          const tooltipHeight = 36;
          const tx = Math.max(10, Math.min(viewWidth - tooltipWidth - 10, p.x - tooltipWidth / 2));
          const ty = Math.max(10, p.y - tooltipHeight - 15);
          return (
            <g key={`${p.id}-tooltip`} className="pointer-events-none">
              <rect x={tx} y={ty} width={tooltipWidth} height={tooltipHeight} rx="8" fill="#1e293b" stroke={QUADRANT_COLORS[p.category]} strokeWidth="2" strokeOpacity="0.6" />
              <text x={tx + tooltipWidth/2} y={ty + tooltipHeight/2} textAnchor="middle" dominantBaseline="central" fill="white" className="text-[10px] font-bold uppercase tracking-tight">
                {p.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default TechnicalRadar;