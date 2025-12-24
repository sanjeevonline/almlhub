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
    <div className={`w-full h-full bg-transparent flex flex-col items-center justify-center overflow-visible ${isMobile ? 'px-6' : ''}`}>
      <svg 
        viewBox={getViewBox()} 
        className="w-full h-auto transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-visible"
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
        </defs>

        {/* Quadrant Rectangles */}
        <g>
          <rect x="0" y="0" width={quadWidth} height={quadHeight} fill="#1e293b" className="transition-all duration-500 cursor-pointer hover:fill-blue-900/40" onClick={() => onQuadrantClick?.('Techniques')} />
          <rect x={quadWidth + gap} y="0" width={quadWidth} height={quadHeight} fill="#0f172a" className="transition-all duration-500 cursor-pointer hover:fill-blue-900/40" onClick={() => onQuadrantClick?.('Tools')} />
          <rect x="0" y={quadHeight + gap} width={quadWidth} height={quadHeight} fill="#0f172a" className="transition-all duration-500 cursor-pointer hover:fill-blue-900/40" onClick={() => onQuadrantClick?.('Platforms')} />
          <rect x={quadWidth + gap} y={quadHeight + gap} width={quadWidth} height={quadHeight} fill="#1e293b" className="transition-all duration-500 cursor-pointer hover:fill-blue-900/40" onClick={() => onQuadrantClick?.('Governance')} />
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
                  fill={isHovered ? "#3b82f6" : "white"}
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
              <rect x={tx} y={ty} width={tooltipWidth} height={tooltipHeight} rx="8" fill="#1e293b" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="1.5" />
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