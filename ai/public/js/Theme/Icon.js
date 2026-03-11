const {useState, useMemo, useEffect, useRef} = React;
const Icons = {
    ClaudeLogo: (p) =>
        React.createElement(
            'svg',
            { ...p, viewBox: '0 0 24 24', fill: 'none' },
            React.createElement('circle', { cx: 12, cy: 12, r: 10, fill: '#D97757' }),
            React.createElement('path', {
                d: 'M12 6v2M12 16v2M6 12h2M16 12h2M8.46 8.46l1.42 1.42M14.12 14.12l1.42 1.42M8.46 15.54l1.42-1.42M14.12 9.88l1.42-1.42',
                stroke: 'white',
                strokeWidth: 1.5,
                strokeLinecap: 'round'
            })
        ),

    Sparkles: (p) =>
        React.createElement(
            'svg',
            { ...p, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
            React.createElement('path', {
                d: 'm12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z'
            }),
            React.createElement('path', {
                d: 'M5 3v4M19 17v4M3 5h4M17 19h4'
            })
        ),

    Clock: (p) =>
        React.createElement(
            'svg',
            { ...p, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
            React.createElement('circle', { cx: 12, cy: 12, r: 10 }),
            React.createElement('polyline', { points: '12 6 12 12 16 14' })
        ),

    Target: (p) =>
        React.createElement(
            'svg',
            { ...p, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
            React.createElement('circle', { cx: 12, cy: 12, r: 10 }),
            React.createElement('circle', { cx: 12, cy: 12, r: 6 }),
            React.createElement('circle', { cx: 12, cy: 12, r: 2 })
        ),

    BookOpen: (p) =>
        React.createElement(
            'svg',
            { ...p, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
            React.createElement('path', { d: 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z' }),
            React.createElement('path', { d: 'M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' })
        ),

    TrendingUp: (p) =>
        React.createElement(
            'svg',
            { ...p, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
            React.createElement('polyline', { points: '22 7 13.5 15.5 8.5 10.5 2 17' }),
            React.createElement('polyline', { points: '16 7 22 7 22 13' })
        ),

    Calendar: (p) =>
        React.createElement(
            'svg',
            { ...p, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
            React.createElement('path', { d: 'M8 2v4M16 2v4' }),
            React.createElement('rect', { x: 3, y: 4, width: 18, height: 18, rx: 2 }),
            React.createElement('path', { d: 'M3 10h18' })
        ),

    Users: (p) =>
        React.createElement(
            'svg',
            { ...p, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2 },
            React.createElement('path', { d: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' }),
            React.createElement('circle', { cx: 9, cy: 7, r: 4 }),
            React.createElement('path', { d: 'M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' })
        ),

    Award: (p) =>
        React.createElement(
            'svg', {...p , viewBox:'0 0 24 24' ,  fill:'none' ,  stroke:'currentColor' ,   strokeWidth: 2 },
            React.createElement('circle', { cx:'12' ,  cy:'8' ,  r:'6' })
            ,
            React.createElement( 'path' , {d:'M15.477 12.89 17 22l-5-3-5 3 1.523-9.11'})
        ),
    ChevronRight: (p) =>
        React.createElement(
            'svg',  {...p , viewBox:'0 0 24 24' ,  fill:'none' ,  stroke:'currentColor' ,   strokeWidth: 2 },
            React.createElement( 'path' , {d:'m9 18 6-6-6-6'})
        ),
    Star: (p) =>
        React.createElement(
            'svg',{...p , viewBox:'0 0 24 24' ,  fill:'none' ,  stroke:'currentColor' ,   strokeWidth: 2 },
            React.createElement( 'polygon' , { points:'12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'})
        ),
    Zap: (p) =>
        React.createElement(
            'svg', {...p , viewBox:'0 0 24 24' ,  fill:'none' ,  stroke:'currentColor' ,   strokeWidth: 2 },
            React.createElement( 'polygon' , { points:'13 2 3 14 12 14 11 22 21 10 12 10 13 2'})
        ),
    GraduationCap: (p) =>
        React.createElement(
            'svg', {...p , viewBox:'0 0 24 24' ,  fill:'none' ,  stroke:'currentColor' ,   strokeWidth: 2 },
            React.createElement( 'path' , {d:'M22 10v6M2 10l10-5 10 5-10 5z' }),
            React.createElement( 'path' , {d:'M6 12v5c3 3 9 3 12 0v-5'})
        ),
    Briefcase: (p) =>
        React.createElement(
            'svg',
             {...p , viewBox:'0 0 24 24' ,  fill:'none' ,  stroke:'currentColor' ,   strokeWidth: 2 },
            React.createElement( 'rect' , { width:'20' ,  height:'14' ,  x:'2' ,  y:'7' ,  rx:'2'  }),
            React.createElement( 'path' , {d:'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16'})
        ),
    DollarSign: (p) =>
        React.createElement(
            'svg',
             {...p , viewBox:'0 0 24 24' ,  fill:'none' ,  stroke:'currentColor' ,   strokeWidth: 2 },
            React.createElement( 'line' , {x1:'12' ,  y1:'1' ,  x2:'12' ,  y2:'23' })
            ,
            React.createElement( 'path' , {d:'M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'})
        ),
    Building: (p) =>
        React.createElement(
            'svg',
             {...p , viewBox:'0 0 24 24' ,  fill:'none' ,  stroke:'currentColor' ,   strokeWidth: 2 },
            React.createElement( 'rect' , { x:'4' ,  y:'2' ,  width:'16' ,  height:'20' ,  rx:'2' })
            ,
            React.createElement( 'path' , {d:'M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M8 10h.01M16 10h.01M12 14h.01M8 14h.01M16 14h.01'})
        ),
    CheckCircle: (p) =>
        React.createElement(
            'svg',
             {...p , viewBox:'0 0 24 24' ,  fill:'none' ,  stroke:'currentColor' ,   strokeWidth: 2 },
            React.createElement( 'path' , {d:'M22 11.08V12a10 10 0 1 1-5.93-9.14' }),
            React.createElement( 'polyline' , {points:'22 4 12 14.01 9 11.01'})
        ),
    AlertCircle: (p) =>
        React.createElement(
            'svg',
             {...p , viewBox:'0 0 24 24' ,  fill:'none' ,  stroke:'currentColor' ,   strokeWidth: 2 },
            React.createElement('circle', { cx:'12' ,  cy:'12' ,  r:'10' }),
            React.createElement( 'line' , {x1:'12' ,  y1:'8' ,  x2:'12' ,  y2:'12' })
            ,
            React.createElement( 'line' , {x1:'12' ,  y1:'16' ,  x2:'12.01' ,  y2:'16'})
        ),
    ArrowRight: (p) =>
        React.createElement(
            'svg',
             {...p , viewBox:'0 0 24 24' ,  fill:'none' ,  stroke:'currentColor' ,   strokeWidth: 2 },
            React.createElement( 'line' , {x1:'5' ,  y1:'12' ,  x2:'19' ,  y2:'12' })
            ,
            React.createElement( 'polyline' , {points:'12 5 19 12 12 19'})
        ),
    Play: (p) =>
        React.createElement(
            'svg',
             {...p , viewBox:'0 0 24 24' ,  fill:'none' ,  stroke:'currentColor' ,   strokeWidth: 2 },
            React.createElement( 'polygon' , { points:'5 3 19 12 5 21 5 3'})
        ),
    Book: (p) =>
        React.createElement(
            'svg',   {...p , viewBox:'0 0 24 24' ,  fill:'none' ,  stroke:'currentColor' ,   strokeWidth: 2 },
            React.createElement( 'path' , {d:'M4 19.5A2.5 2.5 0 0 1 6.5 17H20' }),
            React.createElement( 'path' , {d:'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'})
        ),
    Filter: (p) =>
        React.createElement(
            'svg', {...p , viewBox:'0 0 24 24' ,  fill:'none' ,  stroke:'currentColor' ,   strokeWidth: 2 },
            React.createElement( 'polygon' , { points:'22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3'})
        ),
    Search: (p) =>
        React.createElement(
            'svg',  {...p , viewBox:'0 0 24 24' ,  fill:'none' ,  stroke:'currentColor' ,   strokeWidth: 2 },
            React.createElement('circle', { cx:'11' ,  cy:'11' ,  r:'8' }),
            React.createElement( 'line' , {x1:'21' ,  y1:'21' ,  x2:'16.65' ,  y2:'16.65'})
        ),
    X: (p) =>
        React.createElement(
            'svg',
             {...p , viewBox:'0 0 24 24' ,  fill:'none' ,  stroke:'currentColor' ,   strokeWidth: 2 },
            React.createElement( 'line' , {x1:'18' ,  y1:'6' ,  x2:'6' ,  y2:'18' })  ,
            React.createElement( 'line' , {x1:'6' ,  y1:'6' ,  x2:'18' ,  y2:'18'})
        ),
    Info: (p) =>
        React.createElement(
            'svg',  {...p , viewBox:'0 0 24 24' ,  fill:'none' ,  stroke:'currentColor' ,   strokeWidth: 2 },
            React.createElement('circle', { cx:'12' ,  cy:'12' ,  r:'10' }),
            React.createElement( 'line' , {x1:'12' ,  y1:'16' ,  x2:'12' ,  y2:'12' }),
            React.createElement( 'line' , {x1:'12' ,  y1:'8' ,  x2:'12.01' ,  y2:'8'})
        ),
    Heart: (p) =>
        React.createElement(
            'svg', {...p , viewBox:'0 0 24 24' ,  fill:'none' ,  stroke:'currentColor' ,   strokeWidth: 2 },
            React.createElement( 'path' , {d:'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'})
        ),
    Phone: (p) =>
        React.createElement(
            'svg', {...p , viewBox:'0 0 24 24' ,  fill:'none' ,  stroke:'currentColor' ,   strokeWidth: 2 },
            React.createElement( 'path' , {d:'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'})
        ),
    Fire: (p) =>
        React.createElement(
            'svg', {...p , viewBox:'0 0 24 24' ,  fill:'none' ,  stroke:'currentColor' ,   strokeWidth: 2 },
            React.createElement( 'path' , {d:'M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z'})
        ),
    Brain: (p) =>
        React.createElement(
            'svg', {...p , viewBox:'0 0 24 24' ,  fill:'none' ,  stroke:'currentColor' ,   strokeWidth: 2 },
            React.createElement( 'path' , {d:'M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z' }),
            React.createElement( 'path' , {d:'M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z' }),
            React.createElement( 'path' , {d:'M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4' }),
            React.createElement( 'path' , {d:'M12 18v-6'})
        ),
    ExternalLink: (p) =>
        React.createElement(
            'svg',
            {
                ...p,
                viewBox: '0 0 24 24',
                fill: 'none',
                stroke: 'currentColor',
                strokeWidth: 2,
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
            },
            React.createElement('path', { d: 'M18 3h3v3' }),
            React.createElement('path', { d: 'M10 14L21 3' }),
            React.createElement('path', { d: 'M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5' })
        ),
};

const Icon = ({ name, size, className = "", ...props }) => {
    const SelectedIcon = Icons[name];

    if (!SelectedIcon) {
        console.warn(`Icon '${name}' not found`);
        return null;
    }

    const iconProps = {
        ...props,
        className,
        width: size,
        height: size
    };

    return React.createElement(SelectedIcon, iconProps);
};
//cdn 이라 이렇게 선언
window.Icon = Icon;
