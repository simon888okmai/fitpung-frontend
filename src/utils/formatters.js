// src/utils/formatters.js

// 1. แปลงวินาที -> 1:05:20
export const formatDuration = (seconds) => {
    if (!seconds) return "00:00";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    const mStr = m.toString().padStart(2, '0');
    const sStr = s.toString().padStart(2, '0');
    return h > 0 ? `${h}:${mStr}:${sStr}` : `${mStr}:${sStr}`;
};

// 2. แปลง Pace -> 6'00''
export const formatPace = (paceNumber) => {
    if (!paceNumber) return "0'00''";
    const pMin = Math.floor(paceNumber);
    const pSec = Math.round((paceNumber - pMin) * 60);
    return `${pMin}'${pSec.toString().padStart(2, '0')}''`;
};

// 3. แปลงวันที่ -> Jan 22, 2026
export const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// 4. แปลงเวลา -> 18:30
export const formatTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
};