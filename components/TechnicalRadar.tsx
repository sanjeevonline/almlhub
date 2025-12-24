import React, { useMemo, useState } from 'react';
import { COMPETENCY_DB } from '../data';
import { Category, CompetencyTerm, MaturityLevel, RadarItem } from '../types';

interface Props {
  onQuadrantClick?: (quadrant: string) => void;
  activeQuadrant?: Category | null;
}

const RINGS: MaturityLevel[] = ['Adopt', 'Trial', 'Assess', 'Experimental'];
const QUADRANTS: Category[] = ['Data', 'Strategy', 'Delivery', 'Design'];

// Radii factors adjusted to make 'Adopt' significantly wider while compressing outer rings
const RING_RADII_FACTORS = [0.44, 0.64, 0.82, 0.98];

const getStableSeed = (id: string) => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

const TechnicalRadar: React.FC<Props> = ({ onQuadrantClick, activeQuadrant }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hoveredRing, setHoveredRing] = useState<string | null>(null);
  const size = 600;
  const center = size / 2;
  const ringRadius = center - 10; 

  const points = useMemo(() => {
    const groups: Record<string, CompetencyTerm[]> = {};
    COMPETENCY_DB.glossary.forEach(item => {
      const key = `${item.category}-${item.maturity}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });

    const itemsWithCoords: RadarItem[] = [];

    QUADRANTS.forEach((q) => {
      const qIdx = QUADRANTS.indexOf(q);
      const qAngles = [
        { start: 0, end: 90 },    // Data (BR)
        { start: 90, end: 180 },  // Strategy (BL)
        { start: 180, end: 270 }, // Delivery (TL)
        { start: 270, end: 360 }, // Design (TR)
      ];

      RINGS.forEach((ring, rIdx) => {
        const key = `${q}-${ring}`;
        const groupItems = groups[key] || [];
        
        const startAngle = qAngles[qIdx].start + 12;
        const endAngle = qAngles[qIdx].end - 12;
        const angleRange = endAngle - startAngle;
        
        const rStart = rIdx === 0 ? 40 : RING_RADII_FACTORS[rIdx - 1] * ringRadius + 10;
        const rEnd = RING_RADII_FACTORS[rIdx] * ringRadius - 10;
        const rRange = rEnd - rStart;

        groupItems.forEach((item, i) => {
          const seed = getStableSeed(item.id);
          
          const rowCount = Math.ceil(Math.sqrt(groupItems.length));
          const col = i % rowCount;
          const row = Math.floor(i / rowCount);
          
          const angleNorm = (col + 0.5) / rowCount + ((seed % 20) - 10) / 100;
          const angleDeg = startAngle + (angleNorm * angleRange);
          const angleRad = (angleDeg * Math.PI) / 180;
          
          const radialNorm = (row + 0.5) / rowCount + ((seed % 30) - 15) / 100;
          const radius = rStart + (Math.max(0.1, Math.min(0.9, radialNorm)) * rRange);
          
          const x = center + radius * Math.cos(angleRad);
          const y = center + radius * Math.sin(angleRad);
          
          itemsWithCoords.push({ ...item, x, y } as RadarItem);
        });
      });
    });

    return itemsWithCoords;
  }, [ringRadius, center]);

  const getBlipColor = (category: Category) => {
    switch (category) {
      case 'Strategy': return 'stroke-rose-500';
      case 'Data': return 'stroke-emerald-500';
      case 'Design': return 'stroke-indigo-500';
      case 'Delivery': return 'stroke-amber-500';
      default: return 'stroke-slate-500';
    }
  };

  const getBlipFill = (category: Category) => {
    switch (category) {
      case 'Strategy': return 'fill-rose-50';
      case 'Data': return 'fill-emerald-50';
      case 'Design': return 'fill-indigo-50';
      case 'Delivery': return 'fill-amber-50';
      default: return 'fill-slate-50';
    }
  };

  const getCategoryBorderColor = (category: Category) => {
    switch (category) {
      case 'Strategy': return 'stroke-rose-500';
      case 'Data': return 'stroke-emerald-500';
      case 'Design': return 'stroke-indigo-500';
      case 'Delivery': return 'stroke-amber-500';
      default: return 'stroke-slate-200';
    }
  };

  const getMaturityTextColor = (level: MaturityLevel) => {
    switch (level) {
      case 'Adopt': return 'text-emerald-600';
      case 'Trial': return 'text-indigo-600';
      case 'Assess': return 'text-amber-600';
      case 'Experimental': return 'text-purple-600';
      default: return 'text-slate-600';
    }
  };

  const getViewBox = () => {
    if (!activeQuadrant) return `0 0 ${size} ${size}`;
    const zoomSize = center + 5; 
    switch (activeQuadrant) {
      case 'Design': return `${center - 5} -5 ${zoomSize} ${zoomSize}`;
      case 'Delivery': return `-5 -5 ${zoomSize} ${zoomSize}`;
      case 'Strategy': return `-5 ${center - 5} ${zoomSize} ${zoomSize}`;
      case 'Data': return `${center - 5} ${center - 5} ${zoomSize} ${zoomSize}`;
      default: return `0 0 ${size} ${size}`;
    }
  };

  return (
    <div className="relative w-full aspect-square bg-white rounded-[2.5rem] p-2 flex items-center justify-center border border-slate-200 shadow-inner overflow-hidden">
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

        {/* Quadrant Backdrops */}
        {QUADRANTS.map((q, i) => {
          const isHighlighted = activeQuadrant === q;
          const isHidden = activeQuadrant && activeQuadrant !== q;
          const qPaths = [
            `M ${center} ${center} L ${size} ${center} A ${center} ${center} 0 0 1 ${center} ${size} Z`, // Data (BR)
            `M ${center} ${center} L ${center} ${size} A ${center} ${center} 0 0 1 0 ${center} Z`,      // Strategy (BL)
            `M ${center} ${center} L 0 ${center} A ${center} ${center} 0 0 1 ${center} 0 Z`,      // Delivery (TL)
            `M ${center} ${center} L ${center} 0 A ${center} ${center} 0 0 1 ${size} ${center} Z`,      // Design (TR)
          ];
          
          return (
            <path 
              key={q}
              d={qPaths[i]}
              onClick={() => onQuadrantClick?.(q)}
              className={`transition-all duration-500 cursor-pointer ${
                isHidden ? 'opacity-0 pointer-events-none' : 
                isHighlighted ? 'fill-indigo-500/[0.03] stroke-none' : 'fill-transparent hover:fill-slate-100/50 active:fill-slate-200'
              }`}
            />
          );
        })}

        {/* Ring Backgrounds */}
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
                  ? (isHovered ? "rgba(147, 51, 234, 0.4)" : "rgba(147, 51, 234, 0.15)")
                  : (isHovered ? "rgba(148, 163, 184, 0.4)" : "rgba(148, 163, 184, 0.15)")
              }
              strokeWidth={isHovered ? "2.5" : "1"}
              strokeDasharray={isExperimental ? "6 4" : "none"}
              onMouseEnter={() => setHoveredRing(ring)}
              onMouseLeave={() => setHoveredRing(null)}
              className={`pointer-events-auto transition-all duration-300 ${isActive ? '' : 'opacity-40'}`}
            />
          );
        })}

        {/* Quadrant Separators */}
        {!activeQuadrant && (
          <>
            <line x1={center} y1={0} x2={center} y2={size} stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1" strokeDasharray="4 4" className="pointer-events-none" />
            <line x1={0} y1={center} x2={size} y2={center} stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1" strokeDasharray="4 4" className="pointer-events-none" />
          </>
        )}

        {/* Quadrant Labels */}
        {[
          { text: 'DESIGN', x: center + 145, y: center - 145, id: 'Design' },
          { text: 'DELIVERY', x: center - 145, y: center - 145, id: 'Delivery' },
          { text: 'STRATEGY', x: center - 145, y: center + 145, id: 'Strategy' },
          { text: 'DATA', x: center + 145, y: center + 145, id: 'Data' },
        ].map((q) => (
          <g key={q.text} className={`transition-opacity duration-500 ${activeQuadrant === q.id ? 'opacity-100' : activeQuadrant ? 'opacity-0' : 'opacity-100'}`}>
            <text
              x={q.x}
              y={q.y}
              textAnchor="middle"
              className="text-[14px] font-black tracking-[0.4em] pointer-events-none fill-white stroke-white stroke-[4px] opacity-80"
            >
              {q.text}
            </text>
            <text
              x={q.x}
              y={q.y}
              textAnchor="middle"
              className={`text-[14px] font-black tracking-[0.4em] pointer-events-none ${
                activeQuadrant === q.id ? 'fill-indigo-600' : 'fill-slate-400'
              }`}
            >
              {q.text}
            </text>
          </g>
        ))}

        {/* Ring Labels */}
        {RINGS.map((ring, i) => (
          <g key={ring} className={`transition-all duration-500 ${activeQuadrant ? 'opacity-0' : 'opacity-100'}`}>
            <text
              x={center}
              y={center - (RING_RADII_FACTORS[i] * ringRadius) + 12}
              textAnchor="middle"
              className="text-[8px] font-black uppercase tracking-widest pointer-events-none fill-white stroke-white stroke-[3px]"
            >
              {ring}
            </text>
            <text
              x={center}
              y={center - (RING_RADII_FACTORS[i] * ringRadius) + 12}
              textAnchor="middle"
              className={`text-[8px] font-black uppercase tracking-widest pointer-events-none ${
                ring === 'Experimental' ? 'fill-purple-500' : 'fill-slate-500'
              }`}
            >
              {ring}
            </text>
          </g>
        ))}

        {/* Blip Circles Layer */}
        {points.map((p) => {
          const isActive = !activeQuadrant || activeQuadrant === p.category;
          const isHovered = hoveredId === p.id;
          const isExperimental = p.maturity === 'Experimental';
          return (
            <g 
              key={p.id} 
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`transition-all duration-700 ease-in-out cursor-pointer ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}
            >
              {isHovered && (isActive) && (
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

        {/* Tooltips Layer with Multi-line Wrapping Support */}
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
                className={`fill-white ${getCategoryBorderColor(p.category)}`}
                strokeWidth="2"
              />
              <path 
                d={`M ${p.x - 6} ${ty + tooltipHeight} L ${p.x} ${ty + tooltipHeight + 6} L ${p.x + 6} ${ty + tooltipHeight} Z`}
                className={`fill-white ${getCategoryBorderColor(p.category)}`}
                strokeWidth="2"
              />
              <foreignObject x={tx + 10} y={ty + 8} width={tooltipWidth - 20} height={tooltipHeight - 16}>
                <div xmlns="http://www.w3.org/1999/xhtml" className="flex flex-col h-full justify-center">
                  <div className="text-[9px] leading-[1.1] font-medium text-slate-800 uppercase tracking-tight break-words text-left">
                    {p.name}
                  </div>
                  <div className={`text-[7px] mt-1 font-semibold uppercase tracking-wider ${getMaturityTextColor(p.maturity)} text-left`}>
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