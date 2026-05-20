// Types for the presale segmentation funnel
// Branch: feature/funnel-segmentation

import type { Lang } from '../constants/presale-i18n';

export type { Lang };

export type ProjectType = 'landing' | 'store' | 'mini_app' | 'app' | 'unsure';
export type GoalType    = 'leads' | 'sell' | 'organize' | 'presence' | 'validate';
export type ScaleType   = 'small' | 'medium' | 'large' | 'unknown';
export type AssetType   = 'logo' | 'copy' | 'photos' | 'domain' | 'none';
export type UrgencyType = 'now' | 'week' | 'month' | 'exploring';
export type ResultType  = 'call' | 'msg' | 'direct';

// Tier mapping: 0=undefined, 1=Landing, 2=Store, 3=Platform, 4=Mini App
export type TierNum = 0 | 1 | 2 | 3 | 4;

export interface PresaleAnswers {
  projectType: ProjectType | null;
  goal:        GoalType    | null;
  scale:       ScaleType   | null;
  assets:      AssetType[];
  urgency:     UrgencyType | null;
}

export interface PresaleResult {
  type:   ResultType;
  tier:   TierNum;
}

// Classification logic — mirrors the HTML's renderResult() exactly
export function classify(a: PresaleAnswers): PresaleResult {
  const { projectType: pType, goal, scale, assets, urgency: time } = a;

  let tier: TierNum = 1;
  if (pType === 'app' || goal === 'organize')           tier = 3;
  else if (pType === 'mini_app')                        tier = 4;
  else if (pType === 'store' || goal === 'sell')        tier = 2;
  else if (pType === 'unsure')                          tier = 0;

  const complex    = scale === 'large';
  const medScale   = scale === 'medium';
  const urgent     = time  === 'now';
  const exploring  = time  === 'exploring';
  const noAssets   = assets.includes('none') || assets.length === 0;
  const noInfo     = pType === 'unsure';

  const needsCall = complex || (noInfo && urgent) || tier === 3 || (tier === 0 && !exploring);
  const needsMsg  = !needsCall && (exploring || medScale || (tier === 2 && noAssets) || noInfo);

  return {
    type: needsCall ? 'call' : needsMsg ? 'msg' : 'direct',
    tier,
  };
}
