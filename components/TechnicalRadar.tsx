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

  // Expanded first ring (Adopt) significantly as it usually contains the most items
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
      // Increased buffer (15 degrees) from quadrant edges to keep blips centered
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

        // More sophisticated distribution: grid-like approach within the polar segment
        // to maximize distance between blips
        const itemCount = groupItems.length;
        const rows = Math.ceil(Math.sqrt(itemCount * (outerR - innerR) / (angleRange * 2)));
        const cols = Math.ceil(itemCount / rows);

        groupItems.forEach((item, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          
          // Add deterministic jitter based on index
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
        </defs>

        {/* Quadrant Rectangles */}
        <g>
          <rect x="0" y="0" width={quadWidth} height={quadHeight} fill="#3e98a0" className="transition-all duration-500 cursor-pointer hover:brightness-105" onClick={() => onQuadrantClick?.('Techniques')} />
          <rect x={quadWidth + gap} y="0" width={quadWidth} height={quadHeight} fill="#6a9a73" className="transition-all duration-500 cursor-pointer hover:brightness-105" onClick={() => onQuadrantClick?.('Tools')} />
          <rect x="0" y={quadHeight + gap} width={quadWidth} height={quadHeight} fill="#d48c0b" className="transition-all duration-500 cursor-pointer hover:brightness-105" onClick={() => onQuadrantClick?.('Platforms')} />
          <rect x={quadWidth + gap} y={quadHeight + gap} width={quadWidth} height={quadHeight} fill="#f1647e" className="transition-all duration-500 cursor-pointer hover:brightness-105" onClick={() => onQuadrantClick?.('Governance')} />
        </g>

        {/* Maturity Rings & Labels - Increased visibility */}
        <g className={`pointer-events-none transition-opacity duration-500 ${activeQuadrant ? 'opacity-0' : 'opacity-100'}`}>
          {ringRadii.map((r, i) => (
            <React.Fragment key={i}>
              <circle 
                cx={centerX} cy={centerY} 
                r={r} 
                fill="none" 
                stroke="white" 
                strokeOpacity="0.6" 
                strokeWidth="2" 
                strokeDasharray="4 4"
              />
              {/* Ring Labels - Balanced positioning */}
              <text 
                x={centerX} 
                y={centerY - r + 16} 
                textAnchor="middle" 
                fill="white" 
                fillOpacity="0.7" 
                className="text-[9px] font-black uppercase tracking-[0.3em] pointer-events-none"
              >
                {RINGS[i]}
              </text>
            </React.Fragment>
          ))}
        </g>

        {/* Quadrant Labels - Lighter opacity to emphasize rings/blips */}
        <g className="pointer-events-none fill-white font-bold transition-all duration-700">
          <text x={quadWidth / 2} y={quadHeight / 2} textAnchor="middle" dominantBaseline="central" style={{ fontSize: activeQuadrant === 'Techniques' ? '46px' : '38px', opacity: activeQuadrant && activeQuadrant !== 'Techniques' ? 0 : 0.6 }}>Techniques</text>
          <text x={quadWidth + gap + quadWidth / 2} y={quadHeight / 2} textAnchor="middle" dominantBaseline="central" style={{ fontSize: activeQuadrant === 'Tools' ? '46px' : '38px', opacity: activeQuadrant && activeQuadrant !== 'Tools' ? 0 : 0.6 }}>Tools</text>
          <text x={quadWidth / 2} y={quadHeight + gap + quadHeight / 2} textAnchor="middle" dominantBaseline="central" style={{ fontSize: activeQuadrant === 'Platforms' ? '46px' : '38px', opacity: activeQuadrant && activeQuadrant !== 'Platforms' ? 0 : 0.6 }}>Platforms</text>
          <text x={quadWidth + gap + quadWidth / 2} y={quadHeight + gap + quadHeight / 2} textAnchor="middle" dominantBaseline="central" style={{ fontSize: activeQuadrant === 'Governance' ? '46px' : '38px', opacity: activeQuadrant && activeQuadrant !== 'Governance' ? 0 : 0.6 }}>Governance</text>
        </g>

        {/* Blips */}
        <g className={`transition-opacity duration-500 ${activeQuadrant || isMobile ? 'opacity-0' : 'opacity-100'}`}>
          {points.map((p) => {
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
                  fill="white"
                  fillOpacity={isHovered ? 1 : 0.85}
                  stroke="rgba(0,0,0,0.2)"
                  strokeWidth="1"
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
              <rect x={tx} y={ty} width={tooltipWidth} height={tooltipHeight} rx="8" fill="#0f172a" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
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