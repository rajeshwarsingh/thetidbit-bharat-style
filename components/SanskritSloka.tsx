'use client';
import React, { useEffect, useState } from 'react';

type SlokaId = 'craft' | 'nature' | 'family' | 'beauty' | 'effort';

export type Sloka = {
  id: SlokaId;
  sanskrit: string;
  meaning: string;
  source: string;
};

const SLOKAS: Record<SlokaId, Sloka> = {
  craft: {
    id: 'craft',
    sanskrit: 'योगः कर्मसु कौशलम्',
    meaning: 'Excellence in craft is yoga',
    source: 'Bhagavad Gita',
  },
  nature: {
    id: 'nature',
    sanskrit: 'परोपकाराय फलन्ति वृक्षाः · परोपकाराय वहन्ति नद्यः',
    meaning: 'Trees bear fruit for others; rivers flow for others',
    source: 'Subhāṣita',
  },
  family: {
    id: 'family',
    sanskrit: 'वसुधैव कुटुम्बकम्',
    meaning: 'The world is one family',
    source: 'Maha Upanishad',
  },
  beauty: {
    id: 'beauty',
    sanskrit: 'सत्यं शिवं सुन्दरम्',
    meaning: 'Truth, goodness, beauty',
    source: 'Classical',
  },
  effort: {
    id: 'effort',
    sanskrit: 'उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः',
    meaning: 'Work succeeds through effort, not by wishes alone',
    source: 'Panchatantra',
  },
};

const HERO_SLOKA_IDS: SlokaId[] = ['nature', 'craft', 'family', 'beauty', 'effort'];
/** Short lines only — fits the mobile trust bar without truncating badly. */
const SHORT_SLOKA_IDS: SlokaId[] = ['craft', 'family', 'beauty'];
const SESSION_KEY = 'thetidbit-hero-sloka';
const SESSION_KEY_SHORT = 'thetidbit-hero-sloka-short';

function pickSlokaId(pool: SlokaId[], key: string, fallback: SlokaId): SlokaId {
  if (typeof window === 'undefined') return fallback;
  try {
    const saved = sessionStorage.getItem(key) as SlokaId | null;
    if (saved && pool.includes(saved)) return saved;
  } catch {
    /* private mode */
  }
  const id = pool[Math.floor(Math.random() * pool.length)];
  try {
    sessionStorage.setItem(key, id);
  } catch {
    /* ignore */
  }
  return id;
}

/** Full pool — desktop hero overlay. */
export function useRandomHeroSloka(): Sloka | null {
  const [data, setData] = useState<Sloka | null>(null);

  useEffect(() => {
    setData(SLOKAS[pickSlokaId(HERO_SLOKA_IDS, SESSION_KEY, 'craft')]);
  }, []);

  return data;
}

/** Short shlokas only — mobile trust bar. */
export function useRandomShortSloka(): Sloka | null {
  const [data, setData] = useState<Sloka | null>(null);

  useEffect(() => {
    setData(SLOKAS[pickSlokaId(SHORT_SLOKA_IDS, SESSION_KEY_SHORT, 'family')]);
  }, []);

  return data;
}

/** Desktop overlay — single quiet line. */
export const SlokaInline: React.FC<{ data: Sloka; className?: string }> = ({ data, className = '' }) => (
  <p className={`leading-relaxed ${className}`}>
    <span
      lang="sa"
      style={{ fontFamily: 'var(--font-devanagari), "Noto Serif Devanagari", "Devanagari MT", Georgia, serif' }}
    >
      {data.sanskrit}
    </span>
    <span className="mx-1.5 opacity-50" aria-hidden>
      —
    </span>
    <span className="italic opacity-90">{data.meaning}</span>
    <span className="opacity-60"> ({data.source})</span>
  </p>
);

/** Quiet fixed inline verse (story / about). */
const SanskritSloka: React.FC<{
  className?: string;
  sloka?: SlokaId;
}> = ({ className = '', sloka = 'craft' }) => (
  <SlokaInline data={SLOKAS[sloka]} className={`text-sm ${className}`} />
);

export default SanskritSloka;
