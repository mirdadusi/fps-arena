const BUDGETS = Object.freeze({
  low: Object.freeze({
    terrainSegments: 18,
    environmentRadialSegments: 6,
    botRadialSegments: 5,
    botJointSegments: 6,
    rockDetail: 0,
    explosionSegments: 7,
  }),
  balanced: Object.freeze({
    terrainSegments: 28,
    environmentRadialSegments: 8,
    botRadialSegments: 6,
    botJointSegments: 8,
    rockDetail: 0,
    explosionSegments: 9,
  }),
  high: Object.freeze({
    terrainSegments: 40,
    environmentRadialSegments: 12,
    botRadialSegments: 8,
    botJointSegments: 10,
    rockDetail: 1,
    explosionSegments: 12,
  }),
});

/** Return a stable geometry budget for the selected device tier. */
export function getMeshDetailBudget(tier = 'high') {
  return BUDGETS[tier] || BUDGETS.high;
}

