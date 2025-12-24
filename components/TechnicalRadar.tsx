
import React, { useMemo, useState } from 'react';
import { Category, CompetencyTerm, MaturityLevel, RadarItem } from '../types';

interface Props {
  onQuadrantClick?: (quadrant: string) => void;
  onPointClick?: (item: CompetencyTerm) => void;
  activeQuadrant?: Category | null;
  allCompetencies: CompetencyTerm[];
}

const RINGS: MaturityLevel[] = ['Adopt', 'Trial', 'Assess', 'Experimental'];
const QUADRANTS: Category[] = ['Governance', 'Platforms', 'Techniques', 'Tools'];

const RING_RADII_FACTORS = [0.44, 0.64, 0.82, 0.98];

const getStableSeed = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

const TechnicalRadar: React.FC<Props> = ({ onQuadrantClick, onPointClick, activeQuadrant, allCompetencies }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoveredRing, setHoveredRing] = useState<string | null>(null);
  const size = 600;
  const center = size / 2;
  const ringRadius = center - 10; 

  const points = useMemo(() => {
    const groups: Record<string, CompetencyTerm[]> = {};
    allCompetencies.forEach(item => {
      const key = `${item.category}-${item.maturity}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });

    const itemsWithCoords: RadarItem[] = [];

    QUADRANTS.forEach((q) => {
      const qIdx = QUADRANTS.indexOf(q);
      const qAngles = [
        { start: 0, end: 90 },    // Governance (BR)
        { start: 90, end: 180 },  // Platforms (BL)
        { start: 180, end: 270 }, // Techniques (TL)
        { start: 270, end: 360 }, // Tools (TR)
      ];

      RINGS.forEach((ring, rIdx) => {
        const key = `${q}-${ring}`;
        const groupItems = groups[key] || [];
        if (groupItems.length === 0) return;

        const startAngle = qAngles[qIdx].start + 14;
        const endAngle = qAngles[qIdx].end - 14;
        const angleRange = endAngle - startAngle;
        
        const rStart = rIdx === 0 ? 50 : RING_RADII_FACTORS[rIdx - 1] * ringRadius + 15;
        const rEnd = RING_RADII_FACTORS[rIdx] * ringRadius - 15;
        const rRange = rEnd - rStart;

        let rows = 1;
        if (groupItems.length > 3) rows = 2;
        if (groupItems.length > 7) rows = 3;
        if (groupItems.length > 12) rows = 4;
        
        const cols = Math.ceil(groupItems.length / rows);

        groupItems.forEach((item, i) => {
          const seed = getStableSeed(item.id);
          const row = Math.floor(i / cols);
          const col = i % cols;
          const stagger = (row % 2) * 0.3;
          
          const jitterAngle = ((seed % 100) - 50) / 400; 
          const angleNorm = (col + 0.5 + stagger) / (cols + (rows > 1 ? 0.3 : 0));
          const angleDeg = startAngle + (Math.max(0.05, Math.min(0.95, angleNorm + jitterAngle)) * angleRange);
          const angleRad = (angleDeg * Math.PI) / 180;
          
          const jitterRadial = (((seed >> 4) % 100) - 50) / 400; 
          const radialNorm = (row + 0.5) / rows;
          const radius = rStart + (Math.max(0.1, Math.min(0.9, radialNorm + jitterRadial)) * rRange);
          
          const x = center + radius * Math.cos(angleRad);
          const y = center + radius * Math.sin(angleRad);
          
          itemsWithCoords.push({ ...item, x, y } as RadarItem);
        });
      });
    });

    return itemsWithCoords;
  }, [ringRadius, center, allCompetencies]);

  const getBlipColor = (category: Category) => {
    switch (category) {
      case 'Platforms': return 'stroke-rose-500';
      case 'Governance': return 'stroke-emerald-500';
      case 'Techniques': return 'stroke-indigo-500';
      case 'Tools': return 'stroke-amber-500';
      default: return 'stroke-slate-500';
    }
  };

  const getBlipFill = (category: Category) => {
    switch (category) {
      case 'Platforms': return 'fill-rose-50 dark:fill-rose-900/40';
      case 'Governance': return 'fill-emerald-50 dark:fill-emerald-900/40';
      case 'Techniques': return 'fill-indigo-50 dark:fill-indigo-900/40';
      case 'Tools': return 'fill-amber-50 dark:fill-amber-900/40';
      default: return 'fill-slate-50 dark:fill-slate-800';
    }
  };

  const getCategoryBorderColor = (category: Category) => {
    switch (category) {
      case 'Platforms': return 'stroke-rose-500';
      case 'Governance': return 'stroke-emerald-500';
      case 'Techniques': return 'stroke-indigo-500';
      case 'Tools': return 'stroke-amber-500';
      default: return 'stroke-slate-200';
    }
  };

  const getMaturityTextColor = (level: MaturityLevel) => {
    switch (level) {
      case 'Adopt': return 'text-emerald-600 dark:text-emerald-400';
      case 'Trial': return 'text-indigo-600 dark:text-indigo-400';
      case 'Assess': return 'text-amber-600 dark:text-amber-400';
      case 'Experimental': return 'text-purple-600 dark:text-purple-400';
      default: return 'text-slate-600 dark:text-slate-400';
    }
  };

  const getViewBox = () => {
    if (!activeQuadrant) return `0 0 ${size} ${size}`;
    const zoomSize = center + 5; 
    switch (activeQuadrant) {
      case 'Tools': return `${center - 5} -5 ${zoomSize} ${zoomSize}`;
      case 'Techniques': return `-5 -5 ${zoomSize} ${zoomSize}`;
      case 'Platforms': return `-5 ${center - 5} ${zoomSize} ${zoomSize}`;
      case 'Governance': return `${center - 5} ${center - 5} ${zoomSize} ${zoomSize}`;
      default: return `0 0 ${size} ${size}`;
    }
  };

  return (
    <div className="relative w-full aspect-square bg-white dark:bg-slate-800/50 rounded-[2.5rem] p-2 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-inner overflow-hidden transition-colors duration-300">
      <svg 
        viewBox={getViewBox()} 
        className="w-full h-full drop-shadow-sm overflow-visible transition-all duration-[850ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
      >
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="0" dy="1" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.2" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {QUADRANTS.map((q, i) => {
          const isHighlighted = activeQuadrant === q;
          const isHidden = activeQuadrant && activeQuadrant !== q;
          const qPaths = [
            `M ${center} ${center} L ${size} ${center} A ${center} ${center} 0 0 1 ${center} ${size} Z`,
            `M ${center} ${center} L ${center} ${size} A ${center} ${center} 0 0 1 0 ${center} Z`,
            `M ${center} ${center} L 0 ${center} A ${center} ${center} 0 0 1 ${center} 0 Z`,
            `M ${center} ${center} L ${center} 0 A ${center} ${center} 0 0 1 ${size} ${center} Z`,
          ];
          
          return (
            <path 
              key={q}
              d={qPaths[i]}
              onClick={() => onQuadrantClick?.(q)}
              className={`transition-all duration-500 cursor-pointer ${
                isHidden ? 'opacity-0 pointer-events-none' : 
                isHighlighted ? 'fill-indigo-500/[0.04] dark:fill-indigo-400/[0.04] stroke-none' : 'fill-transparent hover:fill-slate-100/50 dark:hover:fill-slate-700/50 active:fill-slate-200'
              }`}
            />
          );
        })}

        {RINGS.map((ring, i) => {
          const isHovered = hoveredRing === ring;
          const isActive = !activeQuadrant;
          const isExperimental = ring === 'Experimental';
          return (
            <circle
              key={ring}
              cx={center}
              cy={center}
              r={RING_RADII_FACTORS[i] * ringRadius}
              fill="none"
              stroke={
                isExperimental
                  ? (isHovered ? "rgba(147, 51, 234, 0.5)" : "rgba(147, 51, 234, 0.2)")
                  : (isHovered ? "rgba(148, 163, 184, 0.5)" : "rgba(148, 163, 184, 0.15)")
              }
              strokeWidth={isHovered ? "2.5" : "1"}
              strokeDasharray={isExperimental ? "6 4" : "none"}
              onMouseEnter={() => setHoveredRing(ring)}
              onMouseLeave={() => setHoveredRing(null)}
              className={`pointer-events-auto transition-all duration-300 ${isActive ? '' : 'opacity-40'}`}
            />
          );
        })}

        {!activeQuadrant && (
          <>
            <line x1={center} y1={0} x2={center} y2={size} stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1" strokeDasharray="4 4" className="pointer-events-none" />
            <line x1={0} y1={center} x2={size} y2={center} stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1" strokeDasharray="4 4" className="pointer-events-none" />
          </>
        )}

        {[
          { text: 'TOOLS', x: center + 145, y: center - 145, id: 'Tools' },
          { text: 'TECHNIQUES', x: center - 145, y: center - 145, id: 'Techniques' },
          { text: 'PLATFORMS', x: center - 145, y: center + 145, id: 'Platforms' },
          { text: 'GOVERNANCE', x: center + 145, y: center + 145, id: 'Governance' },
        ].map((q) => (
          <g key={q.text} className={`transition-opacity duration-500 ${activeQuadrant === q.id ? 'opacity-100' : activeQuadrant ? 'opacity-0' : 'opacity-100'}`}>
            <text
              x={q.x}
              y={q.y}
              textAnchor="middle"
              className="text-[14px] font-black tracking-[0.4em] pointer-events-none fill-white dark:fill-slate-900 stroke-white dark:stroke-slate-900 stroke-[4px] opacity-80"
            >
              {q.text}
            </text>
            <text
              x={q.x}
              y={q.y}
              textAnchor="middle"
              className={`text-[14px] font-black tracking-[0.4em] pointer-events-none ${
                activeQuadrant === q.id ? 'fill-indigo-600 dark:fill-indigo-400' : 'fill-slate-400 dark:fill-slate-600'
              }`}
            >
              {q.text}
            </text>
          </g>
        ))}

        {RINGS.map((ring, i) => (
          <g key={ring} className={`transition-all duration-500 ${activeQuadrant ? 'opacity-0' : 'opacity-100'}`}>
            <text
              x={center}
              y={center - (RING_RADII_FACTORS[i] * ringRadius) + 12}
              textAnchor="middle"
              className="text-[8px] font-black uppercase tracking-widest pointer-events-none fill-white dark:fill-slate-900 stroke-white dark:stroke-slate-900 stroke-[3px]"
            >
              {ring}
            </text>
            <text
              x={center}
              y={center - (RING_RADII_FACTORS[i] * ringRadius) + 12}
              textAnchor="middle"
              className={`text-[8px] font-black uppercase tracking-widest pointer-events-none ${
                ring === 'Experimental' ? 'fill-purple-500' : 'fill-slate-500 dark:fill-slate-600'
              }`}
            >
              {ring}
            </text>
          </g>
        ))}

        {points.map((p) => {
          const isActive = !activeQuadrant || activeQuadrant === p.category;
          const isHovered = hoveredId === p.id;
          const isExperimental = p.maturity === 'Experimental';
          return (
            <g 
              key={p.id} 
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={(e) => {
                e.stopPropagation();
                onPointClick?.(p);
              }}
              className={`transition-all duration-700 ease-in-out cursor-pointer ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}
            >
              {isHovered && isActive && (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r="14"
                  className={`animate-pulse opacity-30 fill-current ${getBlipColor(p.category).replace('stroke', 'fill')}`}
                />
              )}
              <circle
                cx={p.x}
                cy={p.y}
                r={isHovered ? 10 : (isExperimental ? 5 : 7)}
                className={`transition-all duration-300 ${getBlipFill(p.category)} ${getBlipColor(p.category)} shadow-sm ${isExperimental ? 'stroke-dasharray-[2,2]' : ''}`}
                strokeWidth={isHovered ? "4" : (isExperimental ? "1.5" : "3")}
                filter="url(#shadow)"
              />
              <circle
                 cx={p.x}
                 cy={p.y}
                 r="22"
                 className="fill-none stroke-transparent pointer-events-auto"
                 strokeWidth="1"
              />
            </g>
          );
        })}

        {points.map((p) => {
          const isPointHovered = hoveredId === p.id;
          const isCategoryActive = !activeQuadrant || activeQuadrant === p.category;
          
          if (!isPointHovered || !isCategoryActive) return null;

          const tooltipWidth = 140;
          const tooltipHeight = 56; 
          const tx = p.x - tooltipWidth / 2;
          const ty = p.y - tooltipHeight - 16;

          return (
            <g key={`${p.id}-refined-tooltip`} filter="url(#shadow)" className="pointer-events-none overflow-visible">
              <rect
                x={tx}
                y={ty}
                width={tooltipWidth}
                height={tooltipHeight}
                rx="10"
                className={`fill-white dark:fill-slate-800 ${getCategoryBorderColor(p.category)}`}
                strokeWidth="2"
              />
              <path 
                d={`M ${p.x - 6} ${ty + tooltipHeight} L ${p.x} ${ty + tooltipHeight + 6} L ${p.x + 6} ${ty + tooltipHeight} Z`}
                className={`fill-white dark:fill-slate-800 ${getCategoryBorderColor(p.category)}`}
                strokeWidth="2"
              />
              <foreignObject x={tx + 10} y={ty + 8} width={tooltipWidth - 20} height={tooltipHeight - 16}>
                <div className="flex flex-col h-full justify-center">
                  <div className="text-[9px] leading-[1.1] font-black text-slate-800 dark:text-slate-100 uppercase tracking-tight break-words text-left">
                    {p.name}
                  </div>
                  <div className={`text-[7px] mt-1 font-bold uppercase tracking-wider ${getMaturityTextColor(p.maturity)} text-left`}>
                    {p.maturity} Level
                  </div>
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default TechnicalRadar;
