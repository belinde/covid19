import { MetricCode, RegionCode } from '../../types';

export type MetricsValues = Record<MetricCode, number>;
export type RegionsValues = Record<RegionCode, MetricsValues>;
export type FilteredData = Record<string, RegionsValues>;